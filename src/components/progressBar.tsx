"use client"
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <div className="flex items-center justify-center mb-16">
      {[1, 2, 3].map((number, index) => (
        <React.Fragment key={index}>
          <motion.div
            className={`w-10 h-7 p-5 rounded-full flex items-center justify-center  ${step > index ? 'bg-green-500 text-white' : 'bg-white text-black border border-black'}`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            {step > index ? '✓' : number}
          </motion.div>
          {index < 2 && (
            <motion.div
              className={`w-8 h-1 ${step > index ? 'bg-green-500' : 'bg-black/90'}`}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.5 }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
