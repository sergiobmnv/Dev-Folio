"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Code,
  Github,
  Mail,
  Moon,
  Sun,
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
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348"><title>React Logo</title><circle cx="0" cy="0" r="2.05" fill="#61DAFB"></circle><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse></g></svg>
  ),
  nextjs: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M48 0C21.49 0 0 21.49 0 48C0 74.51 21.49 96 48 96C74.51 96 96 74.51 96 48C96 21.49 74.51 0 48 0ZM69.54 71.99L51.98 42.99H65.62V71.99H69.54ZM62.53 71.99V42.99H48.14L29.98 71.99H43.62L52.97 54.17L62.22 71.99H62.53Z" fill="#000000"/></svg>
  ),
  nodejs: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="#8CC84B" d="M128 0a128 128 0 1 0 128 128A128 128 0 0 0 128 0Zm-12.7 210.8V134l-31-17.9v50.5L34 134.1V83.4l50.3-29.1v49.5l31 17.9v-49.5l49.8-28.8v83.4l-50.2 29.1v-49l-30.6-17.7v49.1l50.2 29v-50.6l50.3-29.1v83.4L128 240l-12.7-7.3Z"/></svg>
  ),
  html: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#E44D26" d="M12 2L3 4.2V21l9 2 9-2V4.2L12 2zm7 16.8l-7 2-7-2V6.2l7-1.5 7 1.5v11.1z"/><path fill="#F16529" d="M12 4.2L5 6.2v11.1l7 2V4.2z"/><path fill="#EBEBEB" d="M12 11.2H8.5l.3 3h3.2v-3zm0 5.5h-5l.4 4.3 4.6 1.5v-5.8zm4.5-5.5H12V8.2h4.8l-.3 3z"/><path fill="#FFF" d="M12 16.7h4.5l-.4 4.3-4.1 1.3v-5.6zM12 8.2v3h4.5l.3-3H12z"/></svg>
  ),
  css: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#264DE4" d="M12 2L3 4.2V21l9 2 9-2V4.2L12 2zm7 16.8l-7 2-7-2V6.2l7-1.5 7 1.5v11.1z"/><path fill="#2965F1" d="M12 4.2L5 6.2v11.1l7 2V4.2z"/><path fill="#EBEBEB" d="M12 11.2H8.5l.3 3h3.2v-3zm0 5.5h-5l.4 4.3 4.6 1.5v-5.8zm4.5-5.5H12V8.2h4.8l-.3 3z"/><path fill="#FFF" d="M12 16.7h4.5l-.4 4.3-4.1 1.3v-5.6zM12 8.2v3h4.5l.3-3H12z"/></svg>
  ),
  javascript: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="#F7DF1E"/><path d="M123.53,181.42h22.28s.33-2.28.68-3.92c1.7-8.23,2.4-15.05,2.4-18.7,0-5.49-2.06-9-6.17-9-3.72,0-6.18,2.77-6.18,7.36,0,5.2,2.46,9.15,6.53,12.2,4.8,3.58,11.39,6.7,16.63,9.8,5.4,3.2,10.2,7.3,12.5,13.1,2.5,6.3-1,12.8-8.9,12.8-10.4,0-15.5-5.8-17.1-15.8h-22.6s.7,15.9,11,23.3c7.9,5.5,19.3,5.9,27.2,1.8,9.2-4.7,13.5-13.9,13.5-23.8,0-12.7-6.1-21.3-15.7-28-4.9-3.4-10.3-6.2-15-8.8-5.3-2.9-8.4-5.3-8.4-8.9,0-3.3,2.2-5.7,5.5-5.7,3.1,0,5.1,2.4,5.1,6.1,0,4.2-2.1,7.2-5.7,9.6-3.8,2.6-9.1,5.3-9.1,5.3l-3.3,1.9M172.2,126.3h22.6c0-10.4-1.3-18.3-1.3-18.3-1.5,1.1-2.6,1.8-3.9,2.5-4.3,2.1-8.5,3.3-12.7,3.3-9.2,0-14.2-3.8-14.2-11.4,0-6.5,4.2-10.3,12-10.3,5.2,0,9,1.4,11.8,3.1l4.8,2.8V71.8h-23.1s-1,18.8-1,22.1c0,2.5-4,4.2-6.5,4.2-3.9,0-5.9-2.5-5.9-5.4,0-3.1,2.4-5,5.9-5,3.9,0,8.1.9,12.7,2.8l4.4,1.8V76.2c-2-.9-4.7-2.1-8-2.1-13.2,0-21.7,7-21.7,18.1,0,9.9,7,16.5,18.9,16.5,8.8,0,14.2-3.2,16-4.5Z"/></svg>
  ),
  java: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><g fill="#FFF"><path fill="#5382a1" d="m168.6 158.3l-24.1 13.9v-27.8l24.1-13.9z"/><path fill="#f89820" d="M127.9 30.1c-16 0-30.2 4-41.5 10.8l-12.3 7.1c-3.1 1.8-3.1-2.8 0-4.6l12.3-7.1c11.3-6.8 25.5-10.8 41.5-10.8s30.2 4 41.5 10.8l12.3 7.1c3.1 1.8 3.1-2.8 0-4.6l-12.3-7.1c-11.3-6.8-25.5-10.8-41.5-10.8z"/><path fill="#f89820" d="M211.2 68.3l-12.3 7.1c-3.1 1.8-3.1-2.8 0-4.6l12.3-7.1c3.1-1.8 3.1 2.8 0 4.6z"/><path fill="#5382a1" d="M211.2 68.3c-11.3 6.8-25.5 10.8-41.5 10.8-9.4 0-18.2-1.7-26-4.6l-24.1 13.9v49.8l24.1 13.9v-27.8l24.1-13.9c14.2 1.6 29.5 7.1 38.3 12.3l.5.3c3.1 1.8 3.1-2.8 0-4.6l-3.3-1.9c-11.3-6.8-25.5-10.8-41.5-10.8-4.9 0-9.6.6-14 1.7l-24.1 13.9v23.2l24.1-13.9c13.7-2.6 28.6-8.8 36.3-13.3l5.5-3.2c3.1-1.8 3.1 2.8 0 4.6l-5.5 3.2c-11.3 6.8-25.5 10.8-41.5 10.8-9.4 0-18.2-1.7-26-4.6l-24.1 13.9v49.8l24.1 13.9c6.6 3.7 13.8 6.5 21.4 8.2l-21.4 12.4c-3.1 1.8-3.1-2.8 0-4.6l21.4-12.4c11.3 2.5 23.3 3.8 35.7 3.8s24.4-1.3 35.7-3.8l21.4 12.4c3.1 1.8 3.1-2.8 0-4.6l-21.4-12.4c7.6-1.7 14.8-4.5 21.4-8.2l24.1-13.9v-49.8L211.2 68.3z"/><path fill="#f89820" d="M127.9 225.9c16 0 30.2-4 41.5-10.8l12.3-7.1c3.1-1.8 3.1 2.8 0 4.6l-12.3 7.1c-11.3 6.8-25.5 10.8-41.5 10.8s-30.2-4-41.5-10.8l-12.3-7.1c-3.1-1.8-3.1 2.8 0 4.6l12.3 7.1c11.3 6.8 25.5 10.8 41.5 10.8z"/><path fill="#5382a1" d="M44.7 187.7l12.3-7.1c3.1-1.8 3.1 2.8 0 4.6l-12.3 7.1c-3.1 1.8-3.1-2.8 0-4.6z"/><path fill="#f89820" d="m86.3 180.2l24.1 13.9v27.8l-24.1-13.9z"/><path fill="#5382a1" d="M44.7 187.7c11.3-6.8 25.5-10.8 41.5-10.8 9.4 0 18.2 1.7 26 4.6l24.1-13.9v-49.8l-24.1-13.9c-6.6-3.7-13.8-6.5-21.4-8.2l21.4-12.4c3.1-1.8 3.1 2.8 0 4.6L95.2 92c-11.3-2.5-23.3-3.8-35.7-3.8s-24.4 1.3-35.7 3.8L2.4 80.2c-3.1-1.8-3.1 2.8 0 4.6l21.4 12.4c-7.6 1.7-14.8 4.5-21.4 8.2L-1.7 120v49.8l24.1 13.9c11.3 6.8 25.5 10.8 41.5 10.8 4.9 0 9.6-.6 14-1.7l24.1-13.9v-23.2L45.8 178c-13.7 2.6-28.6 8.8-36.3 13.3l-5.5 3.2c-3.1 1.8-3.1-2.8 0-4.6l5.5-3.2c11.3-6.8 25.5-10.8 41.5-10.8 9.4 0 18.2 1.7 26 4.6l24.1-13.9v-49.8l-24.1-13.9c-14.2-1.6-29.5-7.1-38.3-12.3l-.5-.3c-3.1-1.8-3.1 2.8 0 4.6l3.3 1.9c11.3 6.8 25.5 10.8 41.5 10.8z"/></g></svg>
  ),
  springboot: (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#6DB33F" d="M21.1,10.2h-2.5V6.4c0-2.3-1.8-4.1-4.1-4.1H9.6c-2.3,0-4.1,1.8-4.1,4.1v7.7c0,2.3,1.8,4.1,4.1,4.1h7.7c2.3,0,4.1-1.8,4.1-4.1v-1.3h-2.5v1.3c0,0.9-0.7,1.6-1.6,1.6H9.6c-0.9,0-1.6-0.7-1.6-1.6V6.4c0-0.9,0.7-1.6,1.6-1.6h7.7c0.9,0,1.6,0.7,1.6,1.6v1.3h2.5V6.4C22.7,4,20.4,1.8,17.3,1.8H9.6C6.5,1.8,4.2,4,4.2,6.4v7.7c0,2.4,2.3,4.6,5.4,4.6h7.7c3.1,0,5.4-2.2,5.4-4.6V10.2z M18.6,11.5c-0.4,0-0.7,0.3-0.7,0.7s0.3,0.7,0.7,0.7s0.7-0.3,0.7-0.7S18.9,11.5,18.6,11.5z"/></svg>
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

// --- HEADER COMPONENT ---
const PortfolioHeader = () => {
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

// --- FOOTER COMPONENT ---
const PortfolioFooter = () => (
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
export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PortfolioHeader />
      <main className="flex-1">
        <PresentationSection />
        <AboutMeSection />
        <ProjectsSection />
        <ExperienceAndEducationSection />
        <ContactSection />
      </main>
      <PortfolioFooter />
    </div>
  );
}
