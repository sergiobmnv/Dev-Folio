"use client";

import React from "react";
import { Github, Mail } from "lucide-react";

const personalInfo = {
  name: "Sergio Bravo Mora",
};

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

export default Footer;
