'use strict';

const TOTAL_JOBS = 2000000; // 20 lakh jobs

// ── Job Titles (200+) ────────────────────────────────────────────────────────
const jobTitles = [
  // Engineering
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
  // Data & Analytics
  'Data Scientist','Senior Data Scientist','Principal Data Scientist','Data Analyst',
  'Senior Data Analyst','Business Intelligence Analyst','BI Developer','Analytics Engineer',
  'Quantitative Analyst','Research Scientist','Applied Scientist','ML Researcher',
  'Data Architect','Big Data Engineer','Spark Engineer','Kafka Engineer',
  // Product & Design
  'Product Manager','Senior Product Manager','Principal Product Manager','Group Product Manager',
  'Product Designer','Senior Product Designer','UX Designer','UI Designer','UX Researcher',
  'UX/UI Designer','Design Lead','Creative Director','Visual Designer','Interaction Designer',
  'Brand Designer','Motion Designer','Graphic Designer','Web Designer',
  // Marketing & Growth
  'Digital Marketing Manager','SEO Specialist','SEM Specialist','Content Strategist',
  'Content Writer','Copywriter','Technical Writer','Social Media Manager',
  'Email Marketing Specialist','Growth Hacker','Performance Marketer','Demand Gen Manager',
  'Product Marketing Manager','Brand Manager','Marketing Analyst','CRO Specialist',
  // Sales & Business Dev
  'Account Executive','Senior Account Executive','Enterprise Account Executive',
  'Sales Development Representative','Business Development Manager','Partnerships Manager',
  'Customer Success Manager','Customer Success Engineer','Solutions Engineer','Sales Engineer',
  // Finance & Operations
  'Financial Analyst','Senior Financial Analyst','FP&A Analyst','Accounting Manager',
  'Controller','CFO','Revenue Operations Manager','Sales Operations Analyst',
  'Operations Manager','Project Manager','Program Manager','Scrum Master','Agile Coach',
  // HR & Recruiting
  'Technical Recruiter','Senior Recruiter','Talent Acquisition Manager','HR Manager',
  'People Operations Manager','Compensation Analyst','L&D Specialist',
  // Customer Support
  'Customer Support Specialist','Technical Support Engineer','Support Team Lead',
  // Legal & Compliance
  'Legal Counsel','Privacy Counsel','Compliance Manager','Risk Analyst',
  // Healthcare & Science
  'Clinical Data Manager','Bioinformatics Scientist','Health Informatics Analyst',
  'Medical Writer','Regulatory Affairs Specialist','Clinical Research Associate',
];

// ── Companies (150+) ─────────────────────────────────────────────────────────
const companies = [
  'Google','Meta','Apple','Amazon','Microsoft','Netflix','Spotify','Shopify','Stripe',
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
  'Palantir','Anduril','Shield AI','Rebellion Defense','Samsara','Matterport',
  'Waymo','Cruise','Aurora','Rivian','Lucid Motors','Bird','Lime',
  'SpaceX','Relativity Space','Planet Labs','Rocket Lab','Astranis',
  'Vercel','Netlify','Supabase','PlanetScale','Neon','Railway','Render',
  'Grafana','New Relic','PagerDuty','OpsGenie','StatusPage','Incident.io',
  'Auth0','Okta','CrowdStrike','SentinelOne','Snyk','Wiz','Lacework',
  'Carta','Equity Bee','AngelList','Gust','Visible','Landscape',
  'Loom','Miro','Whimsical','Lucidchart','Storybook','Chromatic',
  'Postman','Insomnia','RapidAPI','Kong','Apigee','MuleSoft',
  'dbt Labs','Airbyte','Fivetran','Segment','mParticle','Rudderstack',
  'LaunchDarkly','Split.io','Optimizely','Amplitude','Mixpanel','Heap',
  'Contentful','Sanity','Strapi','Ghost','WordPress VIP','Webflow',
  'Algolia','Typesense','Elasticsearch','Solr','Meilisearch',
];

