import React from 'react';
import { useNavigate } from 'react-router-dom';

const CampaignForm1 = () => {
  const navigate = useNavigate();

  const handleContinue = (e) =>{
    e.preventDefault();
    navigate("/campaignform_photo_upload")
  }
  const handleCancel = () =>{
    navigate("/")
  }

  return (
    <div className="flex justify-center items-center lg:h-[90.6vh] bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Create a campaign</h1>
          <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-black rounded-full">
            1
          </span>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium">
              What best describe your fundraiser ?
            </label>
            <select className="w-full p-3 border border-green-500 rounded-lg bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="" disabled selected>Select an Options</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              Select Province
            </label>
            <select className="w-full p-3 border border-green-500 rounded-lg bg-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="" disabled selected>Select an Options</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-medium">
              How much would you like to raise ?
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs</span>
              <input
                type="text"
                defaultValue="10000"
                className="w-full p-3 pl-12 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
            onClick={handleCancel}
              type="button"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
            onClick={(e)=>{handleContinue(e)}}
              type="submit"
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CampaignForm1;