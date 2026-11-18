// Run this AFTER seed-content.mjs (needs the domains it creates).
//
// Purpose: seed-content.mjs only creates a handful of rows per table —
// enough to prove the DB wiring works, not enough to see how a real grid
// of 12-15 cards wraps, how long titles/descriptions behave, or how a
// missing image renders. This script tops each table up to a realistic
// count so you can eyeball the actual UI at scale.
//
// Safe to re-run: everything is upserted on slug (or matched by title for
// GalleryImage, which has no unique slug), so running it twice won't
// create true duplicates.
//
//   node seed-bulk-preview.mjs
//
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const domainSlugs = [
  "front-end-web-development",
  "back-end-web-development",
  "mobile-app-development",
  "artificial-intelligence-and-machine-learning",
  "data-science-and-data-analytics",
  "game-development",
  "cybersecurity",
  "devops-and-cloud-computing",
  "embedded-systems-and-iot",
  "blockchain-and-web3",
];

const domains = {};
for (const slug of domainSlugs) {
  const domain = await prisma.domain.findUnique({ where: { slug } });
  if (domain) domains[slug] = domain;
}
if (Object.keys(domains).length === 0) {
  console.error(
    "No domains found. Run `node seed-content.mjs` (or seed-domains.mjs) first.",
  );
  await prisma.$disconnect();
  process.exit(1);
}
const domainList = Object.values(domains);

// ---------------------------------------------------------------------------
// Services — bulk up to ~14
// ---------------------------------------------------------------------------
const services = [
  { title: "UI/UX Design & Prototyping", description: "Wireframes, clickable prototypes, and full visual design systems for web and mobile products before a single line of production code is written." },
  { title: "Cloud Migration & DevOps", description: "Moving legacy infrastructure to AWS/Azure/GCP with CI/CD pipelines, containerization, and monitoring built in from day one." },
  { title: "Cybersecurity Audits", description: "Vulnerability assessments, penetration testing, and remediation plans for web applications and internal networks." },
  { title: "Data Engineering & Warehousing", description: "ETL pipelines, data lakes, and warehouse design so your analytics team is working with clean, reliable data." },
  { title: "Blockchain & Smart Contract Development", description: "Solidity smart contracts, token design, and audits for teams building on Ethereum-compatible chains." },
  { title: "QA & Automated Testing", description: "Test strategy, automated regression suites, and manual QA cycles to catch issues before your users do." },
  { title: "Technical SEO & Performance Audits", description: "Core Web Vitals, crawlability, and structured data fixes that improve both search ranking and real user experience." },
  { title: "College Curriculum Design", description: "Custom project-based curriculum design for partner institutions, aligned with current industry tooling." },
  { title: "Chatbot & Conversational AI", description: "Domain-specific chatbots built on top of LLMs, wired into your existing support or admissions workflows." },
];
for (const s of services) {
  const slug = slugify(s.title);
  await prisma.service.upsert({
    where: { slug },
    update: {},
    create: { title: s.title, slug, description: s.description, isPublished: true },
  });
  console.log(`Service ready: ${s.title}`);
}

// ---------------------------------------------------------------------------
// Products — bulk up to ~8
// ---------------------------------------------------------------------------
const products = [
  { title: "Attendance & Biometric Suite", description: "A hardware-integrated attendance system with biometric check-in, live dashboards, and parent/guardian notifications." },
  { title: "Placement Tracker Pro", description: "End-to-end placement cell software: company pipelines, student readiness scoring, and offer-letter tracking." },
  { title: "Exam Proctoring Toolkit", description: "Browser-lockdown and webcam-based remote proctoring for online assessments, with a review dashboard for faculty." },
  { title: "Alumni Network Platform", description: "A searchable alumni directory with mentorship matching, event listings, and donation tracking for institutions." },
  { title: "Campus Helpdesk Bot", description: "A ready-to-deploy support chatbot pre-trained on common student and staff queries, with human handoff." },
  { title: "Digital Library Manager", description: "Cataloguing, checkout tracking, and e-book distribution for institutional libraries, with a student self-service portal." },
];
for (const p of products) {
  const slug = slugify(p.title);
  await prisma.product.upsert({
    where: { slug },
    update: {},
    create: { title: p.title, slug, description: p.description, isPublished: true },
  });
  console.log(`Product ready: ${p.title}`);
}

// ---------------------------------------------------------------------------
// Portfolio items — bulk up to ~9, deliberately mixing in one WITHOUT an
// image so you can see how the card renders when imageUrl is null.
// ---------------------------------------------------------------------------
const portfolioItems = [
  { title: "Hospital Bed Management System", description: "A real-time bed and ward availability dashboard deployed across a 4-hospital network, cutting patient routing time significantly.", imageUrl: "https://picsum.photos/seed/avr-portfolio-4/800/600" },
  { title: "Warehouse Inventory Automation", description: "A barcode + RFID inventory system integrated with an existing ERP, reducing stock discrepancies to under 1%.", imageUrl: "https://picsum.photos/seed/avr-portfolio-5/800/600" },
  { title: "Ride-Sharing Driver App (Case Study)", description: "A driver-side companion app with live trip routing, earnings breakdown, and offline-first data sync — currently in closed pilot, so no public screenshots yet.", imageUrl: null },
  { title: "Municipal Waste Collection Tracker", description: "A GPS-based fleet tracking system for a city's waste collection trucks, with a public-facing complaint and status portal.", imageUrl: "https://picsum.photos/seed/avr-portfolio-6/800/600" },
  { title: "Online Exam Proctoring Rollout", description: "Deployment and support for remote proctoring across 15,000+ concurrent exam takers during a university's board exams.", imageUrl: "https://picsum.photos/seed/avr-portfolio-7/800/600" },
  { title: "Retail Demand Forecasting Engine", description: "A forecasting model layered on top of a retail chain's POS data, reducing overstock by double digits within one quarter.", imageUrl: "https://picsum.photos/seed/avr-portfolio-8/800/600" },
];
for (const item of portfolioItems) {
  const slug = slugify(item.title);
  await prisma.portfolioItem.upsert({
    where: { slug },
    update: {},
    create: {
      title: item.title,
      slug,
      description: item.description,
      imageUrl: item.imageUrl,
      isPublished: true,
    },
  });
  console.log(`Portfolio item ready: ${item.title}`);
}

