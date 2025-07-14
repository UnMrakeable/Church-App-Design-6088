import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import { useSongs } from '../contexts/SongContext';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiList, FiMusic, FiEdit, FiTrash2, FiClock } = FiIcons;

const Playlists = () => {
  const { playlists, songs, createPlaylist, deletePlaylist, getSongById } = useSongs();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: '',
    description: ''
  });

  const handleCreatePlaylist = () => {
    if (newPlaylist.name.trim()) {
      createPlaylist(newPlaylist);
      setNewPlaylist({ name: '', description: '' });
      setShowCreateModal(false);
    }
  };

  const getPlaylistDuration = (playlist) => {
    const totalMinutes = playlist.songs.reduce((total, songId) => {
      const song = getSongById(songId);
      if (song && song.duration) {
        const [minutes, seconds] = song.duration.split(':').map(Number);
        return total + minutes + (seconds / 60);
      }
      return total;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
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
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white">Collections</h1>
          <p className="text-peace-600 dark:text-peace-300 font-body">
            {playlists.length} collections created
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium font-body shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Create Collection</span>
        </motion.button>
      </motion.div>

      {/* Playlists Grid */}
      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <motion.div
            key={playlist.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center">
                <SafeIcon icon={FiList} className="w-6 h-6 text-white" />
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-lg hover:bg-peace-100 dark:hover:bg-peace-700 transition-colors opacity-0 group-hover:opacity-100">
                  <SafeIcon icon={FiEdit} className="w-4 h-4 text-peace-600 dark:text-peace-300" />
                </button>
                <button
                  onClick={() => deletePlaylist(playlist.id)}
                  className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {playlist.name}
            </h3>
            <p className="text-peace-600 dark:text-peace-300 mb-4 text-sm font-body">
              {playlist.description}
            </p>

            <div className="flex items-center justify-between text-sm text-peace-500 dark:text-peace-400 mb-4">
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiMusic} className="w-4 h-4" />
                <span className="font-body">{playlist.songs.length} hymns</span>
              </div>
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiClock} className="w-4 h-4" />
                <span className="font-body">{getPlaylistDuration(playlist)}</span>
              </div>
            </div>

            {/* Song Preview */}
            <div className="space-y-2">
              {playlist.songs.slice(0, 3).map((songId) => {
                const song = getSongById(songId);
                return song ? (
                  <div key={songId} className="flex items-center space-x-3 text-sm">
                    <div className="w-6 h-6 bg-peace-100 dark:bg-peace-700 rounded flex items-center justify-center">
                      <SafeIcon icon={FiMusic} className="w-3 h-3 text-peace-500 dark:text-peace-400" />
                    </div>
                    <span className="text-peace-700 dark:text-peace-300 truncate font-body">
                      {song.title}
                    </span>
                  </div>
                ) : null;
              })}
              {playlist.songs.length > 3 && (
                <div className="text-xs text-peace-500 dark:text-peace-400 pl-9 font-body">
                  +{playlist.songs.length - 3} more hymns
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {playlists.length === 0 && (
        <motion.div variants={itemVariants} className="text-center py-12">
          <div className="w-24 h-24 bg-peace-100 dark:bg-peace-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiList} className="w-12 h-12 text-peace-500 dark:text-peace-400" />
          </div>
          <h3 className="text-xl font-display font-medium text-peace-900 dark:text-white mb-2">
            No collections yet
          </h3>
          <p className="text-peace-600 dark:text-peace-300 mb-6 font-body">
            Create your first collection to organize your hymns
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-500 text-white px-6 py-3 rounded-xl font-medium font-body hover:bg-primary-600 transition-colors"
          >
            Create Your First Collection
          </button>
        </motion.div>
      )}

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-4">
              Create New Collection
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Collection Name
                </label>
                <input
                  type="text"
                  value={newPlaylist.name}
                  onChange={(e) => setNewPlaylist(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  placeholder="Enter collection name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Description (Optional)
                </label>
                <textarea
                  value={newPlaylist.description}
                  onChange={(e) => setNewPlaylist(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
                  rows="3"
                  placeholder="Describe your collection..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                className="flex-1 px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-body"
              >
                Create
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Playlists;