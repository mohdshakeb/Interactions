import React from 'react';

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      )}
      <div className="mt-4 flex justify-center">
        <div className="h-1 w-20 bg-blue-500 rounded"></div>
      </div>
    </div>
  );
} 