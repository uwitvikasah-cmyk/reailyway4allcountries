'use strict';
const express = require('express');
const compression = require('compression');
const { getJobData, getJobSchema, TOTAL_JOBS } = require('./jobData');

const app = express();
const PORT = process.env.PORT || 3000;

// ── SITE URL — set SITE_URL env variable on Railway when domain changes ───────
const SITE_URL = (process.env.SITE_URL || 'nexttonextjobs-production.up.railway.app').replace(/\/$/, '');

app.use(compression());
app.use(express.static('public'));

const JOBS_PER_PAGE = 20;
const TOTAL_SITEMAPS = 200; // 2M jobs / 10000 per sitemap = 200 files

// ── HTML RENDERER ─────────────────────────────────────────────────────────────
function renderHTML({ title, meta, bodyContent, schema, canonical }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta name="google-site-verification" content="wSin18Y1jaEyj1vhiTPr159TKThSrMp6vyaA9K-ojOU" />
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${title}</title>
<meta name="description" content="${meta}"/>
${canonical ? `<link rel="canonical" href="${SITE_URL}${canonical}"/>` : ''}
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${meta}"/>
<meta property="og:type" content="website"/>
<meta name="robots" content="index, follow"/>
${schema ? `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>` : ''}
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f4f6fb;color:#1a1a2e;line-height:1.6}
a{color:inherit;text-decoration:none}
/* NAV */
nav{background:#0a2540;color:#fff;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:62px;position:sticky;top:0;z-index:100;box-shadow:0 2px 12px rgba(0,0,0,.2)}
.brand{font-size:1.2rem;font-weight:800;letter-spacing:-.5px}
.brand .accent{color:#00d4aa}
.nav-links{display:flex;gap:1.5rem;font-size:.85rem}
.nav-links a{color:rgba(255,255,255,.8);transition:color .2s}
.nav-links a:hover{color:#00d4aa}
/* HERO */
.hero{background:linear-gradient(135deg,#0a2540 0%,#1a3a5c 50%,#0d4f6b 100%);color:#fff;padding:3.5rem 1.5rem;text-align:center}
.hero h1{font-size:clamp(1.8rem,4.5vw,3rem);font-weight:900;margin-bottom:.75rem;letter-spacing:-.5px}
.hero h1 .accent{color:#00d4aa}
.hero p{font-size:1.05rem;opacity:.85;max-width:620px;margin:0 auto 1.75rem}
.hero-form{display:flex;gap:.75rem;max-width:620px;margin:0 auto;flex-wrap:wrap}
.hero-form input,.hero-form select{flex:1;min-width:170px;padding:.75rem 1rem;border-radius:10px;border:none;font-size:.9rem;outline:none}
.hero-form button{padding:.75rem 1.75rem;background:#00d4aa;color:#0a2540;border:none;border-radius:10px;font-weight:800;font-size:.9rem;cursor:pointer;white-space:nowrap}
.hero-form button:hover{background:#00b899}
.stat-bar{display:flex;justify-content:center;gap:2.5rem;flex-wrap:wrap;margin-top:2rem}
.stat strong{display:block;font-size:1.6rem;color:#00d4aa;font-weight:900}
.stat span{font-size:.78rem;opacity:.75}
/* FILTERS */
.filter-row{background:#fff;border-bottom:1px solid #e8ecf0;padding:.65rem 1.5rem;display:flex;gap:.5rem;flex-wrap:wrap;align-items:center}
.filter-wrap{max-width:960px;margin:0 auto;display:flex;gap:.5rem;flex-wrap:wrap;width:100%}
.chip{padding:.35rem .9rem;border:1.5px solid #d0d8e4;border-radius:20px;font-size:.78rem;cursor:pointer;background:#fff;transition:all .2s;white-space:nowrap;font-weight:500}
.chip.active,.chip:hover{background:#0a2540;color:#fff;border-color:#0a2540}
/* LAYOUT */
.container{max-width:960px;margin:0 auto;padding:1.5rem}
.page-grid{display:grid;gap:1rem}
/* JOB CARD */
.job-card{background:#fff;border-radius:14px;padding:1.4rem 1.6rem;border:1.5px solid #e8ecf0;transition:border-color .2s,box-shadow .2s;display:flex;flex-direction:column;gap:.8rem}
.job-card:hover{border-color:#00d4aa;box-shadow:0 4px 20px rgba(0,212,170,.1)}
.card-top{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap}
.card-title{font-size:1.05rem;font-weight:700;color:#0a2540;margin-bottom:.2rem}
.card-co{font-size:.88rem;color:#556}
.badges{display:flex;gap:.4rem;flex-wrap:wrap}
.badge{padding:.25rem .7rem;border-radius:20px;font-size:.72rem;font-weight:600;white-space:nowrap}
.b-remote{background:#e0faf4;color:#006b55}
.b-type{background:#ede9fe;color:#5b21b6}
.b-exp{background:#fef3c7;color:#92400e}
.card-meta{display:flex;gap:1rem;flex-wrap:wrap;font-size:.82rem;color:#667}
.card-desc{font-size:.84rem;color:#556;line-height:1.65;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card-foot{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem}
.salary{font-weight:700;color:#0a2540;font-size:.9rem}
.btn-apply{padding:.5rem 1.25rem;background:#0a2540;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:.83rem;cursor:pointer;transition:background .2s}
.btn-apply:hover{background:#00d4aa;color:#0a2540}
/* JOB DETAIL */
.job-detail{background:#fff;border-radius:14px;padding:2rem;border:1.5px solid #e8ecf0}
.job-detail h1{font-size:1.65rem;font-weight:800;color:#0a2540;margin-bottom:.4rem}
.detail-meta{display:flex;gap:.75rem;flex-wrap:wrap;margin:1rem 0;padding:1rem 0;border-top:1px solid #f0f3f8;border-bottom:1px solid #f0f3f8}
.d-chip{padding:.38rem 1rem;border-radius:8px;font-size:.82rem;font-weight:600;background:#f4f6fb;color:#334}
.d-chip.hi{background:#e0faf4;color:#006b55}
.detail-body{font-size:.9rem;color:#445;line-height:1.85;white-space:pre-line;margin:1.5rem 0}
.apply-box{background:#f4f6fb;border-radius:12px;padding:1.5rem;text-align:center;border:2px dashed #d0d8e4}
.apply-box h3{color:#0a2540;margin-bottom:.4rem}
.apply-box p{font-size:.85rem;color:#667;margin-bottom:1rem}
.btn-big{padding:.85rem 2.5rem;background:#00d4aa;color:#0a2540;border:none;border-radius:10px;font-weight:800;font-size:1rem;cursor:pointer}
.btn-big:hover{background:#00b899}
/* PAGINATION */
.pagination{display:flex;justify-content:center;gap:.4rem;margin:2rem 0;flex-wrap:wrap}
.pagination a,.pagination span{padding:.5rem .9rem;border-radius:8px;border:1.5px solid #e0e6ee;font-size:.85rem;background:#fff}
.pagination a:hover{border-color:#00d4aa;color:#006b55}
.pagination .cur{background:#0a2540;color:#fff;border-color:#0a2540}
/* BREADCRUMB */
.bc{font-size:.82rem;color:#889;margin-bottom:1rem}
.bc a{color:#00a080}
/* INFO BOX */
.info-box{background:#fff;border-radius:12px;padding:1.2rem 1.5rem;border-left:4px solid #00d4aa;margin-bottom:1rem;font-size:.88rem}
/* FOOTER */
footer{background:#0a2540;color:rgba(255,255,255,.65);text-align:center;padding:1.5rem;font-size:.82rem;margin-top:3rem}
footer a{color:#00d4aa}
/* REMOTE BADGE BANNER */
.remote-banner{background:#e0faf4;border:1.5px solid #00d4aa;border-radius:10px;padding:.6rem 1rem;display:inline-flex;align-items:center;gap:.5rem;font-size:.82rem;font-weight:600;color:#006b55;margin-bottom:1rem}
@media(max-width:600px){.hero-form{flex-direction:column}.stat-bar{gap:1.25rem}.card-top{flex-direction:column}}
</style>
</head>
<body>
<nav>
  <a class="brand" href="/"><span class="accent">USA</span>RemoteJobs.io</a>
  <div class="nav-links">
    <a href="/">Home</a>
    <a href="/jobs">Browse Jobs</a>
    <a href="/jobs?type=fulltime">Full-time</a>
    <a href="/jobs?type=contract">Contract</a>
    <a href="/sitemap">Sitemap</a>
  </div>
</nav>
${bodyContent}
<footer>
  &copy; 2025 USARemoteJobs.io — <strong>2,000,000 Remote Jobs</strong> — Open to Applicants Worldwide |
  <a href="/jobs">Browse All</a> · <a href="/jobs?type=fulltime">Full-time</a> · <a href="/jobs?type=contract">Contract</a> · <a href="/sitemap">Sitemap</a>
</footer>
<script>
function openApply(title){
  window.open('https://remotejob09.job4intern.com/pages/job-application','_blank','noopener,noreferrer');
}
</script>
</body>
</html>`;
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  const featuredIds = [1,100,500,1000,5000,10000,50000,100000];
  const featuredJobs = featuredIds.map(id => getJobData(id));

  const cards = featuredJobs.map(job => `
<a href="/jobs/${job.id}" style="display:block">
<div class="job-card">
  <div class="card-top">
    <div><div class="card-title">${job.title}</div><div class="card-co">${job.company}</div></div>
    <div class="badges">
      <span class="badge b-remote">🌐 Remote</span>
      <span class="badge b-type">${job.jobType}</span>
    </div>
  </div>
  <div class="card-meta">
    <span>📍 ${job.location}</span>
    <span>🏭 ${job.industry}</span>
    <span>📅 ${job.postedDate}</span>
  </div>
  <div class="card-desc">${job.description.substring(0,180)}...</div>
  <div class="card-foot">
    <span class="salary">${job.salary}</span>
    <button class="btn-apply" onclick="event.preventDefault();openApply('${job.title.replace(/'/g,"\\'")}')">Apply Now</button>
  </div>
</div>
</a>`).join('');

  const schema = {
    "@context":"https://schema.org",
    "@type":"WebSite",
    "name":"USARemoteJobs.io",
    "url": SITE_URL,
    "description":"2,000,000 remote job listings — USA-based companies, open to applicants worldwide",
    "potentialAction":{"@type":"SearchAction","target":`${SITE_URL}/jobs?q={search_term_string}`,"query-input":"required name=search_term_string"}
  };

  const body = `
<div class="hero">
  <h1>2 Million <span class="accent">Remote Jobs</span> — USA Companies</h1>
  <p>Work from anywhere in the world. All jobs are 100% remote, posted by top US companies, open to global applicants.</p>
  <form action="/jobs" method="get" class="hero-form">
    <input name="q" type="text" placeholder="Job title, skill, or company..."/>
    <select name="type">
      <option value="">All Types</option>
      <option value="fulltime">Full-time</option>
      <option value="contract">Contract</option>
      <option value="parttime">Part-time</option>
    </select>
    <button type="submit">Search Jobs →</button>
  </form>
  <div class="stat-bar">
    <div class="stat"><strong>2,000,000</strong><span>Remote Jobs</span></div>
    <div class="stat"><strong>150+</strong><span>Top US Companies</span></div>
    <div class="stat"><strong>100+</strong><span>Countries Welcome</span></div>
    <div class="stat"><strong>200+</strong><span>Job Categories</span></div>
    <div class="stat"><strong>$45K–$280K</strong><span>Salary Range</span></div>
  </div>
</div>
<div class="container">
  <div class="info-box">🌍 All jobs are <strong>100% remote</strong> — open to applicants from <strong>100+ countries</strong>. No visa sponsorship required for most roles.</div>
  <h2 style="margin-bottom:1rem;font-size:1.2rem">Featured Remote Jobs</h2>
  <div class="page-grid">${cards}</div>
  <div style="text-align:center;margin-top:2rem">
    <a href="/jobs" style="display:inline-block;padding:.9rem 2.5rem;background:#0a2540;color:#fff;border-radius:10px;font-weight:800">Browse All 2,000,000 Remote Jobs →</a>
  </div>
</div>`;

  res.send(renderHTML({ title:'USARemoteJobs.io — 2,000,000 Remote Jobs | Work From Anywhere', meta:'Browse 2 million remote jobs at top US companies. Open to applicants worldwide — work from any country.', bodyContent:body, schema, canonical:'/' }));
});

// ── JOB LISTING PAGE ──────────────────────────────────────────────────────────
app.get('/jobs', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const typeFilter = req.query.type || 'all';
  const q = req.query.q || '';

  const start = (page - 1) * JOBS_PER_PAGE + 1;
  const jobIds = [];
  for (let i = start; i < start + JOBS_PER_PAGE && i <= TOTAL_JOBS; i++) jobIds.push(i);
  const jobs = jobIds.map(id => getJobData(id));
  const totalPages = Math.ceil(TOTAL_JOBS / JOBS_PER_PAGE);

  const cards = jobs.map(job => `
<a href="/jobs/${job.id}" style="display:block">
<div class="job-card">
  <div class="card-top">
    <div><div class="card-title">${job.title}</div><div class="card-co">${job.company}</div></div>
    <div class="badges">
      <span class="badge b-remote">🌐 Remote</span>
      <span class="badge b-type">${job.jobType}</span>
      <span class="badge b-exp">${job.experience}</span>
    </div>
  </div>
  <div class="card-meta">
    <span>📍 ${job.location}</span>
    <span>🏭 ${job.industry}</span>
    <span>📅 ${job.postedDate}</span>
  </div>
  <div class="card-desc">${job.description.substring(0,200)}...</div>
  <div class="card-foot">
    <span class="salary">${job.salary}</span>
    <button class="btn-apply" onclick="event.preventDefault();openApply('${job.title.replace(/'/g,"\\'")}')">Apply Now</button>
  </div>
</div>
</a>`).join('');

  // Pagination
  const pages = [];
  if (page > 1) pages.push(`<a href="/jobs?page=${page-1}&type=${typeFilter}">← Prev</a>`);
  const ps = Math.max(1, page-2), pe = Math.min(totalPages, page+2);
  if (ps > 1) pages.push(`<a href="/jobs?page=1&type=${typeFilter}">1</a><span>…</span>`);
  for (let p = ps; p <= pe; p++) pages.push(p===page?`<span class="cur">${p.toLocaleString()}</span>`:`<a href="/jobs?page=${p}&type=${typeFilter}">${p.toLocaleString()}</a>`);
  if (pe < totalPages) pages.push(`<span>…</span><a href="/jobs?page=${totalPages}&type=${typeFilter}">${totalPages.toLocaleString()}</a>`);
  if (page < totalPages) pages.push(`<a href="/jobs?page=${page+1}&type=${typeFilter}">Next →</a>`);

  const body = `
<div class="hero" style="padding:1.75rem 1.5rem">
  <h1 style="font-size:1.9rem">Browse <span class="accent">2,000,000 Remote Jobs</span></h1>
  <p>Page ${page.toLocaleString()} of ${totalPages.toLocaleString()} — All USA companies, open worldwide</p>
</div>
<div class="filter-row">
  <div class="filter-wrap">
    <a href="/jobs"><span class="chip ${typeFilter==='all'?'active':''}">All Jobs (2M)</span></a>
    <a href="/jobs?type=fulltime"><span class="chip ${typeFilter==='fulltime'?'active':''}">💼 Full-time</span></a>
    <a href="/jobs?type=contract"><span class="chip ${typeFilter==='contract'?'active':''}">📋 Contract</span></a>
    <a href="/jobs?type=parttime"><span class="chip ${typeFilter==='parttime'?'active':''}">⏰ Part-time</span></a>
  </div>
</div>
<div class="container">
  <div class="page-grid">${cards}</div>
  <div class="pagination">${pages.join('')}</div>
</div>`;

  res.send(renderHTML({ title:`Remote Jobs USA — Page ${page.toLocaleString()} | USARemoteJobs.io`, meta:`Browse 2,000,000 remote jobs at US companies. Page ${page}. Open to applicants from all countries.`, bodyContent:body, schema:null, canonical:`/jobs?page=${page}` }));
});

// ── INDIVIDUAL JOB PAGE ───────────────────────────────────────────────────────
app.get('/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id || id < 1 || id > TOTAL_JOBS) {
    return res.status(404).send(renderHTML({ title:'Job Not Found | USARemoteJobs.io', meta:'Job not found.', bodyContent:`<div class="container" style="text-align:center;padding:4rem 1.5rem"><h1>404 — Job Not Found</h1><p style="margin:1rem 0 2rem;color:#667">This job may have been filled.</p><a href="/jobs" style="color:#00a080;font-weight:600">← Browse All Jobs</a></div>`, schema:null }));
  }

  const job = getJobData(id);
  const schema = getJobSchema(job);

  const relatedIds = [Math.max(1,id-2),Math.max(1,id-1),Math.min(TOTAL_JOBS,id+1),Math.min(TOTAL_JOBS,id+2)].filter(r=>r!==id).slice(0,3);
  const relCards = relatedIds.map(rid => {
    const rj = getJobData(rid);
    return `<a href="/jobs/${rj.id}" style="display:block"><div class="job-card" style="padding:1rem"><div class="card-title" style="font-size:.93rem">${rj.title}</div><div class="card-co">${rj.company}</div><div style="margin-top:.5rem;display:flex;gap:.4rem;flex-wrap:wrap"><span class="badge b-remote" style="font-size:.7rem">🌐 Remote</span><span class="badge b-type" style="font-size:.7rem">${rj.jobType}</span></div></div></a>`;
  }).join('');

  const body = `
<div class="container">
  <div class="bc"><a href="/">Home</a> › <a href="/jobs">Remote Jobs</a> › ${job.title}</div>
  <div class="remote-banner">🌍 100% Remote — Open to Applicants Worldwide</div>
  <div class="job-detail">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem">
      <div>
        <h1>${job.title}</h1>
        <p style="font-size:1rem;color:#556;margin-top:.35rem">${job.company} · ${job.industry}</p>
      </div>
      <div style="text-align:right">
        <span class="badge b-remote" style="font-size:.85rem;padding:.4rem 1rem">🌐 Remote Worldwide</span>
        <div style="font-size:.78rem;color:#889;margin-top:.4rem">Job ID: USA-${String(job.id).padStart(7,'0')}</div>
      </div>
    </div>
    <div class="detail-meta">
      <span class="d-chip hi">💰 ${job.salary}</span>
      <span class="d-chip">📍 ${job.location}</span>
      <span class="d-chip">💼 ${job.jobType}</span>
      <span class="d-chip">📊 ${job.experience}</span>
      <span class="d-chip">🏭 ${job.industry}</span>
      <span class="d-chip">📅 ${job.postedDate}</span>
    </div>
    <div class="detail-body">${job.description}</div>
    <div class="apply-box">
      <h3>Apply for this Remote Position</h3>
      <p>Submit your application for <strong>${job.title}</strong> at <strong>${job.company}</strong> — takes less than 2 minutes. Open to applicants from 100+ countries.</p>
      <button class="btn-big" onclick="openApply('${job.title.replace(/'/g,"\\'")}')">Apply Now →</button>
    </div>
  </div>
  <div style="margin-top:2rem">
    <h2 style="font-size:1.1rem;margin-bottom:1rem">Similar Remote Jobs</h2>
    <div class="page-grid">${relCards}</div>
  </div>
  <div style="text-align:center;margin-top:1.5rem">
    <a href="/jobs" style="color:#00a080;font-weight:600">← Browse All 2,000,000 Remote Jobs</a>
  </div>
</div>`;

  res.send(renderHTML({ title:`${job.title} at ${job.company} — Remote Worldwide | USARemoteJobs.io`, meta:`${job.title} remote job at ${job.company}. ${job.salary}. Open to applicants worldwide. Apply now.`, bodyContent:body, schema, canonical:`/jobs/${id}` }));
});

// ── SITEMAP INDEX ─────────────────────────────────────────────────────────────
app.get('/sitemap.xml', (req, res) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  // Static pages sitemap
  xml += `\n<sitemap><loc>${SITE_URL}/sitemap-static.xml</loc></sitemap>`;
  // Job sitemaps
  for (let i = 1; i <= TOTAL_SITEMAPS; i++) {
    xml += `\n<sitemap><loc>${SITE_URL}/sitemap-${i}.xml</loc></sitemap>`;
  }
  xml += `\n</sitemapindex>`;
  res.type('application/xml').send(xml);
});

// Static pages sitemap
app.get('/sitemap-static.xml', (req, res) => {
  const pages = ['/', '/jobs', '/jobs?type=fulltime', '/jobs?type=contract', '/jobs?type=parttime', '/sitemap'];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  pages.forEach(p => {
    xml += `\n<url><loc>${SITE_URL}${p}</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`;
  });
  xml += `\n</urlset>`;
  res.type('application/xml').send(xml);
});

// Job sitemaps (10,000 jobs each)
app.get('/sitemap-:num.xml', (req, res) => {
  const num = parseInt(req.params.num);
  if (!num || num < 1 || num > TOTAL_SITEMAPS) return res.status(404).send('Not found');
  const start = (num - 1) * 10000 + 1;
  const end = Math.min(num * 10000, TOTAL_JOBS);
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  for (let i = start; i <= end; i++) {
    xml += `\n<url><loc>${SITE_URL}/jobs/${i}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
  }
  xml += `\n</urlset>`;
  res.type('application/xml').send(xml);
});

// ── SITEMAP HTML PAGE ─────────────────────────────────────────────────────────
app.get('/sitemap', (req, res) => {
  const body = `
<div class="container">
  <h1 style="margin-bottom:1rem">Sitemap — USARemoteJobs.io</h1>
  <div class="info-box">📌 2,000,000 remote job pages + ${TOTAL_SITEMAPS.toLocaleString()} XML sitemap files for search engines</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-top:1rem">
    <div class="job-card">
      <div class="card-title">Main Pages</div>
      <div style="display:flex;flex-direction:column;gap:.5rem;margin-top:.75rem;font-size:.88rem">
        <a href="/" style="color:#00a080">🏠 Home</a>
        <a href="/jobs" style="color:#00a080">📋 All Remote Jobs (2,000,000)</a>
        <a href="/jobs?type=fulltime" style="color:#00a080">💼 Full-time Remote</a>
        <a href="/jobs?type=contract" style="color:#00a080">📋 Contract Remote</a>
        <a href="/jobs?type=parttime" style="color:#00a080">⏰ Part-time Remote</a>
      </div>
    </div>
    <div class="job-card">
      <div class="card-title">XML Sitemaps</div>
      <div style="display:flex;flex-direction:column;gap:.5rem;margin-top:.75rem;font-size:.88rem">
        <a href="/sitemap.xml" style="color:#00a080">📄 Sitemap Index</a>
        <a href="/sitemap-static.xml" style="color:#00a080">📄 Static Pages</a>
        <a href="/sitemap-1.xml" style="color:#00a080">📄 Jobs 1–10,000</a>
        <a href="/sitemap-2.xml" style="color:#00a080">📄 Jobs 10,001–20,000</a>
        <span style="color:#889">… ${TOTAL_SITEMAPS.toLocaleString()} sitemap files total</span>
      </div>
    </div>
    <div class="job-card">
      <div class="card-title">Job Range</div>
      <div style="display:flex;flex-direction:column;gap:.5rem;margin-top:.75rem;font-size:.88rem">
        <a href="/jobs/1" style="color:#00a080">Job #1</a>
        <a href="/jobs/500000" style="color:#00a080">Job #500,000</a>
        <a href="/jobs/1000000" style="color:#00a080">Job #1,000,000</a>
        <a href="/jobs/2000000" style="color:#00a080">Job #2,000,000 (Last)</a>
      </div>
    </div>
  </div>
</div>`;

  res.send(renderHTML({ title:'Sitemap | USARemoteJobs.io', meta:'Sitemap for USARemoteJobs.io with 2 million remote job listings.', bodyContent:body, schema:null }));
});

// ── ROBOTS.TXT ────────────────────────────────────────────────────────────────
app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\nDisallow: /api/`);
});

// ── API ───────────────────────────────────────────────────────────────────────
app.get('/api/jobs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id || id < 1 || id > TOTAL_JOBS) return res.status(404).json({ error:'Job not found' });
  res.json({ job: getJobData(id), schema: getJobSchema(id) });
});

app.get('/api/jobs', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 20);
  const start = (page - 1) * limit + 1;
  const jobs = [];
  for (let i = start; i < start + limit && i <= TOTAL_JOBS; i++) jobs.push(getJobData(i));
  res.json({ page, limit, total: TOTAL_JOBS, jobs });
});

// ── START ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🇺🇸 USARemoteJobs.io running on port ${PORT}`);
  console.log(`🌐 Site URL: ${SITE_URL}`);
  console.log(`📋 ${TOTAL_JOBS.toLocaleString()} remote job pages ready`);
  console.log(`🗺  ${TOTAL_SITEMAPS.toLocaleString()} sitemap files`);
});
