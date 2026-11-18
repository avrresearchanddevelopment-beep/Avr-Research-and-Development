import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------------
// 1. Domains (idempotent — matches seed-domains.mjs, safe to run either/both)
// ---------------------------------------------------------------------------
const domainDefs = [
  { name: "Front-End Web Development", description: "Building everything a user sees, clicks, and interacts with on a website browser. Core tech: HTML, CSS, JavaScript, React." },
  { name: "Back-End Web Development", description: "Managing the server-side logic, databases, security, and APIs that power websites from behind the scenes. Core tech: Python (Django), Node.js, Java, SQL." },
  { name: "Mobile App Development", description: "Creating applications tailor-made for smartphones and tablets. Core tech: Swift (iOS), Kotlin (Android), Flutter (Cross-platform)." },
  { name: "Artificial Intelligence & Machine Learning", description: "Training computer systems and algorithms to learn from data, make predictions, and mimic human intelligence. Core tech: Python, PyTorch, TensorFlow." },
  { name: "Data Science & Data Analytics", description: "Sifting through, cleaning, and visualizing massive blocks of raw data to uncover trends and business insights. Core tech: Python (Pandas), R, Tableau, SQL." },
  { name: "Game Development", description: "Designing and programming interactive 2D and 3D video games for consoles, PCs, or phones. Core tech: C#, C++, Unity, Unreal Engine." },
  { name: "Cybersecurity", description: "Protecting digital systems, servers, confidential networks, and data programs from malicious cyber attacks and hackers. Core tech: Linux, Bash, Python, Wireshark." },
  { name: "DevOps & Cloud Computing", description: "Managing internet-based servers and automating the deployment pipeline so code updates smoothly. Core tech: AWS, Docker, Kubernetes, Jenkins." },
  { name: "Embedded Systems & IoT", description: "Writing micro-software for hardware physical objects, such as smartwatches, medical devices, and robotics. Core tech: C, C++, Assembly, MicroPython." },
  { name: "Blockchain & Web3", description: "Developing decentralized applications and secure, tamper-proof transaction networks. Core tech: Solidity, Rust, Go." },
];

const domains = {};
for (let i = 0; i < domainDefs.length; i++) {
  const { name, description } = domainDefs[i];
  const slug = slugify(name);
  const domain = await prisma.domain.upsert({
    where: { slug },
    update: {},
    create: { name, slug, description, isActive: true, displayOrder: i },
  });
  domains[slug] = domain;
  console.log(`Domain ready: ${name}`);
}

const aiDomain = domains["artificial-intelligence-and-machine-learning"];
const webDomain = domains["front-end-web-development"];
const backendDomain = domains["back-end-web-development"];
const dataDomain = domains["data-science-and-data-analytics"];

// ---------------------------------------------------------------------------
// 2. Domain <-> Module links (so Training/Internships/Workshops/Research
//    admin pages have at least one domain to group items under)
// ---------------------------------------------------------------------------
const modulesToLink = ["PROJECTS", "TRAINING", "INTERNSHIPS", "WORKSHOPS", "RESEARCH"];
for (const domain of [aiDomain, webDomain, backendDomain, dataDomain]) {
  for (let i = 0; i < modulesToLink.length; i++) {
    await prisma.domainModule.upsert({
      where: { domainId_module: { domainId: domain.id, module: modulesToLink[i] } },
      update: {},
      create: { domainId: domain.id, module: modulesToLink[i], isActive: true, displayOrder: i },
    });
  }
  console.log(`Modules linked for: ${domain.name}`);
}

