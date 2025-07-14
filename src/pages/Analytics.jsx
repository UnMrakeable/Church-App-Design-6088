import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiUsers, FiMusic, FiEye, FiDownload, FiPlay } = FiIcons;

const Analytics = () => {
  // Mock analytics data
  const usageData = [
    { month: 'Jan', views: 1200, downloads: 340, plays: 890 },
    { month: 'Feb', views: 1800, downloads: 520, plays: 1200 },
    { month: 'Mar', views: 2200, downloads: 680, plays: 1500 },
    { month: 'Apr', views: 1900, downloads: 590, plays: 1300 },
    { month: 'May', views: 2800, downloads: 780, plays: 1900 },
    { month: 'Jun', views: 3200, downloads: 920, plays: 2300 }
  ];

  const topHymns = [
    { name: 'Amazing Grace', views: 2341, downloads: 567 },
    { name: 'How Great Is Our God', views: 1823, downloads: 432 },
    { name: 'Holy Spirit', views: 1654, downloads: 398 },
    { name: 'Blessed Assurance', views: 1234, downloads: 287 },
    { name: 'Great Is Thy Faithfulness', views: 987, downloads: 234 }
  ];

  const categoryData = [
    { name: 'Worship', value: 40, color: '#0ea5e9' },
    { name: 'Praise', value: 30, color: '#eab308' },
    { name: 'Hymn', value: 20, color: '#f97316' },
    { name: 'Contemporary', value: 10, color: '#84cc16' }
  ];

  const stats = [
    {
      title: 'Total Views',
      value: '24,531',
      change: '+12.5%',
      icon: FiEye,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8.2%',
      icon: FiUsers,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Downloads',
      value: '5,678',
      change: '+15.3%',
      icon: FiDownload,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Song Plays',
      value: '18,234',
      change: '+22.1%',
      icon: FiPlay,
      color: 'from-orange-500 to-orange-600'
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
        <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">Analytics</h1>
        <p className="text-peace-600 dark:text-peace-300 font-body">
          Track your hymn library performance and user engagement
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-500 text-sm font-medium font-body">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-peace-600 dark:text-peace-300 font-body">{stat.title}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trends */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700"
        >
          <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-6">Usage Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#0ea5e9" strokeWidth={2} />
              <Line type="monotone" dataKey="downloads" stroke="#eab308" strokeWidth={2} />
              <Line type="monotone" dataKey="plays" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700"
        >
          <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-6">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Hymns */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700"
      >
        <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-6">Top Performing Hymns</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topHymns}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#0ea5e9" />
            <Bar dataKey="downloads" fill="#eab308" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Detailed Stats */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700"
      >
        <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-6">Detailed Statistics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-peace-200 dark:border-peace-700">
                <th className="text-left py-3 px-4 font-medium text-peace-700 dark:text-peace-300 font-body">Hymn</th>
                <th className="text-left py-3 px-4 font-medium text-peace-700 dark:text-peace-300 font-body">Views</th>
                <th className="text-left py-3 px-4 font-medium text-peace-700 dark:text-peace-300 font-body">Downloads</th>
                <th className="text-left py-3 px-4 font-medium text-peace-700 dark:text-peace-300 font-body">Category</th>
                <th className="text-left py-3 px-4 font-medium text-peace-700 dark:text-peace-300 font-body">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topHymns.map((hymn, index) => (
                <tr key={index} className="border-b border-peace-100 dark:border-peace-700">
                  <td className="py-3 px-4 text-peace-900 dark:text-white font-body">{hymn.name}</td>
                  <td className="py-3 px-4 text-peace-600 dark:text-peace-300 font-body">{hymn.views.toLocaleString()}</td>
                  <td className="py-3 px-4 text-peace-600 dark:text-peace-300 font-body">{hymn.downloads.toLocaleString()}</td>
                  <td className="py-3 px-4 text-peace-600 dark:text-peace-300 font-body">Worship</td>
                  <td className="py-3 px-4">
                    <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-green-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;