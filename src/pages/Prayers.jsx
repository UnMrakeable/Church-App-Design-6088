import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SafeIcon from '../components/common/SafeIcon';
import { usePrayers } from '../contexts/PrayerContext';
import { useUsers } from '../contexts/UserContext';
import * as FiIcons from 'react-icons/fi';

const { 
  FiBookOpen, 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiGlobe, 
  FiCheck, 
  FiX, 
  FiEye,
  FiFileText
} = FiIcons;

const Prayers = () => {
  const { prayers, categories, addPrayer, deletePrayer, addTranslation, approvePrayer, rejectPrayer } = usePrayers();
  const { currentUser, hasPermission } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('published');
  const [sortBy, setSortBy] = useState('title');
  const [filteredPrayers, setFilteredPrayers] = useState(prayers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPrayer, setNewPrayer] = useState({
    title: '',
    category: 'English',
    content: '',
    tags: '',
    isTranslation: false,
    originalPrayerId: ''
  });

  // Check if user can edit/approve prayers
  const canEdit = hasPermission(currentUser?.id, 'prayers.edit') || 
                  hasPermission(currentUser?.id, 'prayers.manage_media');
  const isAdminOrEditor = canEdit;

  // Real-time filtering
  useEffect(() => {
    let filtered = prayers;

    // Filter by tab (published vs submissions)
    if (activeTab === 'published') {
      filtered = prayers.filter(prayer => prayer.status === 'published');
    } else {
      filtered = prayers.filter(prayer => prayer.status === 'pending');
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(prayer =>
        prayer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prayer.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prayer.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(prayer => prayer.category === selectedCategory);
    }

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    setFilteredPrayers(filtered);
  }, [prayers, searchTerm, selectedCategory, selectedFilter, activeTab, sortBy]);

  // Get prayers in the same language for translation linking
  const getPrayersInSameLanguage = (language) => {
    return prayers.filter(prayer => 
      prayer.category === language && 
      prayer.status === 'published' && 
      !prayer.isTranslation
    );
  };

  const handleAddPrayer = () => {
    if (newPrayer.title.trim() && newPrayer.content.trim()) {
      const prayerData = {
        ...newPrayer,
        tags: newPrayer.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        status: isAdminOrEditor ? 'published' : 'pending' // Admin/Editor prayers are auto-published
      };

      if (newPrayer.isTranslation && newPrayer.originalPrayerId) {
        // Add as translation
        const translationData = {
          language: newPrayer.category,
          title: newPrayer.title,
          id: Date.now().toString()
        };
        addTranslation(newPrayer.originalPrayerId, translationData);
        
        // Also add the prayer itself with reference to original
        addPrayer({
          ...prayerData,
          originalPrayerId: newPrayer.originalPrayerId,
          isTranslation: true
        });
      } else {
        addPrayer(prayerData);
      }

      // Show success message
      if (isAdminOrEditor) {
        alert('Prayer added and published successfully!');
      } else {
        alert('Prayer submitted successfully! It will be reviewed by an administrator before being published.');
      }

      setNewPrayer({
        title: '',
        category: 'English',
        content: '',
        tags: '',
        isTranslation: false,
        originalPrayerId: ''
      });
      setShowAddModal(false);
    }
  };

  const handleApprove = (prayerId) => {
    approvePrayer(prayerId);
    alert('Prayer approved and published!');
  };

  const handleReject = (prayerId) => {
    if (confirm('Are you sure you want to reject this submission?')) {
      rejectPrayer(prayerId);
      alert('Prayer rejected.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  const publishedCount = prayers.filter(prayer => prayer.status === 'published').length;
  const pendingCount = prayers.filter(prayer => prayer.status === 'pending').length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white">Prayer Library</h1>
          <p className="text-peace-600 dark:text-peace-300 font-body">
            {filteredPrayers.length} prayers in {activeTab === 'published' ? 'Published & Live' : 'Submissions & Drafts'}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium font-body shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Add Prayer</span>
        </motion.button>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl p-2 shadow-lg border border-peace-200 dark:border-peace-700">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('published')}
            className={`flex-1 px-4 py-3 rounded-xl font-medium font-body transition-colors flex items-center justify-center space-x-2 ${
              activeTab === 'published'
                ? 'bg-blue-500 text-white shadow-md'
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

      {/* Filters */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-peace-500 dark:text-peace-400" />
            <input
              type="text"
              placeholder="Search prayers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white placeholder-peace-500 dark:placeholder-peace-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-body"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-peace-700 dark:text-peace-300 font-body">
              <SafeIcon icon={FiFilter} className="w-4 h-4" />
              <span>Language</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-peace-100 dark:bg-peace-700 text-peace-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
            >
              <option value="All">All Languages</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

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
              <option value="category">Language</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body">Results</label>
            <div className="bg-peace-100 dark:bg-peace-700 rounded-xl px-4 py-3 text-peace-900 dark:text-white font-body">
              {filteredPrayers.length} prayers found
            </div>
          </div>
        </div>
      </motion.div>

      {/* Prayers Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrayers.map((prayer) => (
          <motion.div
            key={prayer.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiBookOpen} className="w-6 h-6 text-white" />
              </div>
              <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium font-body">
                {prayer.category}
              </span>
            </div>

            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {prayer.title}
            </h3>

            {/* Translations */}
            {prayer.translations && prayer.translations.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {prayer.translations.map((translation, index) => (
                  <Link
                    key={index}
                    to={`/prayer/${translation.id}`}
                    className="inline-flex items-center space-x-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    <SafeIcon icon={FiGlobe} className="w-3 h-3" />
                    <span>{translation.language}: {translation.title}</span>
                  </Link>
                ))}
              </div>
            )}

            <p className="text-peace-600 dark:text-peace-300 mb-4 font-body text-sm line-clamp-3">
              {prayer.content.substring(0, 120)}...
            </p>

            {prayer.tags && prayer.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {prayer.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-peace-100 dark:bg-peace-700 text-peace-700 dark:text-peace-300 px-2 py-1 rounded-lg text-xs font-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* View Prayer Button - Always show for published prayers */}
              {activeTab === 'published' && (
                <Link
                  to={`/prayer/${prayer.id}`}
                  className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-body text-center block"
                >
                  View Prayer
                </Link>
              )}

              {/* Admin/Editor Actions for Submissions */}
              {activeTab === 'submissions' && canEdit && prayer.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(prayer.id)}
                    className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-body text-sm flex items-center justify-center space-x-1"
                  >
                    <SafeIcon icon={FiCheck} className="w-4 h-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(prayer.id)}
                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-body text-sm flex items-center justify-center space-x-1"
                  >
                    <SafeIcon icon={FiX} className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              )}

              {/* Regular Edit/Delete Actions */}
              {activeTab === 'published' && (
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg hover:bg-peace-100 dark:hover:bg-peace-700 transition-colors">
                    <SafeIcon icon={FiEdit} className="w-4 h-4 text-peace-600 dark:text-peace-300" />
                  </button>
                  <button
                    onClick={() => deletePrayer(prayer.id)}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              )}
            </div>

            {/* Submitter Info for Submissions */}
            {activeTab === 'submissions' && prayer.submitterName && (
              <div className="mt-4 pt-4 border-t border-peace-200 dark:border-peace-700">
                <p className="text-xs text-peace-500 dark:text-peace-400 font-body">
                  Submitted by: {prayer.submitterName} ({prayer.submitterCenter})
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {filteredPrayers.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <div className="w-24 h-24 bg-peace-100 dark:bg-peace-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiBookOpen} className="w-12 h-12 text-peace-500 dark:text-peace-400" />
          </div>
          <h3 className="text-xl font-display font-medium text-peace-900 dark:text-white mb-2">
            No prayers found
          </h3>
          <p className="text-peace-600 dark:text-peace-300 mb-6 font-body">
            {activeTab === 'published' 
              ? 'Try adjusting your search or add your first prayer' 
              : 'No submissions pending review'
            }
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary-500 text-white px-6 py-3 rounded-xl font-medium font-body hover:bg-primary-600 transition-colors"
          >
            Add Your First Prayer
          </button>
        </motion.div>
      )}

      {/* Add Prayer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-4">
              Add New Prayer
            </h3>
            
            <div className="space-y-4">
              {/* Translation Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isTranslation"
                  checked={newPrayer.isTranslation}
                  onChange={(e) => setNewPrayer(prev => ({ ...prev, isTranslation: e.target.checked, originalPrayerId: '' }))}
                  className="rounded border-peace-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isTranslation" className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body">
                  This is a translation of an existing prayer
                </label>
              </div>

              {/* Original Prayer Selection (if translation) */}
              {newPrayer.isTranslation && (
                <div>
                  <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                    Original Prayer
                  </label>
                  <select
                    value={newPrayer.originalPrayerId}
                    onChange={(e) => setNewPrayer(prev => ({ ...prev, originalPrayerId: e.target.value }))}
                    className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  >
                    <option value="">Select original prayer...</option>
                    {getPrayersInSameLanguage(newPrayer.category).map(prayer => (
                      <option key={prayer.id} value={prayer.id}>
                        {prayer.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Prayer Title
                </label>
                <input
                  type="text"
                  value={newPrayer.title}
                  onChange={(e) => setNewPrayer(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  placeholder="Enter prayer title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Language
                </label>
                <select
                  value={newPrayer.category}
                  onChange={(e) => setNewPrayer(prev => ({ 
                    ...prev, 
                    category: e.target.value,
                    originalPrayerId: '' // Reset original prayer when language changes
                  }))}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Prayer Content
                </label>
                <textarea
                  value={newPrayer.content}
                  onChange={(e) => setNewPrayer(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
                  rows="8"
                  placeholder="Enter the prayer content..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newPrayer.tags}
                  onChange={(e) => setNewPrayer(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  placeholder="Opening, Worship, Fellowship..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPrayer}
                className="flex-1 px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-body"
              >
                {isAdminOrEditor ? 'Add & Publish' : 'Submit for Review'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Prayers;