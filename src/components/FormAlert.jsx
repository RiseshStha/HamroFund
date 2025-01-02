import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

const FormAlert = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000); // Will auto-dismiss after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 min-w-[320px] max-w-md animate-fade-in">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
          <div className="flex-1">
            <p className="text-sm text-red-700">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="ml-4 text-red-500 hover:text-red-700 transition-colors"
            aria-label="Close alert"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAlert;