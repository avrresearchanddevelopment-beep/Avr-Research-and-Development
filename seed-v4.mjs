import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const slugify = (n) => n.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ---- 1. Student services ---- */
const services = [
  { title: "VLSI", description: "VLSI design training and project support covering digital design, Verilog/VHDL, FPGA prototyping and chip design flows." },
  { title: "Image Processing", description: "Hands-on image processing training and projects: filtering, segmentation, feature extraction and medical or satellite imagery applications." },
];
for (const s of services) {
  const slug = slugify(s.title);
  await prisma.service.upsert({
    where: { audience_slug: { audience: "STUDENT", slug } },
    update: { description: s.description, isPublished: true },
    create: { title: s.title, slug, description: s.description, audience: "STUDENT", isPublished: true },
  });
  console.log("Student service ready:", s.title);
}

/* ---- 2. Products ---- */
const products = [
  { title: "Smart House", description: "Home automation system to control lights, appliances and security from a phone, with sensor-based monitoring." },
  { title: "Posture Recognition", description: "Computer-vision system that detects and classifies body posture in real time to flag poor or unsafe positions." },
  { title: "Health Monitoring", description: "Wearable and sensor-based system that tracks vital signs and alerts caregivers when readings go out of range." },
  { title: "Welcome Robot", description: "Interactive reception robot that greets visitors, answers common questions and guides them around the premises." },
  { title: "Parking System", description: "Smart parking solution that detects free slots, guides drivers and automates entry, exit and billing." },
];
for (let i = 0; i < products.length; i++) {
  const p = products[i];
  const slug = slugify(p.title);
  await prisma.product.upsert({
    where: { slug },
    update: { description: p.description, isPublished: true },
    create: { title: p.title, slug, description: p.description, isPublished: true, displayOrder: i },
  });
  console.log("Product ready:", p.title);
}

/* ---- 3. Student project domains ---- */
const domains = [
  ["ml", "Machine Learning (ML)", "Training algorithms that learn from data to classify, predict and recommend."],
  ["ai", "Artificial Intelligence (AI)", "Intelligent systems that reason, plan and make decisions."],
  ["dl", "Deep Learning (DL)", "Neural-network based models for vision, speech and sequence data."],
  ["nlp", "Natural Language Processing (NLP)", "Text and speech understanding, language models and chatbots."],
  ["cybersecurity", "Cybersecurity", "Protecting systems, networks and data from attacks."],
  ["cloud-computing", "Cloud Computing", "Building, deploying and scaling applications on cloud platforms."],
  ["blockchain", "Blockchain (BC)", "Decentralised applications and tamper-proof transaction systems."],
  ["iot", "Internet of Things (IoT)", "Connected sensors and devices streaming data to applications."],
  ["embedded-systems", "Embedded Systems", "Firmware and hardware-software integration on microcontrollers."],
  ["vlsi", "VLSI", "Digital and analog chip design, Verilog/VHDL and FPGA prototyping."],
  ["image-processing", "Image Processing", "Image enhancement, segmentation, recognition and analysis."],
  ["ai-and-iot", "AI & IoT", "Combining machine intelligence with connected devices (AIoT)."],
];
for (let i = 0; i < domains.length; i++) {
  const [slug, name, description] = domains[i];
  const d = await prisma.domain.upsert({
    where: { slug },
    update: { isActive: true },
    create: { slug, name, description, isActive: true, displayOrder: i },
  });
  await prisma.domainModule.upsert({
    where: { domainId_module: { domainId: d.id, module: "PROJECTS" } },
    update: { isActive: true },
    create: { domainId: d.id, module: "PROJECTS", isActive: true, displayOrder: i },
  });
  console.log("Domain linked to Projects:", name);
}

console.log("\nDone.");
await prisma.$disconnect();
