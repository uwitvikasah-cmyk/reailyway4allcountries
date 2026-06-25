'use strict';

const TOTAL_JOBS = 2000000; // 20 lakh base jobs (fixed, nahi badlenge)

// ── New companies to add (50 new — 1000 jobs each = 50,000 extra) ─────────────
const newCompanies = [
  'Youtube','CostCo','Disney','Wayfair','Starbucks','Walmart','American Express',
  'Wells Fargo','Aetna','CVS','Hobby Lobby','Home Depot','Target','Yelp','Crocs',
  'Xbox','Dell','Anthem','Labcorp','TTEC','Polaris','UCHealth','Hulu','NDT',
  'Crunchyroll','Eddie Bauer','USPC','JetBlue Airlines','UPS','Chewy','Automattic',
  'Zapier','Buffer','InVision','Toptal','Basecamp','Doist','Trello','Upwork',
  'FlexJobs','GitKraken','Indeed','Squarespace','WeWork','Calendly','TaxJar',
  'Front','Automox','Veeva Systems','MURAL'
];
const EXTRA_JOBS_PER_COMPANY = 1000;
const EXTRA_START_ID = TOTAL_JOBS + 1; // starts at 2000001
const TOTAL_EXTRA_JOBS = newCompanies.length * EXTRA_JOBS_PER_COMPANY; // 50000
const GRAND_TOTAL = TOTAL_JOBS + TOTAL_EXTRA_JOBS; // 2050000

// ── Job Titles (200+) ────────────────────────────────────────────────────────
const jobTitles = [
  'Software Engineer','Senior Software Engineer','Staff Software Engineer','Principal Software Engineer',
  'Frontend Developer','Senior Frontend Developer','Backend Developer','Senior Backend Developer',
  'Full Stack Developer','Senior Full Stack Developer','Lead Software Engineer','Software Architect',
  'iOS Developer','Android Developer','Mobile Developer','React Native Developer',
  'DevOps Engineer','Senior DevOps Engineer','Site Reliability Engineer','Platform Engineer',
  'Cloud Engineer','AWS Solutions Architect','Azure Cloud Engineer','GCP Engineer',
  'Data Engineer','Senior Data Engineer','Machine Learning Engineer','AI Engineer',
  'Deep Learning Engineer','NLP Engineer','Computer Vision Engineer','MLOps Engineer',
  'Blockchain Developer','Smart Contract Developer','Web3 Developer','Solidity Developer',
  'Embedded Systems Engineer','Firmware Engineer','Systems Engineer','QA Engineer',
  'Automation Test Engineer','SDET','Performance Engineer','Security Engineer',
  'Cybersecurity Engineer','Penetration Tester','Application Security Engineer','InfoSec Engineer',
  'Game Developer','Unity Developer','Unreal Engine Developer','Graphics Programmer',
  'Database Engineer','DBA','PostgreSQL DBA','MySQL DBA','NoSQL Engineer',
  'API Developer','Microservices Engineer','Integration Engineer','ETL Developer',
  'Data Scientist','Senior Data Scientist','Principal Data Scientist','Data Analyst',
  'Senior Data Analyst','Business Intelligence Analyst','BI Developer','Analytics Engineer',
  'Quantitative Analyst','Research Scientist','Applied Scientist','ML Researcher',
  'Data Architect','Big Data Engineer','Spark Engineer','Kafka Engineer',
  'Product Manager','Senior Product Manager','Principal Product Manager','Group Product Manager',
  'Product Designer','Senior Product Designer','UX Designer','UI Designer','UX Researcher',
  'UX/UI Designer','Design Lead','Creative Director','Visual Designer','Interaction Designer',
  'Brand Designer','Motion Designer','Graphic Designer','Web Designer',
  'Digital Marketing Manager','SEO Specialist','SEM Specialist','Content Strategist',
  'Content Writer','Copywriter','Technical Writer','Social Media Manager',
  'Email Marketing Specialist','Growth Hacker','Performance Marketer','Demand Gen Manager',
  'Product Marketing Manager','Brand Manager','Marketing Analyst','CRO Specialist',
  'Account Executive','Senior Account Executive','Enterprise Account Executive',
  'Sales Development Representative','Business Development Manager','Partnerships Manager',
  'Customer Success Manager','Customer Success Engineer','Solutions Engineer','Sales Engineer',
  'Financial Analyst','Senior Financial Analyst','FP&A Analyst','Accounting Manager',
  'Controller','CFO','Revenue Operations Manager','Sales Operations Analyst',
  'Operations Manager','Project Manager','Program Manager','Scrum Master','Agile Coach',
  'Technical Recruiter','Senior Recruiter','Talent Acquisition Manager','HR Manager',
  'People Operations Manager','Compensation Analyst','L&D Specialist',
  'Customer Support Specialist','Technical Support Engineer','Support Team Lead',
  'Legal Counsel','Privacy Counsel','Compliance Manager','Risk Analyst',
  'Clinical Data Manager','Bioinformatics Scientist','Health Informatics Analyst',
  'Medical Writer','Regulatory Affairs Specialist','Clinical Research Associate',
];

