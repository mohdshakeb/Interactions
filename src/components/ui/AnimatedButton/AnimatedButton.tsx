"use client";

import { FC, useRef, useState, useEffect } from "react";
import { Poppins } from "next/font/google";

// Initialize the Poppins font
const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

// Define anime.js types
interface AnimeInstance {
  (params: object): { [key: string]: unknown };
}

// Add TypeScript interface for window to recognize anime
declare global {
  interface Window {
    anime: AnimeInstance;
  }
}

interface AnimatedButtonProps {
  defaultText: string;
  hoverText: string;
}

export const AnimatedButton: FC<AnimatedButtonProps> = ({ 
  defaultText = "Make payment", 
  hoverText = "Start" 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement | null>(null);
  const reverseRippleRef = useRef<HTMLDivElement | null>(null);
  const animeRef = useRef<AnimeInstance | null>(null);
  
  // Dynamically import anime.js to avoid server-side rendering issues
  useEffect(() => {
    // Using a more direct approach with global variable 
    const loadAnime = async () => {
      try {
        // We'll rely on the window-level import
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
        script.async = true;
        script.onload = () => {
          animeRef.current = window.anime;
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error("Failed to load anime.js:", error);
      }
    };
    
    loadAnime();
    
    // Cleanup function
    return () => {
      const scriptElement = document.querySelector('script[src*="anime.min.js"]');
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !animeRef.current) return;
    
    // Get button dimensions and position
    const buttonRect = buttonRef.current.getBoundingClientRect();
    
    // Calculate the position where mouse entered relative to the button
    const x = e.clientX - buttonRect.left;
    const y = e.clientY - buttonRect.top;
    setMousePosition({ x, y });
    
    // Remove any existing reverse ripple
    if (reverseRippleRef.current && reverseRippleRef.current.parentNode) {
      reverseRippleRef.current.parentNode.removeChild(reverseRippleRef.current);
      reverseRippleRef.current = null;
    }
    
    // Create ripple element if it doesn't exist
    if (!rippleRef.current) {
      const ripple = document.createElement('div');
      ripple.className = 'absolute rounded-full bg-green-500 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none';
      buttonRef.current.appendChild(ripple);
      rippleRef.current = ripple;
    }
    
    // Position the ripple at mouse entry point
    if (rippleRef.current) {
      rippleRef.current.style.left = `${x}px`;
      rippleRef.current.style.top = `${y}px`;
      rippleRef.current.style.width = '0';
      rippleRef.current.style.height = '0';
      rippleRef.current.style.opacity = '0.8';
      rippleRef.current.style.zIndex = '1';
      
      // Calculate diagonal distance from click to farthest corner
      const topLeft = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      const topRight = Math.sqrt(Math.pow(buttonRect.width - x, 2) + Math.pow(y, 2));
      const bottomLeft = Math.sqrt(Math.pow(x, 2) + Math.pow(buttonRect.height - y, 2));
      const bottomRight = Math.sqrt(Math.pow(buttonRect.width - x, 2) + Math.pow(buttonRect.height - y, 2));
      
      // Get the maximum dimension to ensure the ripple covers the entire button
      const maxDimension = Math.max(
        buttonRect.width * 2,
        buttonRect.height * 2,
        topLeft * 2,
        topRight * 2,
        bottomLeft * 2,
        bottomRight * 2
      );
      
      // Animate the ripple
      animeRef.current({
        targets: rippleRef.current,
        width: maxDimension,
        height: maxDimension,
        opacity: 0.6,
        easing: 'easeOutQuad',
        duration: 600
      });
    }
    
    setIsHovered(true);
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !animeRef.current) return;
    
    // Get button dimensions and position
    const buttonRect = buttonRef.current.getBoundingClientRect();
    
    // Calculate the position where mouse exited relative to the button
    const x = e.clientX - buttonRect.left;
    const y = e.clientY - buttonRect.top;
    
    // Create reverse ripple element
    if (!reverseRippleRef.current) {
      const reverseRipple = document.createElement('div');
      reverseRipple.className = 'absolute rounded-full bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none';
      reverseRipple.style.zIndex = '2';
      buttonRef.current.appendChild(reverseRipple);
      reverseRippleRef.current = reverseRipple;
    }
    
    // Position the reverse ripple at mouse exit point
    if (reverseRippleRef.current) {
      reverseRippleRef.current.style.left = `${x}px`;
      reverseRippleRef.current.style.top = `${y}px`;
      reverseRippleRef.current.style.width = '0';
      reverseRippleRef.current.style.height = '0';
      reverseRippleRef.current.style.opacity = '0.9';
      
      // Calculate diagonal distance from exit point to farthest corner
      const topLeft = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      const topRight = Math.sqrt(Math.pow(buttonRect.width - x, 2) + Math.pow(y, 2));
      const bottomLeft = Math.sqrt(Math.pow(x, 2) + Math.pow(buttonRect.height - y, 2));
      const bottomRight = Math.sqrt(Math.pow(buttonRect.width - x, 2) + Math.pow(buttonRect.height - y, 2));
      
      // Get the maximum dimension to ensure the ripple covers the entire button
      const maxDimension = Math.max(
        buttonRect.width * 2,
        buttonRect.height * 2,
        topLeft * 2,
        topRight * 2,
        bottomLeft * 2,
        bottomRight * 2
      );
      
      // Animate the reverse ripple
      animeRef.current({
        targets: reverseRippleRef.current,
        width: maxDimension,
        height: maxDimension,
        opacity: 0.95,
        easing: 'easeOutQuad',
        duration: 600,
        complete: () => {
          // Clean up the green ripple if it exists
          if (rippleRef.current && rippleRef.current.parentNode) {
            rippleRef.current.parentNode.removeChild(rippleRef.current);
            rippleRef.current = null;
          }
        }
      });
    }
    
    setIsHovered(false);
  };

  // Calculate the total duration for the first text to slide out
  const totalPaymentSlideDuration = (defaultText.length - 1) * 30;

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        px-4 py-2 rounded-2xl font-medium bg-gray-800 text-white shadow-md 
        relative overflow-hidden w-48 h-14 cursor-pointer transition-all duration-300
        ${isHovered ? 'shadow-xl translate-y-[-2px]' : ''}
        ${poppins.className}
      `}
    >
      <div className="relative overflow-hidden w-full h-full z-10">
        <div className="absolute inset-0 flex items-center justify-center w-full">
          <div className="flex text-md font-medium">
            {defaultText.split('').map((char, index) => (
              <span
                key={`payment-${index}`}
                className={`
                  transform transition-all duration-300 ease-in-out
                  ${isHovered 
                    ? `opacity-0 translate-y-[-20px] delay-[${index * 30}ms]` 
                    : `opacity-100 translate-y-0 delay-[${(hoverText.length + 2) * 30 + index * 30}ms]`
                  }
                `}
                style={{
                  transitionDelay: isHovered ? `${index * 30}ms` : `${(hoverText.length + 2) * 30 + (defaultText.length - index - 1) * 30}ms`
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center w-full">
          <div className="flex text-md font-medium">
            {hoverText.split('').map((char, index) => (
              <span
                key={`start-${index}`}
                className={`
                  transform transition-all duration-300 ease-in-out
                  ${isHovered 
                    ? `opacity-100 translate-y-0` 
                    : `opacity-0 translate-y-[20px]`
                  }
                `}
                style={{
                  transitionDelay: isHovered 
                    ? `${totalPaymentSlideDuration + index * 30}ms` 
                    : `${index * 30}ms`
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}; 