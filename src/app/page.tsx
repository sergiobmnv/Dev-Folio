"use client";

import React from "react";
import Header from "@/components/Header";
import Body from "@/components/Body";
import Footer from "@/components/Footer";

// --- MAIN PAGE COMPONENT ---
export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Body />
      </main>
      <Footer />
    </div>
  );
}
