# OuttaCouch 

Next.js 15 App Router app for event-first social connections. Uses Prisma + Postgres (Supabase), Stripe for payments, Twilio Verify for phone OTP, and SMTP for email OTP.

## Stack
- Next.js 15, React 18, TypeScript
- Prisma ORM + PostgreSQL (Supabase)
- NextAuth (Credentials) + OTP (Twilio Verify, SMTP)
- Tailwind CSS, Socket.io, Stripe

## Prerequisites
- Node 18+
- Environment file (.env) with: DATABASE_URL, DIRECT_URL, NEXTAUTH_SECRET, NEXTAUTH_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, STRIPE keys, TWILIO_VERIFY vars, EMAIL_USER/EMAIL_PASS/EMAIL_FROM.

## Install and Build
```bash
npm ci
npx prisma generate
npm run build
npm run start
```

## Development
```bash
npm run dev
```
If you delete .next, types warnings are expected until the next dev/build run.

## Migrations
Run against the production database only:
```bash
npx prisma migrate deploy
```
Ensure DIRECT_URL is set in the prod environment (not in prisma.config.ts).

## Deploy Notes
- Vercel build runs `prisma generate` + `next build`.
- Buckets needed: event-images, profile-photos, memories.

## Troubleshooting
- After cache wipes: remove .next/.turbo/node_modules/.cache, then reinstall and rebuild.
- Missing .next types: run dev or build to regenerate.
