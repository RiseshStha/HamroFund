import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCampaignByIdApi, updateCampaignApi } from '../../apis/Api';
import { Upload } from 'lucide-react';

const EditCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    category: '',
    province: '',
    endDate: '',
    image: null
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await getCampaignByIdApi(id);
        if (response.data.success) {
          const campaign = response.data.campaign;
          setFormData({
            title: campaign.title,
            description: campaign.description,
            goal: campaign.goal,
            category: campaign.category,
            province: campaign.province,
            endDate: new Date(campaign.endDate).toISOString().split('T')[0],
            image: campaign.image
          });
          if (campaign.image) {
            setPreviewUrl(`${import.meta.env.VITE_BACKEND_URL}/campaigns/${campaign.image}`);
          }
        }
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalFormData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'image') {
          finalFormData.append(key, formData[key]);
        }
      });

      if (selectedImage) {
        finalFormData.append('image', selectedImage);
      }

      const response = await updateCampaignApi(id, finalFormData);
      if (response.data.success) {
        navigate('/published-campaigns');
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-8">Edit Campaign</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">Campaign Image</label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8">
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
              />
              <div className="flex flex-col items-center justify-center">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-w-full h-48 object-contain rounded"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1">Click to upload new image</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-3 border border-green-500 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="medical">Medical</option>
              <option value="education">Education</option>
              <option value="business">Business</option>
              <option value="charity">Charity</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          {/* Province */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">Province</label>
            <select 
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              className="w-full p-3 border border-green-500 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="province1">Province 1</option>
              <option value="province2">Province 2</option>
              <option value="province3">Province 3</option>
              <option value="province4">Province 4</option>
            </select>
          </div>

          {/* Goal */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">Goal Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs</span>
              <input
                type="number"
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                className="w-full p-3 pl-12 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="block text-lg font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/published-campaigns')}
              className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? 'Updating...' : 'Update Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCampaign;
