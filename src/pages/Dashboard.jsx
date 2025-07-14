import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import { useSongs } from '../contexts/SongContext';
import { usePrayers } from '../contexts/PrayerContext';
import { useSetlists } from '../contexts/SetlistContext';
import * as FiIcons from 'react-icons/fi';

const {
  FiMusic,
  FiList,
  FiPlus,
  FiTrendingUp,
  FiClock,
  FiBookOpen,
  FiHeart,
  FiEdit,
  FiX,
  FiSave,
  FiCalendar,
  FiGift,
  FiMonitor,
  FiUsers,
  FiDollarSign,
  FiTarget,
  FiUser,
  FiMapPin,
  FiMail,
  FiPhone
} = FiIcons;

const Dashboard = () => {
  const { songs, playlists, holidayGreeting, updateHolidayGreeting, getDailyVerse } = useSongs();
  const { prayers } = usePrayers();
  const { setlists } = useSetlists();
  const [showHolidayEditor, setShowHolidayEditor] = useState(false);
  const [editedGreeting, setEditedGreeting] = useState(holidayGreeting);

  const dailyVerse = getDailyVerse();

  // Sample data for new metrics
  const totalMembers = 127;
  const totalDonations = 2450.00;
  const currentProjects = 6;
  
  // Enhanced featured member data
  const featuredMember = {
    name: 'Sarah Johnson',
    gender: 'Female',
    center: 'Grace Community Church',
    address: '123 Main St, Springfield, IL',
    email: 'sarah.johnson@grace.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2024',
    role: 'Worship Leader',
    bio: 'Passionate worship leader with 8+ years of experience in leading congregational worship and training new musicians.',
    favoriteHymns: ['Amazing Grace', 'How Great Is Our God', 'Holy Spirit'],
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face'
  };

  // Updated stats without Collections and Favorites
  const stats = [
    {
      title: 'Total Hymns',
      value: songs.length,
      icon: FiMusic,
      color: 'from-emerald-400 to-teal-400',
      change: '+12%'
    },
    {
      title: 'Prayers',
      value: prayers.length,
      icon: FiBookOpen,
      color: 'from-purple-400 to-violet-400',
      change: '+5%'
    },
    {
      title: 'Total Members',
      value: totalMembers,
      icon: FiUsers,
      color: 'from-green-400 to-emerald-400',
      change: '+15%'
    },
    {
      title: 'Total Donations',
      value: `$${totalDonations.toLocaleString()}`,
      icon: FiDollarSign,
      color: 'from-yellow-400 to-orange-400',
      change: '+23%'
    },
    {
      title: 'Current Projects',
      value: currentProjects,
      icon: FiTarget,
      color: 'from-red-400 to-pink-400',
      change: '+2%'
    }
  ];

  const recentSongs = songs.slice(0, 6);
  const recentPlaylists = playlists.slice(0, 2);
  const recentSetlists = setlists.slice(0, 3);
  const recentPrayers = prayers.slice(0, 3);

  // Calculate countdown for Christmas
  const getCountdown = () => {
    if (!holidayGreeting.countdown || !holidayGreeting.targetDate) return null;
    const target = new Date(holidayGreeting.targetDate);
    const now = new Date();
    const difference = target - now;
    if (difference <= 0) return "Today!";
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return `${days} days to go`;
  };

  const handleSaveGreeting = () => {
    updateHolidayGreeting(editedGreeting);
    setShowHolidayEditor(false);
  };

  const getGenderLabel = (gender) => {
    return gender === 'Male' ? 'Hmno.' : 'Hmna.';
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
      {/* Daily Bible Verse - Now at the top */}
      <motion.div variants={itemVariants}>
        <div className="text-center bg-white dark:bg-peace-800 rounded-2xl p-4 lg:p-6 shadow-lg border border-peace-200 dark:border-peace-700">
          <div className="text-peace-600 dark:text-peace-400 text-sm lg:text-base font-body italic mb-2">
            "{dailyVerse.verse}"
          </div>
          <div className="text-peace-500 dark:text-peace-500 text-xs lg:text-sm font-body">
            - {dailyVerse.reference}
          </div>
        </div>
      </motion.div>

      {/* Welcome Section - Centered for web */}
      <motion.div variants={itemVariants} className="text-center">
        <h1 className="text-3xl lg:text-5xl font-display font-bold text-peace-900 dark:text-white mb-2">
          <span className="italic font-serif">Welcome to</span>{' '}
          <span className="text-primary-600 dark:text-primary-400">With Hymn</span>
        </h1>
        <p className="text-peace-600 dark:text-peace-300 text-base lg:text-lg font-body text-center">
          Preserve and share the beauty of sacred music and prayers
        </p>
      </motion.div>

      {/* Holiday Greeting - Desktop Only, Centered */}
      {holidayGreeting.enabled && (
        <div className="hidden md:block">
          <motion.div variants={itemVariants}>
            <div className="relative bg-gradient-to-r from-red-500 to-green-500 rounded-2xl p-4 lg:p-6 text-white text-center">
              <button
                onClick={() => setShowHolidayEditor(true)}
                className="absolute top-2 right-2 lg:top-4 lg:right-4 p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <SafeIcon icon={FiEdit} className="w-3 h-3 lg:w-4 lg:h-4" />
              </button>
              <div className="flex items-center justify-center mb-2">
                <SafeIcon icon={FiGift} className="w-6 h-6 lg:w-8 lg:h-8 mr-2 lg:mr-3" />
                <h2 className="text-lg lg:text-2xl font-display font-bold">{holidayGreeting.title}</h2>
              </div>
              <p className="text-sm lg:text-lg font-body mb-2 text-center">{holidayGreeting.message}</p>
              {holidayGreeting.countdown && (
                <div className="flex items-center justify-center space-x-2 text-xs lg:text-sm">
                  <SafeIcon icon={FiCalendar} className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="font-body">{getCountdown()}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Stats Grid - Updated without Collections and Favorites */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-2">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-peace-800 rounded-xl p-3 lg:p-2 shadow-lg border border-peace-200 dark:border-peace-700"
          >
            <div className="flex items-center justify-between mb-2 lg:mb-1">
              <div className={`w-8 h-8 lg:w-6 lg:h-6 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <SafeIcon icon={stat.icon} className="w-4 h-4 lg:w-3 lg:h-3 text-white" />
              </div>
              <span className="text-green-500 text-xs lg:text-xs font-medium font-body">{stat.change}</span>
            </div>
            <h3 className="text-lg lg:text-sm font-display font-bold text-peace-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-peace-600 dark:text-peace-300 font-body text-xs lg:text-xs">{stat.title}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Featured Member Card - Web Version */}
      <motion.div variants={itemVariants} className="hidden md:block">
        <div className="bg-white dark:bg-peace-800 rounded-2xl p-8 shadow-lg border border-peace-200 dark:border-peace-700 max-w-md mx-auto">
          <h2 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-6 text-center">
            Featured Member
          </h2>
          
          {/* Profile Picture with White Border */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={featuredMember.avatar}
                alt={featuredMember.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-body font-medium">
                  {getGenderLabel(featuredMember.gender)}
                </span>
              </div>
            </div>
          </div>

          {/* Member Details - All Centered */}
          <div className="text-center space-y-4">
            <div>
              <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-1">
                {featuredMember.name}
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-medium font-body">
                {featuredMember.role}
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-peace-600 dark:text-peace-300">
                <SafeIcon icon={FiMail} className="w-4 h-4" />
                <span className="font-body text-sm">{featuredMember.email}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-peace-600 dark:text-peace-300">
                <SafeIcon icon={FiPhone} className="w-4 h-4" />
                <span className="font-body text-sm">{featuredMember.phone}</span>
              </div>
            </div>

            {/* Center and Address */}
            <div className="bg-peace-50 dark:bg-peace-700 rounded-xl p-4">
              <p className="font-medium text-peace-900 dark:text-white font-body mb-1">
                {featuredMember.center}
              </p>
              <div className="flex items-center justify-center space-x-1 text-peace-500 dark:text-peace-400 text-sm">
                <SafeIcon icon={FiMapPin} className="w-3 h-3" />
                <span className="font-body">{featuredMember.address}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-primary-50 dark:bg-primary-900 rounded-xl p-4">
              <p className="text-peace-700 dark:text-peace-300 font-body text-sm italic">
                "{featuredMember.bio}"
              </p>
            </div>

            {/* Favorite Hymns */}
            <div>
              <h4 className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body mb-2">
                Favorite Hymns
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {featuredMember.favoriteHymns.map((hymn, index) => (
                  <span
                    key={index}
                    className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-xs font-body"
                  >
                    {hymn}
                  </span>
                ))}
              </div>
            </div>

            {/* Member Since */}
            <div className="pt-4 border-t border-peace-200 dark:border-peace-600">
              <p className="text-peace-500 dark:text-peace-400 text-sm font-body">
                Member since {featuredMember.joinDate}
              </p>
            </div>

            {/* View All Members Button */}
            <Link
              to="/members"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-body text-sm font-medium"
            >
              <SafeIcon icon={FiUsers} className="w-4 h-4" />
              <span>View All Members</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Mobile Featured Member Card - Centered */}
      <motion.div variants={itemVariants} className="md:hidden">
        <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
          <h2 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-4 text-center">
            Featured Member
          </h2>
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <img
                src={featuredMember.avatar}
                alt={featuredMember.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2">
                {featuredMember.name}
              </h3>
              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-2">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-sm font-body">
                    {getGenderLabel(featuredMember.gender)}
                  </span>
                </div>
                <p className="text-peace-600 dark:text-peace-300 font-body text-sm">
                  {featuredMember.center}
                </p>
                <div className="flex items-center justify-center space-x-1 text-peace-500 dark:text-peace-400 text-sm">
                  <SafeIcon icon={FiMapPin} className="w-3 h-3" />
                  <span className="font-body">{featuredMember.address}</span>
                </div>
              </div>
            </div>
            <Link
              to="/members"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-body text-sm"
            >
              <SafeIcon icon={FiUsers} className="w-4 h-4" />
              <span>View All Members</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Sections Grid - Mobile: Image Style, Desktop: Standard */}
      <motion.div variants={itemVariants}>
        {/* Mobile Layout - Image Style */}
        <div className="md:hidden space-y-4">
          {/* Top Row - Members & Projects */}
          <div className="grid grid-cols-2 gap-4">
            <Link to="/members" className="group">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group-hover:scale-105 text-white">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <SafeIcon icon={FiUsers} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-1">
                      Members
                    </h3>
                    <p className="text-white/90 font-body text-sm">
                      {totalMembers} members
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/projects" className="group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group-hover:scale-105 text-white">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <SafeIcon icon={FiTarget} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-1">
                      Projects
                    </h3>
                    <p className="text-white/90 font-body text-sm">
                      {currentProjects} active
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom Row - Events & Donations */}
          <div className="grid grid-cols-2 gap-4">
            <Link to="/setlists" className="group">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group-hover:scale-105 text-white">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <SafeIcon icon={FiCalendar} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-1">
                      Events
                    </h3>
                    <p className="text-white/90 font-body text-sm">
                      Setlists & Events
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/donate" className="group">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group-hover:scale-105 text-white">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-1">
                      Donate
                    </h3>
                    <p className="text-white/90 font-body text-sm">
                      ${totalDonations.toLocaleString()} raised
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Desktop Layout - Standard Grid with Centered Text */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Members Section */}
          <Link to="/members" className="group">
            <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all group-hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white text-center mb-2">
                Members
              </h3>
              <p className="text-peace-600 dark:text-peace-300 text-center font-body text-sm">
                Connect with {totalMembers} worship community members
              </p>
            </div>
          </Link>

          {/* Projects Section */}
          <Link to="/projects" className="group">
            <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all group-hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <SafeIcon icon={FiTarget} className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white text-center mb-2">
                Projects
              </h3>
              <p className="text-peace-600 dark:text-peace-300 text-center font-body text-sm">
                Support {currentProjects} active community projects
              </p>
            </div>
          </Link>

          {/* Events Section */}
          <Link to="/setlists" className="group">
            <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all group-hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <SafeIcon icon={FiCalendar} className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white text-center mb-2">
                Events
              </h3>
              <p className="text-peace-600 dark:text-peace-300 text-center font-body text-sm">
                Manage worship setlists and events
              </p>
            </div>
          </Link>

          {/* Donations Section */}
          <Link to="/donate" className="group">
            <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all group-hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <SafeIcon icon={FiDollarSign} className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white text-center mb-2">
                Make Donations
              </h3>
              <p className="text-peace-600 dark:text-peace-300 text-center font-body text-sm">
                Support our mission with ${totalDonations.toLocaleString()} raised
              </p>
            </div>
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Songs - Enhanced for web with more songs */}
        <motion.div variants={itemVariants}>
          <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-peace-900 dark:text-white">
                Recent Hymns
              </h2>
              <Link
                to="/library"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium font-body"
              >
                View All
              </Link>
            </div>
            {/* Mobile Layout - Single Column */}
            <div className="lg:hidden space-y-4">
              {recentSongs.slice(0, 3).map((song) => (
                <Link
                  key={song.id}
                  to={`/song/${song.id}`}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center">
                    <SafeIcon icon={FiMusic} className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-medium text-peace-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {song.title}
                    </h3>
                    <div className="flex flex-col text-peace-600 dark:text-peace-300 text-sm font-body">
                      <span>{song.artist}</span>
                      <span>{song.language}</span>
                    </div>
                  </div>
                  <span className="text-peace-500 dark:text-peace-400 text-sm font-body">
                    {song.duration}
                  </span>
                </Link>
              ))}
            </div>
            {/* Desktop Layout - Two Columns */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
              {recentSongs.map((song) => (
                <Link
                  key={song.id}
                  to={`/song/${song.id}`}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiMusic} className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-medium text-peace-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                      {song.title}
                    </h3>
                    <div className="text-peace-600 dark:text-peace-300 text-sm font-body truncate">
                      <span>{song.artist}</span>
                    </div>
                    <div className="text-peace-600 dark:text-peace-300 text-xs font-body">
                      <span>{song.language}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Playlists */}
        <motion.div variants={itemVariants}>
          <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-peace-900 dark:text-white">
                Your Collections
              </h2>
              <Link
                to="/playlists"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium font-body"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center">
                    <SafeIcon icon={FiList} className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-medium text-peace-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {playlist.name}
                    </h3>
                    <p className="text-peace-600 dark:text-peace-300 text-sm font-body">
                      {playlist.songs.length} hymns • {playlist.description}
                    </p>
                  </div>
                  <SafeIcon icon={FiClock} className="w-4 h-4 text-peace-500 dark:text-peace-400" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Holiday Banner for Mobile - After Recent Hymns */}
      {holidayGreeting.enabled && (
        <div className="md:hidden">
          <motion.div variants={itemVariants}>
            <div className="relative bg-gradient-to-r from-red-500 to-green-500 rounded-2xl p-4 text-white text-center">
              <button
                onClick={() => setShowHolidayEditor(true)}
                className="absolute top-2 right-2 p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <SafeIcon icon={FiEdit} className="w-3 h-3" />
              </button>
              <div className="flex items-center justify-center mb-2">
                <SafeIcon icon={FiGift} className="w-6 h-6 mr-2" />
                <h2 className="text-lg font-display font-bold">{holidayGreeting.title}</h2>
              </div>
              <p className="text-sm font-body mb-2">{holidayGreeting.message}</p>
              {holidayGreeting.countdown && (
                <div className="flex items-center justify-center space-x-2 text-xs">
                  <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                  <span className="font-body">{getCountdown()}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Event Setlists Section */}
      <motion.div variants={itemVariants}>
        <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-peace-900 dark:text-white">
              Event Setlists
            </h2>
            <Link
              to="/setlists"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium font-body"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentSetlists.map((setlist) => (
              <Link
                key={setlist.id}
                to={`/setlist/${setlist.id}`}
                className="p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group cursor-pointer"
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiMonitor} className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-medium text-peace-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {setlist.title}
                    </h3>
                    <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full font-body">
                      {setlist.service}
                    </span>
                  </div>
                </div>
                <p className="text-peace-600 dark:text-peace-300 text-sm font-body line-clamp-2">
                  {setlist.items?.length || 0} songs • {new Date(setlist.date).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Prayers Section */}
      <motion.div variants={itemVariants}>
        <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-peace-900 dark:text-white">
              Recent Prayers
            </h2>
            <Link
              to="/prayers"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium font-body"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPrayers.map((prayer) => (
              <div
                key={prayer.id}
                className="p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group cursor-pointer"
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-violet-400 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiBookOpen} className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-medium text-peace-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {prayer.title}
                    </h3>
                    <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full font-body">
                      {prayer.category}
                    </span>
                  </div>
                </div>
                <p className="text-peace-600 dark:text-peace-300 text-sm font-body line-clamp-2">
                  {prayer.content.substring(0, 80)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick Actions - Centered subtitle */}
      <motion.div variants={itemVariants}>
        <div className="bg-gradient-to-r from-slate-500 to-stone-500 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold mb-2">Ready to worship?</h2>
            <p className="mb-6 opacity-90 font-body text-center">Add new hymns, prayers, or create collections for your next service</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/submit"
                className="bg-white text-slate-600 px-6 py-3 rounded-xl font-medium font-body hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiPlus} className="w-5 h-5" />
                <span>Add Hymn</span>
              </Link>
              <Link
                to="/playlists"
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium font-body hover:bg-white/30 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiList} className="w-5 h-5" />
                <span>Create Collection</span>
              </Link>
              <Link
                to="/prayers"
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium font-body hover:bg-white/30 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiBookOpen} className="w-5 h-5" />
                <span>Add Prayer</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Holiday Greeting Editor Modal */}
      {showHolidayEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-4">
              Edit Holiday Greeting
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="enableGreeting"
                  checked={editedGreeting.enabled}
                  onChange={(e) => setEditedGreeting(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="rounded border-peace-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="enableGreeting" className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body">
                  Show holiday greeting
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Title
                </label>
                <input
                  type="text"
                  value={editedGreeting.title}
                  onChange={(e) => setEditedGreeting(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  placeholder="e.g., Merry Christmas!"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Message
                </label>
                <textarea
                  value={editedGreeting.message}
                  onChange={(e) => setEditedGreeting(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
                  rows="3"
                  placeholder="Enter your holiday message..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="enableCountdown"
                  checked={editedGreeting.countdown}
                  onChange={(e) => setEditedGreeting(prev => ({ ...prev, countdown: e.target.checked }))}
                  className="rounded border-peace-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="enableCountdown" className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body">
                  Show countdown
                </label>
              </div>
              {editedGreeting.countdown && (
                <div>
                  <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={editedGreeting.targetDate}
                    onChange={(e) => setEditedGreeting(prev => ({ ...prev, targetDate: e.target.value }))}
                    className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  />
                </div>
              )}
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowHolidayEditor(false)}
                className="flex-1 px-4 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiX} className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSaveGreeting}
                className="flex-1 px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-body flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;