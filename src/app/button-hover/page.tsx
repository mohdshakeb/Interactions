"use client";

import { AnimatedButton } from "@/components/animated-button";
import { CodeViewLayout } from "@/components/code-view-layout";

export default function ButtonHover() {
  return (
    <CodeViewLayout componentPath="src/components/animated-button/animated-button.tsx">
      <div className="flex items-center justify-center min-h-screen bg-white">
        <AnimatedButton 
          defaultText="Hover" 
          hoverText="Click" 
        />
      </div>
    </CodeViewLayout>
  );
} 