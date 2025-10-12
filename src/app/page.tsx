"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Code,
  Download,
  Github,
  Mail,
  Moon,
  Sun,
  ArrowRight,
  User,
  Lightbulb,
  Briefcase
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlaceHolderImages } from "@/lib/placeholder-images";

// --- DATA ---
const personalInfo = {
  name: "Sergio Bravo Mora",
  role: "Estudiante de Desarrollo Web",
  motto: "Persona proactiva, responsable, con buenas relaciones interpersonales y empática, con capacidad de trabajar en equipo y con ganas de crecer.",
  avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyLXJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiLz48cGF0aCBkPSJNMjAgMjFhOCA4IDAgMCAtMTYgMCIvPjwvc3ZnPg==",
  avatarHint: "person avatar placeholder"
};

const skills = {
  languages: [
    { name: "HTML", icon: "html" },
    { name: "CSS", icon: "css" },
    { name: "JavaScript", icon: "javascript" },
    { name: "Java", icon: "java" },
  ],
  frameworks: [
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Node.js", icon: "nodejs" },
    { name: "Spring Boot", icon: "springboot" },
  ],
  soft: [
    "Resolución de problemas",
    "Trabajo en equipo",
    "Comunicación efectiva",
    "Pensamiento crítico",
    "Adaptabilidad",
    "Proactividad",
  ],
};

const projects = [
  {
    title: "Portafolio Personal",
    description: "Este mismo portafolio, creado para mostrar mis habilidades y proyectos. ¡Espero que te guste!",
    image: PlaceHolderImages.find(p => p.id === 'project-1')?.imageUrl || "https://picsum.photos/seed/devfolio-proj1/600/400",
    imageHint: PlaceHolderImages.find(p => p.id === 'project-1')?.imageHint || "website design",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    live: "#",
    github: "#",
  },
  {
    title: "Proyecto de Ciberseguridad",
    description: "Análisis y fortificación de sistemas para prevenir ataques, basado en los conocimientos adquiridos en mi formación.",
    image: PlaceHolderImages.find(p => p.id === 'project-2')?.imageUrl || "https://picsum.photos/seed/devfolio-proj2/600/400",
    imageHint: PlaceHolderImages.find(p => p.id === 'project-2')?.imageHint || "security code",
    tags: ["Seguridad", "Redes", "Análisis de Vulnerabilidades"],
    live: "#",
    github: "#",
  },
  {
    title: "Dashboard de Creación de Contenido",
    description: "Concepto de un panel para gestionar y analizar el rendimiento de contenido de videojuegos en plataformas sociales.",
    image: PlaceHolderImages.find(p => p.id === 'project-3')?.imageUrl || "https://picsum.photos/seed/devfolio-proj3/600/400",
    imageHint: PlaceHolderImages.find(p => p.id === 'project-3')?.imageHint || "dashboard gaming",
    tags: ["UI/UX", "Concepto", "Social Media"],
    live: "#",
    github: "#",
  },
];

const experience = [
    {
        date: "Junio 2023 - Agosto 2023",
        title: "Auxiliar en telecomunicaciones",
        company: "Empresa Wifi Villarrubia",
        description: "Asistencia en levantar redes wifi y fibra óptica. Mantenimiento de portátiles."
    },
    {
        date: "2024 - Actual",
        title: "Curso Desarrollo de Aplicaciones Web",
        company: "Efamoratalaz-Manzanares",
        description: "Formación actual en desarrollo de aplicaciones web full-stack, aprendiendo las últimas tecnologías del sector."
    },
    {
        date: "2023 - 2024",
        title: "Curso en Ciberseguridad Informática",
        company: "Villarrubia de los Ojos",
        description: "Formación especializada en seguridad informática, protección de datos y análisis de vulnerabilidades."
    },
    {
        date: "2018 - 2022",
        title: "Bachiller en Humanidades",
        company: "Instituto IES Guadiana",
        description: "Base académica en humanidades, fomentando el pensamiento crítico y la capacidad de análisis."
    }
];

// --- ICON COMPONENTS ---

const TechIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  react: (props) => (
    <svg {...props} viewBox="-11.5 -10.23174 23 20.46348">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  nextjs: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128ZM74.2462 95.9912L92.7055 57.3298H78.3113L78.3114 95.9912H74.2462ZM68.1812 95.9912V57.3298H53.787L35.3276 95.9912H49.7219L59.0833 76.2255L68.4447 95.9912H68.1812Z"
        fill="currentColor"
      />
    </svg>
  ),
  nodejs: (props) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M9,3V15H5V11H2V13H5V17H9V21H12.5A6.5,6.5 0 0,0 19,14.5V5A2,2 0 0,0 17,3H9M15.5,14.5A2.5,2.5 0 0,1 13,17H11V5H15A2,2 0 0,1 17,7V14.5A2.5,2.5 0 0,1 15.5,14.5Z"
      />
    </svg>
  ),
  html: (props) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M1,9H3V11H5V9H7V11H9V9H11V5H13V9H15V5H17V9H19V5H21V9H23V1H1M21,11V13H19V15H17V13H15V15H13V13H11V15H9V13H7V15H5V13H3V15H1V11M3,23H5V21H7V23H9V21H11V17H13V21H15V17H17V21H19V17H21V21H23V15H1M3,3H5V5H7V3H9V5H11V3M15,3H17V5H19V3"
      />
    </svg>
  ),
  css: (props) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M1,9H3V7H5V9H7V7H9V9H11V5H13V9H15V5H17V9H19V5H21V9H23V1H1M3,23H5V21H7V23H9V21H11V17H13V21H15V17H17V21H19V17H21V21H23V15H1M3,3H5V5H7V3H9V5H11V3M15,3H17V5H19V3"
      />
    </svg>
  ),
  javascript: (props) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M1,3H23V5H1V3M1,7H23V9H1V7M1,11H23V13H1V11M1,15H23V17H1V15M1,19H23V21H1V19"
      />
    </svg>
  ),
  java: (props) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20,3A2,2 0 0,1 22,5V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V5A2,2 0 0,1 4,3H20M14.5,14.25C14.5,15.5 13.6,16.5 12.38,16.5C11.33,16.5 10.5,15.65 10.5,14.53C10.5,13.37 11.41,12.5 12.63,12.5C12.83,12.5 13,12.5 13.15,12.55V10.38C13.15,10.38 13,10.36 12.75,10.36C11.5,10.36 9.85,11.18 9.85,12.83C9.85,14.15 10.5,15.5 12.13,15.5C13.6,15.5 14.5,14.55 14.5,13.2V11H15.85V10.05H14.5V9.11H15.85V8.16H14.5V6H13.15V8.16H11.85V9.11H13.15V10.33C12.8,10.33 12.5,10.25 12.5,10.25C11.36,10.25 10.5,10.95 10.5,12.18C10.5,13.32 11.4,14.25 12.6,14.25C13.5,14.25 14.5,13.5 14.5,11.9V11.23C14.5,11.23 15.2,11.3 15.5,11.75C16.15,12.5 15.8,14.25 14.5,14.25Z"
      />
    </svg>
  ),
  springboot: (props) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12.38 21.03c-2.2-.42-3.85-2.44-3.85-4.75c0-2.61 2.14-4.75 4.75-4.75c.59 0 1.15.11 1.68.3c.41-.33.91-.55 1.46-.55c1.23 0 2.22 1 2.22 2.22c0 .4-.11.78-.3 1.11c.54.43.88.93.88 1.64c0 1.05-.85 1.9-1.9 1.9c-.19 0-.36-.03-.54-.08c-.43.9-.96 1.71-1.74 2.22a4.67 4.67 0 0 1-2.66.74m-.25-15.06c-3.32 0-6.09 2.7-6.09 6.02c0 .28.02.55.06.82c.04-.3.06-.6.06-.91c0-2.62 2.13-4.75 4.75-4.75c.59 0 1.15.11 1.68.3c.12-.53.2-1.09.2-1.68c0-1.23-1-2.23-2.23-2.23c-.56 0-1.06.21-1.48.56M18 4.78a2.23 2.23 0 0 0-3.3-1.07c.39.46.61 1.02.61 1.63c0 .59-.11 1.15-.3 1.68c.55.27 1.18.43 1.85.43c1.9 0 3.52-1.28 4.06-3.03c-.4.21-.86.36-1.35.36c-.6 0-1.15-.17-1.57-.4Z"
      />
    </svg>
  ),
};

const SkillCard = ({ icon, name }: { icon: string; name: string }) => {
  const Icon = TechIcons[icon];
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {Icon ? <Icon className="h-10 w-10 text-accent" /> : <Code className="h-10 w-10 text-accent" />}
      <span className="font-medium">{name}</span>
    </div>
  );
};

// --- HEADER COMPONENT ---
const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  if (!isMounted) return <div className="h-16" />;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <a href="#" className="mr-6 flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">DevFolio</span>
          </a>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="#sobre-mi" className="transition-colors hover:text-primary">Sobre mí</a>
          <a href="#proyectos" className="transition-colors hover:text-primary">Proyectos</a>
          <a href="#experiencia" className="transition-colors hover:text-primary">Experiencia</a>
          <a href="#contacto" className="transition-colors hover:text-primary">Contacto</a>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button onClick={toggleTheme} variant="ghost" size="icon">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

