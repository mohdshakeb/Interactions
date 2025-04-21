"use client";

import { useState, useRef, useEffect } from "react";
import { Poppins } from "next/font/google";
import { motion as m, AnimatePresence } from "framer-motion";

// Initialize the Poppins font
const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Handle clicks outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        buttonRef.current && 
        !dropdownRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Dropdown menu items
  const menuItems = [
    "Profile",
    "Settings", 
    "Messages",
    "Notifications",
    "Logout"
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className={`
            px-6 py-2 rounded-lg bg-gray-50 text-gray-800 border border-gray-100
            hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-gray-200
            ${poppins.className} font-medium
          `}
        >
          Click
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <m.div
              ref={dropdownRef}
              initial={{ 
                opacity: 0, 
                scale: 0.5,
                transformOrigin: "left top"
              }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transformOrigin: "left top"
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.5,
                transformOrigin: "left top"
              }}
              transition={{ 
                type: "tween", 
                ease: "easeOut",
                duration: 0.15
              }}
              className={`
                absolute mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10
                ${poppins.className}
              `}
            >
              <div className="py-1">
                {menuItems.map((item, index) => (
                  <m.button
                    key={index}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.02,
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                    onClick={() => {
                      // Handle menu item click
                      console.log(`Clicked: ${item}`);
                      setIsOpen(false);
                    }}
                  >
                    {item}
                  </m.button>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 