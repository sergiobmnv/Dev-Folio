"use client";

import React from 'react';

// Iconos optimizados con padding interno para evitar que se vean borrosos en los bordes
const HtmlIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#E34F26" d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0z"/>
    <path fill="#EF652A" d="M12 22l6.4-1.8L19.9 3.2H12V22z"/>
    <path fill="#ECECEC" d="M12 10.6h4.7l.2-2.6H12v-2.7h7.6l-.6 6.5H12v-1.2z"/>
    <path fill="#FFF" d="M12 17.6l-2.7-.7-.2-2h-2.6l.3 4 5.2 1.4v-2.7z"/>
  </svg>
);

const CssIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#1572B6" d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0z"/>
    <path fill="#33A9DC" d="M12 22l6.4-1.8L19.9 3.2H12V22z"/>
    <path fill="#ECECEC" d="M12 10.6h4.7l.2-2.6H12v-2.7h7.6l-.6 6.5H12v-1.2z"/>
    <path fill="#FFF" d="M12 17.6l-2.7-.7-.2-2h-2.6l.3 4 5.2 1.4v-2.7z"/>
  </svg>
);

const JavascriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#F7DF1E" d="M0 0h24v24H0z"/>
    <path d="M18.7 12c0 2-.1 3.2-3.1 3.2-1.5 0-2.4-.8-2.8-2h2.1c.2.6.5.9 1.1.9.7 0 1-.3 1-1s-4.2-1.4-4.2-4.1c0-1.4 1-2.6 2.8-2.6 1.5 0 2.4.7 2.6 2h-2c-.1-.5-.4-.7-.9-.7-.5 0-.8.3-.8.8 0 1.5 4.1 1.2 4.1 4.1zM11.6 15.2c0 .4-.1.6-.5.7-.4.1-.7 0-.8-.5l-.1-4.6h-2.1v4.7c0 1.5.8 2.1 2.3 2.1 1.3 0 2.2-.5 2.3-1.8l.1-5h-2.1l-.1 4.4z"/>
  </svg>
);

const JavaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#007396" d="M15.8 13.8c-.8 0-1.5.2-2.1.5l-.6.4-.6.3c-.6.3-1.2.4-1.8.4-.7 0-1.3-.2-1.9-.5l-.7-.4c-1.1-.6-2.3-.9-3.5-.9-1 0-1.9.2-2.8.6.5-.4 1-.6 1.6-.6h.1c.6 0 1.2.1 1.8.4l.7.4c.6.3 1.2.5 1.9.5.7 0 1.3-.2 1.9-.5l.7-.4c.6-.3 1.2-.5 1.9-.5.7 0 1.4.2 2.1.5l.4.2c-.4-.1-.8-.2-1.1-.2z"/>
    <path fill="#E76F00" d="M11 2c.2 1 .3 2.4-.6 3.4-1 1-2.4 1-2.4 1s.4-1.2 1.4-1.2a2.6 2.6 0 011.3-.4c.8-.1 1-.8 1-.8s-.6-.6-1.5-.6c-1.1 0-2.1.3-3.1.8-.5.2-1 .6-1.4 1.1.4-2 1.9-3.3 4.5-3.3 1 0 1.8.2 2.6.6z"/>
  </svg>
);

const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="-11.5 -10.2 23 20.4" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2" fill="#61DAFB"/>
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

const NextjsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="62" fill="#000" stroke="#fff" strokeWidth="4"/>
    <path d="M93 94L55 46v42h-8V34h8l38 48V34h8v60h-8z" fill="#fff"/>
  </svg>
);

const NodejsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#339933" d="M12 24l10.4-6v-12L12 0 1.6 6v12L12 24z"/>
    <path fill="#FFF" d="M12 4.4L18.4 8v8L12 19.6 5.6 16V8L12 4.4z"/>
    <path fill="#339933" d="M8.5 15.3l-1.4-.8V9.5l1.4-.8v6.6zm7 0l-1.4-.8V9.5l1.4-.8v6.6z"/>
  </svg>
);

const SpringbootIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#6DB33F" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 18c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/>
    <path fill="#FFF" d="M12 8.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z"/>
  </svg>
);

export const TechnologyIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  html: HtmlIcon,
  css: CssIcon,
  javascript: JavascriptIcon,
  java: JavaIcon,
  react: ReactIcon,
  nextjs: NextjsIcon,
  nodejs: NodejsIcon,
  springboot: SpringbootIcon,
};