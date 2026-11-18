import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const studentServices = [
  { title: "Software Development", description: "Hands-on training and project support in building real-world software applications using modern languages and frameworks." },
  { title: "AI Solutions", description: "Guidance and project support in designing and building practical artificial intelligence solutions for real-world problems." },
  { title: "Machine Learning", description: "Learn and build machine learning models, from data preprocessing to training and evaluation, with mentorship throughout." },
  { title: "Deep Learning", description: "Explore neural networks and deep learning architectures, with hands-on projects using modern deep learning frameworks." },
  { title: "NLP", description: "Natural Language Processing training and projects, covering text analysis, language models, and conversational AI." },
  { title: "Computer Vision", description: "Learn image and video processing, object detection, and computer vision techniques through guided projects." },
  { title: "IoT", description: "Internet of Things training and projects, connecting hardware sensors and devices to real-world applications." },
  { title: "Embedded Systems", description: "Hands-on embedded systems training, covering microcontrollers, firmware, and hardware-software integration." },
  { title: "Cloud Computing", description: "Training and project support in deploying and managing applications on modern cloud platforms." },
  { title: "Academic Projects", description: "End-to-end support for academic and research projects, from ideation through implementation and documentation." },
  { title: "Workshops", description: "Short, focused workshops covering trending technologies and practical skills for students." },
  { title: "Corporate Training", description: "Technical training programs designed for students preparing to enter the corporate technology workforce." },
];

for (let i = 0; i < studentServices.length; i++) {
  const s = studentServices[i];
  const slug = slugify(s.title);
  await prisma.service.upsert({
    where: { audience_slug: { audience: "STUDENT", slug } },
    update: { description: s.description, isPublished: true },
    create: {
      title: s.title,
      slug,
      description: s.description,
      audience: "STUDENT",
      isPublished: true,
    },
  });
  console.log(`Student service ready: ${s.title}`);
}

console.log("\nDone.");

await prisma.$disconnect();