// ── All Companies (existing + new) ───────────────────────────────────────────
const companies = [
  // Original
  'Google','Meta','Apple','Amazon','Microsoft','Netflix','Spotify','Shopify','Stripe',
  'Tesla','American Airlines','Delta Airlines','United Airlines','Southwest Airlines',
  'Airbnb','Uber','Lyft','Twitter','LinkedIn','Salesforce','Slack','Zoom','Dropbox',
  'GitHub','GitLab','Atlassian','Twilio','Cloudflare','Fastly','Datadog','Splunk',
  'HashiCorp','MongoDB','Elastic','Redis Labs','Snowflake','Databricks','Palantir',
  'Figma','Canva','Notion','Airtable','Asana','Monday.com','ClickUp','Linear',
  'HubSpot','Zendesk','Intercom','Freshworks','ServiceNow','Workday','Rippling',
  'Gusto','BambooHR','Lattice','Culture Amp','Greenhouse','Lever','Workable',
  'Coinbase','Kraken','Chainalysis','OpenSea','Alchemy','Consensys','Circle',
  'OpenAI','Anthropic','Cohere','Hugging Face','Scale AI','Weights & Biases',
  'Robinhood','Brex','Ramp','Plaid','Marqeta','Affirm','Klarna','Chime',
  'DoorDash','Instacart','Rappi','Deliveroo','Postmates','GoPuff',
  'Peloton','Calm','Headspace','Noom','Hims','Ro','Forward','Carbon Health',
  'Duolingo','Coursera','Udemy','Chegg','Kahoot','Quizlet','Masterclass',
  'Twitch','Discord','Reddit','Pinterest','Snap','TikTok','Bytedance',
  'Anduril','Shield AI','Rebellion Defense','Samsara','Matterport',
  'Waymo','Cruise','Aurora','Rivian','Lucid Motors','Bird','Lime',
  'SpaceX','Relativity Space','Planet Labs','Rocket Lab','Astranis',
  'Vercel','Netlify','Supabase','PlanetScale','Neon','Railway','Render',
  'Grafana','New Relic','PagerDuty','OpsGenie','StatusPage','Incident.io',
  'Auth0','Okta','CrowdStrike','SentinelOne','Snyk','Wiz','Lacework',
  'Carta','AngelList','Gust','Visible',
  'Loom','Miro','Whimsical','Lucidchart','Storybook','Chromatic',
  'Postman','Insomnia','RapidAPI','Kong','Apigee','MuleSoft',
  'dbt Labs','Airbyte','Fivetran','Segment','mParticle','Rudderstack',
  'LaunchDarkly','Split.io','Optimizely','Amplitude','Mixpanel','Heap',
  'Contentful','Sanity','Strapi','Ghost','WordPress VIP','Webflow',
  'Algolia','Typesense','Meilisearch',
  // New companies added
  ...newCompanies
];

