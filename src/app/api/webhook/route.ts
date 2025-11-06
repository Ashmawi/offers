import { NextRequest, NextResponse } from 'next/server';
import { createCatalogSchema } from '@/lib/validations';
import { db, processedWebhooks, catalogs, webhookHits, eq, and, gte, count } from '@/db';

import { processOfferWebhook } from '@/services/offerWebhookService';

export async function POST(request: NextRequest) {
  try {
    // Simple shared-secret verification to secure the endpoint
    const providedSecret = request.headers.get('x-webhook-secret');
    const expectedSecret = process.env.N8N_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET;
    if (!expectedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Simple rate limiting per secret within a sliding window
    const windowMs = Number(process.env.WEBHOOK_RATE_WINDOW_MS || '60000'); // 1 min
    const limit = Number(process.env.WEBHOOK_RATE_LIMIT || '60'); // 60 req/min/secret
    const since = new Date(Date.now() - windowMs);
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

    try {
      const [{ cnt }] = await db
        .select({ cnt: count() })
        .from(webhookHits)
        .where(and(eq(webhookHits.secret, providedSecret!), gte(webhookHits.createdAt, since)));

      if (cnt >= limit) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      }

      await db.insert(webhookHits).values({ secret: providedSecret!, ip, createdAt: new Date() });
    } catch (e) {
      // If rate limiter fails, don't block webhook processing; proceed.
      console.warn('Rate limiter error, proceeding without block:', e);
    }

    const body = await request.json();

    //  Retrieving webhookId
    const { webhookId } = body;
    if (!webhookId) {return NextResponse.json({ error: 'webhookId required' }, { status: 400 });}

    // Check: Has this webhook been processed before?
    const already = await db.select().from(processedWebhooks).where(eq(processedWebhooks.webhookId, webhookId)).limit(1);

    if (already.length > 0 && already[0].catalogId) {
      // Fetch the associated catalog
      const [catalog] = await db.select().from(catalogs).where(eq(catalogs.id, already[0].catalogId)).limit(1);

      return NextResponse.
        json({message: "This Offer has already been processed.",
          catalog,
          alreadyProcessed: true,},
          { status: 200 });
    }

    // Check the data format
    const parseResult = createCatalogSchema.safeParse(body);
  // console.log("Parsed result:", parseResult);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parseResult.error.format() },
        { status: 400 }
      );
    }

    // Process the webhook to create the catalog
    const catalog = await processOfferWebhook(parseResult.data);

    // 5. Create a record that the webhook has been processed
    await db.insert(processedWebhooks).values({webhookId, catalogId: catalog.id, processedAt: new Date() });

    return NextResponse.json({ message: 'Catalog created successfully', catalog }, { status: 200 }
      );
    } catch (error) {
    console.error('Error processing webhook:', error);
    // Do not log in processedWebhooks here → n8n will retry
    return NextResponse.json({ error: 'Error processing webhook', details: error },{ status: 500 });
  }
}