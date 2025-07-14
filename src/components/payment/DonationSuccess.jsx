import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiHeart, FiMail, FiDownload, FiShare2 } = FiIcons;

const DonationSuccess = ({ donation, onClose }) => {
  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert('Receipt download would be implemented here. This would generate a PDF receipt for tax purposes.');
  };

  const handleShareDonation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'I just supported With Hymn!',
        text: 'I made a donation to support this amazing worship platform. Join me in supporting their mission!',
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('Link copied to clipboard! Share it with others to spread the word.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto"
      >
        <SafeIcon icon={FiCheck} className="w-10 h-10 text-green-600 dark:text-green-400" />
      </motion.div>

      {/* Success Message */}
      <div>
        <h2 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-2">
          Thank You for Your Donation!
        </h2>
        <p className="text-peace-600 dark:text-peace-300 font-body">
          Your generous contribution helps us continue providing this platform to worship communities worldwide.
        </p>
      </div>

      {/* Donation Details */}
      <div className="bg-peace-50 dark:bg-peace-700 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-peace-600 dark:text-peace-300 font-body">Donation Amount:</span>
          <span className="text-2xl font-display font-bold text-peace-900 dark:text-white">
            ${donation.amount.toFixed(2)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-peace-600 dark:text-peace-300 font-body">Transaction ID:</span>
          <span className="text-peace-900 dark:text-white font-mono text-sm">
            {donation.transactionId}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-peace-600 dark:text-peace-300 font-body">Date:</span>
          <span className="text-peace-900 dark:text-white font-body">
            {new Date(donation.createdAt).toLocaleDateString()}
          </span>
        </div>

        {donation.message && (
          <div className="pt-4 border-t border-peace-200 dark:border-peace-600">
            <span className="text-peace-600 dark:text-peace-300 font-body block mb-2">Your Message:</span>
            <p className="text-peace-900 dark:text-white font-body italic">
              "{donation.message}"
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleDownloadReceipt}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors font-body"
        >
          <SafeIcon icon={FiDownload} className="w-4 h-4" />
          <span>Download Receipt</span>
        </button>
        
        <button
          onClick={handleShareDonation}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-200 dark:hover:bg-green-800 transition-colors font-body"
        >
          <SafeIcon icon={FiShare2} className="w-4 h-4" />
          <span>Share</span>
        </button>
        
        <button
          onClick={onClose}
          className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-body"
        >
          <SafeIcon icon={FiHeart} className="w-4 h-4" />
          <span>Continue</span>
        </button>
      </div>

      {/* Email Confirmation Notice */}
      <div className="flex items-center justify-center space-x-2 text-peace-500 dark:text-peace-400">
        <SafeIcon icon={FiMail} className="w-4 h-4" />
        <span className="text-sm font-body">
          A confirmation email has been sent to {donation.isAnonymous ? 'your email' : donation.donorEmail}
        </span>
      </div>

      {/* Impact Message */}
      <div className="bg-gradient-to-r from-primary-50 to-sacred-50 dark:from-primary-900 dark:to-sacred-900 rounded-xl p-6">
        <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2">
          Your Impact
        </h3>
        <p className="text-peace-600 dark:text-peace-300 font-body">
          Your donation helps us maintain servers, develop new features, and support worship communities 
          around the world. Thank you for being part of our mission to preserve and share sacred music!
        </p>
      </div>
    </motion.div>
  );
};

export default DonationSuccess;