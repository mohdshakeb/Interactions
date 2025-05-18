'use client';

import { TextHighlight } from '@/components/text-highlight';
import { CodeViewLayout } from '@/components/code-view-layout';

export default function TextHighlightPage() {
  return (
    <CodeViewLayout componentPath="src/components/text-highlight/text-highlight.tsx">
      <TextHighlight />
    </CodeViewLayout>
  );
} 