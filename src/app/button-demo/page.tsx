"use client";

import { AnimatedButton } from "@/components/ui/AnimatedButton";

export default function ButtonDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <AnimatedButton 
        defaultText="Make payment" 
        hoverText="Start" 
      />
    </div>
  );
} 