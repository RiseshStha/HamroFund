import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CampaignProgressBar from '../../components/CampaignProgressBar';
import FormAlert from '../../components/FormAlert';

const CampaignPhotoUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '' });
  
  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    sessionStorage.removeItem('campaign_image_preview');
    sessionStorage.removeItem('campaign_image_name');
    sessionStorage.removeItem('campaign_image_type');
  };
  
  useEffect(() => {
    // Load saved preview URL if exists
    const savedPreview = sessionStorage.getItem('campaign_image_preview');
    if (savedPreview) {
      setPreviewUrl(savedPreview);
    }
    return () => {
      if (window.location.pathname === '/') {
        clearImage();
      }
    }
  }, []);


  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      // Store file data
      sessionStorage.setItem('campaign_image_name', file.name);
      sessionStorage.setItem('campaign_image_type', file.type);
      
      // Create and store preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreviewUrl(base64String);
        sessionStorage.setItem('campaign_image_preview', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!previewUrl) {
      const message = `Please Select An Image!`;
      setAlert({ show: true, message });
      return;
    }
    navigate("/campaignform_deatils_form");
  };

  const handlePrevious = () => {
    navigate("/campaignform_1");
  };

  return (
    <div className="flex justify-center items-center lg:h-[89.6vh] bg-gray-50 p-6">
      <FormAlert 
        message={alert.message}
        isVisible={alert.show}
        onClose={() => setAlert({ show: false, message: '' })}
      />
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Create a campaign</h1>
          <CampaignProgressBar currentStep={2}/>
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
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-w-full h-auto max-h-48 rounded"
                />
              ) : (
                <>
                  <div className="p-4 bg-gray-100 rounded-full">
                    <Upload size={32} className="text-gray-600" />
                  </div>
                  <p className="text-lg font-medium">Choose a photo</p>
                </>
              )}
              {selectedFile && (
                <p className="text-sm text-gray-500">Selected: {selectedFile.name}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-8">
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