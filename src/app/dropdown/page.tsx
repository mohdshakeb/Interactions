"use client";

import { Dropdown } from '@/components/dropdown';
import { CodeViewLayout } from '@/components/code-view-layout';

export default function DropdownPage() {
  // Simple array of strings (will use default icons)
  const menuItems = [
    'Profile',
    'Settings',
    'Help',
    'Sign out'
  ];
  
  return (
    <CodeViewLayout componentPath="src/components/dropdown/dropdown.tsx">
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Dropdown 
          items={menuItems}
          buttonText="Click"
          onItemSelect={(item) => console.log(`Selected: ${item}`)}
        />
      </div>
    </CodeViewLayout>
  );
} 