// ---------------------------------------------------------------------------
// Gallery images — bulk up to ~12 (no unique slug on this model, so we
// match on title like seed-content.mjs already does).
// ---------------------------------------------------------------------------
const galleryImages = [
  { title: "Hackathon Weekend", altText: "Students collaborating during an overnight hackathon" },
  { title: "Guest Lecture: Industry Expert", altText: "A visiting engineer giving a talk to a packed room" },
  { title: "Internship Onboarding Day", altText: "New interns being walked through their first week" },
  { title: "Ribbon-Cutting: New Lab", altText: "Opening ceremony for a new hardware lab" },
  { title: "Student Project Expo", altText: "Rows of student project booths at the annual expo" },
  { title: "Faculty Training Workshop", altText: "College faculty attending an AVR-run technical workshop" },
  { title: "Certificate Distribution", altText: "Students receiving completion certificates on stage" },
  { title: "Team Off-Site", altText: "The AVR team at an outdoor off-site event" },
];
const existingTitles = new Set(
  (await prisma.galleryImage.findMany({ select: { title: true } })).map(
    (g) => g.title,
  ),
);
let galleryIndex = 100; // offset so seed URLs never collide with seed-content.mjs's 0-3
for (const g of galleryImages) {
  if (existingTitles.has(g.title)) {
    console.log(`Gallery image already exists: ${g.title}`);
    continue;
  }
  await prisma.galleryImage.create({
    data: {
      title: g.title,
      altText: g.altText,
      imageUrl: `https://picsum.photos/seed/avr-gallery-${galleryIndex}/800/600`,
    },
  });
  console.log(`Gallery image created: ${g.title}`);
  galleryIndex++;
}

// ---------------------------------------------------------------------------
// Projects — a few more per domain, including a deliberately long title
// and a project with NO technologies listed, to check chip-wrapping and
// the empty-technologies case.
// ---------------------------------------------------------------------------
function pick(slug) {
  return domains[slug] ?? domainList[0];
}

const projects = [
  { domain: pick("mobile-app-development"), title: "Cross-Platform Fitness Tracking App with Social Challenges", description: "A Flutter app tracking workouts, syncing with wearables, and letting friend groups run week-long fitness challenges.", technologies: ["Flutter", "Dart", "Firebase", "HealthKit", "Google Fit"], difficultyLevel: "INTERMEDIATE", level: "BTECH", durationWeeks: 8 },
  { domain: pick("cybersecurity"), title: "Network Intrusion Detection System", description: "A signature and anomaly-based IDS built for a campus network, with a live alert dashboard for the security team.", technologies: ["Python", "Scapy", "Snort"], difficultyLevel: "ADVANCED", level: "MTECH", durationWeeks: 12 },
  { domain: pick("devops-and-cloud-computing"), title: "One-Click Kubernetes Deployment Pipeline", description: "A GitOps-based CI/CD pipeline that takes a repo from push to a running Kubernetes cluster with zero manual steps.", technologies: [], difficultyLevel: "ADVANCED", level: "MTECH", durationWeeks: 9 },
  { domain: pick("game-development"), title: "2D Platformer with Procedural Level Generation", description: "A Unity-based platformer where each playthrough generates a new layout using a constraint-based level generator.", technologies: ["Unity", "C#"], difficultyLevel: "BEGINNER", level: "BTECH", durationWeeks: 5 },
  { domain: pick("embedded-systems-and-iot"), title: "Smart Irrigation Controller", description: "An ESP32-based irrigation controller that reads soil moisture and weather forecast data to schedule watering automatically.", technologies: ["C++", "ESP32", "MQTT"], difficultyLevel: "INTERMEDIATE", level: "BTECH", durationWeeks: 6 },
  { domain: pick("blockchain-and-web3"), title: "Decentralized Voting Platform", description: "A tamper-evident voting dApp using Solidity smart contracts and a React front end, built as an M.Tech research project.", technologies: ["Solidity", "Hardhat", "React", "Ethers.js"], difficultyLevel: "ADVANCED", level: "MTECH", durationWeeks: 11 },
];
for (const p of projects) {
  const slug = slugify(p.title);
  await prisma.project.upsert({
    where: { slug },
    update: {},
    create: {
      domainId: p.domain.id,
      title: p.title,
      slug,
      description: p.description,
      technologies: p.technologies,
      difficultyLevel: p.difficultyLevel,
      level: p.level,
      durationWeeks: p.durationWeeks,
      status: "PUBLISHED",
    },
  });
  console.log(`Project ready: ${p.title} (${p.level})`);
}

console.log("\nBulk preview seed complete.");
await prisma.$disconnect();
