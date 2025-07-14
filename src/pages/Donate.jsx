import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import PaymentForm from '../components/payment/PaymentForm';
import DonationSuccess from '../components/payment/DonationSuccess';
import { usePayments } from '../contexts/PaymentContext';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiDollarSign, FiUsers, FiServer, FiCode, FiGift } = FiIcons;

const Donate = () => {
  const { getRecentDonations, getMonthlyProgress, stats } = usePayments();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(null);

  const recentDonations = getRecentDonations();
  const monthlyProgress = getMonthlyProgress();

  const handleDonationSuccess = (donation) => {
    setDonationSuccess(donation);
    setShowPaymentForm(false);
  };

  const impactAreas = [
    {
      icon: FiServer,
      title: 'Server & Infrastructure',
      description: 'Keep the platform running 24/7 for worship communities worldwide',
      percentage: 40
    },
    {
      icon: FiCode,
      title: 'Development & Features',
      description: 'Build new features and improve existing functionality',
      percentage: 35
    },
    {
      icon: FiUsers,
      title: 'Community Support',
      description: 'Provide customer support and community management',
      percentage: 25
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <SafeIcon icon={FiHeart} className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-display font-bold text-peace-900 dark:text-white mb-4">
          Support With Hymn
        </h1>
        <p className="text-xl text-peace-600 dark:text-peace-300 font-body max-w-3xl mx-auto">
          Help us continue providing this platform to worship communities around the world. 
          Your donation keeps the music flowing and communities connected.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <div className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">
            ${stats.totalRaised.toLocaleString()}
          </div>
          <p className="text-peace-600 dark:text-peace-300 font-body">Total Raised</p>
        </div>
        <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <div className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">
            {stats.donorCount}
          </div>
          <p className="text-peace-600 dark:text-peace-300 font-body">Generous Donors</p>
        </div>
        <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <div className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">
            ${stats.averageDonation.toFixed(0)}
          </div>
          <p className="text-peace-600 dark:text-peace-300 font-body">Average Donation</p>
        </div>
      </div>

      {/* Monthly Progress */}
      <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white">
            Monthly Goal Progress
          </h3>
          <span className="text-peace-600 dark:text-peace-300 font-body">
            ${monthlyProgress.current.toFixed(0)} / ${monthlyProgress.goal.toFixed(0)}
          </span>
        </div>
        <div className="w-full bg-peace-200 dark:bg-peace-700 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${monthlyProgress.percentage}%` }}
          />
        </div>
        <p className="text-sm text-peace-600 dark:text-peace-300 mt-2 font-body">
          {monthlyProgress.percentage.toFixed(1)}% of monthly goal reached
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Impact Areas */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-peace-900 dark:text-white">
            Where Your Donation Goes
          </h2>
          
          {impactAreas.map((area, index) => (
            <div key={index} className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <SafeIcon icon={area.icon} className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white">
                      {area.title}
                    </h3>
                    <span className="text-peace-600 dark:text-peace-300 font-body">
                      {area.percentage}%
                    </span>
                  </div>
                  <p className="text-peace-600 dark:text-peace-300 font-body">
                    {area.description}
                  </p>
                  <div className="mt-3 w-full bg-peace-200 dark:bg-peace-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{ width: `${area.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Donation Section */}
        <div className="space-y-6">
          {!showPaymentForm && !donationSuccess && (
            <>
              <div className="bg-gradient-to-r from-primary-500 to-sacred-500 rounded-2xl p-8 text-white text-center">
                <SafeIcon icon={FiGift} className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-2xl font-display font-bold mb-4">Make a Donation</h2>
                <p className="text-white/90 font-body mb-6">
                  Every contribution, no matter the size, helps us serve worship communities better.
                </p>
                <button
                  onClick={() => setShowPaymentForm(true)}
                  className="bg-white text-primary-600 px-8 py-3 rounded-xl font-medium font-body hover:bg-gray-50 transition-colors"
                >
                  Donate Now
                </button>
              </div>

              {/* Recent Donations */}
              <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
                <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-4">
                  Recent Supporters
                </h3>
                <div className="space-y-3">
                  {recentDonations.map((donation, index) => (
                    <div key={donation.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-peace-900 dark:text-white font-body">
                          {donation.donorName}
                        </p>
                        <p className="text-sm text-peace-600 dark:text-peace-300 font-body">
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-peace-900 dark:text-white font-body">
                          ${donation.amount.toFixed(0)}
                        </p>
                        {donation.message && (
                          <p className="text-sm text-peace-600 dark:text-peace-300 font-body italic">
                            "{donation.message.substring(0, 30)}..."
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {showPaymentForm && !donationSuccess && (
            <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
              <PaymentForm
                onSuccess={handleDonationSuccess}
                onCancel={() => setShowPaymentForm(false)}
              />
            </div>
          )}

          {donationSuccess && (
            <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
              <DonationSuccess
                donation={donationSuccess}
                onClose={() => {
                  setDonationSuccess(null);
                  setShowPaymentForm(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-peace-500 to-sacred-500 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-display font-bold mb-4">Thank You for Your Support!</h2>
        <p className="text-white/90 font-body mb-6 max-w-2xl mx-auto">
          Together, we're building something beautiful for worship communities worldwide. 
          Your generosity enables us to serve God's people through technology and music.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-peace-600 px-6 py-3 rounded-xl font-medium font-body hover:bg-gray-50 transition-colors">
            Share Our Mission
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium font-body hover:bg-white/30 transition-colors">
            Learn More About Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donate;