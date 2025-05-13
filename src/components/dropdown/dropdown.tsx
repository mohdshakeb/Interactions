'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Poppins } from 'next/font/google';
import { ChevronDown, User, Settings, HelpCircle, LogOut } from 'lucide-react';

// Initialize the Poppins font
const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

// Default icon mapping
const defaultIcons: Record<string, React.ReactNode> = {
  'Profile': <User size={16} />,
  'Settings': <Settings size={16} />,
  'Help': <HelpCircle size={16} />,
  'Sign out': <LogOut size={16} />
};

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  items: (string | DropdownItem)[];
  onItemSelect?: (item: string) => void;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
}

export function Dropdown({ 
  items, 
  onItemSelect = () => {}, 
  buttonText = "Click",
  buttonIcon
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Process items to ensure they all have a consistent format
  const processedItems = items.map(item => {
    if (typeof item === 'string') {
      return {
        label: item,
        icon: defaultIcons[item] || null
      };
    }
    return item;
  });

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`
          pl-4 pr-3 py-2 rounded-lg bg-zinc-50 text-zinc-800 border border-zinc-200
          hover:bg-zinc-100 transition-all duration-300 cursor-pointer
          ${poppins.className} font-medium flex items-center justify-between
        `}
      >
        <span>{buttonText}</span>
        <motion.div
          className="ml-2"
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {buttonIcon || <ChevronDown size={20} className="text-zinc-800" />}
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
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
              absolute mt-2 w-48 bg-white rounded-lg shadow-lg border border-zinc-200 z-10
              ${poppins.className}
            `}
          >
            <div className="py-1">
              {processedItems.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.02,
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                  className="w-full text-left px-4 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors duration-200 flex items-center"
                  onClick={() => {
                    onItemSelect(item.label);
                    setIsOpen(false);
                  }}
                >
                  {item.icon && (
                    <span className="mr-2 text-zinc-600 flex-shrink-0">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 