// ---------------------------------------------------------------------------
// 3. Services
// ---------------------------------------------------------------------------
const services = [
  { title: "Custom Web Development", description: "End-to-end design and development of responsive, high-performance websites and web applications tailored to your business needs." },
  { title: "Mobile App Development", description: "Native and cross-platform mobile apps for iOS and Android, from concept through App Store / Play Store launch." },
  { title: "AI & Machine Learning Solutions", description: "Custom ML models, predictive analytics, and AI-powered automation built around your data and business goals." },
  { title: "Corporate Training Programs", description: "Hands-on technical training for teams and colleges, covering the latest tools and frameworks across web, data, and AI." },
  { title: "Internship Programs", description: "Structured internship tracks for students, pairing real project work with mentorship across all our technology domains." },
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
// 4. Products
// ---------------------------------------------------------------------------
const products = [
  { title: "AVR LMS Platform", description: "A ready-to-deploy learning management system for institutes running technical training and certification programs." },
  { title: "Project Portal Toolkit", description: "A white-label student project submission and evaluation portal used by partner colleges." },
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
// 5. Portfolio items
// ---------------------------------------------------------------------------
const portfolioItems = [
  { title: "Smart Attendance System", description: "A facial-recognition based attendance system deployed across 3 partner campuses, cutting manual attendance time by 90%.", imageUrl: "https://picsum.photos/seed/avr-portfolio-1/800/600" },
  { title: "College Placement Dashboard", description: "A real-time analytics dashboard tracking placement statistics, company visits, and student readiness scores.", imageUrl: "https://picsum.photos/seed/avr-portfolio-2/800/600" },
  { title: "IoT-Based Crop Monitoring", description: "A sensor network and mobile dashboard letting farmers monitor soil moisture, temperature, and irrigation remotely.", imageUrl: "https://picsum.photos/seed/avr-portfolio-3/800/600" },
];
for (const item of portfolioItems) {
  const slug = slugify(item.title);
  await prisma.portfolioItem.upsert({
    where: { slug },
    update: {},
    create: { title: item.title, slug, description: item.description, imageUrl: item.imageUrl, isPublished: true },
  });
  console.log(`Portfolio item ready: ${item.title}`);
}

// ---------------------------------------------------------------------------
// 6. Gallery images
// ---------------------------------------------------------------------------
const galleryImages = [
  { title: "Training Session in Progress", altText: "Students in a hands-on training session" },
  { title: "Campus Workshop", altText: "AVR team conducting a workshop at a partner college" },
  { title: "Project Demo Day", altText: "Students presenting final projects to evaluators" },
  { title: "Office Team Photo", altText: "AVR Research & Development team" },
];
for (let i = 0; i < galleryImages.length; i++) {
  const g = galleryImages[i];
  const existing = await prisma.galleryImage.findFirst({ where: { title: g.title } });
  if (!existing) {
    await prisma.galleryImage.create({
      data: {
        title: g.title,
        altText: g.altText,
        imageUrl: `https://picsum.photos/seed/avr-gallery-${i}/800/600`,
      },
    });
    console.log(`Gallery image created: ${g.title}`);
  } else {
    console.log(`Gallery image already exists: ${g.title}`);
  }
}

// ---------------------------------------------------------------------------
// 7. Projects (B.Tech and M.Tech)
// ---------------------------------------------------------------------------
const projects = [
  { domain: aiDomain, title: "AI-Based Resume Screener", description: "A machine learning pipeline that ranks candidate resumes against a job description using NLP techniques.", technologies: ["Python", "spaCy", "scikit-learn"], difficultyLevel: "INTERMEDIATE", level: "BTECH", durationWeeks: 6 },
  { domain: aiDomain, title: "Deep Learning Medical Image Classifier", description: "A CNN-based classifier for detecting anomalies in X-ray images, built for a research-grade M.Tech thesis project.", technologies: ["Python", "PyTorch", "OpenCV"], difficultyLevel: "ADVANCED", level: "MTECH", durationWeeks: 12 },
  { domain: webDomain, title: "E-Commerce Storefront", description: "A full-featured e-commerce site with cart, checkout, and admin inventory management.", technologies: ["React", "Next.js", "Tailwind CSS"], difficultyLevel: "BEGINNER", level: "BTECH", durationWeeks: 4 },
  { domain: backendDomain, title: "Real-Time Chat API", description: "A scalable WebSocket-based chat backend supporting rooms, presence, and message history.", technologies: ["Node.js", "Socket.IO", "PostgreSQL"], difficultyLevel: "INTERMEDIATE", level: "BTECH", durationWeeks: 5 },
  { domain: dataDomain, title: "Sales Forecasting Dashboard", description: "A time-series forecasting model with an interactive dashboard for regional sales prediction, developed as an M.Tech research project.", technologies: ["Python", "Pandas", "Prophet", "Tableau"], difficultyLevel: "ADVANCED", level: "MTECH", durationWeeks: 10 },
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

// ---------------------------------------------------------------------------
// 8. Module items (Training / Internships / Workshops / Research)
// ---------------------------------------------------------------------------
const moduleItems = [
  { module: "TRAINING", domain: webDomain, title: "Full-Stack Web Development Bootcamp", description: "An 8-week intensive covering React, Node.js, and PostgreSQL, ending with a deployed capstone project." },
  { module: "TRAINING", domain: aiDomain, title: "Machine Learning Fundamentals", description: "A hands-on introduction to supervised and unsupervised learning using Python and scikit-learn." },
  { module: "INTERNSHIPS", domain: aiDomain, title: "AI/ML Summer Internship", description: "A 6-week internship where students build and deploy a real ML model under mentor guidance." },
  { module: "INTERNSHIPS", domain: webDomain, title: "Web Development Internship", description: "A project-based internship building production-style web applications with a small team." },
  { module: "WORKSHOPS", domain: backendDomain, title: "API Design Workshop", description: "A one-day workshop on REST API design principles, authentication, and documentation practices." },
  { module: "WORKSHOPS", domain: dataDomain, title: "Data Visualization Workshop", description: "A hands-on session on turning raw datasets into clear, decision-ready dashboards." },
  { module: "RESEARCH", domain: aiDomain, title: "Applied NLP Research Track", description: "A guided research track for students exploring transformer-based NLP applications." },
  { module: "RESEARCH", domain: dataDomain, title: "Predictive Analytics Research Track", description: "A research track focused on forecasting methods applied to real-world business datasets." },
];
for (const m of moduleItems) {
  const slug = slugify(m.title);
  const existing = await prisma.moduleItem.findUnique({
    where: { module_slug: { module: m.module, slug } },
  }).catch(() => null);
  if (!existing) {
    await prisma.moduleItem.create({
      data: {
        module: m.module,
        domainId: m.domain.id,
        title: m.title,
        slug,
        description: m.description,
        isPublished: true,
      },
    });
    console.log(`Module item created: ${m.title} (${m.module})`);
  } else {
    console.log(`Module item already exists: ${m.title} (${m.module})`);
  }
}

console.log("\nSeed complete.");
await prisma.$disconnect();
