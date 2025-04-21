"use client";

import { useState, useEffect, useRef } from "react";
import { Poppins } from "next/font/google";

// Initialize the Poppins font with various weights
const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
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

export default function TextHover() {
  // These state variables are used in the component logic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovered, setIsHovered] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);
  const animeRef = useRef<AnimeInstance | null>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  
  // Load anime.js
  useEffect(() => {
    const loadAnime = async () => {
      try {
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
    
    return () => {
      const scriptElement = document.querySelector('script[src*="anime.min.js"]');
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!textRef.current || !animeRef.current || lettersRef.current.length === 0) return;
    
    const textRect = textRef.current.getBoundingClientRect();
    const mouseX = e.clientX - textRect.left;
    const mouseY = e.clientY - textRect.top;
    
    setMousePosition({ x: mouseX, y: mouseY });
    
    // Animate each letter based on its distance from the mouse
    lettersRef.current.forEach((letter) => {
      if (!letter) return;
      
      const letterRect = letter.getBoundingClientRect();
      const letterCenterX = letterRect.left + letterRect.width / 2 - textRect.left;
      const letterCenterY = letterRect.top + letterRect.height / 2 - textRect.top;
      
      // Calculate distance from mouse to letter
      const distanceX = mouseX - letterCenterX;
      const distanceY = mouseY - letterCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Calculate how much to move the letter (closer mouse = more movement)
      const movementFactor = Math.max(0, 1 - distance / 150);
      const moveX = -distanceX * movementFactor * 0.2;
      const moveY = -distanceY * movementFactor * 0.2;
      
      // Calculate rotation based on mouse position
      const rotation = distanceX * 0.05 * movementFactor;
      
      // Scale effect
      const scale = 1 + movementFactor * 0.3;
      
      // Font weight (400 = normal, 800 = bold)
      // Interpolate between 400 and 800 based on movement factor
      const fontWeight = 200 + Math.floor(movementFactor * 400);
      
      // Apply animation
      animeRef.current?.({
        targets: letter,
        translateX: moveX,
        translateY: moveY,
        rotate: rotation,
        scale: scale,
        fontWeight: fontWeight,
        easing: 'easeOutQuad',
        duration: 100
      });
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    
    // Reset all letters to their original position
    if (animeRef.current && lettersRef.current.length > 0) {
      animeRef.current({
        targets: lettersRef.current,
        translateX: 0,
        translateY: 0,
        rotate: 0,
        scale: 1,
        fontWeight: 200,
        easing: 'easeOutExpo',
        duration: 500
      });
    }
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Preprocess the text into letter spans
  const text = "Hover over me and move";
  const letters = text.split('').map((letter, index) => (
    <span 
      key={index}
      ref={(el) => {
        if (el && !lettersRef.current.includes(el)) {
          // Use index to position the element in the array
          lettersRef.current[index] = el;
        }
      }}
      className="inline-block transition-transform origin-center text-gray-800"
      style={{ 
        display: 'inline-block', 
        willChange: 'transform, font-weight',
        fontWeight: 200
      }}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </span>
  ));

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div 
        ref={textRef}
        className={`text-2xl text-center p-12 rounded-lg transition-all ${poppins.variable} font-sans relative cursor-default`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {letters}
      </div>
    </div>
  );
} 