// ── USA States / Locations ────────────────────────────────────────────────────
const usaStates = [
  'Remote — California, USA','Remote — New York, USA','Remote — Texas, USA',
  'Remote — Washington, USA','Remote — Florida, USA','Remote — Illinois, USA',
  'Remote — Massachusetts, USA','Remote — Colorado, USA','Remote — Georgia, USA',
  'Remote — Virginia, USA','Remote — North Carolina, USA','Remote — Oregon, USA',
  'Remote — Arizona, USA','Remote — Nevada, USA','Remote — Michigan, USA',
  'Remote — Pennsylvania, USA','Remote — Ohio, USA','Remote — Minnesota, USA',
  'Remote — Utah, USA','Remote — Tennessee, USA','Remote — Wisconsin, USA',
  'Remote — Maryland, USA','Remote — Connecticut, USA','Remote — Indiana, USA',
  'Remote — Missouri, USA','Remote — Kansas, USA','Remote — New Jersey, USA',
  'Fully Remote — USA','Fully Remote — Worldwide','Remote — Austin, TX',
  'Remote — San Francisco, CA','Remote — New York City, NY','Remote — Seattle, WA',
  'Remote — Boston, MA','Remote — Chicago, IL','Remote — Denver, CO',
  'Remote — Atlanta, GA','Remote — Los Angeles, CA','Remote — Miami, FL',
];

// ── Industries ───────────────────────────────────────────────────────────────
const industries = [
  'Software & SaaS','FinTech','HealthTech','EdTech','E-Commerce','Cybersecurity',
  'Artificial Intelligence','Blockchain & Web3','Cloud Computing','DevTools',
  'Marketing Tech','HR Tech','LegalTech','PropTech','InsurTech','Gaming',
  'Media & Entertainment','Social Media','Logistics & Supply Chain',
  'Autonomous Vehicles','Space Tech','Clean Energy','BioTech','Data & Analytics',
];

const jobTypes = ['Full-time','Contract','Part-time','Freelance','Full-time Contract'];

const experienceLevels = [
  'Entry Level (0-2 yrs)','Mid Level (2-5 yrs)','Senior Level (5-8 yrs)',
  'Lead / Staff (8+ yrs)','Principal / Director (10+ yrs)',
];

const salaryRanges = [
  '$45,000 – $65,000/yr','$60,000 – $85,000/yr','$80,000 – $110,000/yr',
  '$100,000 – $140,000/yr','$130,000 – $170,000/yr','$150,000 – $200,000/yr',
  '$180,000 – $240,000/yr','$200,000 – $280,000/yr','$60 – $80/hr','$80 – $120/hr',
  '$120 – $160/hr','$160 – $200/hr','Competitive + Equity','$90,000 – $130,000/yr',
  '$110,000 – $150,000/yr','$70,000 – $100,000/yr',
];

const salarySchema = [
  {min:45000,max:65000},{min:60000,max:85000},{min:80000,max:110000},
  {min:100000,max:140000},{min:130000,max:170000},{min:150000,max:200000},
  {min:180000,max:240000},{min:200000,max:280000},{min:120000,max:160000},
  {min:160000,max:200000},{min:200000,max:240000},{min:240000,max:280000},
  {min:120000,max:160000},{min:90000,max:130000},{min:110000,max:150000},
  {min:70000,max:100000},
];

const allCountries = [
  'United States','United Kingdom','Canada','Australia','Germany','France','Netherlands',
  'Sweden','Norway','Denmark','Finland','Switzerland','Austria','Belgium','Ireland',
  'Spain','Portugal','Italy','Poland','Czech Republic','Romania','Hungary','Bulgaria',
  'Croatia','Slovakia','Slovenia','Estonia','Latvia','Lithuania','Greece','Cyprus',
  'Malta','Luxembourg','Iceland','Liechtenstein','Monaco','San Marino',
  'Brazil','Argentina','Chile','Colombia','Mexico','Peru','Uruguay','Ecuador',
  'Costa Rica','Panama','Paraguay','Bolivia','Venezuela','Honduras','Guatemala',
  'India','Pakistan','Bangladesh','Sri Lanka','Nepal','Philippines','Vietnam',
  'Thailand','Indonesia','Malaysia','Singapore','South Korea','Japan','China',
  'Taiwan','Hong Kong','Myanmar','Cambodia','Laos','Mongolia','Bhutan',
  'Nigeria','Kenya','South Africa','Ghana','Egypt','Morocco','Tunisia','Ethiopia',
  'Tanzania','Uganda','Rwanda','Senegal','Cameroon','Ivory Coast','Mozambique',
  'New Zealand','Fiji','Papua New Guinea','Samoa','Tonga',
  'Israel','UAE','Saudi Arabia','Jordan','Lebanon','Turkey','Georgia','Armenia',
  'Ukraine','Russia','Kazakhstan','Uzbekistan','Belarus','Serbia','Albania',
  'Bosnia and Herzegovina','North Macedonia','Kosovo','Montenegro','Moldova',
];

const descTemplates = [
  (title, company, industry) => `${company} is hiring a ${title} to join our fully remote team. We're a fast-growing ${industry} company building products used by millions worldwide.

**What You'll Do:**
• Design, build, and maintain scalable systems and features
• Collaborate with cross-functional teams across multiple time zones
• Write clean, well-tested, production-ready code
• Participate in code reviews and architectural discussions
• Mentor junior team members and contribute to engineering culture

**Requirements:**
• 3+ years of relevant experience in a similar role
• Strong problem-solving skills and attention to detail
• Experience working in agile/scrum environments
• Excellent written and verbal communication skills (remote-first team)
• Passion for building products that make a real difference

**Benefits:**
• Fully remote — work from anywhere in the world
• Competitive salary + equity package
• Health, dental, and vision insurance
• $2,000 home office stipend
• Unlimited PTO + 15 company holidays
• 401(k) with company match
• Annual learning & development budget of $1,500
• Team retreats twice a year`,

  (title, company, industry) => `Join ${company} as a ${title} and help us revolutionize the ${industry} space. This is a 100% remote position open to candidates worldwide.

**About the Role:**
As a ${title}, you will be a key player in our engineering/product organization. You'll work closely with our team to ship high-quality features and drive impact across our platform.

**Responsibilities:**
• Lead end-to-end development of major product features
• Partner with product managers, designers, and stakeholders
• Own technical quality and reliability of your domain
• Drive technical direction and best practices
• Contribute to our inclusive, remote-first engineering culture

**What We're Looking For:**
• Proven track record in a ${title} or similar role
• Strong technical foundation and eagerness to learn
• High ownership mentality — you see problems and fix them
• Async communication skills (we're remote-first)
• Experience with modern tools and workflows

**Perks & Compensation:**
• Market-competitive compensation + equity
• Remote-first culture with async flexibility
• Full benefits package (health, dental, vision)
• $1,500/year learning budget
• 4-day workweek option available
• Paid parental leave (16 weeks)`,

  (title, company, industry) => `${company} (${industry}) is looking for a talented ${title} to work remotely and help us scale our platform to the next level.

**The Mission:**
We're on a mission to transform the ${industry} industry. As a ${title}, you'll be central to achieving that goal by building reliable, performant, and user-loved products.

**Day-to-Day:**
• Ship features end-to-end with high quality and speed
• Work asynchronously with teammates across time zones
• Participate in planning, estimation, and retrospectives
• Proactively identify and resolve technical debt
• Collaborate with design, product, and data teams

**You Should Have:**
• Experience in a ${title} role or equivalent
• Strong attention to craft — you care about quality
• Comfort working independently in a remote environment
• Clear communication and documentation habits
• A growth mindset and eagerness to level up

**Why ${company}:**
• Truly remote-first (we've been remote since day one)
• Transparent culture with open salary bands
• Top-tier compensation and meaningful equity
• Flexible hours — own your schedule
• 30 days paid vacation globally
• Monthly wellness stipend ($150/mo)
• Latest MacBook Pro + accessories provided`,
];

