import React from 'react';

const PrintableHymn = ({ song, showChords = true, fontSize = 12 }) => {
  const chordRegex = /\[([^\]]+)\]/g;

  const formatLyricsForPrint = (lyrics) => {
    return lyrics.split('\n').map((line, lineIndex) => {
      if (line.startsWith('[') && line.endsWith(']')) {
        // Section headers like [Verse 1], [Chorus], etc.
        const sectionName = line.slice(1, -1);
        return (
          <div key={lineIndex} className="print-section mt-4 mb-2 first:mt-0">
            <strong>{sectionName}</strong>
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={lineIndex} className="print-hymn-line"></div>;
      }

      // Process line with chords
      const chordMatches = [...line.matchAll(chordRegex)];
      
      if (chordMatches.length === 0) {
        // Line without chords
        return (
          <div key={lineIndex} className="print-hymn-line">
            {showChords && <div className="print-chord">&nbsp;</div>}
            <div className="print-lyrics">{line}</div>
          </div>
        );
      }

      // Line with chords
      const chords = [];
      const lyrics = [];
      let lastIndex = 0;

      chordMatches.forEach((match, index) => {
        const chordPosition = match.index;
        const chord = match[1];
        
        // Add text before chord
        if (chordPosition > lastIndex) {
          const textBefore = line.slice(lastIndex, chordPosition);
          lyrics.push(textBefore);
          chords.push('');
        }
        
        // Add chord and following text
        const nextChordIndex = chordMatches[index + 1]?.index || line.length;
        const textAfter = line.slice(chordPosition + match[0].length, nextChordIndex);
        
        chords.push(chord);
        lyrics.push(textAfter);
        
        lastIndex = nextChordIndex;
      });

      // Build the formatted line for print
      const formattedChords = chords.map((chord, i) => (
        <span key={i} style={{ display: 'inline-block', minWidth: '1ch' }}>
          {chord}&nbsp;
        </span>
      ));

      const formattedLyrics = lyrics.map((text, i) => (
        <span key={i} style={{ display: 'inline-block', minWidth: '1ch' }}>
          {text}
        </span>
      ));

      return (
        <div key={lineIndex} className="print-hymn-line">
          {showChords && (
            <div className="print-chord">
              {formattedChords}
            </div>
          )}
          <div className="print-lyrics">
            {formattedLyrics}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="print-page bg-white p-8" style={{ fontSize: `${fontSize}pt` }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="print-title font-hymn text-2xl font-bold mb-2">
          {song.title}
        </h1>
        <p className="print-artist font-hymn text-lg text-peace-700 mb-1">
          {song.artist}
        </p>
        <div className="flex justify-center space-x-6 text-sm text-peace-600 mb-4">
          <span>Key: {song.key}</span>
          <span>Tempo: {song.tempo}</span>
          <span>Duration: {song.duration}</span>
        </div>
        {song.ccli && (
          <p className="text-xs text-peace-500">CCLI: {song.ccli}</p>
        )}
      </div>

      {/* Lyrics */}
      <div className="print-lyrics font-hymn leading-relaxed">
        {formatLyricsForPrint(song.lyrics)}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-peace-200 text-xs text-peace-500">
        <div className="flex justify-between">
          <span>Category: {song.category}</span>
          <span>Printed from HymnNest</span>
        </div>
        {song.tags && song.tags.length > 0 && (
          <div className="mt-2">
            <span>Tags: {song.tags.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintableHymn;