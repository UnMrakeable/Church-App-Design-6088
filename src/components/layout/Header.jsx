import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../../components/common/SafeIcon';
import { useTheme } from '../../contexts/ThemeContext';
import { useSongs } from '../../contexts/SongContext';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiSun, FiMoon, FiSearch } = FiIcons;

const Header = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const { songs } = useSongs();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Search functionality - only search published songs
  const searchResults = searchTerm.trim()
    ? songs.filter(song =>
        song.status === 'published' && (
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      ).slice(0, 5)
    : [];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(e.target.value.trim().length > 0);
  };

  const handleResultClick = (songId) => {
    navigate(`/song/${songId}`);
    setSearchTerm('');
    setShowResults(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleResultClick(searchResults[0].id);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 dark:bg-peace-800/80 backdrop-blur-lg border-b border-peace-200 dark:border-peace-700 px-4 py-3 lg:px-6 no-print"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-peace-100 dark:hover:bg-peace-700 transition-colors"
          >
            <SafeIcon icon={FiMenu} className="w-5 h-5 text-peace-600 dark:text-peace-300" />
          </button>

          {/* Search Bar - Smaller on mobile to make room for profile */}
          <div className="flex relative">
            <div className="flex items-center bg-peace-100 dark:bg-peace-700 rounded-xl px-3 py-2 w-48 md:w-96">
              <SafeIcon icon={FiSearch} className="w-4 h-4 text-peace-500 dark:text-peace-400 mr-2" />
              <input
                type="text"
                placeholder="Search hymns..."
                value={searchTerm}
                onChange={handleSearch}
                onKeyPress={handleKeyPress}
                onFocus={() => searchTerm.trim() && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                className="flex-1 bg-transparent text-peace-900 dark:text-white placeholder-peace-500 dark:placeholder-peace-400 focus:outline-none font-body text-sm"
              />
            </div>

            {/* Search Results Dropdown - Higher z-index to appear above holiday banner */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-peace-800 rounded-xl shadow-lg border border-peace-200 dark:border-peace-700 z-[60] max-h-80 overflow-y-auto">
                {searchResults.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => handleResultClick(song.id)}
                    className="p-3 hover:bg-peace-50 dark:hover:bg-peace-700 cursor-pointer border-b border-peace-100 dark:border-peace-600 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center">
                        <SafeIcon icon={FiSearch} className="w-4 h-4 text-white" />
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-peace-100 dark:bg-peace-700 hover:bg-peace-200 dark:hover:bg-peace-600 transition-colors"
          >
            <SafeIcon icon={isDark ? FiSun : FiMoon} className="w-5 h-5 text-peace-600 dark:text-peace-300" />
          </motion.button>

          {/* Profile - Updated color */}
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium font-display">JD</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;