\# MMK



Premium AI marketing agency site + client portal + admin CMS.



\## Requirements

Node 20+, PostgreSQL 15+, pnpm (or npm).



\## Setup

1\. `pnpm install`

2\. `cp .env.example .env` and fill `DATABASE\_URL`, `AUTH\_SECRET`, `ADMIN\_EMAIL`, `ADMIN\_PASSWORD`.

3\. `pnpm prisma migrate dev --name init`

4\. `pnpm prisma db seed`

5\. `pnpm dev` → http://localhost:3000



\## First admin

Set `ADMIN\_EMAIL` + `ADMIN\_PASSWORD` \*\*before\*\* seeding. Registration can never mint an admin — the role is server-assigned only.



\## Fonts

Drop the licensed `Akony.woff2` into `public/fonts/`. Until then the poster type falls back to Impact — declared explicitly in `globals.css`.



\## Email

Without `RESEND\_API\_KEY`, verification and reset emails are not sent; the app logs a warning and the admin dashboard shows a setup banner. Nothing pretends to have sent.



\## Deployment

Vercel + Neon/Supabase Postgres. Run `prisma migrate deploy` in the build step. Set `STORAGE\_DRIVER=s3` and provide bucket credentials before accepting uploads.

