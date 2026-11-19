import fs from "fs";
import path from "path";

fs.mkdirSync("public/data", { recursive: true });
fs.mkdirSync("components/public", { recursive: true });

const projects = [
  {
    id: "proj-01",
    slug: "tri-modal-interview-automation-agent",
    title: "Tri-Modal Interview Automation Agent",
    domainSlug: "artificial-intelligence-and-machine-learning",
    domainLabel: "AI & Machine Learning",
    status: "Active R&D",
    summary:
      "Automated candidate screening and structured response evaluation pipeline combining NLP skill extraction, rubric scoring, and analytics.",
    stack: ["Python", "PyTorch", "NLP", "FastAPI", "Next.js"],
    metrics: "Structured rubric scoring + automated skill matching",
  },
  {
    id: "proj-02",
    slug: "intelligent-document-understanding-rag",
    title: "Intelligent Document Understanding & RAG Pipeline",
    domainSlug: "artificial-intelligence-and-machine-learning",
    domainLabel: "AI & Machine Learning",
    status: "Production Pilot",
    summary:
      "Retrieval-augmented document intelligence system for parsing dense technical reports, academic records, and compliance documents.",
    stack: ["LLM", "RAG", "Embeddings", "Vector Search", "TypeScript"],
    metrics: "Context-grounded citation & entity extraction",
  },
  {
    id: "proj-03",
    slug: "hybrid-blockchain-academic-credentials",
    title: "Hybrid Blockchain Academic & EHR Security Framework",
    domainSlug: "back-end-web-development",
    domainLabel: "Back-End & Security",
    status: "Research Prototype",
    summary:
      "Dual-layer verification architecture pairing off-chain storage with verifiable on-chain proofs and role-aware access policies.",
    stack: ["Web3", "Smart Contracts", "IPFS", "Access Control"],
    metrics: "Tamper-evident credential & audit verification",
  },
  {
    id: "proj-04",
    slug: "enterprise-web-rbac-platform",
    title: "Modular R&D Portal & Static Catalog Architecture",
    domainSlug: "front-end-web-development",
    domainLabel: "Front-End Engineering",
    status: "Deployed",
    summary:
      "High-speed static-exportable Next.js and Tailwind web platform designed for R&D showcases, programs, and custom domain hosting.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    metrics: "18 static routes prerendered with zero server runtime",
  },
  {
    id: "proj-05",
    slug: "predictive-analytics-telemetry-suite",
    title: "Predictive Analytics & Operational Telemetry Suite",
    domainSlug: "data-science-and-data-analytics",
    domainLabel: "Data Science & Analytics",
    status: "Case Study",
    summary:
      "End-to-end data ingestion, feature engineering, and anomaly/forecasting workflows built for operational and academic datasets.",
    stack: ["Python", "Pandas", "Scikit-Learn", "SQL", "Visualization"],
    metrics: "Automated cohort & metric tracking across batches",
  },
];

const services = [
  {
    id: "srv-01",
    title: "Custom AI & Machine Learning Solutions",
    category: "Enterprise R&D",
    deliverable: "Prototype to Deployment Blueprint",
    description:
      "Applied ML, NLP, computer vision, and RAG workflows tailored to domain data, evaluation metrics, and real-world constraints.",
  },
  {
    id: "srv-02",
    title: "Full-Stack & Static Web Engineering",
    category: "Web & Cloud",
    deliverable: "Responsive Production Web Apps",
    description:
      "Modern Next.js, React, and API architectures engineered for speed, maintainability, and clean custom-domain deployment.",
  },
  {
    id: "srv-03",
    title: "Academic & Capstone R&D Mentorship",
    category: "Academic & Student",
    deliverable: "Architecture, Implementation & Documentation",
    description:
      "Structured guidance on problem formulation, baseline vs. proposed system design, experimentation, and technical reporting.",
  },
  {
    id: "srv-04",
    title: "Data Pipelines & Spreadsheet/CSV Automation",
    category: "Data & Operations",
    deliverable: "Structured Datasets & Reporting Workflows",
    description:
      "Standardizing batch trackers, project catalogs, and evaluation sheets into clean JSON/CSV pipelines for effortless publishing.",
  },
];

