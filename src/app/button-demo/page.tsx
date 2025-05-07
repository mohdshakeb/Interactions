"use client";

import { AnimatedButton } from "@/components/animated-button";

export default function ButtonDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <AnimatedButton 
        defaultText="Hover" 
        hoverText="Click" 
      />
    </div>
  );
} 