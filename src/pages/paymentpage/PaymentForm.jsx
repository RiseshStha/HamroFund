import React, { useState } from 'react';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    amount: '100',
    esewaId: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-8">Funding the campaign</h1>

        <div className="flex items-start space-x-6 mb-8">
          <div className="w-48 min-w-48 overflow-hidden rounded-lg">
            <img 
              src="/api/placeholder/400/320"
              alt="Chiya Hub"
              className="w-full h-full object-cover bg-black"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-lg">You're contributing Chiya Hub</p>
            <div>
              <p className="text-gray-600">Organizer</p>
              <p className="text-lg font-semibold">Sijan Shrestha</p>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs</span>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full p-3 pl-12 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">Esewa ID</label>
            <input
              type="text"
              name="esewaId"
              placeholder="Enter your esewa id"
              value={formData.esewaId}
              onChange={handleInputChange}
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-4 pt-4">
            <button
              type="submit"
              className="w-full p-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors"
            >
              Pay
            </button>
            
            <button
              type="button"
              className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;