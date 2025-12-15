"use client";

import React, { useState, useEffect } from "react";
import { Code, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default Header;
