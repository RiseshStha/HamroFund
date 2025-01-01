import React from 'react';
import { Check } from 'lucide-react';

const CampaignProgressBar = ({ currentStep }) => {
  const steps = [1, 2, 3];
  
  return (
    <div className="relative w-40 mx-2">
      {/* Container for circles */}
      <div className="flex justify-between items-center">
        {/* Lines container - positioned between circles */}
        <div className="absolute left-0 right-0 flex justify-between z-0">
          <div 
            className={`w-1/2 h-1.5 transition-colors duration-300 ${
              currentStep >= 2 ? 'bg-green-500' : 'bg-gray-200'
            }`} 
          />
          <div 
            className={`w-1/2 h-1.5 transition-colors duration-300 ${
              currentStep >= 3 ? 'bg-green-500' : 'bg-gray-200'
            }`} 
          />
        </div>

        {/* Circles - positioned above lines */}
        {steps.map((step) => {
          const isCompleted = currentStep > step;
          const isCurrent = currentStep === step;
          const showCheck = isCompleted || (step < 3 && step === currentStep);
          
          return (
            <div
              key={step}
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300
                ${isCompleted || isCurrent ? 'bg-green-500' : 'bg-white border-2 border-gray-200'}`}
            >
              {showCheck ? (
                <Check className="w-6 h-6 text-white stroke-[3]" />
              ) : (
                <span className={`text-base font-medium ${
                  isCurrent ? 'text-white' : 'text-gray-500'
                }`}>
                  {step}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignProgressBar;