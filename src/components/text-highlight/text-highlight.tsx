'use client';

import { useEffect, useRef } from 'react';

// Add GSAP types to window
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

interface HighlightColor {
  green: string;
  pink: string;
  blue: string;
}

export function TextHighlight() {
  const articleRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const highlightRefs = useRef<HTMLSpanElement[]>([]);
  const gsapRef = useRef<any>(null);

  // Define highlight colors
  const highlightColors = {
    green: '#1BFC06',
    pink: '#FF3366',
    blue: '#00CCFF'
  };

  // Load GSAP dynamically
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        // Load GSAP core
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        gsapScript.async = true;
        
        // Load ScrollTrigger plugin
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        scrollTriggerScript.async = true;
        
        // Make sure GSAP is loaded first
        gsapScript.onload = () => {
          document.head.appendChild(scrollTriggerScript);
        };
        
        // Initialize animations after both are loaded
        scrollTriggerScript.onload = () => {
          // Store the GSAP reference
          gsapRef.current = window.gsap;
          initAnimations();
        };
        
        document.head.appendChild(gsapScript);
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };
    
    loadGSAP();
    
    return () => {
      // Clean up scripts on unmount
      const scripts = document.querySelectorAll('script[src*="gsap"]');
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
      
      // Clean up any ScrollTrigger instances
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  // Initialize highlight animations once GSAP is loaded
  const initAnimations = () => {
    if (!gsapRef.current || !window.ScrollTrigger) return;
    
    const gsap = gsapRef.current;
    const { ScrollTrigger } = window;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Create a ScrollTrigger that works within the scrollable container
    ScrollTrigger.defaults({
      scroller: scrollContainerRef.current
    });
    
    // Refresh ScrollTrigger to ensure it works with the container
    ScrollTrigger.refresh();
    
    // Handle highlight animations
    highlightRefs.current.forEach((highlight, index) => {
      if (!highlight) return;
      
      // Choose color based on index (cycle through the colors)
      const colorKeys = Object.keys(highlightColors) as Array<keyof typeof highlightColors>;
      const colorKey = colorKeys[index % colorKeys.length];
      const color = highlightColors[colorKey];
      
      // Create a GSAP timeline for each highlight
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: highlight,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Set initial state - create a gradient mask that hides the text
      gsap.set(highlight, {
        backgroundSize: "0% 100%",
        backgroundPosition: "0% 0%",
        backgroundImage: `linear-gradient(to right, ${color}, ${color})`
      });
      
      // Animate the background size from left to right
      tl.to(highlight, {
        backgroundSize: "100% 100%",
        duration: 1.5,
        ease: "power2.inOut"
      });
    });
  };

  const addToHighlightRefs = (el: HTMLSpanElement | null, index: number) => {
    if (el && !highlightRefs.current.includes(el)) {
      highlightRefs.current[index] = el;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white py-12">
      <div 
        className="w-full max-w-2xl mx-auto px-6 h-[100vh] pb-16 overflow-hidden bg-white"
        ref={articleRef}
      >
        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="h-full overflow-y-auto pr-4 pb-48 pt-48 hide-scrollbar"
        >
          {/* Content */}
          <div className="pt-8">
            <h1 className="text-4xl font-medium mb-8 text-zinc-800">The Evolution of Web Animation</h1>
            
            <div className="text-zinc-600 leading-6 space-y-6 font-light">
              <p>
                The history of web animation is a fascinating journey that spans several decades. From the early days of simple GIFs to today's complex interactive experiences, web animation has transformed the way we interact with content online.
              </p>
              
              <h2 className="text-2xl font-light text-zinc-800 mt-8 mb-4">The Early Days</h2>
              
              <p>
                In the 1990s, web animation was in its infancy. <span ref={(el) => addToHighlightRefs(el, 0)} className="highlight-text">Designers relied heavily on GIF files to add movement to websites. These simple animations were often flashy and distracting,</span> but they represented the first steps toward dynamic web experiences.
              </p>
              
              <p>
                As web technologies evolved, Flash emerged as the dominant platform for creating web animations. Adobe Flash allowed designers to create rich interactive experiences with relatively small file sizes, making it ideal for the limited bandwidth of the time.
              </p>
              
              <h2 className="text-2xl font-light text-zinc-800 mt-8 mb-4">The CSS Revolution</h2>
              
              <p>
                The introduction of CSS3 marked a significant turning point for web animation. Suddenly, developers could create animations without relying on plugins or additional technologies. <span ref={(el) => addToHighlightRefs(el, 2)} className="highlight-text">CSS transitions and keyframe animations opened up new possibilities for creating smooth, performance-optimized animations directly in the browser.</span>
              </p>
              
              <p>
                With the decline of Flash and the rise of mobile browsing, CSS animations became increasingly important. They were lightweight, fast, and worked across different devices and browsers.
              </p>
              
              <h2 className="text-2xl font-light text-zinc-800 mt-8 mb-4">JavaScript Animation Libraries</h2>
              
              <p>
                While CSS animations were powerful, they had limitations. JavaScript libraries like GSAP, anime.js, and Motion filled the gap by <span ref={(el) => addToHighlightRefs(el, 3)} className="highlight-text">providing developers with fine-grained control over animations</span> and complex sequencing capabilities.
              </p>
              
              <p>
                These libraries made it possible to create sophisticated animations that responded to user interactions and could be precisely timed and controlled. They abstracted away browser inconsistencies and provided a clean API for creating animations.
              </p>
              
              <h2 className="text-2xl font-light text-zinc-800 mt-8 mb-4">Modern Animation Techniques</h2>
              
              <p>
                Today, web animation encompasses a wide range of techniques and approaches. From subtle micro-interactions to immersive 3D experiences, animation has become an essential part of user experience design.
              </p>
              
              <p>
                <span ref={(el) => addToHighlightRefs(el, 4)} className="highlight-text">The integration of animation with scrolling has become particularly important</span>, allowing content to respond dynamically as users navigate through a page. This approach creates a sense of depth and engagement that static content cannot match.
              </p>
              
              <h2 className="text-2xl font-light text-zinc-800 mt-8 mb-4">The Future of Web Animation</h2>
              
              <p>
                As web technologies continue to evolve, the possibilities for animation will only expand. WebGL and WebGPU are pushing the boundaries of what's possible, enabling complex 3D animations and immersive experiences that were once only possible in native applications.
              </p>
              
              <p>
                The future of web animation lies in creating experiences that are not just visually impressive but also meaningful and accessible. <span ref={(el) => addToHighlightRefs(el, 6)} className="highlight-text">The best animations enhance content without overwhelming it, guiding users through digital experiences in intuitive and delightful ways.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .highlight-text {
          background-repeat: no-repeat;
          background-position: left;
          background-size: 0% 100%;
          display: inline;
        }
        
        /* Hide scrollbar for all browsers while maintaining functionality */
        .hide-scrollbar {
          /* For Chrome, Safari, and Opera */
          &::-webkit-scrollbar {
            display: none;
            width: 0;
            background: transparent;
          }
          
          /* For Firefox */
          scrollbar-width: none;
          
          /* For IE and Edge */
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
} 