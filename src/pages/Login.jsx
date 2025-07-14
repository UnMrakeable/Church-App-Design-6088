import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { QuestLogin } from '@questlabs/react-sdk';
import { useAuth } from '../contexts/AuthContext';
import questConfig from '../../questConfig';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookOpen, FiMusic, FiHeart, FiUsers } = FiIcons;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = ({ userId, token, newUser, ...otherData }) => {
    const isNewUser = login({ userId, token, newUser, ...otherData });
    
    if (isNewUser) {
      navigate('/onboarding');
    } else {
      navigate('/');
    }
  };

  const features = [
    {
      icon: FiMusic,
      title: 'Comprehensive Hymn Library',
      description: 'Access thousands of hymns with chord notations and multiple language translations.'
    },
    {
      icon: FiBookOpen,
      title: 'Prayer Collections',
      description: 'Organize and share prayers in English, Tagalog, Ilocano, and more languages.'
    },
    {
      icon: FiUsers,
      title: 'Team Collaboration',
      description: 'Work together with worship teams to create meaningful worship experiences.'
    },
    {
      icon: FiHeart,
      title: 'Built for Worship',
      description: 'Designed specifically for churches with features that enhance worship.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 dark:from-peace-900 dark:to-peace-800 flex">
      {/* Left Section - Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-sacred-600"></div>
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
              <p className="text-white/80 font-body">Beautiful Worship Songs</p>
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
              Welcome Back to Worship
            </h2>
            <p className="text-xl text-white/90 font-body leading-relaxed">
              Your comprehensive platform for organizing, sharing, and preserving sacred music and prayers for worship communities worldwide.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                className="flex items-start space-x-4"
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <SafeIcon icon={feature.icon} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-white/80 font-body text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
          >
            <p className="text-white/90 font-body italic text-lg mb-2">
              "Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit..."
            </p>
            <p className="text-white/70 font-body text-sm">— Colossians 3:16</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section - Authentication */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-sacred-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiBookOpen} className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">
              With Hymn
            </h1>
            <p className="text-peace-600 dark:text-peace-300 font-body">
              Sign in to continue your worship journey
            </p>
          </div>

          {/* Quest Login Component */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-8 shadow-xl border border-peace-200 dark:border-peace-700"
          >
            <div className="hidden lg:block text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-peace-600 dark:text-peace-300 font-body">
                Sign in to access your hymn library
              </p>
            </div>

            <QuestLogin
              onSubmit={handleLogin}
              email={true}
              google={false}
              accent={questConfig.PRIMARY_COLOR}
            />

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-peace-500 dark:text-peace-400 font-body">
                New to With Hymn? Your account will be created automatically upon first login.
              </p>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-peace-500 dark:text-peace-400 font-body">
              © 2024 With Hymn. Made with ❤️ for worship communities.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;