// ── Fixed Dates ───────────────────────────────────────────────────────────────
const FIXED_DATE_POSTED   = '2025-06-25';
const FIXED_VALID_THROUGH = '2025-12-22';

// ── Helpers ───────────────────────────────────────────────────────────────────
function pick(arr, seed) { return arr[Math.abs(seed) % arr.length]; }

// ── Check if ID is an extra company job ──────────────────────────────────────
function isExtraJob(id) { return id >= EXTRA_START_ID; }

function getExtraJobCompany(id) {
  const offset = id - EXTRA_START_ID; // 0-based
  const companyIndex = Math.floor(offset / EXTRA_JOBS_PER_COMPANY);
  return newCompanies[companyIndex];
}

// ── Main getJobData ───────────────────────────────────────────────────────────
function getJobData(id) {
  const s1 = id * 7 + 13;
  const s3 = id * 17 + 53;
  const s4 = id * 23 + 31;
  const s5 = id * 29 + 71;
  const s6 = id * 37 + 19;
  const s7 = id * 41 + 83;

  const title      = pick(jobTitles, s1);
  // Extra jobs: company is fixed per block; base jobs: deterministic pick
  const company    = isExtraJob(id) ? getExtraJobCompany(id) : pick(companies, id * 11 + 97);
  const location   = pick(usaStates, s3);
  const industry   = pick(industries, s4);
  const jobType    = pick(jobTypes, s5);
  const experience = pick(experienceLevels, s6);
  const salary     = pick(salaryRanges, s7);
  const descFn     = pick(descTemplates, id * 3 + 7);
  const description = descFn(title, company, industry);

  return {
    id, title, company, location, industry, jobType,
    experience, salary,
    postedDate: FIXED_DATE_POSTED,
    validThrough: FIXED_VALID_THROUGH,
    description, isRemote: true
  };
}

// ── Search: find job IDs matching query ───────────────────────────────────────
// Strategy: since data is deterministic, we scan company/title arrays to find
// which IDs will produce matching results — O(array_size) not O(2M)
function searchJobs(q, page, perPage) {
  if (!q || !q.trim()) return null; // no search — use normal pagination
  const query = q.trim().toLowerCase();
  const results = [];

  // ── 1. Match by COMPANY ──────────────────────────────────────────────────
  // Find all company indices that match query
  const matchingCompanyIndices = [];
  companies.forEach((c, idx) => {
    if (c.toLowerCase().includes(query)) matchingCompanyIndices.push(idx);
  });

  if (matchingCompanyIndices.length > 0) {
    // For base jobs (1–2M): id * 11 + 97 mod companies.length == matchingIndex
    // Scan all IDs is too slow, so: for each matching company index,
    // find IDs where (id * 11 + 97) % companies.length === companyIndex
    const N = companies.length;
    matchingCompanyIndices.forEach(ci => {
      // Find first id in 1..TOTAL_JOBS where (id*11+97)%N === ci
      // id*11 ≡ (ci - 97) mod N  → step through multiples of N
      for (let id = 1; id <= TOTAL_JOBS; id++) {
        if (Math.abs(id * 11 + 97) % N === ci) {
          // Found first match; now every N-th id (where seed repeats) will also match
          // But seeds are id*11+97, so period = N / gcd(11,N)
          // Simpler: just collect up to enough results by stepping
          for (let j = id; j <= TOTAL_JOBS && results.length < 5000; j += N) {
            if (Math.abs(j * 11 + 97) % N === ci) results.push(j);
          }
          break;
        }
      }
    });

    // ── Extra company jobs (2000001+) ──────────────────────────────────────
    newCompanies.forEach((c, idx) => {
      if (c.toLowerCase().includes(query)) {
        const start = EXTRA_START_ID + idx * EXTRA_JOBS_PER_COMPANY;
        const end   = start + EXTRA_JOBS_PER_COMPANY;
        for (let id = start; id < end; id++) results.push(id);
      }
    });
  }

  // ── 2. Match by JOB TITLE ────────────────────────────────────────────────
  if (results.length === 0) {
    const matchingTitleIndices = [];
    jobTitles.forEach((t, idx) => {
      if (t.toLowerCase().includes(query)) matchingTitleIndices.push(idx);
    });
    const N = jobTitles.length;
    matchingTitleIndices.forEach(ti => {
      for (let id = 1; id <= TOTAL_JOBS && results.length < 5000; id++) {
        if (Math.abs(id * 7 + 13) % N === ti) {
          for (let j = id; j <= TOTAL_JOBS && results.length < 5000; j += N) {
            if (Math.abs(j * 7 + 13) % N === ti) results.push(j);
          }
          break;
        }
      }
      // Extra jobs title search
      for (let id = EXTRA_START_ID; id < GRAND_TOTAL && results.length < 5000; id++) {
        if (Math.abs(id * 7 + 13) % N === ti) results.push(id);
      }
    });
  }

  // Sort and deduplicate
  const unique = [...new Set(results)].sort((a, b) => a - b);
  const total  = unique.length;
  const totalPages = Math.ceil(total / perPage) || 1;
  const safePage   = Math.min(Math.max(1, page), totalPages);
  const slice      = unique.slice((safePage - 1) * perPage, safePage * perPage);

  return { ids: slice, total, totalPages, page: safePage };
}