// ── USA States / Locations (all remote but listing state) ────────────────────
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

// ── Job Types ─────────────────────────────────────────────────────────────────
const jobTypes = ['Full-time','Contract','Part-time','Freelance','Full-time Contract'];

// ── Experience Levels ─────────────────────────────────────────────────────────
const experienceLevels = [
  'Entry Level (0-2 yrs)','Mid Level (2-5 yrs)','Senior Level (5-8 yrs)',
  'Lead / Staff (8+ yrs)','Principal / Director (10+ yrs)',
];

// ── Salary Ranges (USD) ───────────────────────────────────────────────────────
const salaryRanges = [
  '$45,000 – $65,000/yr','$60,000 – $85,000/yr','$80,000 – $110,000/yr',
  '$100,000 – $140,000/yr','$130,000 – $170,000/yr','$150,000 – $200,000/yr',
  '$180,000 – $240,000/yr','$200,000 – $280,000/yr','$60 – $80/hr','$80 – $120/hr',
  '$120 – $160/hr','$160 – $200/hr','Competitive + Equity','$90,000 – $130,000/yr',
  '$110,000 – $150,000/yr','$70,000 – $100,000/yr',
];

// ── All Countries for applicantLocationRequirements ───────────────────────────
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

// ── Description Templates ─────────────────────────────────────────────────────
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

// ── Deterministic helpers ─────────────────────────────────────────────────────
function pick(arr, seed) { return arr[Math.abs(seed) % arr.length]; }

function getPostedDate(id) {
  // Spread over last 18 months
  const daysAgo = (id % 540);
  const d = new Date('2025-01-01');
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

function getValidThrough(postedDate) {
  const d = new Date(postedDate);
  d.setDate(d.getDate() + 90);
  return d.toISOString().split('T')[0];
}

// ── Main getJobData ───────────────────────────────────────────────────────────
function getJobData(id) {
  const s1 = id * 7 + 13;
  const s2 = id * 11 + 97;
  const s3 = id * 17 + 53;
  const s4 = id * 23 + 31;
  const s5 = id * 29 + 71;
  const s6 = id * 37 + 19;
  const s7 = id * 41 + 83;

  const title    = pick(jobTitles, s1);
  const company  = pick(companies, s2);
  const location = pick(usaStates, s3);
  const industry = pick(industries, s4);
  const jobType  = pick(jobTypes, s5);
  const experience = pick(experienceLevels, s6);
  const salary   = pick(salaryRanges, s7);
  const postedDate = getPostedDate(id);
  const descFn   = pick(descTemplates, id * 3 + 7);
  const description = descFn(title, company, industry);

  return { id, title, company, location, industry, jobType, experience, salary, postedDate, description, isRemote: true };
}

// ── JSON-LD JobPosting Schema with ALL countries ──────────────────────────────
function getJobSchema(job) {
  return {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.postedDate,
    "validThrough": getValidThrough(job.postedDate),
    "employmentType": job.jobType === 'Full-time' ? 'FULL_TIME'
                    : job.jobType === 'Part-time' ? 'PART_TIME'
                    : job.jobType === 'Contract' || job.jobType === 'Full-time Contract' ? 'CONTRACTOR'
                    : 'OTHER',
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      }
    },
    "jobLocationType": "TELECOMMUTE",
    "applicantLocationRequirements": allCountries.map(country => ({
      "@type": "Country",
      "name": country
    })),
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        "unitText": "YEAR"
      }
    },
    "experienceRequirements": job.experience,
    "industry": job.industry,
    "identifier": {
      "@type": "PropertyValue",
      "name": "Job ID",
      "value": `USA-${String(job.id).padStart(7, '0')}`
    }
  };
}

module.exports = { getJobData, getJobSchema, TOTAL_JOBS, jobTitles, companies, usaStates, industries };
