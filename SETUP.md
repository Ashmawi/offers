# Setup Guide - دليل الإعداد

## ⚡ إعداد سريع

### 1. تثبيت المتطلبات
تأكد من تثبيت:
- Node.js 18+ 
- npm أو pnpm أو yarn

### 2. تثبيت Dependencies
```bash
npm install
```

### 3. إنشاء قاعدة بيانات Turso

#### أ. تثبيت Turso CLI
```bash
# macOS
brew install tursodatabase/tap/turso

# Linux/WSL
curl -sSfL https://get.tur.so/install.sh | bash

# Windows (PowerShell)
irm get.tur.so/install.ps1 | iex
```

#### ب. تسجيل الدخول
```bash
turso auth login
```

#### ج. إنشاء قاعدة بيانات
```bash
turso db create offers-db
```

#### د. الحصول على URL و Token
```bash
# احصل على URL
turso db show offers-db --url

# احصل على Token
turso db tokens create offers-db
```

### 4. إعداد ملف .env
انسخ `.env.example` إلى `.env`:
```bash
cp .env.example .env
```

ثم املأ البيانات:
```env
TURSO_DATABASE_URL=libsql://offers-db-username.turso.io
TURSO_AUTH_TOKEN=your-very-long-token-here
WEBHOOK_SECRET=any-random-secret-string
```

### 5. إنشاء الجداول
```bash
npm run db:push
```

أو إن أردت استخدام migrations:
```bash
npm run db:generate
```

### 6. إضافة بيانات تجريبية (اختياري)
```bash
npm run db:seed
```

### 7. تشغيل المشروع
```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) 🎉

## 🔧 أدوات مساعدة

### Drizzle Studio
لعرض وتعديل البيانات بشكل مرئي:
```bash
npm run db:studio
```

### تشغيل ESLint
```bash
npm run lint
```

### Build للإنتاج
```bash
npm run build
npm run start
```

## 🐳 Docker (قريباً)

قريباً سيتم إضافة دعم Docker للتسهيل أكثر!

## ❓ المشاكل الشائعة

### خطأ في الاتصال بـ Turso
- تأكد من صحة `TURSO_DATABASE_URL` و `TURSO_AUTH_TOKEN`
- تحقق من اتصالك بالإنترنت
- تأكد من أن قاعدة البيانات موجودة: `turso db list`

### خطأ في Schema
```bash
# احذف الجداول وأعد إنشاءها
npm run db:push
```

### Port 3000 مستخدم
```bash
# غير الـ port
PORT=3001 npm run dev
```

## 📚 موارد إضافية

- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Turso Docs](https://docs.turso.tech)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

## 🆘 تحتاج مساعدة؟

افتح Issue على GitHub أو تواصل عبر البريد الإلكتروني.
