import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

interface CardProps {
  category: string;
  title: string;
  image: string;
  altText: string;
  href: string;
}

export function Card({ 
  category,
  title, 
  image, 
  altText, 
  href
}: CardProps) {
  return (
    <Link href={href} className="no-underline">
      <div className="flex-shrink-0 w-72 bg-zinc-50 border border-zinc-100 rounded-xl overflow-hidden transition-all duration-300 transform hover:shadow-md hover:-translate-y-1">
        <div className="p-3 pb-0">
          <p className="text-sm text-zinc-500 mb-1">{category}</p>
        </div>
        {/* Image container with equal padding as text and 1:1 aspect ratio */}
        <div className="px-2 pb-0">
          <div className="w-full aspect-square bg-zinc-50 rounded-lg flex items-center justify-center">
            {/* Using a regular img tag for compatibility */}
            <img 
              src={image} 
              alt={altText}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
        <div className="p-3">
          <h2 className="text-md font-medium text-zinc-800">{title}</h2>
        </div>
      </div>
    </Link>
  );
} 