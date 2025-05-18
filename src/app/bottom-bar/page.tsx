'use client';

import { AssetCounterDemo } from '@/components/asset-counter-demo';
import { CodeViewLayout } from '@/components/code-view-layout';

export default function BottomBarPage() {
  return (
    <CodeViewLayout componentPath="src/components/asset-counter-demo/asset-counter-demo.tsx">
      <AssetCounterDemo />
    </CodeViewLayout>
  );
} 