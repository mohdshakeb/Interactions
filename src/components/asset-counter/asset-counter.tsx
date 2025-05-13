'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Trash2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NumberFlow from '@number-flow/react';
import { Dropdown } from '../dropdown/dropdown';

// Common animation settings for NumberFlow components
const numberFlowAnimation = {
  transformTiming: {
    duration: 400,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  opacityTiming: {
    duration: 200,
    easing: 'ease-out'
  }
};

// Custom styled dropdown for AssetCounter
function AssetCounterDropdown({
  items,
  onItemSelect
}: {
  items: string[];
  onItemSelect: (item: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleItemClick = (item: string) => {
    onItemSelect(item);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded-md bg-zinc-800 text-white pr-3 cursor-pointer"
        aria-label="More options"
        whileHover={{ backgroundColor: '#3f3f46' }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {/* Icon container */}
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            whileHover={{ rotate: isOpen ? 180 : -180 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown 
              size={18} 
              className="text-white" 
            />
          </motion.div>
        </div>
        
        <span className="text-xs font-medium whitespace-nowrap">
          Move to collection
        </span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
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
            className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg border border-zinc-200 z-10"
          >
            <div className="py-1">
              {items.map((item, index) => (
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
                  onClick={() => handleItemClick(item)}
                >
                  <span>{item}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AssetCounterProps {
  total: number;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  onFavorite?: (index: number) => void;
  onTrash?: (index: number) => void;
  onDropdown?: (item: string) => void;
  favorites?: number[];
  trashed?: number[];
}

export function AssetCounter({
  total,
  initialIndex = 0,
  onIndexChange,
  onFavorite,
  onTrash,
  onDropdown = () => {},
  favorites = [],
  trashed = []
}: AssetCounterProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Update internal state when initialIndex prop changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);
  
  const handlePrevious = () => {
    const newIndex = currentIndex <= 0 ? total - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  };
  
  const handleNext = () => {
    const newIndex = currentIndex >= total - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    if (onIndexChange) onIndexChange(newIndex);
  };
  
  const handleFavorite = () => {
    if (onFavorite) onFavorite(currentIndex);
  };
  
  const handleTrash = () => {
    if (onTrash) onTrash(currentIndex);
  };
  
  const handleDropdownSelect = (item: string) => {
    if (onDropdown) onDropdown(item);
  };
  
  // Check if current item is favorited or trashed
  const isCurrentFavorite = favorites.includes(currentIndex);
  const isCurrentTrashed = trashed.includes(currentIndex);
  
  // Define dropdown items
  const dropdownItems = ['Collection 1', 'Collection 2', 'Collection 3', 'New Collection'];
  
  // Don't render if there are no assets
  if (total <= 0) return null;
  
  return (
    <motion.div 
      className="flex items-center justify-center bg-white border border-zinc-100 rounded-lg px-1 py-1 shadow-lg"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Navigation controls */}
      <div className="flex items-center">
        <motion.button 
          onClick={handlePrevious}
          className="p-1 rounded-lg"
          aria-label="Previous asset"
          whileTap={{ scale: 0.9 }}
          whileHover={{ textDecorationColor: 'rgb(63 63 71)' }}
        >
          <ChevronLeft size={20} className="text-zinc-400 hover:text-zinc-700 transition-colors duration-200 cursor-pointer" />
        </motion.button>
        
        <div className="min-w-[32px] text-center">
          <span className="text-md font-medium text-zinc-800">
            <NumberFlow 
              value={currentIndex + 1}
              willChange
              format={{ useGrouping: false }}
              transformTiming={numberFlowAnimation.transformTiming}
              opacityTiming={numberFlowAnimation.opacityTiming}
            />
            <span>/</span>
            <NumberFlow 
              value={total}
              willChange={false}
              format={{ useGrouping: false }}
            />
          </span>
        </div>
        
        <motion.button 
          onClick={handleNext}
          className="p-1 rounded-lg"
          aria-label="Next asset"
          whileTap={{ scale: 0.9 }}
          whileHover={{ textDecorationColor: 'rgb(63 63 71)'}}
        >
          <ChevronRight size={20} className="text-zinc-400 hover:text-zinc-700 transition-colors duration-200 cursor-pointer" />
        </motion.button>
      </div>
      
      {/* Divider */}
      <motion.div 
        className="h-6 w-px ml-2 mr-4 bg-zinc-200"
        initial={{ height: 0 }}
        animate={{ height: 24 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      
      {/* Action buttons */}
      <div className="flex items-center space-x-2">
        {/* Favorite button with expanding text */}
        <motion.button 
          onClick={handleFavorite}
          className={`
            group flex items-center overflow-hidden rounded-md cursor-pointer
            ${isCurrentFavorite 
              ? 'bg-green-500 text-white' 
              : 'bg-green-100 text-green-600'
            }
          `}
          aria-label={isCurrentFavorite ? "Remove from favorites" : "Add to favorite"}
          whileHover={{ 
            width: 'auto',
            paddingRight: 12,
            backgroundColor: isCurrentFavorite ? '#16a34a' : '#16a34a',
            color: 'white'
          }}
          initial={{ width: 32 }}
          animate={{ 
            backgroundColor: isCurrentFavorite ? '#16a34a' : '#dcfce7',
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: "tween",
            ease: "easeIn",
            duration: 0.2,
            exit: {
              ease: "easeOut",
              duration: 0.2
            },
            
          }}
        >
          {/* Square icon container */}
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer">
            <motion.div
              animate={isCurrentFavorite ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart 
                size={18} 
                className={`
                  transition-colors duration-200
                  ${isCurrentFavorite ? 'text-white fill-white' : 'group-hover:text-white'} 
                `} 
              />
            </motion.div>
          </div>
          
          <span className="whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-[120px] transition-all duration-300 opacity-0 group-hover:opacity-100 text-xs font-medium">
            {isCurrentFavorite ? 'Favorited' : 'Favorite'}
          </span>
        </motion.button>
        
        {/* Trash button with expanding text */}
        <motion.button 
          onClick={handleTrash}
          className={`
            group flex items-center overflow-hidden rounded-md cursor-pointer
            ${isCurrentTrashed 
              ? 'bg-red-500 text-white opacity-80' 
              : 'bg-red-100 text-red-600'
            }
          `}
          aria-label={isCurrentTrashed ? "Already in trash" : "Move to trash"}
          disabled={isCurrentTrashed}
          whileHover={{ 
            width: 'auto',
            paddingRight: 12,
            backgroundColor: isCurrentTrashed ? '#ef4444' : '#ef4444',
            color: 'white'
          }}
          initial={{ width: 32 }}
          animate={{ 
            backgroundColor: isCurrentTrashed ? '#ef4444' : '#fee2e2',
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: "tween",
            ease: "easeIn",
            duration: 0.2,
            exit: {
              ease: "easeOut",
              duration: 0.15

            },
          }}
        >
          {/* Square icon container */}
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer">
            <Trash2 
              size={18} 
              className={`
                transition-colors duration-200
                ${isCurrentTrashed ? 'text-white' : 'group-hover:text-white'} 
              `} 
            />
          </div>
          
          <span className="whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-[120px] transition-all duration-300 opacity-0 group-hover:opacity-100 text-xs font-medium">
            {isCurrentTrashed ? 'Trashed' : 'Move to trash'}
          </span>
        </motion.button>
        
        {/* Divider */}
      <motion.div 
        className="h-6 w-px ml-2 mr-4 bg-zinc-200"
        initial={{ height: 0 }}
        animate={{ height: 24 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />

        {/* Custom styled dropdown */}
        <AssetCounterDropdown
          items={dropdownItems}
          onItemSelect={handleDropdownSelect}
        />
      </div>
    </motion.div>
  );
} 