'use client';

import { useState, useEffect, useRef } from 'react';
import NumberFlow from '@number-flow/react';
import RangeSlider from '@/components/RangeSlider';
import TimeDisplay from '@/components/TimeDisplay';

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

export default function NumberSlidersPage() {
  // Initialize with default values
  const [temporalDisplacement, setTemporalDisplacement] = useState(0);
  const [sliderValues, setSliderValues] = useState([80, 4, 1.5]);
  
  // Create a ref to track previous slider values to ensure animations trigger
  const prevSliderValues = useRef([80, 4, 1.5]);
  
  // Labels and unit displays for the sliders
  const sliderLabels = [
    { name: 'Energy (zj)', unit: 'ZJ' },
    { name: 'Temporal Mass (chn)', unit: 'chn' },
    { name: 'Velocity (rm)', unit: 'rm' }
  ];

  // Min, max, and step values for each slider
  const sliderConfigs = [
    { min: 1, max: 100, step: 1 },      // Energy: 1-100 ZJ
    { min: 0.1, max: 10, step: 0.1 },   // Mass: 0.1-10 chn
    { min: 0.1, max: 2, step: 0.1 }     // Velocity: 0.1-2 rm
  ];

  // Calculate temporal displacement: T(e, m, v) = e × m × v²
  const calculateTemporalDisplacement = () => {
    const energy = sliderValues[0];       // ZJ
    const mass = sliderValues[1];         // chn
    const velocity = sliderValues[2];     // rm
    
    // Formula: temporal_displacement = energy × mass × velocity²
    const displacement = energy * mass * Math.pow(velocity, 2);
    
    // Apply direction: positive = future, negative = past
    // Use total value to determine direction (threshold at 500)
    const threshold = 500;
    return displacement >= threshold ? (displacement - threshold) : -(threshold - displacement);
  };

  useEffect(() => {
    setTemporalDisplacement(calculateTemporalDisplacement());
    // Update the previous values after the calculation
    prevSliderValues.current = [...sliderValues];
  }, [sliderValues]);

  const handleSliderChange = (index: number, value: number) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = value;
    setSliderValues(newSliderValues);
  };

  // Determine direction based on sign of displacement
  const direction = temporalDisplacement >= 0 ? 'future' : 'past';
  
  // Get colors based on direction
  const directionColor = direction === 'future' ? 'text-blue-500' : 'text-amber-500';
  const directionBg = direction === 'future' ? 'bg-blue-500' : 'bg-amber-500';
  const directionIcon = direction === 'future' ? '→' : '←';

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-[400px] rounded-3xl bg-zinc-50 p-8 border-zinc-100 border-1">
        <div className="mb-4 text-center">
          <div className="text-base text-zinc-500">
            Temporal Displacement
          </div>
          
          <TimeDisplay 
            hours={temporalDisplacement} 
            yearMode={true} 
            direction={direction} 
            singleValueMode={true} 
          />
        </div>

        <div className="space-y-6">
          {sliderValues.map((value, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <div className="text-sm text-zinc-500">
                  {sliderLabels[index].name}
                </div>
                <div className="text-sm font-medium flex items-center">
                  <div className="min-w-[50px] text-right">
                    <NumberFlow 
                      key={`slider-value-${index}`}
                      value={value} 
                      willChange
                      format={{ 
                        useGrouping: true, 
                        maximumFractionDigits: index === 0 ? 0 : 1 
                      }}
                      transformTiming={numberFlowAnimation.transformTiming}
                      opacityTiming={numberFlowAnimation.opacityTiming}
                    />
                  </div>
                  <span className="ml-1">{sliderLabels[index].unit}</span>
                </div>
              </div>
              
              <RangeSlider
                value={value}
                onChange={(value) => handleSliderChange(index, value)}
                min={sliderConfigs[index].min}
                max={sliderConfigs[index].max}
                step={sliderConfigs[index].step}
                showLabels={false}
                color="black"
              />
            </div>
          ))}
          
          <div className="mt-8 pt-8 border-t border-zinc-200 text-center">
            <div className="text-sm font-medium text-zinc-700">Formula: T(e, m, v) = e × m × v²</div>
          </div>
        </div>
      </div>
    </main>
  );
} 