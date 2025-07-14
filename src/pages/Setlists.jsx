import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import { useSetlists } from '../contexts/SetlistContext';
import { useSongs } from '../contexts/SongContext';
import * as FiIcons from 'react-icons/fi';

const {
  FiPlus,
  FiCalendar,
  FiClock,
  FiMusic,
  FiEdit,
  FiTrash2,
  FiCopy,
  FiPlay,
  FiMonitor,
  FiList
} = FiIcons;

const Setlists = () => {
  const { setlists, deleteSetlist, duplicateSetlist } = useSetlists();
  const { getSongById } = useSongs();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSetlists = setlists.filter(setlist =>
    setlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    setlist.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    setlist.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalDuration = (items) => {
    if (!items) return '0:00';
    
    let totalSeconds = 0;
    items.forEach(item => {
      const duration = item.duration || '4:00';
      const [minutes, seconds] = duration.split(':').map(Number);
      totalSeconds += (minutes * 60) + seconds;
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${(totalSeconds % 60).toString().padStart(2, '0')}`;
    }
    return `${minutes}:${(totalSeconds % 60).toString().padStart(2, '0')}`;
  };

  const handleDuplicate = (setlistId) => {
    duplicateSetlist(setlistId);
  };

  const handleDelete = (setlistId) => {
    if (window.confirm('Are you sure you want to delete this setlist?')) {
      deleteSetlist(setlistId);
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
          <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white">Event Setlists</h1>
          <p className="text-peace-600 dark:text-peace-300 font-body">
            {filteredSetlists.length} setlists created
          </p>
        </div>
        <Link
          to="/setlist/new"
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium font-body shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Create Setlist</span>
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
        <input
          type="text"
          placeholder="Search setlists by title, description, or service type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white placeholder-peace-500 dark:placeholder-peace-400 focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
        />
      </motion.div>

      {/* Setlists Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSetlists.map((setlist) => (
          <motion.div
            key={setlist.id}
            variants={itemVariants}
            className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all group"
          >
            {/* Header */}
            <div className="p-6 border-b border-peace-200 dark:border-peace-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2">
                    {setlist.title}
                  </h3>
                  <p className="text-peace-600 dark:text-peace-300 text-sm font-body">
                    {setlist.description}
                  </p>
                </div>
                <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium font-body">
                  {setlist.service}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-peace-500 dark:text-peace-400">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                  <span className="font-body">{new Date(setlist.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiMusic} className="w-4 h-4" />
                  <span className="font-body">{setlist.items?.length || 0} songs</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiClock} className="w-4 h-4" />
                  <span className="font-body">{getTotalDuration(setlist.items)}</span>
                </div>
              </div>
            </div>

            {/* Song Preview */}
            <div className="p-6">
              {setlist.items && setlist.items.length > 0 ? (
                <div className="space-y-2">
                  {setlist.items.slice(0, 3).map((item, index) => {
                    const song = getSongById(item.songId);
                    return song ? (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-3">
                          <span className="text-peace-500 dark:text-peace-400 font-body">
                            {index + 1}.
                          </span>
                          <span className="text-peace-900 dark:text-white font-body">
                            {song.title}
                          </span>
                        </div>
                        <span className="text-peace-600 dark:text-peace-300 font-body">
                          {item.key}
                        </span>
                      </div>
                    ) : null;
                  })}
                  {setlist.items.length > 3 && (
                    <div className="text-xs text-peace-500 dark:text-peace-400 font-body">
                      +{setlist.items.length - 3} more songs
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <SafeIcon icon={FiMusic} className="w-8 h-8 text-peace-300 dark:text-peace-600 mx-auto mb-2" />
                  <p className="text-peace-500 dark:text-peace-400 text-sm font-body">No songs added yet</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 pt-0">
              <div className="flex space-x-2">
                <Link
                  to={`/presentation/${setlist.id}`}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-colors font-body text-sm flex items-center justify-center space-x-1"
                >
                  <SafeIcon icon={FiMonitor} className="w-4 h-4" />
                  <span>Present</span>
                </Link>
                <Link
                  to={`/setlist/${setlist.id}`}
                  className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors font-body text-sm flex items-center justify-center space-x-1"
                >
                  <SafeIcon icon={FiEdit} className="w-4 h-4" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDuplicate(setlist.id)}
                  className="px-4 py-2 bg-peace-100 dark:bg-peace-700 text-peace-700 dark:text-peace-300 rounded-lg hover:bg-peace-200 dark:hover:bg-peace-600 transition-colors"
                  title="Duplicate"
                >
                  <SafeIcon icon={FiCopy} className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(setlist.id)}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  title="Delete"
                >
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredSetlists.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <div className="w-24 h-24 bg-peace-100 dark:bg-peace-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiList} className="w-12 h-12 text-peace-500 dark:text-peace-400" />
          </div>
          <h3 className="text-xl font-display font-medium text-peace-900 dark:text-white mb-2">
            {searchTerm ? 'No setlists found' : 'No setlists yet'}
          </h3>
          <p className="text-peace-600 dark:text-peace-300 mb-6 font-body">
            {searchTerm ? 'Try adjusting your search terms' : 'Create your first event setlist to get started'}
          </p>
          {!searchTerm && (
            <Link
              to="/setlist/new"
              className="bg-primary-500 text-white px-6 py-3 rounded-xl font-medium font-body hover:bg-primary-600 transition-colors"
            >
              Create Your First Setlist
            </Link>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Setlists;