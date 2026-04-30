# Fleet Manager — Marketing Site

Front-door marketing site for Fleet Manager (codename), the productized version of the Northline Dashboard.

- **Stack:** Astro 5, Tailwind 4, React 19 islands, Framer Motion, Chart.js (lazy)
- **Deploy:** Vercel (separate project from the dashboard)
- **Login button:** points at `https://northline-dashboard.vercel.app`
- **Waitlist:** Resend → `amantidesigns@gmail.com`

## Local dev

```bash
npm install
npm run dev    # http://localhost:4321
```

Set `RESEND_API_KEY` in `.env` for the waitlist endpoint.

## Routes

| Route | Purpose |
|---|---|
| `/` | Marketing homepage |
| `/components` | Internal product component library (live DOM replicas of the dashboard UI) |
| `/api/waitlist` | POST endpoint that emails new signups |
