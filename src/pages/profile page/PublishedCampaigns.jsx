import React, { useState, useEffect } from "react";
import { Menu, X, Calendar, Tag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileNavbar from "../../components/ProfileNavbar";
import { getUserCampaignsApi, deleteCampaignApi } from "../../apis/Api";

// Custom Alert Component
const AlertDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom Toast Component - Moved to top
const Toast = ({ message, type }) => (
  <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white transition-opacity duration-300 opacity-90 hover:opacity-100`}>
    {message}
  </div>
);

const PublishedCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, campaign: null });
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCampaigns();
  }, [navigate]);

  const fetchCampaigns = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (!userData?._id) {
        navigate("/login");
        return;
      }
      const response = await getUserCampaignsApi(userData._id);
      if (response.data.success) {
        // Sort campaigns by date, newest first
        const sortedCampaigns = response.data.campaigns.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setCampaigns(sortedCampaigns);
      }
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      showToast("Failed to fetch campaigns", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleEdit = (id) => {
    navigate(`/edit-campaign/${id}`);
  };

  const handleView = (id) => {
    navigate(`/campaign/${id}`);
  };

  const handleDeleteClick = (campaign) => {
    setDeleteDialog({ open: true, campaign });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteCampaignApi(deleteDialog.campaign._id);
      if (response.data.success) {
        setCampaigns(campaigns.filter(camp => camp._id !== deleteDialog.campaign._id));
        showToast("Campaign deleted successfully", "success");
      } else {
        showToast("Failed to delete campaign", "error");
      }
    } catch (error) {
      console.error("Error deleting campaign:", error);
      showToast("Failed to delete campaign", "error");
    } finally {
      setDeleteDialog({ open: false, campaign: null });
    }
  };

  const getImageUrl = (imageName) => {
    if (!imageName) return "/api/placeholder/400/200";
    return `${import.meta.env.VITE_BACKEND_URL}/campaigns/${imageName}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification - Now appears at the top */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} />
      )}

      <div className="flex pt-4">
        <ProfileNavbar />
        
        <div className="flex-1 p-0 md:px-6">
          <div className="bg-white rounded-xl shadow-lg px-4 lg:px-6 py-8 mx-2">
            <div className="max-w-5xl mx-auto">
              <div className="grid gap-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign._id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-56 h-40 md:h-auto relative overflow-hidden">
                        <img
                          src={getImageUrl(campaign.image)}
                          alt={campaign.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/400/200";
                          }}
                        />
                      </div>

                      <div className="flex-1 p-4">
                        <div className="flex flex-col h-full">
                          <h3 className="text-lg font-semibold mb-2">{campaign.title}</h3>
                          <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex items-center text-gray-600 text-sm">
                              <span>Rs {campaign.goal.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Tag size={16} className="mr-1" />
                              <span className="capitalize">{campaign.category}</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                              <Calendar size={16} className="mr-1" />
                              <span>{new Date(campaign.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {campaign.description}
                          </p>
                          <div className="flex gap-3 mt-auto justify-end">
                            <button
                              onClick={() => handleDeleteClick(campaign)}
                              className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors text-sm w-32 flex items-center justify-center"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete
                            </button>
                            <button
                              onClick={() => handleEdit(campaign._id)}
                              className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors text-sm w-32"
                            >
                              Edit Campaign
                            </button>
                            <button
                              onClick={() => handleView(campaign._id)}
                              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm w-32"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, campaign: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Campaign"
        message="Are you sure you want to delete this campaign? This action cannot be undone."
      />
    </div>
  );
};

export default PublishedCampaigns;