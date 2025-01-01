import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "lucide-react";
import Footer from "../../components/Footer";
import { getCampaignByIdApi } from "../../apis/Api";

const CampaignDetails = () => {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCampaignDetails = async () => {
      try {
        const response = await getCampaignByIdApi(id);
        setCampaign(response.data.campaign);
      } catch (error) {
        console.error("Error fetching campaign details:", error);
        setError("Failed to load campaign details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCampaignDetails();
    }
  }, [id]);

  const getImageUrl = (imageName) => {
    if (!imageName) return "/api/placeholder/1200/600";
    return `${import.meta.env.VITE_BACKEND_URL}/campaigns/${imageName}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Campaign not found
      </div>
    );
  }

  const calculateProgress = () => {
    return ((campaign.raisedAmount || 0) / campaign.goal) * 100;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24)),
      "day"
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-6 mb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-3xl font-bold mb-8">{campaign.title}</h1>

              <div className="rounded-xl overflow-hidden mb-8 h-96">
                <img
                  src={getImageUrl(campaign.image)}
                  alt={campaign.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/api/placeholder/1200/600";
                  }}
                />
              </div>

              <div className="flex items-center gap-4 py-6 border-b">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div className="text-lg">
                  <span className="font-semibold">
                    {campaign.creator?.fullName || "Anonymous"}
                  </span>
                  <span className="text-gray-600">
                    {" "}
                    is organizing this campaign
                  </span>
                </div>
              </div>

              <div className="py-6 border-b text-gray-600 text-lg">
                <p>Created {formatDate(campaign.createdAt)}</p>
              </div>

              <div className="py-6 space-y-3">
                <h2 className="text-2xl font-semibold">Story</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {campaign.description}
                </p>
              </div>

              <div className="pt-6">
                <h2 className="text-2xl font-semibold mb-3">Organizer</h2>
                <p className="text-gray-600 text-lg">
                  {campaign.creator?.fullName || "Anonymous"}
                </p>
                <p className="text-gray-600 text-lg">
                  {campaign.creator?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 lg:sticky lg:top-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold">
                    Rs {(campaign.raisedAmount || 0).toLocaleString()} raised
                  </h2>
                  <div className="space-y-2 text-lg text-gray-600 mt-2">
                    <div>Rs {campaign.goal.toLocaleString()} goal</div>
                    <div>{campaign.payments?.length || 0} contributors</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-orange-400 h-3 rounded-full"
                    style={{ width: `${Math.min(calculateProgress(), 100)}%` }}
                  ></div>
                </div>

                <button
                  onClick={() => {
                    // Check if user is logged in first
                    const token = localStorage.getItem("token");
                    if (!token) {
                      navigate("/login");
                      return;
                    }
                    navigate(`/payment/${campaign._id}`);
                  }}
                  className="w-full bg-orange-400 text-white py-4 px-4 rounded-xl text-lg font-semibold hover:bg-orange-500 transition-colors"
                >
                  Contribute to the Project
                </button>

                {campaign.payments && campaign.payments.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Contributors</h3>
                    <div className="space-y-4">
                      {campaign.payments.map((payment, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-600" />
                          </div>
                          <span className="text-lg">
                            {payment.contributor?.fullName || "Anonymous"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CampaignDetails;