const products = [
  {
    id: "prd-01",
    name: "AVR EvalEngine",
    tag: "AI Assessment Suite",
    summary:
      "Resume parsing, role-skill alignment, and rubric-based response scoring module for structured technical evaluations.",
    highlights: ["Skill taxonomy extraction", "Role match scoring", "JSON/CSV export ready"],
  },
  {
    id: "prd-02",
    name: "AVR DocPulse",
    tag: "Document Intelligence",
    summary:
      "Structured extraction and search toolkit for turning multi-page PDFs, papers, and reports into actionable summaries.",
    highlights: ["Section-aware chunking", "Schema-validated outputs", "Fast batch processing"],
  },
  {
    id: "prd-03",
    name: "AVR StaticShowcase",
    tag: "Web Starter Kit",
    summary:
      "Static-first Next.js catalog template with JSON-backed pages, domain filters, and GitHub Actions deployment.",
    highlights: ["GitHub Pages compatible", "Custom .com domain ready", "Zero backend cost"],
  },
];

const portfolio = [
  {
    id: "port-01",
    client: "AVR R&D Flagship Lab",
    title: "Automated Technical Screening & Rubric Scoring",
    outcome: "Standardized candidate skill extraction and multi-criteria answer evaluation.",
    tags: ["NLP", "Python", "Evaluation"],
  },
  {
    id: "port-02",
    client: "Engineering Cohort & Batch Programs",
    title: "Multi-Domain Capstone & Research Tracking",
    outcome: "Organized AI/ML, Web, Data Science, and Security initiatives with clear milestones.",
    tags: ["R&D", "Mentorship", "Analytics"],
  },
  {
    id: "port-03",
    client: "AVR Digital Presence",
    title: "Static Web Publishing with Custom Domain Support",
    outcome: "Fast static prerendering with automated GitHub Actions builds on every push.",
    tags: ["Next.js", "GitHub Actions", "Static Export"],
  },
];

const gallery = [
  {
    id: "gal-01",
    title: "AVR Research & Development Identity",
    caption: "Official brand mark and R&D identity assets.",
    image: "/brand/logo.png",
    tag: "Branding",
  },
  {
    id: "gal-02",
    title: "AVR Emblem & Mark",
    caption: "Compact emblem used across digital channels and documentation.",
    image: "/brand/logo-mark.png",
    tag: "Identity",
  },
  {
    id: "gal-03",
    title: "R&D Showcase Visual 01",
    caption: "Visual asset from AVR project and lab media collection.",
    image: "/uploads/601895e7-eb2e-4eb8-8bf9-acc3e00faeeb.webp",
    tag: "Lab Media",
  },
  {
    id: "gal-04",
    title: "R&D Showcase Visual 02",
    caption: "Engineering & innovation visual showcase.",
    image: "/uploads/84c6f7d2-9b1a-47da-8911-94c45606c825.webp",
    tag: "Showcase",
  },
];

const modules = {
  internships: [
    {
      id: "int-01",
      title: "Applied AI & LLM Engineering Internship",
      domain: "AI & Machine Learning",
      duration: "8–12 Weeks",
      mode: "Hybrid / Remote",
      summary: "Build end-to-end NLP, RAG, and evaluation pipelines with weekly code and architecture reviews.",
    },
    {
      id: "int-02",
      title: "Full-Stack Web & UI Systems Internship",
      domain: "Front-End & Back-End",
      duration: "8 Weeks",
      mode: "Hybrid / Remote",
      summary: "Ship responsive React/Next.js interfaces, reusable component systems, and clean data integrations.",
    },
    {
      id: "int-03",
      title: "Data Analytics & Applied Research Internship",
      domain: "Data Science",
      duration: "8 Weeks",
      mode: "Hybrid / Remote",
      summary: "Work on dataset curation, exploratory analysis, model benchmarking, and technical documentation.",
    },
  ],
  research: [
    {
      id: "res-01",
      title: "Multi-Modal & Rubric-Guided Candidate Assessment",
      domain: "AI & NLP",
      duration: "Ongoing Track",
      mode: "R&D Publication",
      summary: "Investigating structured skill extraction, semantic alignment, and explainable scoring rubrics.",
    },
    {
      id: "res-02",
      title: "Hybrid Blockchain & Privacy-Preserving Verification",
      domain: "Security & Systems",
      duration: "Ongoing Track",
      mode: "R&D Publication",
      summary: "Exploring verifiable credentials, access control models, and integrity checks for sensitive records.",
    },
  ],
  training: [
    {
      id: "trn-01",
      title: "Python, Data Structures & Applied ML Bootcamp",
      domain: "AI & Machine Learning",
      duration: "6 Weeks",
      mode: "Cohort Training",
      summary: "Practical hands-on sessions covering Python workflows, ML fundamentals, and model evaluation.",
    },
    {
      id: "trn-02",
      title: "Modern Web Development with React & Next.js",
      domain: "Web Engineering",
      duration: "6 Weeks",
      mode: "Cohort Training",
      summary: "Component architecture, state management, Tailwind styling, and static/cloud deployment.",
    },
  ],
  workshops: [
    {
      id: "wrk-01",
      title: "Building RAG & AI Assistants from Scratch",
      domain: "Generative AI",
      duration: "2-Day Intensive",
      mode: "Hands-On Lab",
      summary: "Practical workshop on chunking, embeddings, retrieval quality, and structured outputs.",
    },
    {
      id: "wrk-02",
      title: "Git, GitHub Actions & Custom Domain Deployment",
      domain: "DevOps & Web",
      duration: "1-Day Intensive",
      mode: "Hands-On Lab",
      summary: "Automate static site builds with GitHub Actions and connect a custom .com domain cleanly.",
    },
  ],
};

