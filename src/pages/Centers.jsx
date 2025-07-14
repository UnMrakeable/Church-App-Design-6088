import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import { useUsers } from '../contexts/UserContext';
import * as FiIcons from 'react-icons/fi';

const {
  FiMapPin,
  FiUsers,
  FiMail,
  FiPhone,
  FiCalendar,
  FiSearch,
  FiFilter,
  FiPlus,
  FiGrid,
  FiList,
  FiTable,
  FiImage,
  FiHeart,
  FiStar,
  FiEdit,
  FiTrash2,
  FiEye,
  FiShield,
  FiHome,
  FiClock,
  FiUser,
  FiUserX
} = FiIcons;

const Centers = () => {
  const { currentUser, hasPermission } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [viewMode, setViewMode] = useState('gallery'); // gallery, list, table
  const [showAddCenter, setShowAddCenter] = useState(false);

  // Check if user can manage centers (admin only)
  const canManageCenters = hasPermission(currentUser?.id, 'centers.manage') || 
                          currentUser?.roleId === 'admin' || 
                          currentUser?.roleId === 'super_admin';

  // Sample centers data with enhanced details
  const [centers] = useState([
    {
      id: 1,
      name: 'Grace Community Church',
      address: '123 Main St, Springfield, IL 62701',
      region: 'North America',
      country: 'United States',
      foundingDate: '1985-03-15',
      anniversary: '03-15',
      yearsActive: 39,
      memberCount: 45,
      registeredMembers: 32,
      pastor: 'Pastor John Smith',
      email: 'info@gracecommunity.org',
      phone: '+1 (555) 123-4567',
      image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=800&h=600&fit=crop',
      description: 'A vibrant community of believers dedicated to worship, fellowship, and service.',
      story: 'Founded in 1985 by a small group of families, Grace Community Church has grown to become a cornerstone of faith in Springfield. Our mission has always been to spread God\'s love through worship, community service, and fellowship.',
      services: [
        'Sunday Worship: 10:00 AM',
        'Bible Study: Wednesday 7:00 PM', 
        'Youth Group: Friday 6:00 PM'
      ],
      officers: [
        { name: 'Pastor John Smith', role: 'Senior Pastor', email: 'john@gracecommunity.org', isRegistered: true },
        { name: 'Elder Mary Johnson', role: 'Elder', email: 'mary@gracecommunity.org', isRegistered: true },
        { name: 'Deacon Robert Wilson', role: 'Deacon', email: 'robert@gracecommunity.org', isRegistered: false },
        { name: 'Secretary Linda Davis', role: 'Secretary', email: 'linda@gracecommunity.org', isRegistered: true }
      ],
      deceasedMembers: [
        {
          name: 'Elder Thomas Brown',
          role: 'Founding Elder',
          dateOfBirth: '1932-05-10',
          dateOfDeath: '2023-12-15',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          tribute: 'A devoted servant of God who helped establish this church and guided many souls to Christ.'
        },
        {
          name: 'Sister Agnes Miller',
          role: 'Choir Director',
          dateOfBirth: '1945-08-22',
          dateOfDeath: '2024-01-10',
          photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          tribute: 'Her beautiful voice and dedication to worship music touched countless hearts in our community.'
        }
      ],
      photos: [
        'https://images.unsplash.com/photo-1519491050282-cf00c82424b4?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 2,
      name: 'New Life Fellowship',
      address: '456 Oak Ave, Springfield, IL 62702',
      region: 'North America',
      country: 'United States',
      foundingDate: '1992-07-20',
      anniversary: '07-20',
      yearsActive: 32,
      memberCount: 32,
      registeredMembers: 28,
      pastor: 'Pastor Maria Rodriguez',
      email: 'contact@newlifefellowship.org',
      phone: '+1 (555) 234-5678',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop',
      description: 'Building strong families and communities through faith, love, and service.',
      story: 'New Life Fellowship began as a home church in 1992, meeting in living rooms and community centers. Through God\'s grace and the dedication of our members, we have grown into a thriving congregation that serves our community with passion.',
      services: [
        'Sunday Service: 9:30 AM',
        'Prayer Meeting: Tuesday 7:00 PM',
        'Community Outreach: Saturday 2:00 PM'
      ],
      officers: [
        { name: 'Pastor Maria Rodriguez', role: 'Senior Pastor', email: 'maria@newlife.org', isRegistered: true },
        { name: 'Associate Pastor David Kim', role: 'Associate Pastor', email: 'david@newlife.org', isRegistered: true },
        { name: 'Treasurer Susan Chen', role: 'Treasurer', email: 'susan@newlife.org', isRegistered: true }
      ],
      deceasedMembers: [
        {
          name: 'Founding Pastor Michael Garcia',
          role: 'Founding Pastor',
          dateOfBirth: '1940-02-14',
          dateOfDeath: '2022-11-30',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          tribute: 'Our beloved founding pastor who had the vision to start this fellowship and shepherded us for 30 years.'
        }
      ],
      photos: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
      ]
    },
    {
      id: 3,
      name: 'Manila Central Church',
      address: 'Quezon City, Metro Manila, Philippines',
      region: 'Asia Pacific',
      country: 'Philippines',
      foundingDate: '1995-11-12',
      anniversary: '11-12',
      yearsActive: 29,
      memberCount: 67,
      registeredMembers: 45,
      pastor: 'Pastor Roberto Santos',
      email: 'manila@centralchurch.ph',
      phone: '+63 2 123 4567',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop',
      description: 'Spreading the gospel throughout Metro Manila with passion and dedication.',
      story: 'Manila Central Church was established in 1995 to serve the growing Christian community in Metro Manila. We have been blessed to witness thousands of lives transformed through God\'s love and continue to expand our ministry throughout the Philippines.',
      services: [
        'Sunday Worship: 8:00 AM & 5:00 PM',
        'Bible Study: Thursday 7:00 PM',
        'Youth Service: Saturday 6:00 PM'
      ],
      officers: [
        { name: 'Pastor Roberto Santos', role: 'Senior Pastor', email: 'roberto@central.ph', isRegistered: true },
        { name: 'Elder Carmen Reyes', role: 'Elder', email: 'carmen@central.ph', isRegistered: true },
        { name: 'Deacon Miguel Torres', role: 'Deacon', email: 'miguel@central.ph', isRegistered: false },
        { name: 'Youth Pastor Anna Cruz', role: 'Youth Pastor', email: 'anna@central.ph', isRegistered: true }
      ],
      deceasedMembers: [],
      photos: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop'
      ]
    }
  ]);

  const regions = ['All', 'North America', 'Asia Pacific', 'Europe', 'Africa', 'South America'];
  const filterOptions = [
    { value: 'All', label: 'All Centers' },
    { value: 'Large', label: 'Large (50+ members)' },
    { value: 'Medium', label: 'Medium (20-49 members)' },
    { value: 'Small', label: 'Small (Under 20 members)' },
    { value: 'Founded1980s', label: 'Founded in 1980s' },
    { value: 'Founded1990s', label: 'Founded in 1990s' },
    { value: 'Founded2000s', label: 'Founded in 2000s+' }
  ];

  const filteredCenters = centers.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.pastor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'All' || center.region === selectedRegion;
    
    let matchesFilter = true;
    if (selectedFilter === 'Large') matchesFilter = center.memberCount >= 50;
    else if (selectedFilter === 'Medium') matchesFilter = center.memberCount >= 20 && center.memberCount < 50;
    else if (selectedFilter === 'Small') matchesFilter = center.memberCount < 20;
    else if (selectedFilter === 'Founded1980s') matchesFilter = new Date(center.foundingDate).getFullYear() >= 1980 && new Date(center.foundingDate).getFullYear() < 1990;
    else if (selectedFilter === 'Founded1990s') matchesFilter = new Date(center.foundingDate).getFullYear() >= 1990 && new Date(center.foundingDate).getFullYear() < 2000;
    else if (selectedFilter === 'Founded2000s') matchesFilter = new Date(center.foundingDate).getFullYear() >= 2000;

    return matchesSearch && matchesRegion && matchesFilter;
  });

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
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiHome} className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">
          Centers Directory
        </h1>
        <p className="text-peace-600 dark:text-peace-300 font-body max-w-2xl mx-auto">
          Explore our global network of worship centers and churches. Each center has its own unique story, leadership, and community of faithful members.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-peace-800 rounded-xl p-4 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <h3 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-1">
            {centers.length}
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body text-sm">Total Centers</p>
        </div>
        <div className="bg-white dark:bg-peace-800 rounded-xl p-4 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <h3 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-1">
            {centers.reduce((sum, center) => sum + center.memberCount, 0)}
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body text-sm">Total Members</p>
        </div>
        <div className="bg-white dark:bg-peace-800 rounded-xl p-4 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <h3 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-1">
            {new Set(centers.map(c => c.country)).size}
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body text-sm">Countries</p>
        </div>
        <div className="bg-white dark:bg-peace-800 rounded-xl p-4 shadow-lg border border-peace-200 dark:border-peace-700 text-center">
          <h3 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-1">
            {Math.round(centers.reduce((sum, center) => sum + center.yearsActive, 0) / centers.length)}
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body text-sm">Avg Years Active</p>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
        {/* Search and Add Button */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-peace-500 dark:text-peace-400" />
              <input
                type="text"
                placeholder="Search centers, locations, or pastors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white placeholder-peace-500 dark:placeholder-peace-400 focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              />
            </div>
          </div>
          {canManageCenters && (
            <button
              onClick={() => setShowAddCenter(true)}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium font-body hover:shadow-lg transition-shadow flex items-center space-x-2"
            >
              <SafeIcon icon={FiPlus} className="w-5 h-5" />
              <span>Add Center</span>
            </button>
          )}
        </div>

        {/* Filters and View Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiFilter} className="w-5 h-5 text-peace-500 dark:text-peace-400" />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-peace-100 dark:bg-peace-700 text-peace-900 dark:text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-peace-100 dark:bg-peace-700 text-peace-900 dark:text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              >
                {filterOptions.map(filter => (
                  <option key={filter.value} value={filter.value}>{filter.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-peace-100 dark:bg-peace-700 rounded-xl p-1">
            <button
              onClick={() => setViewMode('gallery')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'gallery' ? 'bg-primary-500 text-white' : 'text-peace-600 dark:text-peace-300 hover:bg-peace-200 dark:hover:bg-peace-600'}`}
            >
              <SafeIcon icon={FiGrid} className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-peace-600 dark:text-peace-300 hover:bg-peace-200 dark:hover:bg-peace-600'}`}
            >
              <SafeIcon icon={FiList} className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-primary-500 text-white' : 'text-peace-600 dark:text-peace-300 hover:bg-peace-200 dark:hover:bg-peace-600'}`}
            >
              <SafeIcon icon={FiTable} className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Centers Display */}
      {viewMode === 'gallery' && (
        <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCenters.map((center) => (
            <motion.div
              key={center.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700 overflow-hidden hover:shadow-xl transition-all group"
            >
              {/* Main Image */}
              <div className="relative">
                <img src={center.image} alt={center.name} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium font-body">
                    {center.region}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-body">
                  <SafeIcon icon={FiUsers} className="w-3 h-3 inline mr-1" />
                  {center.memberCount} members
                </div>
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-1">
                      {center.name}
                    </h3>
                    <div className="flex items-start space-x-2 text-peace-600 dark:text-peace-300 text-sm mb-2">
                      <SafeIcon icon={FiMapPin} className="w-4 h-4 mt-0.5" />
                      <span className="font-body">{center.address}</span>
                    </div>
                  </div>
                  {canManageCenters && (
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded hover:bg-peace-100 dark:hover:bg-peace-700">
                        <SafeIcon icon={FiEdit} className="w-4 h-4 text-peace-600 dark:text-peace-300" />
                      </button>
                      <button className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900">
                        <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-peace-600 dark:text-peace-300 font-body text-sm mb-4 line-clamp-2">
                  {center.description}
                </p>

                {/* Key Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-peace-600 dark:text-peace-300">
                    <SafeIcon icon={FiUser} className="w-4 h-4" />
                    <span className="font-body">{center.pastor}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-peace-600 dark:text-peace-300">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                    <span className="font-body">Founded {new Date(center.foundingDate).getFullYear()} • {center.yearsActive} years</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-peace-600 dark:text-peace-300">
                    <SafeIcon icon={FiUsers} className="w-4 h-4" />
                    <span className="font-body">{center.registeredMembers}/{center.memberCount} registered in app</span>
                  </div>
                </div>

                {/* Officers Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body mb-2">Leadership</h4>
                  <div className="flex flex-wrap gap-1">
                    {center.officers.slice(0, 3).map((officer, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <span className={`text-xs px-2 py-1 rounded-full font-body ${officer.isRegistered ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300'}`}>
                          {officer.role}
                        </span>
                      </div>
                    ))}
                    {center.officers.length > 3 && (
                      <span className="text-xs text-peace-500 dark:text-peace-400 font-body">
                        +{center.officers.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Memorial Section */}
                {center.deceasedMembers.length > 0 && (
                  <div className="mb-4 p-3 bg-peace-50 dark:bg-peace-700 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <SafeIcon icon={FiHeart} className="w-4 h-4 text-red-500" />
                      <h4 className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body">In Memoriam</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      {center.deceasedMembers.slice(0, 2).map((member, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <img src={member.photo} alt={member.name} className="w-6 h-6 rounded-full object-cover border border-peace-300" />
                          <span className="text-xs text-peace-600 dark:text-peace-300 font-body">{member.name}</span>
                        </div>
                      ))}
                      {center.deceasedMembers.length > 2 && (
                        <span className="text-xs text-peace-500 dark:text-peace-400 font-body">
                          +{center.deceasedMembers.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-body text-sm flex items-center justify-center space-x-1">
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <button className="px-4 py-2 bg-peace-100 dark:bg-peace-700 text-peace-700 dark:text-peace-300 rounded-lg hover:bg-peace-200 dark:hover:bg-peace-600 transition-colors">
                    <SafeIcon icon={FiMail} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <motion.div variants={containerVariants} className="space-y-4">
          {filteredCenters.map((center) => (
            <motion.div
              key={center.id}
              variants={itemVariants}
              className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all"
            >
              <div className="flex items-start space-x-4">
                <img src={center.image} alt={center.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-1">
                        {center.name}
                      </h3>
                      <p className="text-peace-600 dark:text-peace-300 font-body">{center.address}</p>
                    </div>
                    <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium font-body">
                      {center.region}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-peace-500 dark:text-peace-400 font-body">Pastor:</span>
                      <p className="font-medium text-peace-900 dark:text-white font-body">{center.pastor}</p>
                    </div>
                    <div>
                      <span className="text-peace-500 dark:text-peace-400 font-body">Members:</span>
                      <p className="font-medium text-peace-900 dark:text-white font-body">{center.memberCount}</p>
                    </div>
                    <div>
                      <span className="text-peace-500 dark:text-peace-400 font-body">Founded:</span>
                      <p className="font-medium text-peace-900 dark:text-white font-body">{new Date(center.foundingDate).getFullYear()}</p>
                    </div>
                    <div>
                      <span className="text-peace-500 dark:text-peace-400 font-body">Registered:</span>
                      <p className="font-medium text-peace-900 dark:text-white font-body">{center.registeredMembers}/{center.memberCount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-peace-50 dark:bg-peace-700">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-peace-700 dark:text-peace-300 font-body">Center</th>
                  <th className="text-left py-4 px-6 font-medium text-peace-700 dark:text-peace-300 font-body">Location</th>
                  <th className="text-left py-4 px-6 font-medium text-peace-700 dark:text-peace-300 font-body">Pastor</th>
                  <th className="text-left py-4 px-6 font-medium text-peace-700 dark:text-peace-300 font-body">Members</th>
                  <th className="text-left py-4 px-6 font-medium text-peace-700 dark:text-peace-300 font-body">Founded</th>
                  <th className="text-left py-4 px-6 font-medium text-peace-700 dark:text-peace-300 font-body">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCenters.map((center) => (
                  <tr key={center.id} className="border-b border-peace-100 dark:border-peace-700 hover:bg-peace-50 dark:hover:bg-peace-700">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img src={center.image} alt={center.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-medium text-peace-900 dark:text-white font-body">{center.name}</h4>
                          <p className="text-sm text-peace-600 dark:text-peace-300 font-body">{center.region}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-peace-600 dark:text-peace-300 font-body">{center.address}</td>
                    <td className="py-4 px-6 text-peace-600 dark:text-peace-300 font-body">{center.pastor}</td>
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-medium text-peace-900 dark:text-white font-body">{center.memberCount}</span>
                        <p className="text-sm text-peace-600 dark:text-peace-300 font-body">
                          {center.registeredMembers} in app
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-medium text-peace-900 dark:text-white font-body">
                          {new Date(center.foundingDate).getFullYear()}
                        </span>
                        <p className="text-sm text-peace-600 dark:text-peace-300 font-body">
                          {center.yearsActive} years
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="p-2 rounded-lg hover:bg-peace-100 dark:hover:bg-peace-600 transition-colors">
                          <SafeIcon icon={FiEye} className="w-4 h-4 text-peace-600 dark:text-peace-300" />
                        </button>
                        {canManageCenters && (
                          <>
                            <button className="p-2 rounded-lg hover:bg-peace-100 dark:hover:bg-peace-600 transition-colors">
                              <SafeIcon icon={FiEdit} className="w-4 h-4 text-peace-600 dark:text-peace-300" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors">
                              <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* No Results */}
      {filteredCenters.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <div className="w-24 h-24 bg-peace-100 dark:bg-peace-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiHome} className="w-12 h-12 text-peace-500 dark:text-peace-400" />
          </div>
          <h3 className="text-xl font-display font-medium text-peace-900 dark:text-white mb-2">
            No centers found
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body">
            Try adjusting your search terms or filters
          </p>
        </motion.div>
      )}

      {/* Call to Action for Admins */}
      {canManageCenters && (
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center">
            <SafeIcon icon={FiPlus} className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold mb-4">Manage Centers Directory</h2>
            <p className="text-xl opacity-90 font-body mb-6 max-w-2xl mx-auto">
              As an administrator, you can add new centers, update existing information, and manage the global directory of our worship communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button
                onClick={() => setShowAddCenter(true)}
                className="bg-white text-green-600 px-6 py-3 rounded-xl font-medium font-body hover:bg-gray-50 transition-colors"
              >
                Add New Center
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium font-body hover:bg-white/30 transition-colors">
                Import Centers
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Centers;