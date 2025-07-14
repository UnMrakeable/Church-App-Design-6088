import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import { useSongs } from '../contexts/SongContext';
import { useUsers } from '../contexts/UserContext';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiFilter, FiPlus, FiMusic, FiTag, FiSave, FiX, FiGlobe, FiUser, FiMail, FiMapPin, FiShield, FiToggleLeft, FiToggleRight, FiInfo, FiEdit, FiCheck, FiEye, FiFileText } = FiIcons;

const SongLibrary = () => {
  const { songs, addSong, addTranslation, approveSong, rejectSong } = useSongs();
  const { currentUser, hasPermission } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('published');
  const [sortBy, setSortBy] = useState('title');
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    category: 'Worship',
    language: 'English',
    lyrics: '',
    tags: '',
    notes: '',
    isTranslation: false,
    originalSongId: '',
    submitterName: '',
    submitterEmail: '',
    submitterCenter: '',
    hasChords: true,
    captchaVerified: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['All', 'Worship', 'Praise', 'Hymn', 'Contemporary'];
  const languages = ['English', 'Tagalog', 'Ilocano', 'Spanish', 'French'];
  const categoryOptions = ['Worship', 'Praise', 'Hymn', 'Contemporary', 'Traditional'];

  // New filter options
  const filterOptions = [
    { value: 'All', label: 'All Songs' },
    { value: 'withChords', label: 'With Chords' },
    { value: 'withoutChords', label: 'Without Chords' },
    { value: 'hasTranslations', label: 'Has Translations' }
  ];

  // Check if user can edit/approve
  const canEdit = hasPermission(currentUser?.id, 'hymns.edit') || hasPermission(currentUser?.id, 'hymns.manage_media');
  const isAdminOrEditor = canEdit;

  // Real-time filtering
  useEffect(() => {
    let filtered = songs;

    // Filter by tab (published vs submissions)
    if (activeTab === 'published') {
      filtered = songs.filter(song => song.status === 'published');
    } else {
      filtered = songs.filter(song => song.status === 'pending');
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(song =>
        song.category === selectedCategory ||
        song.tags.includes(selectedCategory)
      );
    }

    // Apply special filters
    if (selectedFilter === 'withChords') {
      filtered = filtered.filter(song => song.hasChords);
    } else if (selectedFilter === 'withoutChords') {
      filtered = filtered.filter(song => !song.hasChords);
    } else if (selectedFilter === 'hasTranslations') {
      filtered = filtered.filter(song => song.translations && song.translations.length > 0);
    }

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'language':
          return a.language.localeCompare(b.language);
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    setFilteredSongs(filtered);
  }, [songs, searchTerm, selectedCategory, selectedFilter, activeTab, sortBy]);

  // Get songs in the same language for translation linking
  const getSongsInSameLanguage = (language) => {
    return songs.filter(song =>
      song.language === language &&
      song.status === 'published' &&
      !song.isTranslation
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCaptchaVerification = () => {
    // Simple mock captcha - in real app, use reCAPTCHA
    const userInput = prompt("Please enter the sum of 7 + 4 to verify you're human:");
    if (userInput === "11") {
      setFormData(prev => ({ ...prev, captchaVerified: true }));
      alert("Human verification successful!");
    } else {
      alert("Verification failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Skip captcha for admin/editor roles
    if (!isAdminOrEditor && !formData.captchaVerified) {
      alert('Please complete the human verification first.');
      return;
    }

    setIsSubmitting(true);

    try {
      const songData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        status: isAdminOrEditor ? 'published' : 'pending' // Admin/Editor songs are auto-published
      };

      if (formData.isTranslation && formData.originalSongId) {
        // Add as translation
        const translationData = {
          language: formData.language,
          title: formData.title,
          id: Date.now().toString()
        };
        addTranslation(formData.originalSongId, translationData);

        // Also add the song itself with reference to original
        addSong({
          ...songData,
          originalSongId: formData.originalSongId,
          isTranslation: true
        });
      } else {
        addSong(songData);
      }

      // Show success message
      if (isAdminOrEditor) {
        alert('Hymn added and published successfully!');
      } else {
        alert('Hymn submitted successfully! It will be reviewed by an administrator before being published.');
      }

      // Reset form
      setFormData({
        title: '',
        artist: '',
        category: 'Worship',
        language: 'English',
        lyrics: '',
        tags: '',
        notes: '',
        isTranslation: false,
        originalSongId: '',
        submitterName: '',
        submitterEmail: '',
        submitterCenter: '',
        hasChords: true,
        captchaVerified: false
      });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding hymn:', error);
      alert('There was an error adding the hymn. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprove = (songId) => {
    approveSong(songId);
    alert('Song approved and published!');
  };

  const handleReject = (songId) => {
    if (confirm('Are you sure you want to reject this submission?')) {
      rejectSong(songId);
      alert('Song rejected.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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

  const publishedCount = songs.filter(song => song.status === 'published').length;
  const pendingCount = songs.filter(song => song.status === 'pending').length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white">Hymn Library</h1>
          <p className="text-peace-600 dark:text-peace-300 font-body">
            {filteredSongs.length} hymns in {activeTab === 'published' ? 'Published & Live' : 'Submissions & Drafts'}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium font-body shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Add New Hymn</span>
        </motion.button>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-peace-800 rounded-2xl p-2 shadow-lg border border-peace-200 dark:border-peace-700"
      >
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('published')}
            className={`flex-1 px-4 py-3 rounded-xl font-medium font-body transition-colors flex items-center justify-center space-x-2 ${
              activeTab === 'published'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700'
            }`}
          >
            <SafeIcon icon={FiEye} className="w-4 h-4" />
            <span>Published & Live ({publishedCount})</span>
          </button>
          {canEdit && (
            <button
              onClick={() => setActiveTab('submissions')}
              className={`flex-1 px-4 py-3 rounded-xl font-medium font-body transition-colors flex items-center justify-center space-x-2 ${
                activeTab === 'submissions'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700'
              }`}
            >
              <SafeIcon icon={FiFileText} className="w-4 h-4" />
              <span>Submissions & Drafts ({pendingCount})</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Filters - Improved Layout */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700"
      >
        {/* Search Bar - Full Width */}
        <div className="mb-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-peace-500 dark:text-peace-400" />
            <input
              type="text"
              placeholder="Search hymns, artists, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white placeholder-peace-500 dark:placeholder-peace-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-body"
            />
          </div>
        </div>

        {/* Filter Controls - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-peace-700 dark:text-peace-300 font-body">
              <SafeIcon icon={FiFilter} className="w-4 h-4" />
              <span>Category</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-peace-100 dark:bg-peace-700 text-peace-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Special Filters */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-peace-700 dark:text-peace-300 font-body">
              <SafeIcon icon={FiFilter} className="w-4 h-4" />
              <span>Filter</span>
            </label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full bg-peace-100 dark:bg-peace-700 text-peace-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
            >
              {filterOptions.map(filter => (
                <option key={filter.value} value={filter.value}>{filter.label}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-peace-700 dark:text-peace-300 font-body">
              <SafeIcon icon={FiFilter} className="w-4 h-4" />
              <span>Sort by</span>
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-peace-100 dark:bg-peace-700 text-peace-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
            >
              <option value="title">Title</option>
              <option value="artist">Artist</option>
              <option value="language">Language</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body">Results</label>
            <div className="bg-peace-100 dark:bg-peace-700 rounded-xl px-4 py-3 text-peace-900 dark:text-white font-body">
              {filteredSongs.length} hymns found
            </div>
          </div>
        </div>
      </motion.div>

      {/* Songs Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredSongs.map((song) => (
          <motion.div
            key={song.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiMusic} className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium font-body">
                  {song.language}
                </span>
                {!song.hasChords && (
                  <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full text-xs font-medium font-body">
                    No Chords
                  </span>
                )}
                {song.translations && song.translations.length > 0 && (
                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium font-body">
                    +{song.translations.length} Lang
                  </span>
                )}
              </div>
            </div>

            <Link to={`/song/${song.id}`} className="block">
              <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {song.title}
              </h3>
              <p className="text-peace-600 dark:text-peace-300 mb-4 font-body">
                {song.artist || 'Unknown Artist'}
              </p>

              {/* Translations */}
              {song.translations && song.translations.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {song.translations.slice(0, 3).map((translation, index) => (
                    <Link
                      key={index}
                      to={`/song/${translation.id}`}
                      className="inline-flex items-center space-x-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SafeIcon icon={FiGlobe} className="w-3 h-3" />
                      <span>{translation.language}</span>
                    </Link>
                  ))}
                  {song.translations.length > 3 && (
                    <span className="text-xs text-peace-500 dark:text-peace-400 font-body">
                      +{song.translations.length - 3} more
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {song.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-peace-100 dark:bg-peace-700 text-peace-700 dark:text-peace-300 px-2 py-1 rounded-lg text-xs flex items-center space-x-1"
                  >
                    <SafeIcon icon={FiTag} className="w-3 h-3" />
                    <span className="font-body">{tag}</span>
                  </span>
                ))}
              </div>
            </Link>

            {/* Submission Actions for Admin/Editor */}
            {activeTab === 'submissions' && canEdit && song.status === 'pending' && (
              <div className="flex space-x-2 mt-4 pt-4 border-t border-peace-200 dark:border-peace-700">
                <button
                  onClick={() => handleApprove(song.id)}
                  className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-body text-sm flex items-center justify-center space-x-1"
                >
                  <SafeIcon icon={FiCheck} className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(song.id)}
                  className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-body text-sm flex items-center justify-center space-x-1"
                >
                  <SafeIcon icon={FiX} className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            )}

            {/* Submitter Info for Submissions */}
            {activeTab === 'submissions' && song.submitterName && (
              <div className="mt-4 pt-4 border-t border-peace-200 dark:border-peace-700">
                <p className="text-xs text-peace-500 dark:text-peace-400 font-body">
                  Submitted by: {song.submitterName} ({song.submitterCenter})
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {filteredSongs.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-peace-100 dark:bg-peace-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiMusic} className="w-12 h-12 text-peace-500 dark:text-peace-400" />
          </div>
          <h3 className="text-xl font-display font-medium text-peace-900 dark:text-white mb-2">
            No hymns found
          </h3>
          <p className="text-peace-600 dark:text-peace-300 mb-6 font-body">
            {activeTab === 'published' ? 'Try adjusting your search or filters' : 'No submissions pending review'}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary-500 text-white px-6 py-3 rounded-xl font-medium font-body hover:bg-primary-600 transition-colors"
          >
            Add Your First Hymn
          </button>
        </motion.div>
      )}

      {/* Add Hymn Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-6">
              Add New Hymn
            </h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Submitter Information Section - Only for non-admin users */}
              {!isAdminOrEditor && (
                <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
                  <h4 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-4 flex items-center space-x-2">
                    <SafeIcon icon={FiUser} className="w-5 h-5" />
                    <span>Submitter Information</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="submitterName"
                        value={formData.submitterName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                        placeholder="Enter your full name..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="submitterEmail"
                        value={formData.submitterEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                        Centro/Center *
                      </label>
                      <input
                        type="text"
                        name="submitterCenter"
                        value={formData.submitterCenter}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                        placeholder="Your church/center name..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Translation Section */}
              <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="isTranslation"
                    name="isTranslation"
                    checked={formData.isTranslation}
                    onChange={handleInputChange}
                    className="rounded border-peace-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="isTranslation" className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body flex items-center space-x-1">
                    <SafeIcon icon={FiGlobe} className="w-4 h-4" />
                    <span>This is a translation of an existing song</span>
                  </label>
                </div>

                {/* Original Song Selection (if translation) */}
                {formData.isTranslation && (
                  <div>
                    <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                      Original Song *
                    </label>
                    <select
                      name="originalSongId"
                      value={formData.originalSongId}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                    >
                      <option value="">Select original song...</option>
                      {getSongsInSameLanguage(formData.language).map(song => (
                        <option key={song.id} value={song.id}>
                          {song.title} - {song.artist || 'Unknown Artist'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Song Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                    Song Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                    placeholder="Enter song title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                    Artist/Composer (Optional)
                  </label>
                  <input
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                    placeholder="Enter artist name..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                    Language *
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      language: e.target.value,
                      originalSongId: '' // Reset original song when language changes
                    }))}
                    className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  >
                    {languages.map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  >
                    {categoryOptions.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  placeholder="e.g., worship, praise, contemporary, hope, faith"
                />
              </div>

              {/* Lyrics Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 font-body">
                    {formData.hasChords ? 'Lyrics with Chords *' : 'Lyrics Only *'}
                  </label>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body">
                      Include Chords:
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, hasChords: !prev.hasChords }))}
                      className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      <SafeIcon icon={formData.hasChords ? FiToggleRight : FiToggleLeft} className={`w-6 h-6 ${formData.hasChords ? 'text-green-500' : 'text-gray-400'}`} />
                      <span className="font-body">{formData.hasChords ? 'Yes' : 'No'}</span>
                    </button>
                  </div>
                </div>
                <textarea
                  name="lyrics"
                  value={formData.lyrics}
                  onChange={handleInputChange}
                  required
                  rows="12"
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-mono font-body"
                  placeholder={formData.hasChords ? 
                    `[Verse 1]
[G]Amazing [C]grace how [G]sweet the [D]sound
That [G]saved a [Em]wretch like [C]me [G]

[Chorus]
How [C]great is our [G]God
Sing with [Em]me how [D]great is our [C]God

Use [Chord] notation for chords above lyrics. Separate sections with [Verse 1], [Chorus], [Bridge], etc.` :
                    `[Verse 1]
Amazing grace how sweet the sound
That saved a wretch like me

[Chorus]
How great is our God
Sing with me how great is our God

Separate sections with [Verse 1], [Chorus], [Bridge], etc.`
                  }
                />
              </div>

              {/* Security Verification - Only for non-admin users */}
              {!isAdminOrEditor && (
                <div className="border-t border-peace-200 dark:border-peace-700 pt-6">
                  <div className="flex items-center justify-between p-4 bg-peace-50 dark:bg-peace-700 rounded-xl">
                    <div>
                      <p className="font-medium text-peace-900 dark:text-white font-body">
                        Human Verification Required
                      </p>
                      <p className="text-sm text-peace-600 dark:text-peace-300 font-body">
                        Please complete the verification to prove you're not a robot
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCaptchaVerification}
                      className={`px-4 py-2 rounded-lg font-medium font-body transition-colors ${
                        formData.captchaVerified
                          ? 'bg-green-500 text-white'
                          : 'bg-primary-500 text-white hover:bg-primary-600'
                      }`}
                    >
                      {formData.captchaVerified ? 'Verified ✓' : 'Verify Human'}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || (!isAdminOrEditor && !formData.captchaVerified)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-body flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiSave} className="w-5 h-5" />
                  <span>
                    {isSubmitting ? 'Adding...' : (isAdminOrEditor ? 'Add & Publish' : 'Submit for Review')}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SongLibrary;