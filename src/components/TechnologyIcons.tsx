"use client";

import React from 'react';

// Optimized and corrected SVG components for each technology
// Each SVG has a consistent viewBox and styling properties for better rendering.

const HtmlIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622-13.257-.002.607 7.027h12.02l-.326 3.426-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414H5.45l.382 4.076h3.2z"/></svg>
);

const CssIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm16.92 4.414L5.45 4.41l.382 4.076h6.105l-.246 2.87-2.623.702-.285-2.985H5.45l.348 3.593 6.18 1.634 6.202-1.634.6-6.635H8.455l-.246-2.87h10.33z"/></svg>
);

const JavascriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor">
    <path d="M0 0h32v32H0z"/>
    <path fill="#fff" d="M11.95 24.223h-3.9l-1.64-8.577h11.23l-.33 1.8h-8.8l.55 3.12h8.04l-.88 4.67-4.18 1.42-4.09-1.42zM23.11 10.3h-11.2l.55 3.01h9.54l.55-3.01z"/>
  </svg>
);

const JavaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.83 10.14a3.85 3.85 0 00-1.85-1.57 3.29 3.29 0 00-.37-2.31 3.53 3.53 0 00-2-1.88 3.33 3.33 0 00-2.34-.14 4.5 4.5 0 00-2.5 1.5l.3-.22a4.49 4.49 0 00-2.49-1.5 3.33 3.33 0 00-2.34.14 3.53 3.53 0 00-2 1.88 3.29 3.29 0 00-.37 2.31 3.85 3.85 0 00-1.85 1.57 3.32 3.32 0 00-.23 2.45A3.49 3.49 0 007 14.53a4 4 0 002.39.29 4.39 4.39 0 003-1.67 4.31 4.31 0 002.83 1.66 4 4 0 002.39-.29 3.49 3.49 0 002.26-1.94 3.32 3.32 0 00-.22-2.45zM12 4.42a1.5 1.5 0 11-1.5 1.5A1.5 1.5 0 0112 4.42zm-5.69 11.21a1.27 1.27 0 01-1.28.32 1.5 1.5 0 01-1-1.83 1.48 1.48 0 011.83-1 1.27 1.27 0 01.32 1.28 1.51 1.51 0 01- .87zm7.32.22c-.66.86-1.5 1-2.28.64a1 1 0 01-.58-.83 3.28 3.28 0 01.34-1.72 1.15 1.15 0 011.1-.69 1.51 1.51 0 011.19.46c.33.37.66.75 1 1.11a.48.48 0 01-.15.71c-.2.12-.42.22-.62.32zm4.31-1.53a1.5 1.5 0 01-1-1.83 1.48 1.48 0 011.83-1l.31 1.28a1.52 1.52 0 01-.87.87z"/>
    </svg>
);

const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

const NextjsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="64" fill="black"/>
    <path d="M103.398 42.9323H94.1311L67.6418 88.8233H66.8048V42.9323H58.293V103.5H67.5599L94.0492 57.609H94.8862V103.5H103.398V42.9323Z" fill="white"/>
    <path d="M42.7578 103.5H51.269V42.9323H42.7578V103.5Z" fill="white"/>
  </svg>
);

const NodejsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.35,2.05a.981.981,0,0,0-.7,0L2.35,7.55a1,1,0,0,0,0,1.74l8.23,4.75.02.01,1.43.83,1.43-.83.02-.01,8.23-4.75a1,1,0,0,0,0-1.74Zm-1.5,1.74,6.82,3.94-2.58,1.49L8.27,5.28Zm-5.32,3.07,3.9,2.25-3.9,2.25Zm8.64,13.14-8.23-4.75a1,1,0,0,0-1.07.92,1,1,0,0,0,.08.38l8.23,4.75a1,1,0,0,0,1,0l8.23-4.75a1,1,0,0,0,.08-.38.994.994,0,0,0-1.07-.92Z"/>
    </svg>
);

const SpringbootIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.5,9.5C21.75,8.83,22,8.16,22,7.5A5.5,5.5,0,0,0,16.5,2H7.5A5.5,5.5,0,0,0,2,7.5c0,0.66.25,1.33.5,2C1,10.34,0,12.17,0,14v1a5,5,0,0,0,5,5H19a5,5,0,0,0,5-5v-1C24,12.17,23,10.34,21.5,9.5M16,5a1,1,0,0,1,1,1,1,1,0,0,1-1,1h-1V6A1,1,0,0,1,16,5m-4,1.5a1.5,1.5,0,1,1,1.5,1.5A1.5,1.5,0,0,1,12,6.5M8,5a1,1,0,0,1,1-1h1V7a1,1,0,0,1-1,1A1,1,0,0,1,8,7Z"/>
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
