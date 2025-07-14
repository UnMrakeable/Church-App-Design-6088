import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiHelpCircle,
  FiBook,
  FiPlay,
  FiMessageCircle,
  FiSearch,
  FiChevronDown,
  FiChevronUp,
  FiVideo,
  FiFileText,
  FiMail,
  FiPhone,
  FiClock,
  FiUsers,
  FiSettings,
  FiMusic,
  FiPrinter,
  FiDownload,
  FiShare2,
  FiEdit,
  FiPlus,
  FiStar,
  FiArrowRight,
  FiExternalLink
} = FiIcons;

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Help categories
  const categories = [
    { id: 'All', label: 'All Topics', icon: FiBook },
    { id: 'getting-started', label: 'Getting Started', icon: FiPlay },
    { id: 'hymns', label: 'Managing Hymns', icon: FiMusic },
    { id: 'collections', label: 'Collections', icon: FiUsers },
    { id: 'printing', label: 'Printing & Export', icon: FiPrinter },
    { id: 'account', label: 'Account Settings', icon: FiSettings },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: FiHelpCircle }
  ];

  // Quick start guides
  const quickStartGuides = [
    {
      title: 'Getting Started with With Hymn',
      description: 'Learn the basics of navigating and using the platform',
      duration: '5 min read',
      category: 'getting-started',
      icon: FiPlay,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Adding Your First Hymn',
      description: 'Step-by-step guide to submitting lyrics and chords',
      duration: '3 min read',
      category: 'hymns',
      icon: FiMusic,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Creating Collections',
      description: 'Organize your hymns into themed collections',
      duration: '4 min read',
      category: 'collections',
      icon: FiUsers,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Printing Hymns',
      description: 'How to format and print hymns for worship services',
      duration: '2 min read',
      category: 'printing',
      icon: FiPrinter,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Video tutorials
  const videoTutorials = [
    {
      title: 'Platform Overview',
      description: 'Complete walkthrough of With Hymn features',
      duration: '8:30',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
      category: 'getting-started'
    },
    {
      title: 'Advanced Chord Formatting',
      description: 'Tips for properly formatting complex chord progressions',
      duration: '5:45',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
      category: 'hymns'
    },
    {
      title: 'Team Collaboration Features',
      description: 'Working together with worship teams and musicians',
      duration: '6:20',
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=225&fit=crop',
      category: 'collections'
    }
  ];

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: 'How do I add chord notations to my hymns?',
      answer: 'Use square brackets around chords, like [G], [C], [Am]. Place them directly above the lyrics where the chord changes occur. For example: "[G]Amazing [C]grace how [G]sweet the sound".',
      category: 'hymns'
    },
    {
      id: 2,
      question: 'Can I import hymns from other formats?',
      answer: 'Yes! You can copy and paste lyrics from Word documents, PDFs, or other text sources. Our system will help you format them properly with chord notations.',
      category: 'hymns'
    },
    {
      id: 3,
      question: 'How do I create a collection for Sunday service?',
      answer: 'Go to Collections, click "Create Collection", give it a name like "Sunday Service - Jan 15", then add hymns by browsing the library and clicking "Add to Collection".',
      category: 'collections'
    },
    {
      id: 4,
      question: 'What\'s the best way to print hymns for the congregation?',
      answer: 'Use the Print Preview feature to see how hymns will look. You can adjust font size, choose whether to include chords, and format for different paper sizes.',
      category: 'printing'
    },
    {
      id: 5,
      question: 'Can I add translations of hymns?',
      answer: 'Absolutely! When adding a hymn, check "This is a translation" and select the original song. This helps link different language versions together.',
      category: 'hymns'
    },
    {
      id: 6,
      question: 'How do I change my account settings?',
      answer: 'Click on your profile icon in the top right, then select "Settings". You can update your display preferences, notification settings, and account information.',
      category: 'account'
    },
    {
      id: 7,
      question: 'Why can\'t I see some hymns in the library?',
      answer: 'Some hymns may be pending approval. Submitted hymns are reviewed by administrators before being published to ensure quality and accuracy.',
      category: 'troubleshooting'
    },
    {
      id: 8,
      question: 'How do I report a problem or bug?',
      answer: 'Use the Feedback page to report issues. Provide as much detail as possible including what you were doing when the problem occurred.',
      category: 'troubleshooting'
    }
  ];

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
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
      className="p-6 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiHelpCircle} className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-display font-bold text-peace-900 dark:text-white mb-2">
          Help Hub
        </h1>
        <p className="text-xl text-peace-600 dark:text-peace-300 font-body">
          Everything you need to master With Hymn
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
        <div className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-peace-500 dark:text-peace-400" 
          />
          <input
            type="text"
            placeholder="Search help articles, guides, and FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-peace-800 rounded-2xl text-peace-900 dark:text-white placeholder-peace-500 dark:placeholder-peace-400 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-lg border border-peace-200 dark:border-peace-700 font-body"
          />
        </div>
      </motion.div>

      {/* Category Navigation */}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium font-body transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white dark:bg-peace-800 text-peace-700 dark:text-peace-300 hover:bg-primary-50 dark:hover:bg-peace-700 border border-peace-200 dark:border-peace-700'
            }`}
          >
            <SafeIcon icon={category.icon} className="w-4 h-4" />
            <span>{category.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Quick Start Guides */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-6 text-center">
          Quick Start Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStartGuides.map((guide, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${guide.color} rounded-xl flex items-center justify-center mb-4`}>
                <SafeIcon icon={guide.icon} className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {guide.title}
              </h3>
              <p className="text-peace-600 dark:text-peace-300 text-sm font-body mb-3">
                {guide.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-peace-500 dark:text-peace-400 font-body">
                  {guide.duration}
                </span>
                <SafeIcon 
                  icon={FiArrowRight} 
                  className="w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform" 
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Video Tutorials */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-6 text-center">
          Video Tutorials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videoTutorials.map((video, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-peace-800 rounded-2xl overflow-hidden shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiPlay} className="w-8 h-8 text-peace-900 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-body">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-peace-600 dark:text-peace-300 text-sm font-body">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={false}
              className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-peace-50 dark:hover:bg-peace-700 transition-colors"
              >
                <h3 className="text-lg font-display font-medium text-peace-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <SafeIcon 
                  icon={expandedFAQ === faq.id ? FiChevronUp : FiChevronDown} 
                  className="w-5 h-5 text-peace-500 dark:text-peace-400 flex-shrink-0" 
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: expandedFAQ === faq.id ? 'auto' : 0,
                  opacity: expandedFAQ === faq.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <p className="text-peace-600 dark:text-peace-300 font-body leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-peace-100 dark:bg-peace-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiSearch} className="w-8 h-8 text-peace-500 dark:text-peace-400" />
            </div>
            <h3 className="text-xl font-display font-medium text-peace-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-peace-600 dark:text-peace-300 font-body">
              Try adjusting your search terms or browse different categories
            </p>
          </div>
        )}
      </motion.div>

      {/* Contact Support */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white text-center">
          <SafeIcon icon={FiMessageCircle} className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl opacity-90 font-body mb-6">
            Our support team is here to help you succeed with With Hymn
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
              <SafeIcon icon={FiMail} className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-display font-semibold mb-1">Email Support</h3>
              <p className="text-sm opacity-90 font-body">support@withhymn.com</p>
              <p className="text-xs opacity-75 font-body">Response within 24 hours</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
              <SafeIcon icon={FiMessageCircle} className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-display font-semibold mb-1">Live Chat</h3>
              <p className="text-sm opacity-90 font-body">Available 9 AM - 5 PM PST</p>
              <p className="text-xs opacity-75 font-body">Monday through Friday</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
              <SafeIcon icon={FiBook} className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-display font-semibold mb-1">Documentation</h3>
              <p className="text-sm opacity-90 font-body">Comprehensive guides</p>
              <p className="text-xs opacity-75 font-body">Step-by-step tutorials</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium font-body hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <SafeIcon icon={FiMail} className="w-5 h-5" />
              <span>Contact Support</span>
            </button>
            <button className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium font-body hover:bg-white hover:bg-opacity-30 transition-colors flex items-center justify-center space-x-2">
              <SafeIcon icon={FiExternalLink} className="w-5 h-5" />
              <span>Visit Documentation</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Additional Resources */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-6 text-center">
          Additional Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
            <SafeIcon icon={FiFileText} className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2">
              User Manual
            </h3>
            <p className="text-peace-600 dark:text-peace-300 text-sm font-body mb-4">
              Complete guide to all features
            </p>
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-body text-sm flex items-center space-x-1 mx-auto">
              <span>Download PDF</span>
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
            <SafeIcon icon={FiVideo} className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2">
              Video Library
            </h3>
            <p className="text-peace-600 dark:text-peace-300 text-sm font-body mb-4">
              Step-by-step video tutorials
            </p>
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-body text-sm flex items-center space-x-1 mx-auto">
              <span>Watch Videos</span>
              <SafeIcon icon={FiPlay} className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
            <SafeIcon icon={FiUsers} className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2">
              Community Forum
            </h3>
            <p className="text-peace-600 dark:text-peace-300 text-sm font-body mb-4">
              Connect with other users
            </p>
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-body text-sm flex items-center space-x-1 mx-auto">
              <span>Join Forum</span>
              <SafeIcon icon={FiExternalLink} className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
            <SafeIcon icon={FiStar} className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2">
              Feature Requests
            </h3>
            <p className="text-peace-600 dark:text-peace-300 text-sm font-body mb-4">
              Suggest new features
            </p>
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-body text-sm flex items-center space-x-1 mx-auto">
              <span>Submit Idea</span>
              <SafeIcon icon={FiPlus} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Help;