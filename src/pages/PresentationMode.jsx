import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import { useSongs } from '../contexts/SongContext';
import { useSetlists } from '../contexts/SetlistContext';
import * as FiIcons from 'react-icons/fi';

const {
  FiX,
  FiPlay,
  FiPause,
  FiSkipForward,
  FiSkipBack,
  FiSettings,
  FiMonitor,
  FiMaximize,
  FiMinimize,
  FiMic,
  FiMusic,
  FiClock,
  FiKey
} = FiIcons;

const PresentationMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSongById } = useSongs();
  const { getSetlistById } = useSetlists();

  const [setlist, setSetlist] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(3000); // 3 seconds per line
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(48);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [showChords, setShowChords] = useState(true);
  const [presentationMode, setPresentationMode] = useState('teleprompter'); // 'teleprompter' or 'section'

  useEffect(() => {
    const foundSetlist = getSetlistById(id);
    if (foundSetlist) {
      setSetlist(foundSetlist);
    } else {
      navigate('/setlists');
    }
  }, [id, getSetlistById, navigate]);

  useEffect(() => {
    let interval;
    if (isAutoScroll && presentationMode === 'teleprompter') {
      interval = setInterval(() => {
        nextLine();
      }, autoScrollSpeed);
    }
    return () => clearInterval(interval);
  }, [isAutoScroll, autoScrollSpeed, presentationMode]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          if (presentationMode === 'teleprompter') {
            nextLine();
          } else {
            nextSection();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (presentationMode === 'teleprompter') {
            previousLine();
          } else {
            previousSection();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          previousSong();
          break;
        case 'ArrowDown':
          e.preventDefault();
          nextSong();
          break;
        case 'Escape':
          exitPresentation();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'p':
        case 'P':
          setIsAutoScroll(!isAutoScroll);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentSongIndex, currentSection, currentLine, isAutoScroll, presentationMode]);

  const getCurrentSong = () => {
    if (!setlist?.items?.[currentSongIndex]) return null;
    const item = setlist.items[currentSongIndex];
    const song = getSongById(item.songId);
    return { song, item };
  };

  const parseLyrics = (lyrics) => {
    const sections = [];
    const lines = lyrics.split('\n');
    let currentSection = { name: '', lines: [] };

    lines.forEach(line => {
      if (line.startsWith('[') && line.endsWith(']')) {
        if (currentSection.lines.length > 0) {
          sections.push(currentSection);
        }
        currentSection = {
          name: line.slice(1, -1),
          lines: []
        };
      } else if (line.trim()) {
        currentSection.lines.push(line);
      }
    });

    if (currentSection.lines.length > 0) {
      sections.push(currentSection);
    }

    return sections;
  };

  const extractChordsFromLine = (line) => {
    const chordRegex = /\[([^\]]+)\]/g;
    const chords = [];
    const lyrics = line.replace(chordRegex, (match, chord, offset) => {
      chords.push({ chord, position: offset });
      return '';
    });

    return { chords, lyrics: lyrics.trim() };
  };

  const formatLineForPresentation = (line) => {
    if (!showChords) {
      // Just return the lyrics without chords
      const chordRegex = /\[([^\]]+)\]/g;
      return {
        chords: [],
        lyrics: line.replace(chordRegex, '').trim()
      };
    }

    const chordRegex = /\[([^\]]+)\]/g;
    const chords = [];
    const chordPositions = [];
    let lyricsOnly = '';
    let lastIndex = 0;
    let match;

    // Extract chords and their positions
    while ((match = chordRegex.exec(line)) !== null) {
      // Add text before chord
      if (match.index > lastIndex) {
        lyricsOnly += line.slice(lastIndex, match.index);
      }
      
      // Store chord and its position in the lyrics
      chords.push(match[1]);
      chordPositions.push(lyricsOnly.length);
      
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < line.length) {
      lyricsOnly += line.slice(lastIndex);
    }

    // Create chord line with proper spacing
    let chordLine = '';
    let chordIndex = 0;
    
    for (let i = 0; i < lyricsOnly.length; i++) {
      if (chordIndex < chordPositions.length && i === chordPositions[chordIndex]) {
        chordLine += chords[chordIndex];
        chordIndex++;
        // Add spaces to match the chord length if needed
        const chordLength = chords[chordIndex - 1].length;
        for (let j = 1; j < chordLength && i + j < lyricsOnly.length; j++) {
          i++;
          chordLine += ' ';
        }
      } else {
        chordLine += ' ';
      }
    }

    // Add any remaining chords at the end
    while (chordIndex < chords.length) {
      chordLine += ' ' + chords[chordIndex];
      chordIndex++;
    }

    return {
      chords: chordLine.trim() || null,
      lyrics: lyricsOnly.trim()
    };
  };

  const nextLine = () => {
    const { song } = getCurrentSong();
    if (!song) return;

    const sections = parseLyrics(song.lyrics);
    if (sections.length === 0) return;

    const currentSectionData = sections[currentSection];
    if (!currentSectionData) return;

    if (currentLine < currentSectionData.lines.length - 1) {
      setCurrentLine(currentLine + 1);
    } else {
      nextSection();
    }
  };

  const previousLine = () => {
    if (currentLine > 0) {
      setCurrentLine(currentLine - 1);
    } else {
      previousSection();
    }
  };

  const nextSection = () => {
    const { song } = getCurrentSong();
    if (!song) return;

    const sections = parseLyrics(song.lyrics);
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentLine(0);
    } else {
      nextSong();
    }
  };

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentLine(0);
    } else {
      previousSong();
    }
  };

  const nextSong = () => {
    if (currentSongIndex < setlist.items.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setCurrentSection(0);
      setCurrentLine(0);
    }
  };

  const previousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setCurrentSection(0);
      setCurrentLine(0);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const exitPresentation = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    navigate(`/setlist/${id}`);
  };

  if (!setlist) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading presentation...</p>
        </div>
      </div>
    );
  }

  const { song, item } = getCurrentSong();
  if (!song) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <p>No songs in setlist</p>
          <button onClick={exitPresentation} className="mt-4 px-4 py-2 bg-white text-black rounded">
            Exit
          </button>
        </div>
      </div>
    );
  }

  const sections = parseLyrics(song.lyrics);
  const currentSectionData = sections[currentSection];

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* Main Content Area */}
      <div 
        className="flex flex-col h-full"
        onClick={() => presentationMode === 'teleprompter' ? nextLine() : nextSection()}
      >
        {/* Header Info Bar */}
        {showControls && (
          <div className="bg-black/80 backdrop-blur-sm p-4 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <h1 className="text-xl font-display font-bold">{song.title}</h1>
                <span className="text-white/70">{song.artist}</span>
                <div className="flex items-center space-x-4 text-sm text-white/70">
                  <span>Key: {item.key}</span>
                  <span>Song {currentSongIndex + 1} of {setlist.items.length}</span>
                  {presentationMode === 'teleprompter' && currentSectionData && (
                    <span>
                      {currentSectionData.name} - Line {currentLine + 1} of {currentSectionData.lines.length}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsAutoScroll(!isAutoScroll); }}
                  className={`p-2 rounded-lg transition-colors ${
                    isAutoScroll ? 'bg-green-600 text-white' : 'bg-white/20 text-white/70 hover:bg-white/30'
                  }`}
                >
                  <SafeIcon icon={isAutoScroll ? FiPause : FiPlay} className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }}
                  className="p-2 rounded-lg bg-white/20 text-white/70 hover:bg-white/30 transition-colors"
                >
                  <SafeIcon icon={FiSettings} className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                  className="p-2 rounded-lg bg-white/20 text-white/70 hover:bg-white/30 transition-colors"
                >
                  <SafeIcon icon={isFullscreen ? FiMinimize : FiMaximize} className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); exitPresentation(); }}
                  className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  <SafeIcon icon={FiX} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lyrics Display Area */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          {presentationMode === 'teleprompter' ? (
            // Teleprompter Mode - Line by Line
            <div className="text-center max-w-6xl w-full">
              {currentSectionData && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentSection}-${currentLine}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Section Name */}
                    <div className="text-lg text-white/60 font-medium mb-8">
                      {currentSectionData.name}
                    </div>

                    {/* Current Line */}
                    <div className="font-hymn leading-relaxed">
                      {currentSectionData.lines[currentLine] && (() => {
                        const formattedLine = formatLineForPresentation(currentSectionData.lines[currentLine]);
                        return (
                          <div className="flex flex-col items-center space-y-2">
                            {/* Chord Line */}
                            {showChords && formattedLine.chords && (
                              <div 
                                className="text-blue-400 font-chord font-medium tracking-wider"
                                style={{ 
                                  fontSize: `${Math.max(fontSize * 0.7, 24)}px`,
                                  fontFamily: 'Roboto Mono, monospace'
                                }}
                              >
                                {formattedLine.chords}
                              </div>
                            )}
                            {/* Lyrics Line */}
                            <div 
                              className="text-white"
                              style={{ 
                                fontSize: `${fontSize}px`, 
                                lineHeight: lineHeight 
                              }}
                            >
                              {formattedLine.lyrics}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Progress Indicator */}
                    <div className="flex justify-center mt-8">
                      <div className="flex space-x-2">
                        {currentSectionData.lines.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentLine ? 'bg-white' : 'bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          ) : (
            // Section Mode - Full Section Display
            <div className="text-center max-w-6xl w-full">
              {currentSectionData && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSection}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Section Name */}
                    <div className="text-xl text-white/60 font-medium mb-8">
                      {currentSectionData.name}
                    </div>

                    {/* All Lines in Section */}
                    <div className="space-y-6">
                      {currentSectionData.lines.map((line, lineIndex) => {
                        const formattedLine = formatLineForPresentation(line);
                        return (
                          <div
                            key={lineIndex}
                            className="font-hymn flex flex-col items-center space-y-2"
                          >
                            {/* Chord Line */}
                            {showChords && formattedLine.chords && (
                              <div 
                                className="text-blue-400 font-chord font-medium tracking-wider"
                                style={{ 
                                  fontSize: `${Math.max(fontSize * 0.7, 24)}px`,
                                  fontFamily: 'Roboto Mono, monospace'
                                }}
                              >
                                {formattedLine.chords}
                              </div>
                            )}
                            {/* Lyrics Line */}
                            <div 
                              className="text-white"
                              style={{ 
                                fontSize: `${fontSize}px`, 
                                lineHeight: lineHeight 
                              }}
                            >
                              {formattedLine.lyrics}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          )}
        </div>

        {/* Song Info Panel */}
        {(item.notes || item.intro || item.transition) && (
          <div className="bg-black/80 backdrop-blur-sm p-4 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/70">
              {item.intro && (
                <div>
                  <span className="text-white font-medium">Intro: </span>
                  {item.intro}
                </div>
              )}
              {item.transition && (
                <div>
                  <span className="text-white font-medium">Transition: </span>
                  {item.transition}
                </div>
              )}
              {item.notes && (
                <div>
                  <span className="text-white font-medium">Notes: </span>
                  {item.notes}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 bg-black/90 backdrop-blur-sm rounded-xl p-6 border border-white/20 min-w-80">
          <h3 className="text-lg font-bold mb-4">Presentation Settings</h3>
          
          <div className="space-y-4">
            {/* Mode Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Mode</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPresentationMode('teleprompter')}
                  className={`px-3 py-2 rounded text-sm ${
                    presentationMode === 'teleprompter' ? 'bg-blue-600' : 'bg-white/20'
                  }`}
                >
                  Teleprompter
                </button>
                <button
                  onClick={() => setPresentationMode('section')}
                  className={`px-3 py-2 rounded text-sm ${
                    presentationMode === 'section' ? 'bg-blue-600' : 'bg-white/20'
                  }`}
                >
                  Section
                </button>
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium mb-2">Font Size: {fontSize}px</label>
              <input
                type="range"
                min="24"
                max="96"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Auto Scroll Speed */}
            {presentationMode === 'teleprompter' && (
              <div>
                <label className="block text-sm font-medium mb-2">Auto Scroll Speed: {autoScrollSpeed}ms</label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={autoScrollSpeed}
                  onChange={(e) => setAutoScrollSpeed(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            {/* Show Chords */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showChords"
                checked={showChords}
                onChange={(e) => setShowChords(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="showChords" className="text-sm">Show Chords</label>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20">
            <h4 className="font-medium mb-2">Controls:</h4>
            <div className="text-sm text-white/70 space-y-1">
              <div>Space/Right Arrow: Next {presentationMode === 'teleprompter' ? 'Line' : 'Section'}</div>
              <div>Left Arrow: Previous {presentationMode === 'teleprompter' ? 'Line' : 'Section'}</div>
              <div>Up/Down Arrow: Previous/Next Song</div>
              <div>P: Toggle Auto-scroll</div>
              <div>F: Toggle Fullscreen</div>
              <div>Escape: Exit Presentation</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PresentationMode;