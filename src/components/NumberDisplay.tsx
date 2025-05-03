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

interface NumberDisplayProps {
  value: number;
  prefix?: string;
  suffix?: string;
  size?: 'small' | 'medium' | 'large';
  showDecimals?: boolean;
}

export default function NumberDisplay({ 
  value, 
  prefix = '', 
  suffix = '',
  size = 'large',
  showDecimals = true
}: NumberDisplayProps) {
  // Size classes mapping
  const sizeClasses = {
    small: 'text-3xl',
    medium: 'text-4xl',
    large: 'text-6xl'
  };
  
  // Determine maximum fraction digits based on showDecimals
  const maximumFractionDigits = showDecimals ? 2 : 0;
  
  return (
    <div className="flex items-center justify-center">
      <div className={`font-mono ${sizeClasses[size]} font-bold tracking-wider`}>
        {prefix && <span className="mr-1">{prefix}</span>}
        <NumberFlow 
          value={value} 
          willChange
          format={{ 
            useGrouping: true,
            maximumFractionDigits
          }}
          transformTiming={numberFlowAnimation.transformTiming}
          opacityTiming={numberFlowAnimation.opacityTiming}
          style={numberFlowAnimation.style}
        />
        {suffix && <span className="ml-1">{suffix}</span>}
      </div>
    </div>
  );
} 