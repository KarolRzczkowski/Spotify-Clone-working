'use client'
// Importuj potrzebne moduły
import React from 'react';
import { useRef } from 'react';
interface SliderProps {
  children: React.ReactNode;
}

const Slider: React.FC<SliderProps> = ({ children }) => {


  return (
    <div className='text-right'>
Audio Slider
    </div>
  );
};

export default Slider;
