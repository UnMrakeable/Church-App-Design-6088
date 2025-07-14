import React, { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReactToPrint } from 'react-to-print';
import SafeIcon from '../components/common/SafeIcon';
import PrintableHymn from '../components/common/PrintableHymn';
import VideoEmbed from '../components/common/VideoEmbed';
import FileUpload from '../components/common/FileUpload';
import { useSongs } from '../contexts/SongContext';
import { useUsers } from '../contexts/UserContext';
import * as FiIcons from 'react-icons/fi';

const {
  FiArrowLeft,
  FiEdit,
  FiShare2,
  FiHeart,
  FiPlus,
  FiMinus,
  FiMaximize2,
  FiMinimize2,
  FiPrinter,
  FiInfo,
  FiVideo,
  FiGlobe,
  FiFileText,
  FiDownload,
  FiEye,
  FiChevronDown,
  FiChevronUp,
  FiTrash2
} = FiIcons;

const SongView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSongById, addVideo, addSlide, deleteSong } = useSongs();
  const { currentUser, hasPermission } = useUsers();
  const [fontSize, setFontSize] = useState(16);
  const [showChords, setShowChords] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [showSlideUpload, setShowSlideUpload] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Collapsible sections state
  const [showHymnInfo, setShowHymnInfo] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showSlides, setShowSlides] = useState(false);
  const [showDeleteSection, setShowDeleteSection] = useState(false);

  const printRef = useRef();
  const song = getSongById(id);

  // Check if user can delete hymns (super admin only)
  const canDeleteHymn = hasPermission(currentUser?.id, 'hymns.delete') && currentUser?.roleId === 'super_admin';

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${song?.title} - ${song?.artist || 'Unknown Artist'}`,
    pageStyle: `
      @page { size: letter; margin: 0.75in; }
      @media print { body { -webkit-print-color-adjust: exact; color-adjust: exact; } }
    `,
  });

  const handleVideoAdd = (videoData) => {
    addVideo(id, videoData);
    setShowVideoUpload(false);
  };

  const handleSlideAdd = (slideData) => {
    addSlide(id, slideData);
    setShowSlideUpload(false);
  };

  const handleFavorite = () => {
    alert('Added to favorites! (This would integrate with your favorites system)');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: song.title,
        text: `Check out this hymn: ${song.title} by ${song.artist || 'Unknown Artist'}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleEdit = () => {
    alert('Edit functionality would open the edit form for this hymn');
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    deleteSong(id);
    alert('Hymn has been permanently deleted.');
    navigate('/library');
    setShowDeleteConfirm(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  if (!song) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-display font-bold text-peace-900 dark:text-white">Hymn not found</h1>
        <button onClick={() => navigate('/library')} className="mt-4 text-primary-600 hover:text-primary-700 font-body">
          Back to Library
        </button>
      </div>
    );
  }

  const chordRegex = /\[([^\]]+)\]/g;

  const formatLyrics = (lyrics) => {
    return lyrics.split('\n').map((line, lineIndex) => {
      if (line.startsWith('[') && line.endsWith(']')) {
        const sectionName = line.slice(1, -1);
        return (
          <div key={lineIndex} className="hymn-section">
            <div className="section-header mb-4">
              <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-medium font-body">
                {sectionName}
              </span>
            </div>
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={lineIndex} className="hymn-line h-6"></div>;
      }

      const chordMatches = [...line.matchAll(chordRegex)];
      if (chordMatches.length === 0) {
        return (
          <div key={lineIndex} className="hymn-line mb-3">
            {showChords && <div className="chord-line h-6">&nbsp;</div>}
            <div className="lyrics-line font-hymn text-peace-900 dark:text-white leading-relaxed">
              {line}
            </div>
          </div>
        );
      }

      const chords = [];
      const lyrics = [];
      let lastIndex = 0;

      chordMatches.forEach((match, index) => {
        const chordPosition = match.index;
        const chord = match[1];

        if (chordPosition > lastIndex) {
          const textBefore = line.slice(lastIndex, chordPosition);
          lyrics.push(textBefore);
          chords.push('');
        }

        const nextChordIndex = chordMatches[index + 1]?.index || line.length;
        const textAfter = line.slice(chordPosition + match[0].length, nextChordIndex);
        chords.push(chord);
        lyrics.push(textAfter);
        lastIndex = nextChordIndex;
      });

      const formattedChords = chords.map((chord, i) => (
        <span key={i} className="chord-position inline-block min-w-[1ch]">
          <span className="text-blue-600 dark:text-blue-400 font-chord font-medium">
            {chord}
          </span>
          &nbsp;</span>
      ));

      const formattedLyrics = lyrics.map((text, i) => (
        <span key={i} className="chord-position inline-block min-w-[1ch]">
          {text}
        </span>
      ));

      return (
        <div key={lineIndex} className="hymn-line mb-3">
          {showChords && (
            <div className="chord-line h-6 leading-6">
              {formattedChords}
            </div>
          )}
          <div className="lyrics-line font-hymn text-peace-900 dark:text-white leading-relaxed">
            {formattedLyrics}
          </div>
        </div>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-peace-900 flex flex-col' : ''} p-4 md:p-6 space-y-4`}
    >
      {/* Header - Mobile Responsive */}
      <div className="space-y-4 md:space-y-0 no-print">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/library')}
              className="p-2 rounded-xl hover:bg-peace-100 dark:hover:bg-peace-700 transition-colors"
            >
              <SafeIcon icon={FiArrowLeft} className="w-5 h-5 text-peace-600 dark:text-peace-300" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-display font-bold text-peace-900 dark:text-white">
                {song.title}
              </h1>
              <div className="flex flex-col text-peace-600 dark:text-peace-300 font-body text-base">
                <span>{song.artist || 'Unknown Artist'}</span>
              </div>
              {/* Translations */}
              {song.translations && song.translations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {song.translations.map((translation, index) => (
                    <React.Fragment key={index}>
                      <Link
                        to={`/song/${translation.id}`}
                        className="inline-flex items-center space-x-1 text-base text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        <SafeIcon icon={FiGlobe} className="w-3 h-3" />
                        <span>{translation.language}: {translation.title}</span>
                      </Link>
                      {/* Mobile divider - only show on mobile between translations */}
                      {index < song.translations.length - 1 && (
                        <span className="text-peace-300 dark:text-peace-600 text-sm md:hidden">|</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controls - Different layout for mobile vs desktop */}
      <div className="bg-white dark:bg-peace-800 rounded-2xl p-3 shadow-lg border border-peace-200 dark:border-peace-700 no-print">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-2">
          {/* Left side - Font and Chords controls */}
          <div className="flex items-center gap-4">
            {/* Font Size */}
            <div className="flex items-center space-x-1">
              <span className="text-base font-medium text-peace-700 dark:text-peace-300 font-body">Font:</span>
              <button
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <SafeIcon icon={FiMinus} className="w-3 h-3 text-slate-600 dark:text-slate-300" />
              </button>
              <span className="w-6 text-center font-medium text-peace-900 dark:text-white font-body text-sm">
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-3 h-3 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {/* Separator */}
            <div className="text-peace-300 dark:text-peace-600 text-lg">|</div>

            {/* Show Chords Toggle - Always show */}
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={showChords}
                onChange={(e) => setShowChords(e.target.checked)}
                className="rounded border-peace-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-base font-medium text-peace-700 dark:text-peace-300 font-body">Chords</span>
            </label>

            {/* Separator */}
            <div className="text-peace-300 dark:text-peace-600 text-lg">|</div>

            {/* Desktop Action Buttons */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPrintPreview(!showPrintPreview)}
                className="flex items-center space-x-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
              >
                <SafeIcon icon={FiPrinter} className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                <span className="font-body">Preview</span>
              </motion.button>
              <span className="text-peace-300 dark:text-peace-600 text-lg">|</span>
              <button
                onClick={handleFavorite}
                className="flex items-center space-x-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
              >
                <SafeIcon icon={FiHeart} className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                <span className="font-body">Favorite</span>
              </button>
              <span className="text-peace-300 dark:text-peace-600 text-lg">|</span>
              <button
                onClick={handleShare}
                className="flex items-center space-x-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
              >
                <SafeIcon icon={FiShare2} className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                <span className="font-body">Share</span>
              </button>
              <span className="text-peace-300 dark:text-peace-600 text-lg">|</span>
              <button
                onClick={handleEdit}
                className="flex items-center space-x-1 px-3 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm"
              >
                <SafeIcon icon={FiEdit} className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                <span className="font-body">Edit</span>
              </button>
            </div>
          </div>

          {/* Right side - Fullscreen button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <SafeIcon icon={isFullscreen ? FiMinimize2 : FiMaximize2} className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Mobile Action Buttons Row - Icons Only */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPrintPreview(!showPrintPreview)}
              className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <SafeIcon icon={FiPrinter} className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </motion.button>
            
            <span className="text-peace-300 dark:text-peace-600 text-lg">|</span>
            
            <button
              onClick={handleFavorite}
              className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <SafeIcon icon={FiHeart} className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            
            <span className="text-peace-300 dark:text-peace-600 text-lg">|</span>
            
            <button
              onClick={handleShare}
              className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <SafeIcon icon={FiShare2} className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            
            <span className="text-peace-300 dark:text-peace-600 text-lg">|</span>
            
            <button
              onClick={handleEdit}
              className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <SafeIcon icon={FiEdit} className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          {/* Mobile Controls Row */}
          <div className="flex items-center justify-between">
            {/* Font Control */}
            <div className="flex items-center space-x-1">
              <span className="text-base font-medium text-peace-700 dark:text-peace-300 font-body">Font</span>
              <button
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <SafeIcon icon={FiMinus} className="w-3 h-3 text-slate-600 dark:text-slate-300" />
              </button>
              <span className="w-6 text-center font-medium text-peace-900 dark:text-white font-body text-sm">
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-3 h-3 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {/* Separator */}
            <div className="text-peace-300 dark:text-peace-600 text-lg">|</div>

            {/* Chords Toggle - Always show */}
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                checked={showChords}
                onChange={(e) => setShowChords(e.target.checked)}
                className="rounded border-peace-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-base font-medium text-peace-700 dark:text-peace-300 font-body">Chords</span>
            </label>

            {/* Separator */}
            <div className="text-peace-300 dark:text-peace-600 text-lg">|</div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center space-x-1"
            >
              <SafeIcon icon={isFullscreen ? FiMinimize2 : FiMaximize2} className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="text-base font-medium text-peace-700 dark:text-peace-300 font-body">
                {isFullscreen ? 'Collapse' : 'Fullscreen'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Song Content */}
      <div className={`bg-white dark:bg-peace-800 rounded-2xl p-6 md:p-8 shadow-lg border border-peace-200 dark:border-peace-700 ${isFullscreen ? 'flex-1 overflow-y-auto' : 'overflow-auto'}`}>
        <div className="text-peace-900 dark:text-white" style={{ fontSize: `${fontSize}px` }}>
          {formatLyrics(song.lyrics)}
        </div>
      </div>

      {/* Only show these sections when not in fullscreen */}
      {!isFullscreen && (
        <>
          {/* Collapsible Videos Section */}
          <div className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700 overflow-hidden">
            <button
              onClick={() => setShowVideos(!showVideos)}
              className="w-full p-3 flex items-center justify-between hover:bg-peace-50 dark:hover:bg-peace-700 transition-colors"
            >
              <h3 className="text-base font-display font-bold text-peace-900 dark:text-white flex items-center space-x-2">
                <SafeIcon icon={FiVideo} className="w-4 h-4" />
                <span>Videos ({song.videos?.length || 0})</span>
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowVideoUpload(true); }}
                  className="p-1 rounded hover:bg-peace-200 dark:hover:bg-peace-600 transition-colors"
                  title="Add Video"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4 text-peace-600 dark:text-peace-300" />
                </button>
                <SafeIcon icon={showVideos ? FiChevronUp : FiChevronDown} className="w-4 h-4 text-peace-500 dark:text-peace-400" />
              </div>
            </button>
            {showVideos && (
              <div className="p-3 pt-0">
                {song.videos && song.videos.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {song.videos.map((video, index) => (
                      <VideoEmbed key={index} video={video} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-peace-500 dark:text-peace-400">
                    <SafeIcon icon={FiVideo} className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-body">No videos uploaded yet</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Collapsible Resources Section */}
          <div className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700 overflow-hidden">
            <button
              onClick={() => setShowSlides(!showSlides)}
              className="w-full p-3 flex items-center justify-between hover:bg-peace-50 dark:hover:bg-peace-700 transition-colors"
            >
              <h3 className="text-base font-display font-bold text-peace-900 dark:text-white flex items-center space-x-2">
                <SafeIcon icon={FiFileText} className="w-4 h-4" />
                <span>Resources ({song.slides?.length || 0})</span>
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowSlideUpload(true); }}
                  className="p-1 rounded hover:bg-peace-200 dark:hover:bg-peace-600 transition-colors"
                  title="Upload Resources"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4 text-peace-600 dark:text-peace-300" />
                </button>
                <SafeIcon icon={showSlides ? FiChevronUp : FiChevronDown} className="w-4 h-4 text-peace-500 dark:text-peace-400" />
              </div>
            </button>
            {showSlides && (
              <div className="p-3 pt-0">
                {song.slides && song.slides.length > 0 ? (
                  <div className="space-y-3">
                    {song.slides.map((slide, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-xl gap-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <SafeIcon icon={FiFileText} className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-peace-900 dark:text-white font-body">{slide.title}</h4>
                            <p className="text-sm text-peace-600 dark:text-peace-300 font-body">
                              Uploaded on {new Date(slide.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 md:gap-2">
                          <button
                            onClick={() => { alert('PDF/PowerPoint viewer would open here. In a real application, this would integrate with a document viewer like PDF.js or Office Online.'); }}
                            className="w-full md:w-auto px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-body text-sm flex items-center justify-center space-x-1"
                          >
                            <SafeIcon icon={FiEye} className="w-4 h-4" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => { alert('File download would start here. In a real application, this would trigger the actual file download.'); }}
                            className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-body text-sm flex items-center justify-center space-x-1"
                          >
                            <SafeIcon icon={FiDownload} className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-peace-500 dark:text-peace-400">
                    <SafeIcon icon={FiFileText} className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-body">No resources uploaded yet</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Collapsible Song Info Section */}
          <div className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700 overflow-hidden no-print">
            <button
              onClick={() => setShowHymnInfo(!showHymnInfo)}
              className="w-full p-3 flex items-center justify-between hover:bg-peace-50 dark:hover:bg-peace-700 transition-colors"
            >
              <h3 className="text-base font-display font-bold text-peace-900 dark:text-white flex items-center space-x-2">
                <SafeIcon icon={FiInfo} className="w-4 h-4" />
                <span>Hymn Info</span>
              </h3>
              <SafeIcon icon={showHymnInfo ? FiChevronUp : FiChevronDown} className="w-4 h-4 text-peace-500 dark:text-peace-400" />
            </button>
            {showHymnInfo && (
              <div className="p-3 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-peace-600 dark:text-peace-300 font-body">Language:</span>
                    <p className="font-medium text-peace-900 dark:text-white font-body">{song.language}</p>
                  </div>
                  <div>
                    <span className="text-peace-600 dark:text-peace-300 font-body">Category:</span>
                    <p className="font-medium text-peace-900 dark:text-white font-body">{song.category}</p>
                  </div>
                  <div>
                    <span className="text-peace-600 dark:text-peace-300 font-body">Has Chords:</span>
                    <p className="font-medium text-peace-900 dark:text-white font-body">{song.hasChords ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <span className="text-peace-600 dark:text-peace-300 font-body">Translations:</span>
                    <p className="font-medium text-peace-900 dark:text-white font-body">
                      {song.translations?.length || 0} available
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-peace-600 dark:text-peace-300 font-body">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {song.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm font-body"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Delete Hymn Section - Only for super admins, styled like other sections */}
          {canDeleteHymn && (
            <div className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700 overflow-hidden no-print">
              <button
                onClick={() => setShowDeleteSection(!showDeleteSection)}
                className="w-full p-3 flex items-center justify-between hover:bg-peace-50 dark:hover:bg-peace-700 transition-colors"
              >
                <h3 className="text-base font-display font-bold text-peace-900 dark:text-white flex items-center space-x-2">
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  <span>Delete Hymn</span>
                </h3>
                <SafeIcon icon={showDeleteSection ? FiChevronUp : FiChevronDown} className="w-4 h-4 text-peace-500 dark:text-peace-400" />
              </button>
              {showDeleteSection && (
                <div className="p-3 pt-0">
                  <div className="text-sm text-peace-600 dark:text-peace-300 font-body mb-4">
                    <p className="mb-2">
                      Permanently remove this hymn from the library. This action cannot be undone.
                    </p>
                    <p className="text-xs text-peace-500 dark:text-peace-400">
                      This will delete all associated data including lyrics, media files, translations, and user collections.
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteClick}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-body text-sm flex items-center space-x-2"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    <span>Delete This Hymn</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 no-print">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 w-full max-w-md"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiTrash2} className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-2">
                Delete Hymn?
              </h3>
              <p className="text-peace-600 dark:text-peace-300 font-body mb-6">
                Did you accidentally click the delete button? This will permanently remove <strong>"{song.title}"</strong> and all its associated data from the library.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 px-4 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body"
              >
                Cancel (Accident)
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-body"
              >
                Yes, Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Print Preview Modal */}
      {showPrintPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 no-print">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-display font-bold text-peace-900">Print Preview</h3>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-body"
                >
                  Print
                </button>
                <button
                  onClick={() => setShowPrintPreview(false)}
                  className="px-4 py-2 text-peace-600 hover:bg-peace-100 rounded-lg transition-colors font-body"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="border border-peace-200 rounded-lg overflow-hidden">
              <PrintableHymn song={song} showChords={showChords} fontSize={12} />
            </div>
          </motion.div>
        </div>
      )}

      {/* Video Upload Modal */}
      {showVideoUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 no-print">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-4">Add Video</h3>
            <FileUpload
              type="video"
              onUpload={handleVideoAdd}
              onCancel={() => setShowVideoUpload(false)}
            />
          </motion.div>
        </div>
      )}

      {/* Slide Upload Modal */}
      {showSlideUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 no-print">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-4">Upload Resources</h3>
            <FileUpload
              type="slide"
              onUpload={handleSlideAdd}
              onCancel={() => setShowSlideUpload(false)}
            />
          </motion.div>
        </div>
      )}

      {/* Hidden Print Component */}
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <PrintableHymn song={song} showChords={showChords} fontSize={12} />
        </div>
      </div>
    </motion.div>
  );
};

export default SongView;