fs.writeFileSync("public/data/projects.json", JSON.stringify(projects, null, 2));
fs.writeFileSync("public/data/services.json", JSON.stringify(services, null, 2));
fs.writeFileSync("public/data/products.json", JSON.stringify(products, null, 2));
fs.writeFileSync("public/data/portfolio.json", JSON.stringify(portfolio, null, 2));
fs.writeFileSync("public/data/gallery.json", JSON.stringify(gallery, null, 2));
fs.writeFileSync("public/data/modules.json", JSON.stringify(modules, null, 2));

fs.writeFileSync(
  "app/(public)/projects/page.tsx",
  `"use client";

import { useState } from "react";
import Link from "next/link";
import projectsData from "../../../public/data/projects.json";

const DOMAINS = [
  { id: "all", label: "All Initiatives" },
  { id: "artificial-intelligence-and-machine-learning", label: "AI & Machine Learning" },
  { id: "front-end-web-development", label: "Front-End Engineering" },
  { id: "back-end-web-development", label: "Back-End & Security" },
  { id: "data-science-and-data-analytics", label: "Data Science & Analytics" },
];

export default function ProjectsPage() {
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = projectsData.filter((item) => {
    const matchesDomain = selectedDomain === "all" || item.domainSlug === selectedDomain;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.stack.some((s) => s.toLowerCase().includes(q));
    return matchesDomain && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            AVR Research & Development
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            R&D Initiatives & Case Studies
          </h1>
          <p className="text-slate-600 text-base">
            Explore active research tracks, engineering systems, and applied solutions built at AVR.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, stack (NLP, Next.js, SQL)..."
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {DOMAINS.map((domain) => (
            <button
              key={domain.id}
              type="button"
              onClick={() => setSelectedDomain(domain.id)}
              className={\`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all \${
                selectedDomain === domain.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }\`}
            >
              {domain.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-2">No matching initiatives</h3>
            <p className="text-sm text-slate-500 mb-6">
              Try clearing your search filter or switching back to all domains.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDomain("all");
                setQuery("");
              }}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((proj) => (
              <article
                key={proj.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                      {proj.domainLabel}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{proj.status}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{proj.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{proj.summary}</p>
                  <p className="text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 mb-4">
                    Outcome: {proj.metrics}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm font-semibold text-teal-700 hover:text-teal-800"
                  >
                    Request technical brief →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
`
);

fs.writeFileSync(
  "app/(public)/services/page.tsx",
  `import Link from "next/link";
import servicesData from "../../../public/data/services.json";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            Capabilities & Offerings
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            R&D & Engineering Services
          </h1>
          <p className="text-slate-600 text-base">
            Practical engineering, applied AI prototyping, and structured technical guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-full mb-3">
                  {srv.category}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{srv.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">{srv.description}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-slate-500">
                  Deliverable: <strong className="text-slate-800">{srv.deliverable}</strong>
                </span>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-teal-700 hover:text-teal-800 shrink-0"
                >
                  Inquire →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`
);

