'use client';

import { TravelTimeCalculator } from '@/components/travel-time-calculator';
import { CodeViewLayout } from '@/components/code-view-layout';

export default function NumberSlidersPage() {
  return (
    <CodeViewLayout componentPath="src/components/travel-time-calculator/travel-time-calculator.tsx">
      <main className="flex w-full min-h-screen items-center justify-center bg-white">
        <TravelTimeCalculator />
      </main>
    </CodeViewLayout>
  );
} 