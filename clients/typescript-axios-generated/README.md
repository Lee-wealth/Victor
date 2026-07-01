# Navil Job Connect — TypeScript Axios Client

Fully generated TypeScript Axios client for the Navil Job Connect API.

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

Generated files go to `dist/`.

## Usage

### Basic Setup

```typescript
import { NavilJobConnectClient } from '@navil/job-connect-client';

const client = new NavilJobConnectClient({
  baseUrl: 'https://api.naviljobconnect.com',
  currency: 'NGN',
  language: 'en',
});
```

### Authentication

```typescript
// Register
const user = await client.register({
  email: 'user@example.com',
  password: 'secure123',
  role: 'seeker',
});

// Login
const tokens = await client.login('user@example.com', 'secure123');
client.setAccessToken(tokens.access_token);

// Refresh token
const newTokens = await client.refreshToken(tokens.refresh_token);
client.setAccessToken(newTokens.access_token);
```

### Job Search

```typescript
// List jobs
const jobs = await client.listJobs(
  'engineer',      // query
  'Lagos',         // location
  'full_time',     // employment_type
  true,            // remote
  1,               // page
  20               // per_page
);

console.log(`Found ${jobs.total} jobs`);
jobs.items.forEach(job => {
  console.log(`${job.title} at ${job.location?.city}`);
});
```

### Seeker Profile

```typescript
// Get profile
const profile = await client.getSeekerProfile();

// Update profile
await client.updateSeekerProfile({
  headline: 'Senior Software Engineer',
  skills: ['TypeScript', 'React', 'Node.js'],
  location: { city: 'Lagos', country: 'Nigeria' },
});

// Upload resume
const fileInput = document.getElementById('resume') as HTMLInputElement;
if (fileInput.files) {
  const result = await client.uploadResume(fileInput.files[0]);
  console.log('Resume uploaded:', result.resume_id);
  console.log('Parsed CV:', result.parsed_json);
}
```

### Apply to Jobs

```typescript
const application = await client.applyToJob('job-id-123', {
  resume_id: 'resume-id-456',
  cover_letter: 'I am interested in this position...',
});

console.log('Applied with status:', application.status);
```

### Job Matching & Recommendations

```typescript
const matches = await client.getMatches('seeker-id');
matches.forEach(match => {
  console.log(`${match.job.title} - Match score: ${match.score}`);
});
```

### AI Features

```typescript
// CV Review
const review = await client.reviewCV(resumeId='resume-123');
console.log(`CV Score: ${review.score}`);
console.log('Suggestions:', review.suggestions);

// Interview Practice
const interview = await client.getInterviewPractice('job-id', 'seeker-id');
interview.questions.forEach(q => {
  console.log(`Q: ${q.question} (${q.category})`);
});
```

### Using in Next.js

#### getServerSideProps (Server-side)

```typescript
// pages/jobs/index.tsx
import { GetServerSideProps } from 'next';
import { NavilJobConnectClient, PagedJobs } from '@navil/job-connect-client';

interface Props {
  jobs: PagedJobs;
}

export default function JobsPage({ jobs }: Props) {
  return (
    <div>
      {jobs.items.map(job => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.location?.city}</p>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const client = new NavilJobConnectClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    currency: 'NGN',
  });

  const jobs = await client.listJobs(undefined, undefined, undefined, undefined, 1, 20);

  return {
    props: { jobs },
    revalidate: 60, // ISR: revalidate every 60 seconds
  };
};
```

#### Client-side with React Hooks

```typescript
// hooks/useNavilClient.ts
import { useEffect, useState } from 'react';
import { NavilJobConnectClient, PagedJobs } from '@navil/job-connect-client';

const useJobsList = () => {
  const [jobs, setJobs] = useState<PagedJobs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = new NavilJobConnectClient({
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      accessToken: localStorage.getItem('access_token') || '',
      currency: 'NGN',
    });

    client.listJobs('engineer', 'Lagos', 'full_time', true, 1, 20)
      .then(setJobs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { jobs, loading };
};
```

## Error Handling

```typescript
try {
  const jobs = await client.listJobs('engineer');
} catch (error) {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
  }
}
```

## Currency Support

Set preferred currency for localized pricing:

```typescript
client.setCurrency('NGN');  // Nigerian Naira
client.setCurrency('USD');  // US Dollar
client.setCurrency('GBP');  // British Pound
```

The API will return `price_display` with localized amounts.

## Documentation

Full API spec: `../openapi.yaml`

For detailed endpoint documentation, use Swagger UI or import the OpenAPI spec into Postman/Insomnia.
