import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiTarget,
  FiHeart,
  FiDollarSign,
  FiUsers,
  FiCalendar,
  FiMapPin,
  FiTrendingUp,
  FiMusic,
  FiHome,
  FiTool,
  FiStar,
  FiClock,
  FiCheck,
  FiChevronDown,
  FiChevronUp
} = FiIcons;

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedProject, setExpandedProject] = useState(null);

  // Sample projects data with donor lists
  const projects = [
    {
      id: 1,
      title: 'New Church Building for Rural Community',
      description: 'Help build a new church building for a growing rural community in need of a proper worship space.',
      category: 'Building',
      location: 'Rural Philippines',
      goal: 50000,
      raised: 32500,
      donors: 127,
      daysLeft: 45,
      image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=400&h=300&fit=crop',
      organizer: 'Faith Building Ministry',
      featured: true,
      urgency: 'High',
      story: 'This rural community has been meeting under a tree for worship. With the rainy season approaching, they desperately need a proper building to continue their fellowship.',
      updates: [
        { date: '2024-01-20', text: 'Foundation work has begun!' },
        { date: '2024-01-15', text: 'Building permits approved' }
      ],
      recentDonors: [
        { name: 'John Smith', amount: 500, date: '2024-01-28', isAnonymous: false },
        { name: 'Anonymous', amount: 250, date: '2024-01-27', isAnonymous: true },
        { name: 'Maria Santos', amount: 100, date: '2024-01-26', isAnonymous: false },
        { name: 'David Chen', amount: 300, date: '2024-01-25', isAnonymous: false },
        { name: 'Anonymous', amount: 150, date: '2024-01-24', isAnonymous: true },
        { name: 'Sarah Johnson', amount: 200, date: '2024-01-23', isAnonymous: false },
        { name: 'Michael Rodriguez', amount: 400, date: '2024-01-22', isAnonymous: false },
        { name: 'Grace Fellowship', amount: 1000, date: '2024-01-21', isAnonymous: false }
      ]
    },
    {
      id: 2,
      title: 'Musical Instruments for Youth Ministry',
      description: 'Provide guitars, keyboards, and drums to equip young worship leaders in urban churches.',
      category: 'Instruments',
      location: 'Metro Manila, Philippines',
      goal: 15000,
      raised: 8750,
      donors: 89,
      daysLeft: 30,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      organizer: 'Youth for Christ Music Ministry',
      featured: false,
      urgency: 'Medium',
      story: 'Young people are eager to serve in worship but lack proper instruments. Your support will help nurture the next generation of worship leaders.',
      updates: [
        { date: '2024-01-18', text: 'Purchased first set of guitars!' }
      ],
      recentDonors: [
        { name: 'Youth Ministry Team', amount: 800, date: '2024-01-28', isAnonymous: false },
        { name: 'Anonymous', amount: 200, date: '2024-01-27', isAnonymous: true },
        { name: 'Pastor Williams', amount: 300, date: '2024-01-26', isAnonymous: false },
        { name: 'Music Lovers Church', amount: 500, date: '2024-01-25', isAnonymous: false },
        { name: 'Anonymous', amount: 100, date: '2024-01-24', isAnonymous: true }
      ]
    },
    {
      id: 3,
      title: 'Church Renovation After Typhoon',
      description: 'Restore a church building damaged by recent typhoon, including roof repair and interior restoration.',
      category: 'Renovation',
      location: 'Cebu, Philippines',
      goal: 25000,
      raised: 18900,
      donors: 156,
      daysLeft: 20,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      organizer: 'Disaster Relief Ministry',
      featured: true,
      urgency: 'High',
      story: 'Typhoon damage has left this church unable to hold services. The community is determined to rebuild and needs our support.',
      updates: [
        { date: '2024-01-22', text: 'Roof repairs 70% complete' },
        { date: '2024-01-10', text: 'Cleanup efforts completed' }
      ],
      recentDonors: [
        { name: 'Community Relief Fund', amount: 2000, date: '2024-01-28', isAnonymous: false },
        { name: 'Anonymous', amount: 500, date: '2024-01-27', isAnonymous: true },
        { name: 'Emergency Response Team', amount: 1500, date: '2024-01-26', isAnonymous: false },
        { name: 'Local Government Unit', amount: 3000, date: '2024-01-25', isAnonymous: false },
        { name: 'Typhoon Relief Coalition', amount: 2500, date: '2024-01-24', isAnonymous: false }
      ]
    },
    {
      id: 4,
      title: 'Sound System for Mountain Chapel',
      description: 'Install a proper sound system for a mountain chapel that serves multiple remote villages.',
      category: 'Equipment',
      location: 'Baguio, Philippines',
      goal: 8000,
      raised: 3200,
      donors: 42,
      daysLeft: 60,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
      organizer: 'Mountain Mission Ministry',
      featured: false,
      urgency: 'Low',
      story: 'This chapel serves 5 remote villages. A proper sound system will ensure everyone can hear the message clearly.',
      updates: [
        { date: '2024-01-12', text: 'Equipment specifications finalized' }
      ],
      recentDonors: [
        { name: 'Audio Tech Solutions', amount: 800, date: '2024-01-28', isAnonymous: false },
        { name: 'Anonymous', amount: 200, date: '2024-01-27', isAnonymous: true },
        { name: 'Mountain Community Church', amount: 400, date: '2024-01-26', isAnonymous: false },
        { name: 'Tech Ministry Team', amount: 300, date: '2024-01-25', isAnonymous: false }
      ]
    },
    {
      id: 5,
      title: 'Annual Christian Music Festival',
      description: 'Support the annual Christian music festival that brings together worship teams from across the region.',
      category: 'Events',
      location: 'Davao, Philippines',
      goal: 20000,
      raised: 12400,
      donors: 98,
      daysLeft: 90,
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop',
      organizer: 'Regional Christian Music Alliance',
      featured: false,
      urgency: 'Medium',
      story: 'This festival encourages and trains worship leaders while celebrating faith through music. Your support makes it possible.',
      updates: [
        { date: '2024-01-25', text: 'Venue confirmed for this year\'s festival' }
      ],
      recentDonors: [
        { name: 'Music Festival Supporters', amount: 1200, date: '2024-01-28', isAnonymous: false },
        { name: 'Anonymous', amount: 300, date: '2024-01-27', isAnonymous: true },
        { name: 'Worship Leaders Alliance', amount: 800, date: '2024-01-26', isAnonymous: false },
        { name: 'Regional Churches Coalition', amount: 1500, date: '2024-01-25', isAnonymous: false }
      ]
    },
    {
      id: 6,
      title: 'Mobile Chapel Van Ministry',
      description: 'Fund a mobile chapel van to reach remote communities without access to churches.',
      category: 'Ministry',
      location: 'Mindanao, Philippines',
      goal: 35000,
      raised: 14200,
      donors: 73,
      daysLeft: 120,
      image: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?w=400&h=300&fit=crop',
      organizer: 'Mobile Ministry Philippines',
      featured: true,
      urgency: 'Medium',
      story: 'Many remote communities have no church within hours of travel. This mobile chapel will bring worship and fellowship directly to them.',
      updates: [
        { date: '2024-01-20', text: 'Van chassis purchased and customization begun' }
      ],
      recentDonors: [
        { name: 'Mobile Ministry Fund', amount: 2000, date: '2024-01-28', isAnonymous: false },
        { name: 'Anonymous', amount: 500, date: '2024-01-27', isAnonymous: true },
        { name: 'Remote Villages Support', amount: 1000, date: '2024-01-26', isAnonymous: false },
        { name: 'Transportation Ministry', amount: 1500, date: '2024-01-25', isAnonymous: false },
        { name: 'Mission Outreach Team', amount: 800, date: '2024-01-24', isAnonymous: false }
      ]
    }
  ];

  const categories = [
    { value: 'All', label: 'All Projects', icon: FiTarget },
    { value: 'Building', label: 'Church Building', icon: FiHome },
    { value: 'Renovation', label: 'Renovations', icon: FiTool },
    { value: 'Instruments', label: 'Instruments', icon: FiMusic },
    { value: 'Equipment', label: 'Equipment', icon: FiStar },
    { value: 'Events', label: 'Events', icon: FiCalendar },
    { value: 'Ministry', label: 'Ministry', icon: FiUsers }
  ];

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'All' || project.category === selectedCategory
  );

  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

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

  const totalRaised = projects.reduce((sum, project) => sum + project.raised, 0);
  const totalGoal = projects.reduce((sum, project) => sum + project.goal, 0);
  const totalDonors = projects.reduce((sum, project) => sum + project.donors, 0);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiTarget} className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-display font-bold text-peace-900 dark:text-white mb-2">
          Community Projects
        </h1>
        <p className="text-xl text-peace-600 dark:text-peace-300 max-w-3xl mx-auto font-body">
          Support meaningful projects that strengthen churches and communities worldwide. Every donation helps build God's kingdom on earth.
        </p>
      </motion.div>

      {/* Stats Overview - Reduced size for both mobile and web */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white dark:bg-peace-800 rounded-xl p-3 md:p-4 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <h3 className="text-lg md:text-xl font-display font-bold text-peace-900 dark:text-white mb-1">
            ${totalRaised.toLocaleString()}
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body text-xs md:text-sm">Total Raised</p>
        </div>
        <div className="bg-white dark:bg-peace-800 rounded-xl p-3 md:p-4 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <h3 className="text-lg md:text-xl font-display font-bold text-peace-900 dark:text-white mb-1">
            {projects.length}
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body text-xs md:text-sm">Active Projects</p>
        </div>
        <div className="bg-white dark:bg-peace-800 rounded-xl p-3 md:p-4 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <h3 className="text-lg md:text-xl font-display font-bold text-peace-900 dark:text-white mb-1">
            {totalDonors}
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body text-xs md:text-sm">Total Donors</p>
        </div>
        <div className="bg-white dark:bg-peace-800 rounded-xl p-3 md:p-4 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <h3 className="text-lg md:text-xl font-display font-bold text-peace-900 dark:text-white mb-1">
            {Math.round((totalRaised / totalGoal) * 100)}%
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body text-xs md:text-sm">Overall Progress</p>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium font-body transition-colors ${
                selectedCategory === category.value
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-peace-100 dark:bg-peace-700 text-peace-700 dark:text-peace-300 hover:bg-primary-50 dark:hover:bg-peace-600'
              }`}
            >
              <SafeIcon icon={category.icon} className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Featured Projects */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-6">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredProjects.filter(project => project.featured).map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium font-body">
                    Featured
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium font-body ${getUrgencyColor(project.urgency)}`}>
                    {project.urgency} Priority
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-body">
                  <SafeIcon icon={FiClock} className="w-3 h-3 inline mr-1" />
                  {project.daysLeft} days left
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-peace-500 dark:text-peace-400 text-sm mb-2">
                      <SafeIcon icon={FiMapPin} className="w-3 h-3" />
                      <span className="font-body">{project.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-peace-600 dark:text-peace-300 font-body mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-body text-peace-600 dark:text-peace-300">Progress</span>
                    <span className="font-body font-medium text-peace-900 dark:text-white">
                      {getProgressPercentage(project.raised, project.goal).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-peace-200 dark:bg-peace-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage(project.raised, project.goal)}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-2xl font-display font-bold text-peace-900 dark:text-white">
                      ${project.raised.toLocaleString()}
                    </p>
                    <p className="text-peace-600 dark:text-peace-300 text-sm font-body">
                      of ${project.goal.toLocaleString()} goal
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-display font-bold text-peace-900 dark:text-white">
                      {project.donors}
                    </p>
                    <p className="text-peace-600 dark:text-peace-300 text-sm font-body">donors</p>
                  </div>
                </div>

                {/* Recent Donors Section */}
                <div className="mb-4 p-4 bg-peace-50 dark:bg-peace-700 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-peace-900 dark:text-white font-body text-sm">Recent Supporters</h4>
                    <button
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      <SafeIcon icon={expandedProject === project.id ? FiChevronUp : FiChevronDown} className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {project.recentDonors.slice(0, expandedProject === project.id ? project.recentDonors.length : 3).map((donor, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="font-body text-peace-700 dark:text-peace-300">
                          {donor.isAnonymous ? 'Anonymous Donor' : donor.name}
                        </span>
                        <div className="text-right">
                          <span className="font-medium text-peace-900 dark:text-white font-body">
                            ${donor.amount.toLocaleString()}
                          </span>
                          <p className="text-xs text-peace-500 dark:text-peace-400 font-body">
                            {new Date(donor.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {expandedProject !== project.id && project.recentDonors.length > 3 && (
                      <p className="text-xs text-primary-600 dark:text-primary-400 font-body">
                        +{project.recentDonors.length - 3} more supporters
                      </p>
                    )}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium font-body hover:from-green-600 hover:to-green-700 transition-colors flex items-center justify-center space-x-2">
                  <SafeIcon icon={FiHeart} className="w-5 h-5" />
                  <span>Support This Project</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* All Projects - Improved Layout */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-6">
          All Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover"
                />
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium font-body">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-body">
                  {project.daysLeft}d left
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2 line-clamp-2">
                  {project.title}
                </h3>
                
                <div className="flex items-center space-x-1 text-peace-500 dark:text-peace-400 text-sm mb-3">
                  <SafeIcon icon={FiMapPin} className="w-3 h-3" />
                  <span className="font-body">{project.location}</span>
                </div>

                <p className="text-peace-600 dark:text-peace-300 font-body text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress Bar - Compact */}
                <div className="mb-4">
                  <div className="w-full bg-peace-200 dark:bg-peace-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getProgressPercentage(project.raised, project.goal)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="font-body text-peace-600 dark:text-peace-300">
                      ${project.raised.toLocaleString()}
                    </span>
                    <span className="font-body text-peace-600 dark:text-peace-300">
                      {getProgressPercentage(project.raised, project.goal).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-display font-bold text-peace-900 dark:text-white">
                      ${project.raised.toLocaleString()}
                    </p>
                    <p className="text-peace-600 dark:text-peace-300 text-xs font-body">
                      goal: ${project.goal.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-peace-900 dark:text-white">
                      {project.donors}
                    </p>
                    <p className="text-peace-600 dark:text-peace-300 text-xs font-body">donors</p>
                  </div>
                </div>

                {/* Compact Recent Donors */}
                <div className="mb-4 p-3 bg-peace-50 dark:bg-peace-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-peace-900 dark:text-white font-body text-xs">Recent Support</h4>
                    <button
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      <SafeIcon icon={expandedProject === project.id ? FiChevronUp : FiChevronDown} className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {project.recentDonors.slice(0, expandedProject === project.id ? project.recentDonors.length : 2).map((donor, index) => (
                      <div key={index} className="flex justify-between items-center text-xs">
                        <span className="font-body text-peace-700 dark:text-peace-300 truncate">
                          {donor.isAnonymous ? 'Anonymous' : donor.name}
                        </span>
                        <span className="font-medium text-peace-900 dark:text-white font-body ml-2">
                          ${donor.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    {expandedProject !== project.id && project.recentDonors.length > 2 && (
                      <p className="text-xs text-primary-600 dark:text-primary-400 font-body">
                        +{project.recentDonors.length - 2} more
                      </p>
                    )}
                  </div>
                </div>

                <button className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg font-medium font-body hover:bg-primary-600 transition-colors text-sm flex items-center justify-center space-x-1">
                  <SafeIcon icon={FiDollarSign} className="w-4 h-4" />
                  <span>Donate</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center">
          <SafeIcon icon={FiHeart} className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold mb-4">Make a Difference Today</h2>
          <p className="text-xl opacity-90 font-body mb-6 max-w-2xl mx-auto">
            Your support helps build churches, equip ministries, and strengthen communities worldwide. 
            Every donation, no matter the size, makes an eternal impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-medium font-body hover:bg-gray-50 transition-colors">
              Start a Project
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium font-body hover:bg-white/30 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;