// ── JSON-LD Schema ────────────────────────────────────────────────────────────
function getJobSchema(job) {
  const s7 = job.id * 41 + 83;
  const salaryData = pick(salarySchema, s7);

  let employmentType;
  switch (job.jobType) {
    case 'Full-time':          employmentType = 'FULL_TIME'; break;
    case 'Part-time':          employmentType = 'PART_TIME'; break;
    case 'Contract':           employmentType = 'CONTRACTOR'; break;
    case 'Full-time Contract': employmentType = 'FULL_TIME'; break;
    case 'Freelance':          employmentType = 'CONTRACTOR'; break;
    default:                   employmentType = 'FULL_TIME';
  }

  let monthsOfExperience;
  switch (job.experience) {
    case 'Entry Level (0-2 yrs)':          monthsOfExperience = 12;  break;
    case 'Mid Level (2-5 yrs)':            monthsOfExperience = 24;  break;
    case 'Senior Level (5-8 yrs)':         monthsOfExperience = 60;  break;
    case 'Lead / Staff (8+ yrs)':          monthsOfExperience = 96;  break;
    case 'Principal / Director (10+ yrs)': monthsOfExperience = 120; break;
    default:                               monthsOfExperience = 24;
  }

  return {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.postedDate,
    "validThrough": job.validThrough,
    "employmentType": employmentType,
    "hiringOrganization": { "@type": "Organization", "name": job.company },
    "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressCountry": "US" } },
    "jobLocationType": "TELECOMMUTE",
    "applicantLocationRequirements": allCountries.map(c => ({ "@type": "Country", "name": c })),
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": { "@type": "QuantitativeValue", "minValue": salaryData.min, "maxValue": salaryData.max, "unitText": "YEAR" }
    },
    "experienceRequirements": { "@type": "OccupationalExperienceRequirements", "monthsOfExperience": monthsOfExperience },
    "industry": job.industry,
    "identifier": { "@type": "PropertyValue", "name": "Job ID", "value": `USA-${String(job.id).padStart(7, '0')}` }
  };
}

module.exports = {
  getJobData, getJobSchema, searchJobs,
  TOTAL_JOBS, GRAND_TOTAL, EXTRA_START_ID,
  jobTitles, companies, usaStates, industries, newCompanies
};
