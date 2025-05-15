'use client';

import React, { useState } from 'react';
import { AssetCounter } from '@/components/asset-counter';
import { motion, AnimatePresence } from 'framer-motion';

export function AssetCounterDemo() {
  const [currentAsset, setCurrentAsset] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [trashed, setTrashed] = useState<number[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const totalAssets = 5;
  
  const handleFavorite = (index: number) => {
    setFavorites(prev => {
      // Toggle favorite status
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };
  
  const handleTrash = (index: number) => {
    setTrashed(prev => {
      // Add to trash if not already there
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });
    
    // Navigate to the next asset if available
    if (trashed.length < totalAssets - 1) {
      const nextIndex = (index + 1) % totalAssets;
      setCurrentAsset(nextIndex);
    }
  };
  
  const handleDropdownSelect = (item: string) => {
    setSelectedCollection(item);
    
    // Handle special actions based on dropdown selection
    if (item === 'New Collection') {
      // Here you would typically show a dialog to create a new collection
      console.log('Creating a new collection...');
    } else {
      console.log(`Moving asset ${currentAsset + 1} to collection: ${item}`);
    }
  };
  
  // Animation variants for the notification
  const notificationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Asset counter, positioned in the center */}
      <div>
        <AssetCounter 
          total={totalAssets}
          initialIndex={currentAsset}
          onIndexChange={setCurrentAsset}
          onFavorite={handleFavorite}
          onTrash={handleTrash}
          onDropdown={handleDropdownSelect}
          favorites={favorites}
          trashed={trashed}
        />
      </div>
      
      {/* Notification for collection selection */}
      <AnimatePresence>
        {selectedCollection && (
          <motion.div 
            className="mt-6 bg-white rounded-md shadow-lg border border-zinc-200 p-4 z-10"
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={selectedCollection}
          >
            <p className="text-sm text-zinc-700">
              {selectedCollection === 'New Collection' 
                ? 'Creating a new collection...' 
                : `Asset ${currentAsset + 1} moved to ${selectedCollection}`
              }
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 