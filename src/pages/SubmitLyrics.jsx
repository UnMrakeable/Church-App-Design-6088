import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../components/common/SafeIcon';
import { useSongs } from '../contexts/SongContext';
import { useUsers } from '../contexts/UserContext';
import * as FiIcons from 'react-icons/fi';

const { FiMusic, FiSave, FiX, FiInfo, FiGlobe, FiUser, FiMail, FiMapPin, FiShield, FiToggleLeft, FiToggleRight } = FiIcons;

const SubmitLyrics = () => {
  const navigate = useNavigate();
  const { addSong, addTranslation, songs } = useSongs();
  const { currentUser, hasPermission } = useUsers();
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

  const categories = ['Worship', 'Praise', 'Hymn', 'Contemporary', 'Traditional'];
  const languages = ['English', 'Tagalog', 'Ilocano', 'Spanish', 'French'];

  // Check if user can edit/approve (admin or editor)
  const canEdit = hasPermission(currentUser?.id, 'hymns.edit') || hasPermission(currentUser?.id, 'hymns.manage_media');
  const isAdminOrEditor = canEdit;

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
    const userInput = prompt("Please enter the sum of 5 + 3 to verify you're human:");
    if (userInput === "8") {
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
        alert('Lyrics added and published successfully!');
      } else {
        alert('Lyrics submitted successfully! They will be reviewed by an administrator before being published.');
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
      navigate('/library');
    } catch (error) {
      console.error('Error submitting lyrics:', error);
      alert('There was an error submitting your lyrics. Please try again.');
    } finally {
      setIsSubmitting(false);
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
      className="p-6 max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiMusic} className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">
          Submit Lyrics
        </h1>
        <p className="text-peace-600 dark:text-peace-300 font-body">
          Share hymns and songs with our community. {!isAdminOrEditor && 'All submissions will be reviewed before publishing.'}
        </p>
      </motion.div>

      {/* Notice - Only for non-admin users */}
      {!isAdminOrEditor && (
        <motion.div
          variants={itemVariants}
          className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-xl p-4"
        >
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="text-blue-800 dark:text-blue-200 font-medium font-body mb-1">
                Review Process
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm font-body">
                All submitted lyrics will be reviewed by our administrators to ensure accuracy and quality. You'll be notified once your submission has been approved and published.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-peace-800 rounded-2xl p-8 shadow-lg border border-peace-200 dark:border-peace-700 space-y-8"
      >
        {/* Submitter Information Section - Only for non-admin users */}
        {!isAdminOrEditor && (
          <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-4 flex items-center space-x-2">
              <SafeIcon icon={FiUser} className="w-5 h-5" />
              <span>Submitter Information</span>
            </h3>
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

        {/* Translation Section - Enhanced for mobile */}
        <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
          <div className="flex items-center space-x-3 mb-4 p-4 bg-peace-50 dark:bg-peace-700 rounded-xl">
            <input
              type="checkbox"
              id="isTranslation"
              name="isTranslation"
              checked={formData.isTranslation}
              onChange={handleInputChange}
              className="rounded border-peace-300 text-primary-600 focus:ring-primary-500 w-5 h-5"
            />
            <label htmlFor="isTranslation" className="text-base md:text-lg font-medium text-peace-700 dark:text-peace-300 font-body flex items-center space-x-2">
              <SafeIcon icon={FiGlobe} className="w-5 h-5" />
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

        {/* Song Information Section */}
        <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
          <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-4 flex items-center space-x-2">
            <SafeIcon icon={FiMusic} className="w-5 h-5" />
            <span>Song Information</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
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
        </div>

        {/* Lyrics Section */}
        <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white flex items-center space-x-2">
              <SafeIcon icon={FiMusic} className="w-5 h-5" />
              <span>Lyrics Content</span>
            </h3>
            {/* Chords Toggle */}
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
          <div>
            <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
              {formData.hasChords ? 'Lyrics with Chords *' : 'Lyrics Only *'}
            </label>
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
            <p className="text-xs text-peace-500 dark:text-peace-400 mt-1 font-body">
              {formData.hasChords ? 'Use [Chord] notation for chords. Separate sections with [Verse 1], [Chorus], [Bridge], etc.' : 'Just enter the lyrics. Separate sections with [Verse 1], [Chorus], [Bridge], etc.'}
            </p>
          </div>
        </div>

        {/* Security Section - Only for non-admin users */}
        {!isAdminOrEditor && (
          <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-4 flex items-center space-x-2">
              <SafeIcon icon={FiShield} className="w-5 h-5" />
              <span>Security Verification</span>
            </h3>
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

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
            Additional Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
            placeholder="Any additional information about the song, special instructions, or context..."
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/library')}
            className="flex-1 px-6 py-3 text-peace-600 dark:text-peace-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors font-body flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiX} className="w-5 h-5" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            disabled={isSubmitting || (!isAdminOrEditor && !formData.captchaVerified)}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl hover:from-slate-600 hover:to-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-body flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiSave} className="w-5 h-5" />
            <span>
              {isSubmitting ? 'Submitting...' : (isAdminOrEditor ? 'Add & Publish' : 'Submit for Review')}
            </span>
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default SubmitLyrics;