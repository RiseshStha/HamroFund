import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CampaignPhotoUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleContinue = () =>{
    navigate("/campaignform_deatils_form")
  }
  const handlePrevious = () =>{
    navigate("/campaignform_1")
    
  }

  return (
    <div className="flex justify-center items-center lg:h-[90.6vh] bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Create a campaign</h1>
          <span className="inline-flex items-center justify-center w-8 h-8 border-2 border-black rounded-full">
            2
          </span>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl">Upload a photo</h2>

          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-12">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              accept="image/*"
            />
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <Upload size={32} className="text-gray-600" />
              </div>
              <p className="text-lg font-medium">Choose a photo</p>
              {selectedFile && (
                <p className="text-sm text-gray-500">Selected: {selectedFile.name}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
            onClick={handlePrevious}
              type="button"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
            onClick={handleContinue}
              type="submit"
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPhotoUpload;