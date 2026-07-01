# Navil Job Connect Frontend

Next.js + Tailwind CSS frontend scaffold for Navil Job Connect.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3
- **Forms:** React Hook Form + Zod
- **Client:** TypeScript Axios client (auto-generated from OpenAPI spec)
- **State:** Zustand (optional)
- **API:** Fully typed API client from `@navil/job-connect-client`

## Project Structure

```
app/
├── layout.tsx           # Root layout with nav/footer
├── page.tsx             # Home page
├── globals.css          # Global styles
├── auth/
│   ├── login/
│   │   └── page.tsx     # Login page
│   └── register/
│       └── page.tsx     # Registration page
└── jobs/
    ├── page.tsx         # Job listings
    └── [id]/
        └── page.tsx     # Job details

tailwind.config.ts      # Tailwind design tokens
next.config.js          # Next.js config
```

## Design Tokens

### Colors
- **Primary:** Navy Blue (#0a2dff) — CTA buttons, links, headers
- **Secondary:** Teal (#008080) — Highlights, accents
- **Accent:** Orange (#ff6633) — Warnings, notifications
- **Neutral:** Grays (50-900) — Text, backgrounds, borders

### Typography
- **Font:** Inter (sans-serif)
- **Sizes:** 5xl, 4xl, 3xl, 2xl, xl, lg, base (14px), sm, xs

### Spacing
- Tailwind defaults (4px base)

### Components
- **Buttons:** `.btn-primary`, `.btn-secondary`, `.btn-outline`
- **Cards:** `.card` (white bg, shadow, rounded, padding)
- **Inputs:** `.input-field` (border, focus ring, rounded)

## Installation & Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment

```bash
cp .env.example .env.local
```

Fill in:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_CURRENCY=NGN
```

### 3. Build TypeScript client (if needed)

```bash
cd ../clients/typescript-axios-generated
npm run build
cd ../../frontend
```

### 4. Run development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Pages

### Home (`/`)
- Hero section with CTA buttons
- Features overview (search, tools, connection)
- Social proof / stats section
- Call-to-action for registration

### Jobs (`/jobs`)
- Search bar (query, location, remote filter)
- Paginated job listings with:
  - Job title, company name
  - Location, employment type, remote badge
  - Salary range
- Mock data for demo (will connect to API)

### Job Details (`/jobs/[id]`)
- Full job description
- Responsibilities section
- Qualifications section
- Save/Share buttons
- "Apply" CTA button
- Mock data for demo

### Login (`/auth/login`)
- Email + Password form
- Form validation with Zod
- Error handling
- Link to registration
- Will connect to API:
  ```typescript
  const tokens = await client.login(email, password);
  localStorage.setItem('access_token', tokens.access_token);
  router.push('/dashboard');
  ```

### Register (`/auth/register`)
- Full Name, Email, Password form
- Role selection (Seeker or Employer) via query param
- Password confirmation + validation
- Form validation with Zod
- Will connect to API:
  ```typescript
  await client.register({ email, password, role });
  router.push('/auth/verify-email');
  ```

## Using the TypeScript Client

### Example: Job Search (Server-side)

```typescript
// app/jobs/page.tsx (Server Component)
import { NavilJobConnectClient } from '@navil/job-connect-client';

export async function getJobs() {
  const client = new NavilJobConnectClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    currency: 'NGN',
  });
  return client.listJobs('engineer', 'Lagos', 'full_time', true, 1, 20);
}
```

### Example: Login (Client-side)

```typescript
// app/auth/login/page.tsx (Client Component)
'use client';

import { NavilJobConnectClient } from '@navil/job-connect-client';
import { useRouter } from 'next/navigation';

const handleLogin = async (email: string, password: string) => {
  const client = new NavilJobConnectClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  });
  const tokens = await client.login(email, password);
  localStorage.setItem('access_token', tokens.access_token);
  localStorage.setItem('refresh_token', tokens.refresh_token);
  
  const clientWithAuth = new NavilJobConnectClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    accessToken: tokens.access_token,
  });
  router.push('/dashboard');
};
```

## Styling

### Tailwind Config

Design tokens are defined in `tailwind.config.ts`:

```typescript
colors: {
  primary: { 50: ..., 900: ... },  // Navy Blue
  secondary: { 50: ..., 900: ... }, // Teal
  accent: { 50: ..., 900: ... },   // Orange
  neutral: { 50: ..., 900: ... },  // Grays
}
```

### Component Classes

Defined in `app/globals.css`:

```css
.btn-primary { /* Navy bg, white text */ }
.btn-secondary { /* Gray bg */ }
.btn-outline { /* Border only */ }
.card { /* White bg, shadow, rounded */ }
.input-field { /* Border, focus ring */ }
```

## Building & Deployment

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Deploy to Vercel

```bash
vercel deploy
```

Ensure `.env.local` is set in Vercel dashboard.

## TODO / Next Steps

1. **Wire up API calls:**
   - Replace mock data in jobs/page.tsx with client.listJobs()
   - Replace mock data in jobs/[id]/page.tsx with client.getJobDetails()
   - Implement login/register endpoints

2. **Add authentication state:**
   - Create auth context or Zustand store
   - Persist tokens in localStorage/cookies
   - Add JWT refresh logic

3. **Build additional pages:**
   - /dashboard (seeker)
   - /dashboard (employer)
   - /profile
   - /applications
   - /messages
   - /settings

4. **Add premium features:**
   - CV upload & preview
   - AI CV review (call client.reviewCV())
   - Interview practice (call client.getInterviewPractice())
   - Job matching (call client.getMatches())

5. **Improve UX:**
   - Add loading states & skeletons
   - Implement pagination
   - Add search filters UI
   - Mobile-optimized navigation

6. **Testing:**
   - Unit tests (Jest)
   - E2E tests (Playwright)
   - Visual regression tests

## Troubleshooting

### API not responding
- Ensure backend is running on the port specified in `.env.local`
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify CORS is enabled on backend

### Client import errors
- Ensure `@navil/job-connect-client` is built:
  ```bash
  cd ../clients/typescript-axios-generated
  npm run build
  ```
- Verify `path` in `package.json` points to correct directory

## License

MIT
