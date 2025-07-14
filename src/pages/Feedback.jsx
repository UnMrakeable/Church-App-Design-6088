import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageCircle, FiStar, FiThumbsUp, FiThumbsDown, FiFlag, FiUser } = FiIcons;

const Feedback = () => {
  const [feedback] = useState([
    {
      id: 1,
      user: 'Sarah Johnson',
      email: 'sarah@church.com',
      type: 'suggestion',
      rating: 5,
      subject: 'Love the new chord display',
      message: 'The new chord positioning is much easier to read during worship. Thank you!',
      date: '2024-01-28',
      status: 'open'
    },
    {
      id: 2,
      user: 'Mike Chen',
      email: 'mike@church.com',
      type: 'bug',
      rating: 3,
      subject: 'Print layout issue',
      message: 'When printing hymns, some chords are cut off at the page margins.',
      date: '2024-01-27',
      status: 'in-progress'
    },
    {
      id: 3,
      user: 'Emma Davis',
      email: 'emma@church.com',
      type: 'feature',
      rating: 4,
      subject: 'Request for Spanish translations',
      message: 'Could we add more Spanish language hymns? Our congregation is growing more diverse.',
      date: '2024-01-26',
      status: 'resolved'
    }
  ]);

  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'suggestion', label: 'Suggestions' },
    { value: 'bug', label: 'Bug Reports' },
    { value: 'feature', label: 'Feature Requests' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'suggestion':
        return FiThumbsUp;
      case 'bug':
        return FiFlag;
      case 'feature':
        return FiStar;
      default:
        return FiMessageCircle;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'suggestion':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'bug':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'feature':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filteredFeedback = feedback.filter(item => {
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    const statusMatch = selectedStatus === 'all' || item.status === selectedStatus;
    return typeMatch && statusMatch;
  });

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
        <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">Feedback</h1>
        <p className="text-peace-600 dark:text-peace-300 font-body">
          User feedback, suggestions, and bug reports
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiMessageCircle} className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-peace-900 dark:text-white">{feedback.length}</p>
              <p className="text-peace-600 dark:text-peace-300 font-body">Total Feedback</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiThumbsUp} className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-peace-900 dark:text-white">
                {feedback.filter(f => f.type === 'suggestion').length}
              </p>
              <p className="text-peace-600 dark:text-peace-300 font-body">Suggestions</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiFlag} className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-peace-900 dark:text-white">
                {feedback.filter(f => f.type === 'bug').length}
              </p>
              <p className="text-peace-600 dark:text-peace-300 font-body">Bug Reports</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <SafeIcon icon={FiStar} className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-peace-900 dark:text-white">
                {(feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)}
              </p>
              <p className="text-peace-600 dark:text-peace-300 font-body">Avg Rating</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
              Filter by Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
            >
              {types.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
              Filter by Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Feedback List */}
      <motion.div variants={containerVariants} className="space-y-4">
        {filteredFeedback.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-sacred-500 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiUser} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-peace-900 dark:text-white font-body">{item.user}</h4>
                  <p className="text-sm text-peace-600 dark:text-peace-300 font-body truncate max-w-[200px]">{item.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium font-body ${getTypeColor(item.type)}`}>
                  {item.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium font-body ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2">
                {item.subject}
              </h3>
              <p className="text-peace-600 dark:text-peace-300 font-body">
                {item.message}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <SafeIcon
                      key={i}
                      icon={FiStar}
                      className={`w-4 h-4 ${
                        i < item.rating ? 'text-yellow-400' : 'text-peace-300 dark:text-peace-600'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-peace-600 dark:text-peace-300 ml-2 font-body">
                    {item.rating}/5
                  </span>
                </div>
                <span className="text-sm text-peace-500 dark:text-peace-400 font-body">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors font-body">
                  Reply
                </button>
                <button className="px-4 py-2 bg-peace-100 dark:bg-peace-700 text-peace-700 dark:text-peace-300 rounded-lg hover:bg-peace-200 dark:hover:bg-peace-600 transition-colors font-body">
                  Mark Resolved
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredFeedback.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <div className="w-24 h-24 bg-peace-100 dark:bg-peace-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiMessageCircle} className="w-12 h-12 text-peace-500 dark:text-peace-400" />
          </div>
          <h3 className="text-xl font-display font-medium text-peace-900 dark:text-white mb-2">
            No feedback found
          </h3>
          <p className="text-peace-600 dark:text-peace-300 font-body">
            Try adjusting your filters to see more feedback
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Feedback;