fs.writeFileSync(
  "app/(public)/products/page.tsx",
  `import Link from "next/link";
import productsData from "../../../public/data/products.json";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            Platforms & Toolkits
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            AVR Products & Frameworks
          </h1>
          <p className="text-slate-600 text-base">
            Reusable modules and frameworks engineered for evaluation, document intelligence, and web delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productsData.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full mb-3">
                  {prod.tag}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{prod.name}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{prod.summary}</p>
                <ul className="space-y-1.5 text-xs text-slate-700 mb-6">
                  {prod.highlights.map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors"
              >
                Request Demo
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`
);

fs.writeFileSync(
  "app/(public)/portfolio/page.tsx",
  `import portfolioData from "../../../public/data/portfolio.json";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            Selected Work
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            AVR Portfolio & Outcomes
          </h1>
          <p className="text-slate-600 text-base">
            Key implementations and technical tracks delivered across research, tooling, and web platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 mb-2">
                  {item.client}
                </p>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.outcome}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`
);

fs.writeFileSync(
  "app/(public)/gallery/page.tsx",
  `import galleryData from "../../../public/data/gallery.json";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            Visual Archive
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            AVR Gallery
          </h1>
          <p className="text-slate-600 text-base">
            Brand visuals, lab highlights, and showcase assets from AVR Research & Development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryData.map((item) => (
            <figure
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div className="h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="p-4">
                <span className="text-[11px] font-semibold text-teal-700 uppercase">
                  {item.tag}
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-1">{item.title}</h2>
                <p className="text-xs text-slate-600 mt-1">{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
`
);

fs.writeFileSync(
  "components/public/ModulePage.tsx",
  `"use client";

import { useState } from "react";
import Link from "next/link";
import modulesData from "../../public/data/modules.json";

type ModuleKey = keyof typeof modulesData;

interface ModulePageProps {
  title: string;
  description: string;
  moduleKey?: ModuleKey;
}

export function ModulePage({ title, description, moduleKey }: ModulePageProps) {
  const inferredKey: ModuleKey =
    moduleKey ||
    (title.toLowerCase().includes("research")
      ? "research"
      : title.toLowerCase().includes("training")
      ? "training"
      : title.toLowerCase().includes("workshop")
      ? "workshops"
      : "internships");

  const items = modulesData[inferredKey] || modulesData.internships;
  const domains = ["All", ...Array.from(new Set(items.map((i) => i.domain)))];
  const [selectedDomain, setSelectedDomain] = useState("All");

  const visibleItems =
    selectedDomain === "All" ? items : items.filter((i) => i.domain === selectedDomain);

  return (
    <div className="min-h-screen bg-slate-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-700 mb-2">
            AVR Programs & Tracks
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {title}
          </h1>
          <p className="text-slate-600 text-base">{description}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {domains.map((dom) => (
            <button
              key={dom}
              type="button"
              onClick={() => setSelectedDomain(dom)}
              className={\`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors \${
                selectedDomain === dom
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }\`}
            >
              {dom}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs mb-3">
                  <span className="font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                    {item.domain}
                  </span>
                  <span className="text-slate-500 font-medium">{item.duration}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.summary}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">{item.mode}</span>
                <Link href="/contact" className="font-semibold text-teal-700 hover:text-teal-800">
                  Apply / Enquire →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModulePage;
`
);

const moduleRoutes = [
  {
    dir: "internships",
    key: "internships",
    title: "Internships",
    desc: "Hands-on R&D internship programs across AI, web engineering, and data analytics.",
  },
  {
    dir: "research",
    key: "research",
    title: "Research",
    desc: "Applied research tracks, experimental frameworks, and technical publications.",
  },
  {
    dir: "training",
    key: "training",
    title: "Training",
    desc: "Structured technical bootcamps and practical skill-building cohorts.",
  },
  {
    dir: "workshops",
    key: "workshops",
    title: "Workshops",
    desc: "Focused lab sessions on applied AI, automation, and static web deployment.",
  },
];

for (const r of moduleRoutes) {
  fs.writeFileSync(
    `app/(public)/${r.dir}/page.tsx`,
    `import { ModulePage } from "@/components/public/ModulePage";

export default function Page() {
  return (
    <ModulePage
      title="${r.title}"
      description="${r.desc}"
      moduleKey="${r.key}"
    />
  );
}
`
  );
}

console.log("Static catalog JSON files and public catalog pages created successfully!");