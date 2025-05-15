'use client';

import { useState, useEffect, useRef } from 'react';
import NumberFlow from '@number-flow/react';
import { RangeSlider } from '@/components/range-slider';
import { TimeDisplay } from '@/components/time-display';

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

export function TravelTimeCalculator() {
  // Initialize with default values
  const [travelTime, setTravelTime] = useState({ hours: 0, minutes: 0 });
  const [sliderValues, setSliderValues] = useState([300, 60, 1.5]);
  
  // Create a ref to track previous slider values to ensure animations trigger
  const prevSliderValues = useRef([300, 60, 1.5]);
  
  // Labels and unit displays for the sliders
  const sliderLabels = [
    { name: 'Distance (km)', unit: 'km' },
    { name: 'Speed (kph)', unit: 'kph' },
    { name: 'Traffic Factor', unit: 'x' }
  ];

  // Min, max, and step values for each slider
  const sliderConfigs = [
    { min: 0, max: 3000, step: 10 },     // Distance: 0-3000 km
    { min: 40, max: 120, step: 5 },      // Speed: 40-120 kph
    { min: 1, max: 4, step: 0.1 }        // Traffic Factor: 1-4 x
  ];

  // Calculate break time based on distance
  const calculateBreakTime = (distance: number): number => {
    if (distance < 150) return 0;
    if (distance <= 500) return 0.25; // 15 minutes
    if (distance <= 1000) return 0.5; // 30 minutes
    return distance / 300; // roughly 10 min per 150 km
  };

  // Calculate travel time using T(d, s, f) = (d / s) × f + b
  const calculateTravelTime = () => {
    const distance = sliderValues[0];    // Distance in km
    const speed = sliderValues[1];       // Speed in kph
    const factor = sliderValues[2];      // Traffic factor
    
    // Calculate break time based on distance
    const breakTime = calculateBreakTime(distance);
    
    // Formula: travel_time = (distance / speed) × factor + breakTime
    const travelTimeHours = (distance / speed) * factor + breakTime;
    
    // Convert to hours and minutes
    const hours = Math.floor(travelTimeHours);
    const minutes = Math.round((travelTimeHours - hours) * 60);
    
    return { hours, minutes };
  };

  useEffect(() => {
    setTravelTime(calculateTravelTime());
    // Update the previous values after the calculation
    prevSliderValues.current = [...sliderValues];
  }, [sliderValues]);

  const handleSliderChange = (index: number, value: number) => {
    const newSliderValues = [...sliderValues];
    newSliderValues[index] = value;
    setSliderValues(newSliderValues);
  };

  return (
    <div className="w-full max-w-[400px] rounded-3xl bg-zinc-50 p-8 border-zinc-100 border-1">
      <div className="mb-4 text-center">
        <div className="text-base text-zinc-500">
          Travel Time
        </div>
        
        <TimeDisplay 
          hours={travelTime.hours} 
          minutes={travelTime.minutes}
          yearMode={false}
          singleValueMode={false} 
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
                      maximumFractionDigits: index === 2 ? 1 : 0 
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
          <div className="text-sm font-medium text-zinc-700">Formula: T(d, s, f) = (d / s) × f + b</div>
        </div>
      </div>
    </div>
  );
} 