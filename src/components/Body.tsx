"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Code,
  Github,
  Mail,
  ArrowRight,
  User,
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
import { TechnologyIcons } from "@/components/TechnologyIcons";

// --- DATA ---
const personalInfo = {
  name: "Sergio Bravo Mora",
  role: "Estudiante de Desarrollo Web",
  motto: "Persona proactiva, responsable, con buenas relaciones interpersonales y empática, con capacidad de trabajar en equipo y con ganas de crecer.",
  avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI1Ii8+PHBhdGggZD0iTTIwIDIxYTggOCAwIDAgMC0xNiAwIi8+PC9zdmc+",
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
        date: "2026 - Actual",
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
        date: "Junio 2023 - Agosto 2023",
        title: "Auxiliar en telecomunicaciones",
        company: "Empresa Wifi Villarrubia",
        description: "Asistencia en levantar redes wifi y fibra óptica. Mantenimiento de portátiles."
    }
];

// --- SUB-COMPONENTS ---

const SkillCard = ({ icon, name }: { icon: string; name: string }) => {
  const Icon = TechnologyIcons[icon as keyof typeof TechnologyIcons];
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-card rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg text-center">
      <Icon className="h-10 w-10 text-accent" />
      <span className="font-medium text-sm">{name}</span>
    </div>
  );
};


const PresentationSection = () => (
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
      <div className="rounded-full overflow-hidden border-4 border-primary shadow-2xl w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center bg-muted">
         <Image src={personalInfo.avatar} alt="Avatar de Sergio Bravo Mora" width={400} height={400} className="w-full h-full p-8 text-muted-foreground" data-ai-hint={personalInfo.avatarHint}/>
      </div>
    </div>
  </section>
);

const AboutMeSection = () => (
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
                <div className="aspect-[3/2] w-full overflow-hidden rounded-md mb-4">
                  <Image
                    src={project.image}
                    width={600}
                    height={400}
                    alt={`Captura de pantalla de ${project.title}`}
                    className="object-cover w-full h-full"
                    data-ai-hint={project.imageHint}
                  />
                </div>
                <CardDescription>{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between bg-secondary/50 dark:bg-card/50 pt-4">
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

const ExperienceAndEducationSection = () => (
    <section id="experiencia" className="py-20 bg-secondary dark:bg-card">
        <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Experiencia y Formación</h2>
            <div className="relative max-w-2xl mx-auto">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
                {experience.map((item, index) => (
                    <div key={index} className="relative pl-10 mb-10 last:mb-0">
                        <div className="absolute left-0 top-1.5 h-8 w-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                           <Briefcase className="h-4 w-4 text-primary"/>
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
            variant: "default"
        });
        form.reset();
    }
  
    return (
        <section id="contacto" className="py-20">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-12">Hablemos</h2>
                <Card className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2">
                        <CardContent className="p-8">
                             <h3 className="text-2xl font-semibold mb-2">Ponte en Contacto</h3>
                            <p className="text-muted-foreground mb-6">
                                ¿Tienes una pregunta o una propuesta? Envíame un mensaje.
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
                                                    <Textarea placeholder="Tu mensaje aquí..." className="min-h-[100px]" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full" size="lg">
                                        Enviar Mensaje <Mail className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                        <div className="hidden md:flex flex-col items-center justify-center text-center bg-secondary/70 dark:bg-card/80 p-8 rounded-r-lg">
                           <div className="mb-6">
                             <Mail className="h-16 w-16 text-primary mx-auto" />
                           </div>
                            <h3 className="text-2xl font-semibold mb-4">O encuéntrame en:</h3>
                            <div className="flex space-x-6">
                                <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Github className="h-10 w-10" />
                                </a>
                                <a href="mailto:sergiobmnv@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Mail className="h-10 w-10" />
                                </a>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default function Body() {
    return (
        <>
            <PresentationSection />
            <AboutMeSection />
            <ProjectsSection />
            <ExperienceAndEducationSection />
            <ContactSection />
        </>
    )
}
