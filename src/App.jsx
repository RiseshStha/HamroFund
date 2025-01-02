import React from 'react'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Loginpage from './pages/auth/Loginpage'
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/auth/SignupPage';
import LandingPage from './pages/landingpage/LandingPage';
import SearchCampaigns from './pages/searchpage/SearchCampaigns';
import ProfilePage from './pages/profile page/ProfilePage';
import PublishedCampaigns from './pages/profile page/PublishedCampaigns';
import MyContributions from './pages/profile page/MyContributions';
import CampaignForm1 from './pages/start_campaignpage/CampaignForm1';
import CampaignPhotoUpload from './pages/start_campaignpage/CampaignPhotoUpload';
import CampaignDetailsForm from './pages/start_campaignpage/CampaignDetailsForm';
import PaymentForm from './pages/paymentpage/PaymentForm';
import ThankYouPage from './pages/paymentpage/ThankyouPage';
import CampaignDetails from './pages/campaigndetailpage/CampaignDetails';
import InfoPage from './pages/infopage/InfoPage';
import EditCampaign from './pages/start_campaignpage/EditCampaign';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailed from './components/PaymentFailed';
import ForgotPassword from './pages/forgotpasswordpage/ForgotPassword';

const App = () => {
  return (
    <>
      <div className='w-full overflow-hidden'>
        {/* <Header/> */}
        <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/search" element={<SearchCampaigns />} />
          <Route path="/how-it-works" element={<InfoPage />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />

          {/* Need authorization */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/published-campaigns" element={<PublishedCampaigns />} />
          <Route path="/my-contributions" element={<MyContributions />} />
          <Route path="/campaignform_1" element={<CampaignForm1 />} />
          <Route path="/campaignform_photo_upload" element={<CampaignPhotoUpload />} />
          <Route path="/campaignform_deatils_form" element={<CampaignDetailsForm />} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          <Route path="/payment/:id" element={<PaymentForm />} />
          <Route path="/thank_you" element={<ThankYouPage />} />
          <Route path="/edit-campaign/:id" element={<EditCampaign />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failed" element={<PaymentFailed />} />
        </Routes>
      </div>
    </>
  )
}

export default App