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

const TechnologyIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    react: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m4.93 19.07 1.41-1.41"></path><path d="m17.66 6.34 1.41-1.41"></path></svg>
    ),
    nextjs: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 180 180"><path d="M90,0C40.294,0,0,40.294,0,90s40.294,90,90,90s90-40.294,90-90S139.706,0,90,0z M90,172.8c-45.713,0-82.8-37.087-82.8-82.8 S44.287,7.2,90,7.2s82.8,37.087,82.8,82.8S135.713,172.8,90,172.8z"/><path d="M121.73,132.866V47.134h-7.662l-31.96,55.421h-0.273V47.134H74.173v85.732h7.662l31.96-55.421h0.273v55.421H121.73z"/></svg>
    ),
    nodejs: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3H9zM7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm8-12v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-8zM13 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
    ),
    html: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622-13.257-.002.607 7.027h12.02l-.326 3.426-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414H5.45l.382 4.076h3.2z"/></svg>
    ),
    css: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm16.92 4.414L5.45 4.41l.382 4.076h6.105l-.246 2.87-2.623.702-.285-2.985H5.45l.348 3.593 6.18 1.634 6.202-1.634.6-6.635H8.455l-.246-2.87h10.33z"/></svg>
    ),
    javascript: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.247 1.583l19.507.001L19.97 19.982l-8.036 2.434-7.85-2.433L2.247 1.583zM16.93 7.824H9.725l-.21 2.373h7.197l-.31 3.52-2.32.63-2.36-.63-.14-1.62h-2.22l.3 3.42 4.42 1.2 4.52-1.2.55-6.18H9.51l-.18-2.02h9.82l.22-2.49h-12.7l.42 4.51z"/></svg>
    ),
    java: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5c0 .83-.67 1.5-1.5 1.5S7 17.33 7 16.5v-4c0-.83.67-1.5 1.5-1.5S10 11.67 10 12.5v4zm6.5-1.5c-.83 0-1.5-.67-1.5-1.5v-4c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5z"/></svg>
    ),
    springboot: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.62 10.38c.13-.5.2-1.03.2-1.58C20.82 5.15 17.98 2 14.2 2H9.8C6.02 2 3.18 5.15 3.18 8.8c0 .55.07 1.08.2 1.58-1.52.88-2.38 2.64-2.38 4.44v.2C1 17.9 3.12 20 5.8 20h2.15c.57-1.29 1.94-2.2 3.55-2.2s2.98.91 3.55 2.2h2.15c2.68 0 4.8-2.1 4.8-4.98v-.2c0-1.8-1-3.56-2.58-4.44zM10.3 6.4c0-.66.54-1.2 1.2-1.2s1.2.54 1.2 1.2v1.2c0 .66-.54 1.2-1.2 1.2s-1.2-.54-1.2-1.2V6.4zM7.3 12.4c0-.66.54-1.2 1.2-1.2s1.2.54 1.2 1.2v1.2c0 .66-.54 1.2-1.2 1.2s-1.2-.54-1.2-1.2v-1.2zm6 0c0-.66.54-1.2 1.2-1.2s1.2.54 1.2 1.2v1.2c0 .66-.54 1.2-1.2 1.2s-1.2-.54-1.2-1.2v-1.2z"/></svg>
    ),
};


const SkillCard = ({ icon, name }: { icon: string; name: string }) => {
  const Icon = TechnologyIcons[icon];
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {Icon ? <Icon className="h-10 w-10 text-accent" /> : <Code className="h-10 w-10 text-accent" />}
      <span className="font-medium">{name}</span>
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
      <div className="rounded-full overflow-hidden border-4 border-primary shadow-2xl w-[400px] h-[400px] flex items-center justify-center bg-muted text-muted-foreground p-8">
         <Image src={personalInfo.avatar} alt="Foto de perfil de Sergio Bravo Mora" width={400} height={400} className="w-full h-full object-contain" data-ai-hint={personalInfo.avatarHint}/>
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

const ExperienceAndEducationSection = () => (
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
