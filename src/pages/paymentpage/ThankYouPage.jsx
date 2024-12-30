import React from 'react';

const ThankYouPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="text-3xl font-bold">
            Thank you Sijan for Contributing
          </h1>

          <div className="w-full max-w-md overflow-hidden rounded-lg">
            <img
              src="/api/placeholder/400/320"
              alt="Chiya Hub"
              className="w-full h-full object-cover bg-black"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Chiya Hub
            </h2>
            
            <p className="text-lg text-gray-700">
              You're contribution of Rs 100 will help growing Chiya Hub
            </p>
          </div>

          <button
            className="w-full max-w-md mt-4 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            View Your Contributions
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;