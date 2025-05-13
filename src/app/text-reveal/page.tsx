'use client';

import { TextReveal } from '@/components/text-reveal';
import { CodeViewLayout } from '@/components/code-view-layout';

export default function TextRevealPage() {
  return (
    <CodeViewLayout componentPath="src/components/text-reveal/text-reveal.tsx">
      <TextReveal text="This text will reveal itself as you scroll down the page. Each word will animate in sequence, creating a smooth and engaging effect." />
    </CodeViewLayout>
  );
} 