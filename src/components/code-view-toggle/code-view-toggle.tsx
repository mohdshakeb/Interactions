'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Copy, Check, X } from 'lucide-react';

// Custom hook for isomorphic layout effect (uses useLayoutEffect on client, useEffect on server)
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface CodeViewToggleProps {
  code: string;
  children: React.ReactNode;
}

const PANEL_WIDTH = 672; // 2xl = 672px
const PANEL_MARGIN = 16; // px

export function CodeViewToggle({ code, children }: CodeViewToggleProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Track if this is the initial mount
  useIsomorphicLayoutEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Prevent body horizontal scroll when code panel is open
  useEffect(() => {
    if (showCode) {
      document.body.classList.add('overflow-x-hidden');
    } else {
      document.body.classList.remove('overflow-x-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-x-hidden');
    };
  }, [showCode]);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Copy code to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  // Animation spring settings - consistent across all animations
  const springTransition = { 
    type: 'spring', 
    stiffness: 300, 
    damping: 30,
    mass: 1
  };
  
  // Drawer animation variants
  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' },
  };

  // Toggle styles based on state
  const toggleBg = showCode ? 'bg-zinc-800' : 'bg-zinc-200 border-zinc-100';
  const knobBg = showCode ? 'bg-zinc-50' : 'bg-zinc-50';
  // Adjusted knob position for smaller toggle
  const knobX = showCode ? 20 : 0;
  const hideLabel = showCode ? 'text-zinc-900 font-medium' : 'text-zinc-300 font-normal';
  const showLabel = showCode ? 'text-zinc-300 font-normal' : 'text-zinc-900 font-medium';

  // Total panel width including margin
  const totalPanelWidth = PANEL_WIDTH + PANEL_MARGIN;
  
  // The EXACT same shift is applied to both content and toggle
  // This ensures they remain perfectly aligned
  const elementShift = showCode ? -totalPanelWidth/2 : 0;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Main content and code panel in a flex row */}
      <div className="flex flex-1 min-h-screen bg-white overflow-x-hidden">
        {/* Content container with absolute positioning */}
        <div className="w-full min-h-screen relative overflow-hidden">
          {/* Centered content that shifts with the toggle */}
          <motion.div 
            ref={contentRef}
            className="absolute left-1/2 top-0 bottom-0 flex items-center justify-center w-full"
            style={{ 
              x: '-50%',
              // Apply initial values directly to avoid animation on first render
              width: showCode ? `calc(100% - ${totalPanelWidth}px)` : '100%',
              transform: `translateX(calc(-50% + ${elementShift}px))`
            }}
            animate={isMounted ? { 
              x: `calc(-50% + ${elementShift}px)`,
              width: showCode ? `calc(100% - ${totalPanelWidth}px)` : '100%',
            } : {}}
            transition={springTransition}
          >
            {children}
          </motion.div>
        </div>
        
        <AnimatePresence>
          {showCode && (
            <motion.aside
              className="fixed right-0 top-0 h-[calc(100vh-32px)] mt-4 mr-4 mb-4 w-full pl-4 pt-2 max-w-2xl bg-white z-40 flex flex-col overflow-hidden rounded-xl border border-zinc-200"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
              transition={springTransition}
              role="region"
              aria-label="Code panel"
            >
              {/* Header with code icon, title and copy button */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-zinc-600" />
                  <h3 className="text-lg font-medium text-zinc-600">Code</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={copyToClipboard}
                    className="p-1.5 rounded-md border border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-200 cursor-pointer"
                    aria-label="Copy code"
                    title="Copy code to clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-zinc-800" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button 
                    onClick={() => setShowCode(false)}
                    className="p-1.5 rounded-md border border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-200 cursor-pointer"
                    aria-label="Close code panel"
                    title="Close code panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 p-0 overflow-hidden">
                <pre className="h-full w-full text-zinc-500 rounded-lg overflow-auto text-xs custom-scrollbar bg-white pl-4 pt-2 pb-2 m-0" style={{ maxHeight: '100%', minHeight: '100%' }}>
                  <code>{code}</code>
                </pre>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle uses EXACTLY the same positioning logic as content */}
      <motion.div
        className="fixed bottom-6 left-1/2 z-50 flex items-center"
        style={{
          // Apply initial transform directly to avoid animation on first render
          transform: `translateX(calc(-50% + ${elementShift}px))`
        }}
        animate={isMounted ? { 
          x: `calc(-50% + ${elementShift}px)`,
        } : {}}
        transition={springTransition}
      >
        {/* Hide Code label */}
        <span className={`mr-2 text-sm transition-colors select-none ${hideLabel}`}>Hide Code</span>
        <button
          aria-label={showCode ? 'Hide code' : 'Show code'}
          onClick={() => setShowCode((v) => !v)}
          className={`relative w-11 h-6 rounded-full border ${toggleBg} flex items-center transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-zinc-100 cursor-pointer`}
        >
          <motion.div
            className={`absolute left-0.5 top-0.5 bottom-0.5 right-0.5 w-4.5 h-4.5 rounded-full shadow-md ${knobBg}`}
            style={{
              // Apply initial position directly to avoid animation on first render
              left: '0.125rem',
              top: '0.125rem',
              transform: `translateX(${knobX}px)`
            }}
            initial={false}
            animate={isMounted ? { x: knobX } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        </button>
        {/* Show Code label */}
        <span className={`ml-2 text-sm transition-colors select-none ${showLabel}`}>Show Code</span>
      </motion.div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4d4d8;
          border-radius: 8px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb,
        .custom-scrollbar:active::-webkit-scrollbar-thumb,
        .custom-scrollbar:focus::-webkit-scrollbar-thumb {
          opacity: 1;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #d4d4d8 transparent;
        }
      `}</style>
    </div>
  );
} 