# 🇺🇸 USARemoteJobs.io — 2,000,000 Remote Jobs

A full job portal with **2,000,000 individual remote job pages** for USA-based companies, open to applicants worldwide.

## Features

- ✅ 2,000,000 unique job pages (`/jobs/1` → `/jobs/2000000`)
- ✅ All jobs 100% Remote — open to 100+ countries
- ✅ JSON-LD JobPosting schema on every page with ALL countries in `applicantLocationRequirements`
- ✅ 2,000 XML sitemap files (1,000 URLs each) + static sitemap
- ✅ Sitemap index at `/sitemap.xml`
- ✅ robots.txt
- ✅ Pagination (20 jobs/page)
- ✅ REST API (`/api/jobs`, `/api/jobs/:id`)
- ✅ Zero database — deterministic generation
- ✅ Gzip compression
- ✅ `SITE_URL` env variable — change domain without touching code

## Deploy to Railway

1. Push this repo to GitHub
2. Go to [railway.app](https://railway.app)
3. **New Project** → **Deploy from GitHub repo**
4. Select repository → Railway auto-deploys!
5. **Settings** → **Variables** → Add:
   ```
   SITE_URL = https://your-custom-domain.com
   ```

## URL Structure

| URL | Description |
|-----|-------------|
| `/` | Home page |
| `/jobs` | All jobs (paginated) |
| `/jobs?type=fulltime` | Full-time remote |
| `/jobs?type=contract` | Contract remote |
| `/jobs/:id` | Individual job (1–2,000,000) |
| `/sitemap.xml` | Sitemap index |
| `/sitemap-1.xml` | Jobs 1–1,000 |
| `/sitemap-2000.xml` | Jobs 1,999,001–2,000,000 |
| `/robots.txt` | robots.txt |
| `/api/jobs` | JSON API |

## Schema Example

Every job includes `applicantLocationRequirements` for 100+ countries:

```json
{
  "@type": "JobPosting",
  "jobLocationType": "TELECOMMUTE",
  "applicantLocationRequirements": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "India" },
    { "@type": "Country", "name": "United Kingdom" },
    ...100+ countries
  ]
}
```

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Data**: Deterministic (no database)
- **Deploy**: Railway
- **RAM**: ~50MB
