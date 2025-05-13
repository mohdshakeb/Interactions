'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CodeViewToggle } from './code-view-toggle';

interface CodeViewLayoutProps {
  componentPath: string;
  children: React.ReactNode;
}

export function CodeViewLayout({ componentPath, children }: CodeViewLayoutProps) {
  const [componentCode, setComponentCode] = useState<string>('Loading code...');
  const pathname = usePathname();
  
  // Skip the code view for homepage
  if (pathname === '/') {
    return <>{children}</>;
  }
  
  useEffect(() => {
    // Fetch the component code
    fetch(`/api/component-code?path=${encodeURIComponent(componentPath)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch component code');
        }
        return response.json();
      })
      .then(data => {
        setComponentCode(data.code);
      })
      .catch(error => {
        console.error('Error fetching component code:', error);
        setComponentCode('Error loading code: ' + error.message);
      });
  }, [componentPath]);
  
  return (
    <CodeViewToggle code={componentCode}>
      {children}
    </CodeViewToggle>
  );
} 