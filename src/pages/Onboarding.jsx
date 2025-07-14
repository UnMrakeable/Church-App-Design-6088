import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { OnBoarding } from '@questlabs/react-sdk';
import { useAuth } from '../contexts/AuthContext';
import questConfig from '../../questConfig';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookOpen, FiMusic, FiUsers, FiHeart, FiSettings, FiTarget } = FiIcons;

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [answers, setAnswers] = useState({});

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const getAnswers = () => {
    // Mark onboarding as completed
    completeOnboarding();
    // Navigate to main dashboard
    navigate('/');
  };

  const onboardingSteps = [
    {
      icon: FiTarget,
      title: 'Welcome to With Hymn!',
      description: 'Let\'s set up your worship experience to match your needs and preferences.'
    },
    {
      icon: FiMusic,
      title: 'Customize Your Library',
      description: 'Tell us about your musical preferences and the languages you use in worship.'
    },
    {
      icon: FiUsers,
      title: 'Team Collaboration',
      description: 'Set up your worship team and collaboration preferences.'
    },
    {
      icon: FiSettings,
      title: 'Personalize Experience',
      description: 'Configure your display preferences and notification settings.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 dark:from-peace-900 dark:to-peace-800 flex">
      {/* Left Section - Onboarding Visual */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sacred-600 via-primary-600 to-primary-700"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center space-x-4 mb-8"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <SafeIcon icon={FiBookOpen} className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">With Hymn</h1>
              <p className="text-white/80 font-body">Setup & Personalization</p>
            </div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Let's Get Started!
            </h2>
            <p className="text-xl text-white/90 font-body leading-relaxed">
              We're setting up your personalized worship experience. This will only take a few moments and will help us tailor the platform to your needs.
            </p>
          </motion.div>

          {/* Onboarding Steps Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-display font-semibold mb-4">What we'll cover:</h3>
            {onboardingSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                className="flex items-start space-x-4"
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <SafeIcon icon={step.icon} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-lg mb-1">{step.title}</h4>
                  <p className="text-white/80 font-body text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
          >
            <div className="flex items-center space-x-3 mb-3">
              <SafeIcon icon={FiHeart} className="w-6 h-6 text-white" />
              <h4 className="font-display font-semibold text-lg">Quick & Easy</h4>
            </div>
            <p className="text-white/90 font-body">
              This setup process typically takes 2-3 minutes. You can always change these preferences later in your settings.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section - Onboarding Component */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-sacred-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiSettings} className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">
              Getting Started
            </h1>
            <p className="text-peace-600 dark:text-peace-300 font-body">
              Let's personalize your worship experience
            </p>
          </div>

          {/* Quest Onboarding Component */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-8 shadow-xl border border-peace-200 dark:border-peace-700"
            style={{ minHeight: '400px' }}
          >
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-2">
                Personalize Your Experience
              </h2>
              <p className="text-peace-600 dark:text-peace-300 font-body">
                Help us tailor With Hymn to your worship needs
              </p>
            </div>

            {userId && token ? (
              <OnBoarding
                userId={userId}
                token={token}
                questId={questConfig.QUEST_ONBOARDING_QUESTID}
                answer={answers}
                setAnswer={setAnswers}
                getAnswers={getAnswers}
                accent={questConfig.PRIMARY_COLOR}
                singleChoose="modal1"
                multiChoice="modal2"
              >
                <OnBoarding.Header />
                <OnBoarding.Content />
                <OnBoarding.Footer />
              </OnBoarding>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-peace-600 dark:text-peace-300 font-body">Loading your onboarding experience...</p>
              </div>
            )}
          </motion.div>

          {/* Skip Option */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-6"
          >
            <button
              onClick={() => {
                completeOnboarding();
                navigate('/');
              }}
              className="text-sm text-peace-500 dark:text-peace-400 hover:text-peace-700 dark:hover:text-peace-200 font-body transition-colors"
            >
              Skip for now - I'll set this up later
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;