import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import SafeIcon from '../components/common/SafeIcon';
import { useSongs } from '../contexts/SongContext';
import { useSetlists } from '../contexts/SetlistContext';
import * as FiIcons from 'react-icons/fi';

const {
  FiPlus,
  FiSave,
  FiPlay,
  FiEdit,
  FiTrash2,
  FiMove,
  FiMusic,
  FiClock,
  FiSettings,
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiMonitor,
  FiMic,
  FiKey
} = FiIcons;

const SetlistBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { songs, getSongById } = useSongs();
  const { 
    setlists, 
    createSetlist, 
    updateSetlist, 
    getSetlistById,
    addSongToSetlist,
    removeSongFromSetlist,
    updateSetlistItem,
    reorderSetlistItems
  } = useSetlists();

  const [setlist, setSetlist] = useState(null);
  const [isEditing, setIsEditing] = useState(!id);
  const [showAddSong, setShowAddSong] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const [setlistData, setSetlistData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    service: 'Sunday Morning',
    notes: ''
  });

  useEffect(() => {
    if (id) {
      const existingSetlist = getSetlistById(id);
      if (existingSetlist) {
        setSetlist(existingSetlist);
        setSetlistData({
          title: existingSetlist.title,
          description: existingSetlist.description,
          date: existingSetlist.date,
          service: existingSetlist.service,
          notes: existingSetlist.notes || ''
        });
        setIsEditing(false);
      }
    }
  }, [id, getSetlistById]);

  const services = [
    'Sunday Morning',
    'Sunday Evening',
    'Wednesday Prayer',
    'Youth Service',
    'Special Event',
    'Conference',
    'Retreat'
  ];

  const keys = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
  ];

  const filteredSongs = songs.filter(song =>
    song.status === 'published' &&
    (song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     song.artist.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSave = () => {
    if (!setlistData.title.trim()) {
      alert('Please enter a setlist title');
      return;
    }

    if (id && setlist) {
      updateSetlist(id, setlistData);
      setSetlist({ ...setlist, ...setlistData });
    } else {
      const newSetlist = createSetlist(setlistData);
      navigate(`/setlist/${newSetlist.id}`);
    }
    setIsEditing(false);
  };

  const handleAddSong = (song) => {
    const setlistId = id || setlist?.id;
    if (setlistId) {
      const newItem = {
        songId: song.id,
        key: song.key || 'C',
        tempo: song.tempo || 'Medium',
        notes: '',
        intro: '',
        transition: '',
        duration: song.duration || '4:00'
      };
      addSongToSetlist(setlistId, newItem);
      setShowAddSong(false);
      
      // Refresh setlist data
      const updatedSetlist = getSetlistById(setlistId);
      setSetlist(updatedSetlist);
    }
  };

  const handleRemoveSong = (itemIndex) => {
    const setlistId = id || setlist?.id;
    if (setlistId) {
      removeSongFromSetlist(setlistId, itemIndex);
      const updatedSetlist = getSetlistById(setlistId);
      setSetlist(updatedSetlist);
    }
  };

  const handleUpdateItem = (itemIndex, updates) => {
    const setlistId = id || setlist?.id;
    if (setlistId) {
      updateSetlistItem(setlistId, itemIndex, updates);
      const updatedSetlist = getSetlistById(setlistId);
      setSetlist(updatedSetlist);
    }
  };

  const moveItem = (fromIndex, toIndex) => {
    const setlistId = id || setlist?.id;
    if (setlistId) {
      reorderSetlistItems(setlistId, fromIndex, toIndex);
      const updatedSetlist = getSetlistById(setlistId);
      setSetlist(updatedSetlist);
    }
  };

  const getTotalDuration = () => {
    if (!setlist?.items) return '0:00';
    
    let totalSeconds = 0;
    setlist.items.forEach(item => {
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

  const startPresentation = () => {
    const setlistId = id || setlist?.id;
    if (setlistId) {
      navigate(`/presentation/${setlistId}`);
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white">
            {isEditing ? (id ? 'Edit Setlist' : 'New Setlist') : setlist?.title || 'Setlist Builder'}
          </h1>
          <p className="text-peace-600 dark:text-peace-300 font-body">
            {isEditing ? 'Build your worship setlist with songs, keys, and transitions' : 
             `${setlist?.items?.length || 0} songs • ${getTotalDuration()}`}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {!isEditing && setlist && (
            <>
              <button
                onClick={startPresentation}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium font-body shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <SafeIcon icon={FiMonitor} className="w-5 h-5" />
                <span>Start Presentation</span>
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-medium font-body shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <SafeIcon icon={FiEdit} className="w-5 h-5" />
                <span>Edit</span>
              </button>
            </>
          )}
          
          {isEditing && (
            <>
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium font-body shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <SafeIcon icon={FiSave} className="w-5 h-5" />
                <span>Save Setlist</span>
              </button>
              <button
                onClick={() => id ? setIsEditing(false) : navigate('/setlists')}
                className="px-6 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body flex items-center space-x-2"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
                <span>Cancel</span>
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Setlist Info */}
      {isEditing && (
        <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
          <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-4">
            Setlist Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Setlist Title *
              </label>
              <input
                type="text"
                value={setlistData.title}
                onChange={(e) => setSetlistData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                placeholder="Sunday Morning Worship"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Service Type
              </label>
              <select
                value={setlistData.service}
                onChange={(e) => setSetlistData(prev => ({ ...prev, service: e.target.value }))}
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              >
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Date
              </label>
              <input
                type="date"
                value={setlistData.date}
                onChange={(e) => setSetlistData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
              Description
            </label>
            <input
              type="text"
              value={setlistData.description}
              onChange={(e) => setSetlistData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              placeholder="Theme or description for this service"
            />
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
              General Notes
            </label>
            <textarea
              value={setlistData.notes}
              onChange={(e) => setSetlistData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
              rows="3"
              placeholder="Overall notes for the service..."
            />
          </div>
        </motion.div>
      )}

      {/* Setlist Items */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700">
        <div className="p-6 border-b border-peace-200 dark:border-peace-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white">
              Songs ({setlist?.items?.length || 0})
            </h3>
            {(isEditing || !id) && (
              <button
                onClick={() => setShowAddSong(true)}
                className="bg-primary-500 text-white px-4 py-2 rounded-xl font-medium font-body hover:bg-primary-600 transition-colors flex items-center space-x-2"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4" />
                <span>Add Song</span>
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          {setlist?.items?.length === 0 || !setlist?.items ? (
            <div className="text-center py-12">
              <SafeIcon icon={FiMusic} className="w-16 h-16 text-peace-300 dark:text-peace-600 mx-auto mb-4" />
              <h4 className="text-lg font-display font-medium text-peace-900 dark:text-white mb-2">
                No songs added yet
              </h4>
              <p className="text-peace-600 dark:text-peace-300 font-body mb-6">
                Start building your setlist by adding songs
              </p>
              {(isEditing || !id) && (
                <button
                  onClick={() => setShowAddSong(true)}
                  className="bg-primary-500 text-white px-6 py-3 rounded-xl font-medium font-body hover:bg-primary-600 transition-colors"
                >
                  Add Your First Song
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {setlist.items.map((item, index) => {
                const song = getSongById(item.songId);
                if (!song) return null;

                return (
                  <SetlistItem
                    key={`${item.songId}-${index}`}
                    item={item}
                    song={song}
                    index={index}
                    isEditing={isEditing}
                    editingItem={editingItem}
                    setEditingItem={setEditingItem}
                    onUpdate={(updates) => handleUpdateItem(index, updates)}
                    onRemove={() => handleRemoveSong(index)}
                    onMoveUp={index > 0 ? () => moveItem(index, index - 1) : null}
                    onMoveDown={index < setlist.items.length - 1 ? () => moveItem(index, index + 1) : null}
                    keys={keys}
                  />
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      {/* Add Song Modal */}
      {showAddSong && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white">
                Add Song to Setlist
              </h3>
              <button
                onClick={() => setShowAddSong(false)}
                className="p-2 rounded-lg hover:bg-peace-100 dark:hover:bg-peace-700 transition-colors"
              >
                <SafeIcon icon={FiX} className="w-5 h-5 text-peace-600 dark:text-peace-300" />
              </button>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Search songs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredSongs.map(song => (
                <div
                  key={song.id}
                  onClick={() => handleAddSong(song)}
                  className="flex items-center justify-between p-4 bg-peace-50 dark:bg-peace-700 rounded-xl hover:bg-peace-100 dark:hover:bg-peace-600 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={FiMusic} className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-peace-900 dark:text-white font-body">
                        {song.title}
                      </h4>
                      <p className="text-sm text-peace-600 dark:text-peace-300 font-body">
                        {song.artist || 'Unknown Artist'} • {song.language}
                      </p>
                    </div>
                  </div>
                  <SafeIcon icon={FiPlus} className="w-5 h-5 text-primary-500" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

// Setlist Item Component
const SetlistItem = ({ 
  item, 
  song, 
  index, 
  isEditing, 
  editingItem, 
  setEditingItem, 
  onUpdate, 
  onRemove, 
  onMoveUp, 
  onMoveDown,
  keys 
}) => {
  const [localItem, setLocalItem] = useState(item);
  const isExpanded = editingItem === index;

  const handleSave = () => {
    onUpdate(localItem);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setLocalItem(item);
    setEditingItem(null);
  };

  return (
    <div className="bg-peace-50 dark:bg-peace-700 rounded-xl overflow-hidden">
      {/* Main Item Row */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-peace-500 dark:text-peace-400 font-body">
                {index + 1}
              </span>
              {isEditing && (
                <div className="flex flex-col space-y-1">
                  {onMoveUp && (
                    <button
                      onClick={onMoveUp}
                      className="p-1 rounded hover:bg-peace-200 dark:hover:bg-peace-600 transition-colors"
                    >
                      <SafeIcon icon={FiChevronUp} className="w-3 h-3 text-peace-600 dark:text-peace-300" />
                    </button>
                  )}
                  {onMoveDown && (
                    <button
                      onClick={onMoveDown}
                      className="p-1 rounded hover:bg-peace-200 dark:hover:bg-peace-600 transition-colors"
                    >
                      <SafeIcon icon={FiChevronDown} className="w-3 h-3 text-peace-600 dark:text-peace-300" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h4 className="font-medium text-peace-900 dark:text-white font-body">
                {song.title}
              </h4>
              <div className="flex items-center space-x-4 text-sm text-peace-600 dark:text-peace-300">
                <span className="font-body">{song.artist || 'Unknown Artist'}</span>
                <span className="font-body">Key: {item.key}</span>
                <span className="font-body">Duration: {item.duration}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEditingItem(isExpanded ? null : index)}
              className="p-2 rounded-lg hover:bg-peace-200 dark:hover:bg-peace-600 transition-colors"
            >
              <SafeIcon icon={FiSettings} className="w-4 h-4 text-peace-600 dark:text-peace-300" />
            </button>
            {isEditing && (
              <button
                onClick={onRemove}
                className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
              >
                <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600 dark:text-red-400" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Info Display */}
        {!isExpanded && (item.notes || item.intro || item.transition) && (
          <div className="mt-3 pt-3 border-t border-peace-200 dark:border-peace-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {item.intro && (
                <div>
                  <span className="font-medium text-peace-700 dark:text-peace-300 font-body">Intro:</span>
                  <p className="text-peace-600 dark:text-peace-400 font-body">{item.intro}</p>
                </div>
              )}
              {item.transition && (
                <div>
                  <span className="font-medium text-peace-700 dark:text-peace-300 font-body">Transition:</span>
                  <p className="text-peace-600 dark:text-peace-400 font-body">{item.transition}</p>
                </div>
              )}
              {item.notes && (
                <div>
                  <span className="font-medium text-peace-700 dark:text-peace-300 font-body">Notes:</span>
                  <p className="text-peace-600 dark:text-peace-400 font-body">{item.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Expanded Edit Section */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-peace-200 dark:border-peace-600">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Key
              </label>
              <select
                value={localItem.key}
                onChange={(e) => setLocalItem(prev => ({ ...prev, key: e.target.value }))}
                className="w-full px-3 py-2 bg-peace-100 dark:bg-peace-600 rounded-lg text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              >
                {keys.map(key => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Duration
              </label>
              <input
                type="text"
                value={localItem.duration}
                onChange={(e) => setLocalItem(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-2 bg-peace-100 dark:bg-peace-600 rounded-lg text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                placeholder="4:30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Intro Notes
              </label>
              <textarea
                value={localItem.intro}
                onChange={(e) => setLocalItem(prev => ({ ...prev, intro: e.target.value }))}
                className="w-full px-3 py-2 bg-peace-100 dark:bg-peace-600 rounded-lg text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
                rows="3"
                placeholder="How to start this song..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Transition Notes
              </label>
              <textarea
                value={localItem.transition}
                onChange={(e) => setLocalItem(prev => ({ ...prev, transition: e.target.value }))}
                className="w-full px-3 py-2 bg-peace-100 dark:bg-peace-600 rounded-lg text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
                rows="3"
                placeholder="How to transition to next song..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                General Notes
              </label>
              <textarea
                value={localItem.notes}
                onChange={(e) => setLocalItem(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 bg-peace-100 dark:bg-peace-600 rounded-lg text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
                rows="3"
                placeholder="Special notes for this song..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-peace-600 dark:text-peace-300 hover:bg-peace-200 dark:hover:bg-peace-600 rounded-lg transition-colors font-body"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-body"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetlistBuilder;