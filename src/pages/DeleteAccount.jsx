import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../components/common/SafeIcon';
import { useAuth } from '../contexts/AuthContext';
import * as FiIcons from 'react-icons/fi';

const { FiUserX, FiAlertTriangle, FiTrash2, FiArrowLeft, FiShield } = FiIcons;

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [step, setStep] = useState(1);
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [reasonChecks, setReasonChecks] = useState({
    notUseful: false,
    tooComplicated: false,
    foundAlternative: false,
    privacyConcerns: false,
    other: false
  });
  const [customReason, setCustomReason] = useState('');

  const handleReasonChange = (reason) => {
    setReasonChecks(prev => ({
      ...prev,
      [reason]: !prev[reason]
    }));
  };

  const handleDeleteAccount = async () => {
    if (confirmText !== 'DELETE MY ACCOUNT') {
      alert('Please type the confirmation text exactly as shown.');
      return;
    }

    setIsDeleting(true);
    
    try {
      // Simulate account deletion process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would make an API call to delete the account
      alert('Your account has been successfully deleted. We\'re sorry to see you go!');
      
      // Logout and redirect to login page
      logout();
      navigate('/login');
    } catch (error) {
      alert('There was an error deleting your account. Please try again or contact support.');
    } finally {
      setIsDeleting(false);
    }
  };

  const canProceed = () => {
    if (step === 1) {
      return Object.values(reasonChecks).some(checked => checked);
    }
    if (step === 2) {
      return confirmText === 'DELETE MY ACCOUNT';
    }
    return false;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 max-w-2xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiUserX} className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">
          Delete Account
        </h1>
        <p className="text-peace-600 dark:text-peace-300 font-body">
          We're sorry to see you go. This action cannot be undone.
        </p>
      </motion.div>

      {/* Warning Notice */}
      <motion.div variants={itemVariants} className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
          <div>
            <h3 className="text-red-800 dark:text-red-200 font-medium font-body mb-1">
              Account Deletion Warning
            </h3>
            <ul className="text-red-700 dark:text-red-300 text-sm font-body space-y-1">
              <li>• All your hymn submissions and collections will be permanently deleted</li>
              <li>• Your prayer contributions will be removed from the library</li>
              <li>• Your member profile and activity history will be erased</li>
              <li>• This action cannot be reversed or undone</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Step 1: Reason for Deletion */}
      {step === 1 && (
        <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
          <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-4">
            Help us improve - Why are you leaving?
          </h3>
          <div className="space-y-3">
            {[
              { key: 'notUseful', label: 'The platform is not useful for my needs' },
              { key: 'tooComplicated', label: 'It\'s too complicated to use' },
              { key: 'foundAlternative', label: 'I found a better alternative' },
              { key: 'privacyConcerns', label: 'Privacy or security concerns' },
              { key: 'other', label: 'Other reason (please specify below)' }
            ].map((reason) => (
              <label key={reason.key} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={reasonChecks[reason.key]}
                  onChange={() => handleReasonChange(reason.key)}
                  className="rounded border-peace-300 text-red-600 focus:ring-red-500 mt-1"
                />
                <span className="text-peace-700 dark:text-peace-300 font-body">{reason.label}</span>
              </label>
            ))}
          </div>
          
          {reasonChecks.other && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Please tell us more:
              </label>
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none font-body"
                rows="3"
                placeholder="Tell us what we could improve..."
              />
            </div>
          )}
        </motion.div>
      )}

      {/* Step 2: Confirmation */}
      {step === 2 && (
        <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
          <div className="flex items-center space-x-3 mb-4">
            <SafeIcon icon={FiShield} className="w-6 h-6 text-red-600 dark:text-red-400" />
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white">
              Final Confirmation Required
            </h3>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4 mb-4">
            <p className="text-red-800 dark:text-red-200 font-body text-center">
              To confirm account deletion, please type <strong>"DELETE MY ACCOUNT"</strong> in the box below:
            </p>
          </div>
          
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 font-mono font-body text-center"
            placeholder="Type: DELETE MY ACCOUNT"
          />
          
          <div className="mt-4 p-3 bg-peace-50 dark:bg-peace-700 rounded-lg">
            <p className="text-peace-700 dark:text-peace-300 text-sm font-body">
              <strong>Account:</strong> {user?.email || 'Current User'}
            </p>
            <p className="text-peace-700 dark:text-peace-300 text-sm font-body">
              <strong>Deletion will remove:</strong> All your data, submissions, and account access
            </p>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex space-x-4">
        {step === 1 ? (
          <>
            <button
              onClick={() => navigate('/settings')}
              className="flex-1 px-6 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
              <span>Cancel</span>
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={!canProceed()}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-body"
            >
              Continue to Deletion
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setStep(1)}
              className="flex-1 px-6 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={!canProceed() || isDeleting}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-body flex items-center justify-center space-x-2"
            >
              <SafeIcon icon={FiTrash2} className="w-5 h-5" />
              <span>{isDeleting ? 'Deleting Account...' : 'Delete My Account'}</span>
            </button>
          </>
        )}
      </motion.div>

      {/* Alternative Actions */}
      <motion.div variants={itemVariants} className="text-center">
        <p className="text-peace-500 dark:text-peace-400 text-sm font-body mb-3">
          Not sure about deleting your account?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/help')}
            className="px-4 py-2 bg-peace-100 dark:bg-peace-700 text-peace-700 dark:text-peace-300 rounded-lg hover:bg-peace-200 dark:hover:bg-peace-600 transition-colors font-body text-sm"
          >
            Get Help
          </button>
          <button
            onClick={() => navigate('/feedback')}
            className="px-4 py-2 bg-peace-100 dark:bg-peace-700 text-peace-700 dark:text-peace-300 rounded-lg hover:bg-peace-200 dark:hover:bg-peace-600 transition-colors font-body text-sm"
          >
            Send Feedback
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-body text-sm"
          >
            Account Settings
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteAccount;