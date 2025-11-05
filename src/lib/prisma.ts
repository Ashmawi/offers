import { createClient, type Client } from "@libsql/client";

/**
 * Turso Database Client (Lazy Initialization)
 * Direct LibSQL client for connecting to Turso database
 * This approach avoids Prisma adapter issues with Turbopack
 * 
 * Client is created lazily to ensure environment variables are loaded first
 */

// Singleton instance
let tursoClient: Client | null = null;

/**
 * Get Turso database client instance (singleton with lazy initialization)
 * Creates the connection only when first accessed
 * This ensures environment variables are loaded before connection is attempted
 * 
 * @returns LibSQL client instance
 * @throws Error if TURSO_DATABASE_URL is not defined
 */
export const getTurso = (): Client => {
  if (!tursoClient) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (!url) {
      throw new Error("TURSO_DATABASE_URL is not defined in environment variables");
    }

    tursoClient = createClient({
      url,
      authToken,
    });
  }
  
  return tursoClient;
};

/**
 * Default export that lazily creates the client
 * Use this in API routes and server-side code where env vars are available
 */
const turso = {
  execute: (...args: Parameters<Client["execute"]>) => getTurso().execute(...args),
  close: () => tursoClient?.close(),
};

export default turso;
