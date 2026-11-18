import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const domains = [
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

function slugify(name) {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

for (let i = 0; i < domains.length; i++) {
  const { name, description } = domains[i];
  const slug = slugify(name);
  await prisma.domain.upsert({
    where: { slug },
    update: {},
    create: { name, slug, description, isActive: true, displayOrder: i },
  });
  console.log(`Created/confirmed: ${name} -> ${slug}`);
}

await prisma.$disconnect();
