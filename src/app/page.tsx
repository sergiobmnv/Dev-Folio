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
  Linkedin,
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
  name: "Carlos Sánchez",
  role: "Desarrollador Full Stack",
  motto: "Transformando ideas complejas en software elegante y funcional.",
  avatar: PlaceHolderImages.find(p => p.id === 'profile-avatar')?.imageUrl || "https://picsum.photos/seed/devfolio-avatar/400/400",
  avatarHint: PlaceHolderImages.find(p => p.id === 'profile-avatar')?.imageHint || "person programmer"
};

const skills = {
  technical: [
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Node.js", icon: "nodejs" },
    { name: "Python", icon: "python" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Tailwind CSS", icon: "tailwind" },
  ],
  soft: [
    "Resolución de problemas",
    "Trabajo en equipo",
    "Comunicación efectiva",
    "Pensamiento crítico",
    "Adaptabilidad",
    "Creatividad",
  ],
};

const projects = [
  {
    title: "Plataforma de E-commerce",
    description: "Una solución de comercio electrónico completa con carrito de compras, pasarela de pagos y panel de administración de productos.",
    image: PlaceHolderImages.find(p => p.id === 'project-1')?.imageUrl || "https://picsum.photos/seed/devfolio-proj1/600/400",
    imageHint: PlaceHolderImages.find(p => p.id === 'project-1')?.imageHint || "website design",
    tags: ["Next.js", "React", "Stripe", "PostgreSQL"],
    live: "#",
    github: "#",
  },
  {
    title: "Dashboard Analítico",
    description: "Dashboard para visualización de datos en tiempo real, ayudando a las empresas a tomar decisiones basadas en métricas clave.",
    image: PlaceHolderImages.find(p => p.id === 'project-2')?.imageUrl || "https://picsum.photos/seed/devfolio-proj2/600/400",
    imageHint: PlaceHolderImages.find(p => p.id === 'project-2')?.imageHint || "dashboard ui",
    tags: ["React", "D3.js", "Node.js", "WebSocket"],
    live: "#",
    github: "#",
  },
  {
    title: "Aplicación Móvil de Tareas",
    description: "App móvil multiplataforma para gestionar tareas diarias, con notificaciones y sincronización en la nube.",
    image: PlaceHolderImages.find(p => p.id === 'project-3')?.imageUrl || "https://picsum.photos/seed/devfolio-proj3/600/400",
    imageHint: PlaceHolderImages.find(p => p.id === 'project-3')?.imageHint || "mobile app",
    tags: ["React Native", "Firebase", "TypeScript"],
    live: "#",
    github: "#",
  },
];

const experience = [
    {
        date: "2021 - Presente",
        title: "Desarrollador Full Stack",
        company: "Tech Solutions Inc.",
        description: "Desarrollo y mantenimiento de aplicaciones web. Colaboración en equipos ágiles para entregar soluciones de software de alta calidad."
    },
    {
        date: "2020 - 2021",
        title: "Desarrollador Frontend (Prácticas)",
        company: "Innovatech",
        description: "Participé en la creación de interfaces de usuario interactivas y responsivas para diversos clientes, utilizando React y Vue.js."
    },
    {
        date: "2019 - 2020",
        title: "Grado en Ingeniería de Software",
        company: "Universidad Politécnica",
        description: "Formación académica completa en los fundamentos de la ingeniería de software, algoritmos, y estructuras de datos."
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
        fill="currentColor"
        d="M64 128c35.346 0 64-28.654 64-64S99.346 0 64 0 0 28.654 0 64s28.654 64 64 64Z"
      />
      <path
        fill="#fff"
        d="M98.683 103.933V53.844h-10.15v48.332L59.84 68.32H44.136v35.613h10.15V71.378l28.691 32.555h15.706Z"
      />
    </svg>
  ),
  nodejs: (props) => (
    <svg {...props} viewBox="0 0 256 256">
      <path fill="currentColor" d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM96.49,180a8,8,0,0,1-13,0L44,121.61V144a8,8,0,0,1-16,0V112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H51.61L90.06,174A8,8,0,0,1,96.49,180ZM224,144a8,8,0,0,1-8,8H176.4l20.8,25a8,8,0,1,1-11.2,11.2L164,163.6l-22.4,22.4a8,8,0,0,1-11.2-11.2l25-25H144a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8v12.8l16-16a8,8,0,0,1,11.2,11.2L198.4,136H216A8,8,0,0,1,224,144Z"/>
    </svg>
  ),
  python: (props) => (
    <svg {...props} viewBox="0 0 24 24">
       <path fill="currentColor" d="M22 10.5c0-.83-.67-1.5-1.5-1.5H15V6.5C15 5.67 14.33 5 13.5 5H9.42c-.47 0-.92.21-1.23.58L5.5 9H3.5C2.67 9 2 9.67 2 10.5v8c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-8zM12 18H5v-5.5h7V18zm0-6.5H5.48L7.9 9H12v2.5zM19 18h-6v-6.5h6V18z"/>
    </svg>
  ),
  typescript: (props) => (
    <svg {...props} viewBox="0 0 128 128">
      <path fill="#007ACC" d="M0 0h128v128H0z"/>
      <path fill="#fff" d="M21.1 91.8V36.2h10.9v49.2h28.1v6.4H21.1zm61.7-49.2c4 0 7.2 1.2 9.8 3.5 2.6 2.3 3.9 5.5 3.9 9.5 0 4.2-1.3 7.5-4 9.9-2.7 2.4-6.1 3.6-10.2 3.6h-5.9v21.9h-11v-48.4h17.4zm-11 20.5h4.6c2.4 0 4.3-.6 5.6-1.7 1.3-1.2 2-2.9 2-5.1 0-2.3-.6-4-1.8-5.3-1.2-1.2-2.9-1.9-4.9-1.9h-5.5v14z"/>
    </svg>
  ),
  tailwind: (props) => (
    <svg {...props} viewBox="0 0 24 24">
      <path fill="currentColor" d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.23-2.106 2.354-5.88 2.439-8.232.228-2.349-2.109-5.979-2.039-8.242-.228-2.262-2.268-2.34-5.88-.236-8.23 2.108-2.354 5.882-2.439 8.232-.228zm0 0"/>
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
            <Button asChild variant="outline">
                <a href="/cv-placeholder.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    CV
                </a>
            </Button>
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
      <Image
        src={personalInfo.avatar}
        width={400}
        height={400}
        alt="Foto de perfil"
        className="rounded-full object-cover border-4 border-primary shadow-2xl"
        data-ai-hint={personalInfo.avatarHint}
      />
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
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">Habilidades Técnicas</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {skills.technical.map((skill) => (
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
            email: "",
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
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-10 w-10" />
                            </a>
                            <a href="mailto:email@example.com" className="text-muted-foreground hover:text-primary transition-colors">
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
        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
          <Linkedin className="h-5 w-5" />
        </a>
        <a href="mailto:email@example.com" className="text-muted-foreground hover:text-primary transition-colors">
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
