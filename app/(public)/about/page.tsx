import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About AVR Research & Development Pvt. Ltd. - an innovation-driven technology company in Hyderabad, established in 2021.",
};

const POINTS = [
  "Real-time applications, custom software and innovative project development",
  "Responsive, user-friendly and professional websites for businesses and institutions",
  "Embedded systems, smart devices, sensors, automation and IoT-based solutions",
  "Technical research, AI & ML projects, innovative prototypes and research-oriented development",
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <p className="text-sm text-brass-dim">About Us</p>
      <h1 className="mt-4 max-w-xl font-display text-3xl leading-tight text-ink md:text-5xl">
        About AVR Research &amp; Development Pvt Ltd
      </h1>

      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <div className="max-w-xl space-y-5 text-base leading-relaxed text-slate">
          <p>
            AVR Research and Development Pvt. Ltd. is an innovation-driven technology company established in 2021, committed to delivering advanced, reliable, and intelligent technological solutions. We specialize in real-time project development, software engineering, website design and development, hardware development, Internet of Things (IoT) solutions, and research-oriented technical services.
          </p>
          <p>
            Our company focuses on transforming innovative ideas into practical, efficient, and scalable solutions that address real-world challenges. We combine technical expertise, creativity, and research-driven methodologies to develop customized solutions for students, academic institutions, researchers, startups, and businesses.
          </p>
          <p>
            At AVR Research and Development Pvt. Ltd., we believe that technology and innovation are the driving forces behind a smarter future. Our mission is to bridge the gap between ideas and implementation through quality development, continuous research, and emerging technologies.
          </p>
          <p>
            We are dedicated to building long-term relationships with our clients by delivering excellence, maintaining professional standards, and providing technology solutions that create meaningful impact.
          </p>
        </div>

        <ul className="flex flex-col gap-5">
          {POINTS.map((point) => (
            <li key={point} className="card card-accent !p-5 text-sm text-ink">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}