"use client";

import { TextHover } from '@/components/text-hover';
import { CodeViewLayout } from '@/components/code-view-layout';

export default function TextHoverPage() {
  return (
    <CodeViewLayout componentPath="src/components/text-hover/text-hover.tsx">
      <TextHover />
    </CodeViewLayout>
  );
} 