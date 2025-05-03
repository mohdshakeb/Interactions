'use client';

import React from 'react';
import NumberFlow from '@number-flow/react';

// Common animation settings for NumberFlow components
const numberFlowAnimation = {
  transformTiming: {
    duration: 500,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  opacityTiming: {
    duration: 250,
    easing: 'ease-out'
  },
  style: { 
    '--number-flow-mask-height': '0.2em',
    '--number-flow-char-height': '1.2em',
    fontVariantNumeric: 'tabular-nums'
  } as React.CSSProperties
};

interface TimeDisplayProps {
  hours: number;
  minutes?: number;
  yearMode?: boolean;
  direction?: 'past' | 'future';
  singleValueMode?: boolean;
}

export default function TimeDisplay({ 
  hours, 
  minutes = 0, 
  yearMode = false, 
  direction = 'future',
  singleValueMode = false
}: TimeDisplayProps) {
  // Determine which units to use based on mode
  const firstUnit = yearMode ? 'y' : 'h';
  const secondUnit = yearMode ? 'm' : 'm';
  
  // For single value mode (years only)
  if (singleValueMode) {
    const isNegative = hours < 0;
    
    return (
      <div className="flex items-center justify-center">
        <div className="flex items-end">
          {isNegative && (
            <span className="text-6xl text-gray-800 mr-1 mb-5 flex items-center">−</span>
          )}
          <NumberFlow 
            value={Math.abs(hours)} 
            willChange
            format={{ 
              useGrouping: true,
              maximumFractionDigits: 0
            }}
            transformTiming={numberFlowAnimation.transformTiming}
            opacityTiming={numberFlowAnimation.opacityTiming}
            className="text-6xl font-semibold text-gray-800"
            style={numberFlowAnimation.style}
          />
          <span className="text-2xl text-gray-400 ml-1 mb-5">{firstUnit}</span>
        </div>
      </div>
    );
  }
  
  // For dual value mode (original)
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-end">
        <NumberFlow 
          value={hours} 
          willChange
          format={{ 
            useGrouping: false,
            minimumIntegerDigits: 2
          }}
          transformTiming={numberFlowAnimation.transformTiming}
          opacityTiming={numberFlowAnimation.opacityTiming}
          className="text-6xl font-semibold text-gray-800"
          style={numberFlowAnimation.style}
        />
        <span className="text-2xl text-gray-400 ml-1 mb-5">{firstUnit}</span>
      </div>
      
      <div className="flex items-end ml-4">
        <NumberFlow 
          value={minutes} 
          willChange
          format={{ 
            useGrouping: false,
            minimumIntegerDigits: 2
          }}
          transformTiming={numberFlowAnimation.transformTiming}
          opacityTiming={numberFlowAnimation.opacityTiming}
          className="text-6xl font-semibold text-gray-800"
          style={numberFlowAnimation.style}
        />
        <span className="text-2xl text-gray-400 ml-1 mb-5">{secondUnit}</span>
      </div>
    </div>
  );
} 