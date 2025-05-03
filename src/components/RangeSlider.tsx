'use client';

import React, { useState } from 'react';
import NumberFlow from '@number-flow/react';

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

interface RangeSliderProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  color?: string;
  showLabels?: boolean;
}

export default function RangeSlider({
  value,
  onChange,
  label,
  min = 0,
  max = 100,
  step = 1,
  color = 'blue',
  showLabels = true
}: RangeSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Define thresholds for displaying values
  const isNearMin = percentage <= 10;
  const isNearMax = percentage >= 95;
  
  const colorClasses = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    zinc: 'bg-zinc-500',
    black: 'bg-black'
  };
  
  const colorClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };
  
  return (
    <div className="space-y-2">
      {label && showLabels && (
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium text-zinc-700">
            {label}
          </label>
          <span className="text-sm font-medium text-zinc-700">
            <NumberFlow 
              value={value}
              willChange
              format={{ useGrouping: false }}
              className="text-sm font-semibold"
              transformTiming={numberFlowAnimation.transformTiming}
              opacityTiming={numberFlowAnimation.opacityTiming}
            />
          </span>
        </div>
      )}
      
      <div className="relative h-8 w-full rounded-md overflow-hidden">
        {/* Background bar - light zinc */}
        <div className="absolute inset-0 bg-zinc-200"></div>
        
        {/* Active bar - using color prop with rounded corners */}
        <div 
          className={`absolute inset-y-0 left-0 bg-zinc-800 rounded-sm`}
          style={{ width: `${percentage}%` }}
        >
          {/* Handle - white vertical line 8px from right edge of active area */}
          <div 
            className="absolute inset-y-2 w-[2px] bg-zinc-500 rounded-sm"
            style={{ right: '8px' }}
          ></div>
        </div>
        
        {/* Current value on active side */}
        <div 
          className="absolute inset-y-0 left-4 flex items-center"
          style={{ 
            opacity: !isNearMin ? 1 : 0,
            pointerEvents: 'none'
          }}
        >
          <span className="text-white font-medium text-sm whitespace-nowrap">
            <NumberFlow 
              value={value}
              willChange
              format={{ 
                useGrouping: false, 
                maximumFractionDigits: step < 1 ? 1 : 0
              }}
              transformTiming={numberFlowAnimation.transformTiming}
              opacityTiming={numberFlowAnimation.opacityTiming}
            />
          </span>
        </div>
        
        {/* Min value (visible only when near min) */}
        <div 
          className="absolute inset-y-0 left-4 flex items-center" 
          style={{ opacity: isNearMin ? 1 : 0, pointerEvents: 'none' }}
        >
          <span className="text-white font-medium text-sm whitespace-nowrap">
            <NumberFlow 
              value={min}
              willChange={false}
              format={{ 
                useGrouping: false,
                maximumFractionDigits: step < 1 ? 1 : 0
              }}
            />
          </span>
        </div>
        
        {/* Max value (hidden when near max) */}
        <div 
          className="absolute inset-y-0 right-4 flex items-center transition-opacity duration-300"
          style={{ opacity: isNearMax ? 0 : 1 }}
        >
          <span className="text-zinc-500 font-medium text-sm whitespace-nowrap">
            <NumberFlow 
              value={max}
              willChange={false}
              format={{ 
                useGrouping: false,
                maximumFractionDigits: step < 1 ? 1 : 0
              }}
            />
          </span>
        </div>
        
        {/* Invisible range input for interaction */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        />
      </div>
    </div>
  );
} 