// --- BODY SECTIONS ---
const HeroSection = () => (
  <section id="inicio" className="container grid md:grid-cols-2 gap-10 items-center py-20 md:py-32">
    <div className="space-y-4">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
        {personalInfo.name}
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-primary">{personalInfo.role}</h2>
      <p className="text-lg text-muted-foreground">{personalInfo.motto}</p>
      <div className="flex gap-4 pt-4">
        <Button asChild size="lg">
          <a href="#proyectos">
            Ver Proyectos <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="#contacto">Contáctame</a>
        </Button>
      </div>
    </div>
    <div className="flex justify-center">
      <div className="rounded-full overflow-hidden border-4 border-primary shadow-2xl w-[400px] h-[400px] flex items-center justify-center bg-muted text-muted-foreground p-8">
         <Image src={personalInfo.avatar} alt="Foto de perfil de Sergio Bravo Mora" width={400} height={400} className="w-full h-full object-contain" data-ai-hint={personalInfo.avatarHint}/>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
    <section id="sobre-mi" className="py-20 bg-secondary dark:bg-card">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Sobre Mí</h2>
        <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1 flex flex-col items-center text-center">
                <User className="h-16 w-16 text-accent mb-4"/>
                <h3 className="text-2xl font-semibold mb-2">Biografía</h3>
                <p className="text-muted-foreground">
                    Soy un apasionado desarrollador de software con experiencia en la creación de aplicaciones web modernas y eficientes. Disfruto resolviendo problemas y aprendiendo nuevas tecnologías para mejorar mis habilidades y entregar productos excepcionales.
                </p>
            </div>
             <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">Lenguajes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
                    {skills.languages.map((skill) => (
                    <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
                    ))}
                </div>
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">Frameworks y Tecnologías</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {skills.frameworks.map((skill) => (
                    <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
                    ))}
                </div>
                <h3 className="text-2xl font-semibold mt-10 mb-6 text-center md:text-left">Habilidades Blandas</h3>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {skills.soft.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-base px-4 py-2">{skill}</Badge>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
);


const ProjectsSection = () => (
    <section id="proyectos" className="py-20">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Proyectos Destacados</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <Image
                  src={project.image}
                  width={600}
                  height={400}
                  alt={`Captura de pantalla de ${project.title}`}
                  className="rounded-md object-cover mb-4"
                  data-ai-hint={project.imageHint}
                />
                <CardDescription>{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="ghost">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </Button>
                <Button asChild>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
);

const ExperienceSection = () => (
    <section id="experiencia" className="py-20 bg-secondary dark:bg-card">
        <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Experiencia y Formación</h2>
            <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
                {experience.map((item, index) => (
                    <div key={index} className="relative pl-10 mb-10">
                        <div className="absolute -left-1.5 top-1.5 h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                           <Briefcase className="h-3 w-3 text-primary"/>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">{item.date}</p>
                        <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                        <p className="text-accent font-semibold">{item.company}</p>
                        <p className="mt-2 text-muted-foreground">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un email válido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

const ContactSection = () => {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "sergiobmnv@gmail.com",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof contactFormSchema>) {
        console.log(values);
        toast({
            title: "¡Mensaje Enviado!",
            description: "Gracias por contactarme. Te responderé lo antes posible.",
        });
        form.reset();
    }
  
    return (
        <section id="contacto" className="py-20">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-12">Hablemos</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Ponte en Contacto</h3>
                        <p className="text-muted-foreground mb-8">
                            ¿Tienes una pregunta o una propuesta, o simplemente quieres saludar? Adelante.
                        </p>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Tu nombre" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="tu@email.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mensaje</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Tu mensaje aquí..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" size="lg">Enviar Mensaje</Button>
                            </form>
                        </Form>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                        <h3 className="text-2xl font-semibold mb-6">O encuéntrame en:</h3>
                        <div className="flex space-x-6">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github className="h-10 w-10" />
                            </a>
                            <a href="mailto:sergiobmnv@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="h-10 w-10" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- FOOTER COMPONENT ---
const Footer = () => (
  <footer className="py-6 border-t">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} {personalInfo.name}. Todos los derechos reservados.
      </p>
      <div className="flex space-x-4">
        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
          <Github className="h-5 w-5" />
        </a>
        <a href="mailto:sergiobmnv@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
          <Mail className="h-5 w-5" />
        </a>
      </div>
    </div>
  </footer>
);

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
