import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import { useTheme } from '../contexts/ThemeContext';
import * as FiIcons from 'react-icons/fi';

const { FiMoon, FiSun, FiUser, FiMusic, FiDownload, FiCloud, FiSettings, FiBell, FiLock } = FiIcons;

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();

  const settingsSections = [
    {
      title: 'Appearance',
      icon: FiSettings,
      settings: [
        {
          label: 'Dark Mode',
          description: 'Toggle between light and dark themes',
          type: 'toggle',
          value: isDark,
          onChange: toggleTheme,
          icon: isDark ? FiMoon : FiSun
        }
      ]
    },
    {
      title: 'Music & Display',
      icon: FiMusic,
      settings: [
        {
          label: 'Default Font Size',
          description: 'Set the default font size for hymn lyrics',
          type: 'select',
          value: '16px',
          options: ['12px', '14px', '16px', '18px', '20px', '24px']
        },
        {
          label: 'Show Chords by Default',
          description: 'Display chords when opening hymns',
          type: 'toggle',
          value: true
        },
        {
          label: 'Auto-scroll Speed',
          description: 'Speed for automatic scrolling during performance',
          type: 'select',
          value: 'Medium',
          options: ['Slow', 'Medium', 'Fast']
        }
      ]
    },
    {
      title: 'Sync & Backup',
      icon: FiCloud,
      settings: [
        {
          label: 'Cloud Sync',
          description: 'Sync your hymns and collections across devices',
          type: 'toggle',
          value: true
        },
        {
          label: 'Offline Mode',
          description: 'Download hymns for offline access',
          type: 'toggle',
          value: false
        },
        {
          label: 'Auto Backup',
          description: 'Automatically backup your data',
          type: 'toggle',
          value: true
        }
      ]
    },
    {
      title: 'Notifications',
      icon: FiBell,
      settings: [
        {
          label: 'New Hymn Alerts',
          description: 'Get notified when new hymns are added',
          type: 'toggle',
          value: true
        },
        {
          label: 'Collection Updates',
          description: 'Notifications for collection changes',
          type: 'toggle',
          value: false
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">Settings</h1>
        <p className="text-peace-600 dark:text-peace-300 font-body">
          Customize your hymn experience
        </p>
      </motion.div>

      {/* Profile Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700"
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-sacred-500 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiUser} className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white">John Doe</h3>
            <p className="text-peace-600 dark:text-peace-300 font-body">Worship Leader</p>
            <p className="text-peace-500 dark:text-peace-400 text-sm font-body">john.doe@church.com</p>
          </div>
          <button className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-xl hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors font-body">
            Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          variants={itemVariants}
          className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-sacred-500 rounded-xl flex items-center justify-center">
              <SafeIcon icon={section.icon} className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-display font-bold text-peace-900 dark:text-white">
              {section.title}
            </h2>
          </div>

          <div className="space-y-4">
            {section.settings.map((setting, settingIndex) => (
              <div key={settingIndex} className="flex items-center justify-between py-3 border-b border-peace-100 dark:border-peace-700 last:border-b-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    {setting.icon && (
                      <SafeIcon icon={setting.icon} className="w-5 h-5 text-peace-500 dark:text-peace-400" />
                    )}
                    <div>
                      <h4 className="font-medium text-peace-900 dark:text-white font-body">
                        {setting.label}
                      </h4>
                      <p className="text-peace-600 dark:text-peace-300 text-sm font-body">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-4">
                  {setting.type === 'toggle' && (
                    <button
                      onClick={setting.onChange}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        setting.value
                          ? 'bg-primary-500'
                          : 'bg-peace-300 dark:bg-peace-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          setting.value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  )}

                  {setting.type === 'select' && (
                    <select className="bg-peace-100 dark:bg-peace-700 text-peace-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 font-body">
                      {setting.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Data Management */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-sacred-500 rounded-xl flex items-center justify-center">
            <SafeIcon icon={FiDownload} className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-display font-bold text-peace-900 dark:text-white">
            Data Management
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors text-left">
            <h4 className="font-medium mb-1 font-body">Export Data</h4>
            <p className="text-sm opacity-80 font-body">Download all your hymns and collections</p>
          </button>
          
          <button className="p-4 bg-sacred-50 dark:bg-sacred-900 text-sacred-700 dark:text-sacred-300 rounded-xl hover:bg-sacred-100 dark:hover:bg-sacred-800 transition-colors text-left">
            <h4 className="font-medium mb-1 font-body">Import Hymns</h4>
            <p className="text-sm opacity-80 font-body">Import hymns from other formats</p>
          </button>
        </div>
      </motion.div>

      {/* Privacy & Security */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-sacred-500 rounded-xl flex items-center justify-center">
            <SafeIcon icon={FiLock} className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-display font-bold text-peace-900 dark:text-white">
            Privacy & Security
          </h2>
        </div>

        <div className="space-y-3">
          <button className="w-full text-left p-3 rounded-lg hover:bg-peace-50 dark:hover:bg-peace-700 transition-colors">
            <span className="text-peace-900 dark:text-white font-body">Privacy Policy</span>
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-peace-50 dark:hover:bg-peace-700 transition-colors">
            <span className="text-peace-900 dark:text-white font-body">Terms of Service</span>
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-colors">
            <span className="text-red-600 dark:text-red-400 font-body">Delete Account</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;