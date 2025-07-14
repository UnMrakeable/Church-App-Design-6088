import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiUsers,
  FiSearch,
  FiFilter,
  FiMapPin,
  FiMail,
  FiMessageCircle,
  FiUser,
  FiEdit,
  FiCamera,
  FiPlus,
  FiHeart,
  FiCalendar,
  FiChurch,
  FiEye,
  FiEyeOff,
  FiChevronDown,
  FiChevronUp,
  FiShield
} = FiIcons;

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [expandedView, setExpandedView] = useState(false);
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Sample member data with church offices
  const [members] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      gender: 'Female',
      church: 'Grace Community Church',
      churchAddress: '123 Main St, Springfield, IL',
      office: 'President',
      email: 'sarah@grace.com',
      joinDate: '2024-01-15',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      bio: 'Worship leader passionate about connecting hearts through music.',
      favoriteHymns: ['Amazing Grace', 'How Great Is Our God'],
      memberSince: 'January 2024'
    },
    {
      id: 2,
      name: 'Michael Chen',
      gender: 'Male',
      church: 'New Life Fellowship',
      churchAddress: '456 Oak Ave, Springfield, IL',
      office: 'Vice-President',
      email: 'michael@newlife.com',
      joinDate: '2024-01-20',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      bio: 'Music director with 10+ years experience in church ministry.',
      favoriteHymns: ['Holy Spirit', 'Blessed Assurance'],
      memberSince: 'January 2024'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      gender: 'Female',
      church: 'Christ the King Catholic Church',
      churchAddress: '789 Pine St, Springfield, IL',
      office: 'Board Member',
      email: 'emily@ctk.com',
      joinDate: '2024-01-10',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      bio: 'Youth minister spreading God\'s love through contemporary worship.',
      favoriteHymns: ['Great Is Thy Faithfulness', 'Amazing Grace'],
      memberSince: 'January 2024'
    },
    {
      id: 4,
      name: 'David Thompson',
      gender: 'Male',
      church: 'First Baptist Church',
      churchAddress: '321 Elm St, Springfield, IL',
      office: 'Pastor',
      email: 'david@fbc.com',
      joinDate: '2024-01-05',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      bio: 'Pastor and hymn enthusiast, collecting traditional and modern worship songs.',
      favoriteHymns: ['Holy Spirit', 'How Great Is Our God'],
      memberSince: 'January 2024'
    },
    {
      id: 5,
      name: 'Maria Santos',
      gender: 'Female',
      church: 'St. Mary\'s Catholic Church',
      churchAddress: '654 Cedar Rd, Springfield, IL',
      office: 'Member',
      email: 'maria@stmarys.com',
      joinDate: '2024-01-25',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      bio: 'Choir director passionate about multilingual worship and community building.',
      favoriteHymns: ['Amazing Grace', 'Blessed Assurance'],
      memberSince: 'January 2024'
    },
    {
      id: 6,
      name: 'James Wilson',
      gender: 'Male',
      church: 'Unity Methodist Church',
      churchAddress: '987 Birch Lane, Springfield, IL',
      office: 'Medium',
      email: 'james@unity.com',
      joinDate: '2024-01-12',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      bio: 'Musician and songwriter, loves creating new arrangements for classic hymns.',
      favoriteHymns: ['Great Is Thy Faithfulness', 'Holy Spirit'],
      memberSince: 'January 2024'
    }
  ]);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.church.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.churchAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = filterGender === 'All' || member.gender === filterGender;
    return matchesSearch && matchesGender;
  });

  const handleMemberClick = (member) => {
    if (expandedView) {
      // In expanded view, toggle card expansion
      setExpandedCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(member.id)) {
          newSet.delete(member.id);
        } else {
          newSet.add(member.id);
        }
        return newSet;
      });
    } else {
      // In collapsed view, show full profile modal
      setSelectedMember(member);
      setShowProfile(true);
    }
  };

  const startChat = (member) => {
    alert(`Starting chat with ${member.name}...`);
  };

  const getGenderLabel = (gender) => {
    return gender === 'Male' ? 'Hmno.' : 'Hmna.';
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiUsers} className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">
          Members Community
        </h1>
        <p className="text-peace-600 dark:text-peace-300 font-body max-w-2xl mx-auto">
          Connect with fellow worship leaders, musicians, and church members from around the world. 
          Share experiences, collaborate, and build lasting friendships in faith.
        </p>
      </motion.div>

      {/* View Toggle Button */}
      <motion.div variants={itemVariants} className="flex justify-center">
        <button
          onClick={() => setExpandedView(!expandedView)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium font-body transition-colors ${
            expandedView
              ? 'bg-primary-500 text-white shadow-lg'
              : 'bg-white dark:bg-peace-800 text-peace-700 dark:text-peace-300 border border-peace-200 dark:border-peace-700 hover:bg-primary-50 dark:hover:bg-peace-700'
          }`}
        >
          <SafeIcon icon={expandedView ? FiEyeOff : FiEye} className="w-5 h-5" />
          <span>{expandedView ? 'Collapse View' : 'Expand View'}</span>
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-peace-800 rounded-xl p-4 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <h3 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-1">
            {members.length}
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body text-sm">Total Members</p>
        </div>
        <div className="bg-white dark:bg-peace-800 rounded-xl p-4 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <h3 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-1">
            {members.filter(m => m.isOnline).length}
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body text-sm">Online Now</p>
        </div>
        <div className="bg-white dark:bg-peace-800 rounded-xl p-4 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <h3 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-1">
            {new Set(members.map(m => m.church)).size}
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body text-sm">Churches</p>
        </div>
        <div className="bg-white dark:bg-peace-800 rounded-xl p-4 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <h3 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-1">
            12
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body text-sm">New This Week</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-peace-500 dark:text-peace-400" />
              <input
                type="text"
                placeholder="Search members, churches, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white placeholder-peace-500 dark:placeholder-peace-400 focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiFilter} className="w-5 h-5 text-peace-500 dark:text-peace-400" />
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="bg-peace-100 dark:bg-peace-700 text-peace-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
            >
              <option value="All">All Genders</option>
              <option value="Male">Hmno.</option>
              <option value="Female">Hmna.</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Members Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => {
          const isExpanded = expandedCards.has(member.id);
          
          return (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all cursor-pointer overflow-hidden"
              onClick={() => handleMemberClick(member)}
            >
              {expandedView ? (
                // Expanded View Layout
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="relative inline-block">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                      />
                      {member.isOnline && (
                        <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-peace-600 dark:text-peace-300 text-sm font-body mb-1">
                      {member.church}
                    </p>
                    <div className="flex items-center justify-center space-x-1 text-peace-500 dark:text-peace-400 text-xs mb-2">
                      <SafeIcon icon={FiMapPin} className="w-3 h-3" />
                      <span className="font-body">{member.churchAddress}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-xs">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-body">
                        {getGenderLabel(member.gender)}
                      </span>
                      <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full font-body flex items-center space-x-1">
                        <SafeIcon icon={FiShield} className="w-3 h-3" />
                        <span>{member.office}</span>
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body mb-2">About</h4>
                        <p className="text-peace-600 dark:text-peace-300 text-sm font-body">
                          {member.bio}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body mb-2">Favorite Hymns</h4>
                        <div className="flex flex-wrap gap-1">
                          {member.favoriteHymns.map((hymn, index) => (
                            <span
                              key={index}
                              className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full text-xs font-body"
                            >
                              {hymn}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-center space-x-2 pt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startChat(member);
                          }}
                          className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-body text-sm flex items-center justify-center space-x-1"
                        >
                          <SafeIcon icon={FiMessageCircle} className="w-4 h-4" />
                          <span>Chat</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex items-center justify-center mt-4">
                    <SafeIcon icon={isExpanded ? FiChevronUp : FiChevronDown} className="w-5 h-5 text-peace-500 dark:text-peace-400" />
                  </div>
                </div>
              ) : (
                // Collapsed View Layout
                <div className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {member.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-1 truncate">
                        {member.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-body">
                          {getGenderLabel(member.gender)}
                        </span>
                        <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-body">
                          {member.office}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* No Results */}
      {filteredMembers.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <div className="w-24 h-24 bg-peace-100 dark:bg-peace-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiUsers} className="w-12 h-12 text-peace-500 dark:text-peace-400" />
          </div>
          <h3 className="text-xl font-display font-medium text-peace-900 dark:text-white mb-2">
            No members found
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body">
            Try adjusting your search terms or filters
          </p>
        </motion.div>
      )}

      {/* Member Profile Modal - Only shown in collapsed view */}
      {showProfile && selectedMember && !expandedView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
                {selectedMember.isOnline && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <h2 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-2">
                {selectedMember.name}
              </h2>
              <p className="text-peace-600 dark:text-peace-300 font-body mb-1">
                {selectedMember.church}
              </p>
              <div className="flex items-center justify-center space-x-1 text-peace-500 dark:text-peace-400 text-sm mb-4">
                <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                <span className="font-body">{selectedMember.churchAddress}</span>
              </div>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-body">
                  {getGenderLabel(selectedMember.gender)}
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-body flex items-center space-x-1">
                  <SafeIcon icon={FiShield} className="w-4 h-4" />
                  <span>{selectedMember.office}</span>
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-3">About</h3>
                <p className="text-peace-600 dark:text-peace-300 font-body">
                  {selectedMember.bio}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-3">Favorite Hymns</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.favoriteHymns.map((hymn, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-body"
                    >
                      {hymn}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-peace-600 dark:text-peace-300 font-body">Member Since:</span>
                  <p className="font-medium text-peace-900 dark:text-white font-body">{selectedMember.memberSince}</p>
                </div>
                <div>
                  <span className="text-peace-600 dark:text-peace-300 font-body">Status:</span>
                  <p className="font-medium text-peace-900 dark:text-white font-body">
                    {selectedMember.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowProfile(false)}
                className="flex-1 px-6 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body"
              >
                Close
              </button>
              <button
                onClick={() => startChat(selectedMember)}
                className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-body flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiMessageCircle} className="w-5 h-5" />
                <span>Start Chat</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Members;