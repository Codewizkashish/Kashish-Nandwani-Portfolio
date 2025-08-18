"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/navigation";
import MagneticElement from "@/components/magnetic-element";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement[]>([]);

  const projects = [
    {
      title: "ZapMail",
      description:
        "Built a SaaS platform for personalized email outreach with inbox sync. Developed frontend features including campaign builder, OAuth login, dynamic templates, and email threads.",
      tech: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL", "Golang"],
      image: "/videos/projects.mp4",
      code: "https://github.com/anuragdaksh7/zap-frontend",
      link: "https://legendary-chainsaw-virid.vercel.app/",
    },
    {
      title: "Portfolio Website",
      description:
        "A luxury portfolio website with advanced animations and magnetic interactions.",
      tech: ["Next.js", "TypeScript", "GSAP", "Framer Motion", "Tailwind CSS"],
      image: "/videos/portfolio.mp4",
      code: "#",
      link: "#",
    },
    {
      title: "LoreCrate",
      description:
        "Created a prompt-sharing platform with responsive UI, authentication, and searchable feed.",
      tech: ["Next.js", "Tailwind", "MongoDB"],
      image: "/videos/lorecrate.mp4",
      code: "https://github.com/Codewizkashish/LoreCrate",
      link: "https://lorecrate.vercel.app", // replace with actual
    },
    {
      title: "Weather App",
      description:
        "Built a weather app with real-time forecasts, theme toggle, and unit conversions.",
      tech: ["React.js", "OpenWeather API"],
      image: "/videos/weatherapp.mp4",
      code: "https://github.com/Codewizkashish/Weather-App",
      link: "https://codewizkashish.github.io/Weather-App/", // replace with actual
    },
    {
      title: "Attendance Tracker",
      description:
        "A student attendance tracking application.",
      tech: [
        "Next.js",
        "Supabase",
        "PostgreSQL",
        "Drizzle ORM",
        "Tailwind CSS",
        "Kinde",
      ],
      image: "/videos/attendance.mp4",
      code: "#",
      link: "#",
    },
  ];

  useEffect(() => {
    const hero = heroRef.current;
    const projects = projectsRef.current;

    if (!hero) return;

    // Hero animation
    const heroElements = hero.querySelectorAll(".animate-in");
    gsap.fromTo(
      heroElements,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3,
      }
    );

    // Projects animation
    projects.forEach((project, index) => {
      if (!project) return;

      gsap.fromTo(
        project,
        { y: 120, opacity: 0, rotationX: 30 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax effect
      const parallaxSpeed = index % 2 === 0 ? -50 : -80;
      gsap.to(project, {
        y: parallaxSpeed,
        ease: "none",
        scrollTrigger: {
          trigger: project,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navigation />

      <section ref={heroRef} className="pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="overflow-hidden">
            <h1 className="animate-in text-6xl md:text-8xl font-serif font-light text-foreground mb-8 tracking-tight">
              Projects
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="animate-in text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              A showcase of my latest work and creative solutions
            </p>
          </div>
          <div className="overflow-hidden mt-12">
            <div className="animate-in w-24 h-px bg-primary mx-auto" />
          </div>
        </div>
      </section>

      <section className="pb-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {projects.map((project, index) => (
              <MagneticElement
                key={project.title}
                strength={0.1}
                className={`${index % 2 === 1 ? "lg:mt-20" : ""}`}
              >
                <div
                  ref={(el) => {
                    if (el) projectsRef.current[index] = el;
                  }}
                  className="group"
                >
                  <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-700">
                    <Link href={project.link} target="_blank">
                      <div className="aspect-[4/3] overflow-hidden">
                        {project.image.endsWith(".mp4") ? (
                          <video
                            src={project.image}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        )}
                      </div>
                    </Link>

                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm font-mono text-primary/60 group-hover:text-primary transition-colors duration-300">
                          0{index + 1}
                        </span>
                        <div className="flex-1 h-px bg-border group-hover:bg-primary/30 transition-colors duration-300" />
                      </div>
                      <h3 className="text-3xl font-serif font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-primary group-hover:gap-5 transition-all duration-300">
                        <Link
                          href={project.code}
                          target="_blank"
                          className="block"
                        >
                          <span className="font-medium">View Source Code</span>
                        </Link>
                        <div className="w-8 h-px bg-primary group-hover:w-12 transition-all duration-300" />
                        <div className="w-2 h-2 border border-primary rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </MagneticElement>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
