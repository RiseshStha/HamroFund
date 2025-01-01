import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { initiatePaymentApi, getCampaignByIdApi } from '../../apis/Api';  // Add this import
import { Loader2 } from 'lucide-react';

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);  // Add this for initial loading
  const [amount, setAmount] = useState('100');
  const [campaign, setCampaign] = useState(null);
  const { id: campaignId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      setPageLoading(true);
      try {
        const response = await getCampaignByIdApi(campaignId);
        console.log('Campaign response:', response);  // Debug log
        if (response.data && response.data.campaign) {
          setCampaign(response.data.campaign);
        } else {
          console.error('Invalid campaign data:', response);
          navigate(-1);
        }
      } catch (error) {
        console.error('Error fetching campaign:', error);
        navigate(-1);
      } finally {
        setPageLoading(false);
      }
    };
    
    if (campaignId) {
      fetchCampaignDetails();
    }
  }, [campaignId, navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await initiatePaymentApi({
        campaignId,
        amount: parseFloat(amount)
      });

      if (response.data.success) {
        const form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', response.data.data.paymentUrl);

        Object.entries(response.data.data.params).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('name', key);
          input.setAttribute('value', value.toString());
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        alert('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initiation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center lg:h-[90.6vh] bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-8">Funding the campaign</h1>

        {campaign && (
          <div className="flex items-start space-x-6 mb-8">
            <div className="w-48 min-w-48 overflow-hidden rounded-lg">
              <img 
                src={campaign.image ? `${import.meta.env.VITE_BACKEND_URL}/campaigns/${campaign.image}` : "/api/placeholder/400/320"}
                alt={campaign.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/api/placeholder/400/320";
                }}
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-lg">You're contributing to {campaign.title}</p>
              <div>
                <p className="text-gray-600">Organizer</p>
                <p className="text-lg font-semibold">{campaign.creator?.fullName || 'Anonymous'}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handlePayment} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-lg font-medium">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs</span>
              <input
                type="number"
                min="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 pl-12 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                'Pay with eSewa'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(-1)}
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