import React, { createContext, useContext, useState, useEffect } from 'react';

const SongContext = createContext();

export const useSongs = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error('useSongs must be used within a SongProvider');
  }
  return context;
};

// Sample hymn data with translations and media
const sampleSongs = [
  {
    id: '1',
    title: 'Amazing Grace',
    artist: 'John Newton',
    tags: ['Classic', 'Worship', 'Hymn', 'Traditional', 'Grace'],
    category: 'English',
    language: 'English',
    status: 'published',
    submittedBy: 'admin',
    submitterName: 'Admin User',
    submitterEmail: 'admin@withhymn.com',
    submitterCenter: 'Main Office',
    hasChords: true,
    translations: [
      { language: 'Spanish', title: 'Sublime Gracia', id: '1-es' },
      { language: 'French', title: 'Grâce Étonnante', id: '1-fr' }
    ],
    videos: [
      {
        title: 'Traditional Version',
        url: 'https://www.youtube.com/embed/CDdvReNKKuk',
        type: 'youtube'
      },
      {
        title: 'Modern Arrangement',
        url: 'https://www.youtube.com/embed/Jbe7OruLk8I',
        type: 'youtube'
      }
    ],
    slides: [
      {
        title: 'Main Presentation',
        url: '/slides/amazing-grace-main.pptx',
        uploadedAt: '2024-01-15'
      }
    ],
    lyrics: `[Verse 1]
[G]Amazing [G/B]grace how [C]sweet the [G]sound
That [G]saved a [Em]wretch like [D]me
I [G]once was [G/B]lost but [C]now I'm [G]found
Was [Em]blind but [D]now I [G]see

[Verse 2]
'Twas [G]grace that [G/B]taught my [C]heart to [G]fear
And [G]grace my [Em]fears re-[D]lieved
How [G]precious [G/B]did that [C]grace ap-[G]pear
The [Em]hour I [D]first be-[G]lieved

[Verse 3]
Through [G]many [G/B]dangers, [C]toils and [G]snares
I [G]have al-[Em]ready [D]come
'Tis [G]grace hath [G/B]brought me [C]safe thus [G]far
And [Em]grace will [D]lead me [G]home`,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'How Great Is Our God',
    artist: 'Chris Tomlin',
    tags: ['Contemporary', 'Praise', 'Popular', 'Worship', 'Modern'],
    category: 'English',
    language: 'English',
    status: 'published',
    submittedBy: 'admin',
    submitterName: 'Admin User',
    submitterEmail: 'admin@withhymn.com',
    submitterCenter: 'Main Office',
    hasChords: true,
    translations: [
      { language: 'Spanish', title: 'Cuán Grande Es Nuestro Dios', id: '2-es' }
    ],
    videos: [
      {
        title: 'Live Performance',
        url: 'https://www.youtube.com/embed/KBD18rsVJHk',
        type: 'youtube'
      }
    ],
    slides: [],
    lyrics: `[Verse 1]
The [C]splendor of the [G]King
Clothed in [Am]majesty
Let all the [F]earth rejoice
All the [C]earth rejoice
He [C]wraps Himself in [G]light
And darkness [Am]tries to hide
And trembles [F]at His voice
Trembles [C]at His voice

[Chorus]
How [C]great is our God
Sing with me
How [Am]great is our God
And all will see how [F]great
How [G]great is our [C]God

[Verse 2]
Age to [C]age He [G]stands
And time is [Am]in His hands
Beginning [F]and the end
Beginning [C]and the end
The [C]Godhead three in [G]one
Father [Am]Spirit Son
The Lion [F]and the Lamb
The Lion [C]and the Lamb`,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Holy Spirit',
    artist: 'Kari Jobe',
    tags: ['Contemporary', 'Worship', 'Spirit', 'Intimate', 'Modern'],
    category: 'English',
    language: 'English',
    status: 'pending',
    submittedBy: 'user123',
    submitterName: 'John Worship',
    submitterEmail: 'john@church.com',
    submitterCenter: 'Grace Community Church',
    hasChords: true,
    translations: [],
    videos: [
      {
        title: 'Official Video',
        url: 'https://www.youtube.com/embed/7Bt_1eUsZBY',
        type: 'youtube'
      }
    ],
    slides: [
      {
        title: 'Worship Slides',
        url: '/slides/holy-spirit-worship.pptx',
        uploadedAt: '2024-01-25'
      }
    ],
    lyrics: `[Verse 1]
There's [D]nothing worth more
That will [A]ever come close
No [Bm]thing can compare
You're our [G]living hope
Your [D]presence Lord

[Verse 2]
I've [D]tasted and seen
Of the [A]sweetest of loves
Where my [Bm]heart becomes free
And my [G]shame is undone
Your [D]presence Lord

[Chorus]
[D]Holy Spirit You are [A]welcome here
Come [Bm]flood this place and [G]fill the atmosphere
Your [D]glory God is [A]what our hearts long [Bm]for
To be over[G]come by Your [D]presence Lord

[Bridge]
Let us become [D]more aware of Your presence
Let us experience [A]the glory of Your goodness
Let us become [Bm]more aware of Your presence
Let us experience [G]the glory of Your goodness`,
    createdAt: '2024-01-25'
  }
];

// Expanded Bible verses for 5-minute rotation
const bibleVerses = [
  {
    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    reference: "Jeremiah 29:11"
  },
  {
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6"
  },
  {
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28"
  },
  {
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9"
  },
  {
    verse: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
    reference: "Zephaniah 3:17"
  },
  {
    verse: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reference: "Matthew 11:28"
  },
  {
    verse: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reference: "Isaiah 40:31"
  },
  {
    verse: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
    reference: "Psalm 23:1-3"
  },
  {
    verse: "Cast all your anxiety on him because he cares for you.",
    reference: "1 Peter 5:7"
  },
  {
    verse: "I can do all this through him who gives me strength.",
    reference: "Philippians 4:13"
  },
  {
    verse: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand.",
    reference: "Isaiah 41:10"
  },
  {
    verse: "The Lord will fight for you; you need only to be still.",
    reference: "Exodus 14:14"
  },
  {
    verse: "Delight yourself in the Lord, and he will give you the desires of your heart.",
    reference: "Psalm 37:4"
  },
  {
    verse: "In their hearts humans plan their course, but the Lord establishes their steps.",
    reference: "Proverbs 16:9"
  },
  {
    verse: "The name of the Lord is a fortified tower; the righteous run to it and are safe.",
    reference: "Proverbs 18:10"
  },
  {
    verse: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    reference: "Matthew 6:33"
  },
  {
    verse: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    reference: "2 Corinthians 5:17"
  },
  {
    verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16"
  },
  {
    verse: "The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness; he will quiet you by his love; he will exult over you with loud singing.",
    reference: "Zephaniah 3:17"
  },
  {
    verse: "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you.",
    reference: "Isaiah 43:2"
  }
];

export const SongProvider = ({ children }) => {
  const [songs, setSongs] = useState(sampleSongs);
  const [playlists, setPlaylists] = useState([
    {
      id: '1',
      name: 'Sunday Morning Service',
      songs: ['1', '2'],
      createdAt: '2024-01-15',
      description: 'Main worship set for Sunday service'
    },
    {
      id: '2',
      name: 'Prayer Night',
      songs: ['3', '1'],
      createdAt: '2024-01-20',
      description: 'Intimate worship for prayer meeting'
    }
  ]);
  const [currentSong, setCurrentSong] = useState(null);
  const [transposeValue, setTransposeValue] = useState(0);
  const [holidayGreeting, setHolidayGreeting] = useState({
    enabled: true,
    title: "Merry Christmas!",
    message: "May this Christmas season bring you joy, peace, and the warmth of God's love.",
    type: "christmas",
    countdown: true,
    targetDate: "2024-12-25"
  });
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

  // Update Bible verse every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerseIndex(prevIndex => 
        (prevIndex + 1) % bibleVerses.length
      );
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Get current Bible verse
  const getDailyVerse = () => {
    return bibleVerses[currentVerseIndex];
  };

  const addSong = (song) => {
    const newSong = {
      ...song,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      translations: song.translations || [],
      videos: song.videos || [],
      slides: song.slides || [],
      status: 'pending', // All new songs need approval
      submittedBy: 'current_user' // In real app, get from auth
    };
    setSongs(prev => [...prev, newSong]);
  };

  const updateSong = (id, updates) => {
    setSongs(prev => prev.map(song => 
      song.id === id ? { ...song, ...updates } : song
    ));
  };

  const approveSong = (id) => {
    setSongs(prev => prev.map(song => 
      song.id === id ? { ...song, status: 'published' } : song
    ));
  };

  const rejectSong = (id) => {
    setSongs(prev => prev.map(song => 
      song.id === id ? { ...song, status: 'rejected' } : song
    ));
  };

  const deleteSong = (id) => {
    setSongs(prev => prev.filter(song => song.id !== id));
  };

  const addTranslation = (songId, translation) => {
    setSongs(prev => prev.map(song => 
      song.id === songId ? { 
        ...song, 
        translations: [...(song.translations || []), translation] 
      } : song
    ));
  };

  const addVideo = (songId, video) => {
    setSongs(prev => prev.map(song => 
      song.id === songId ? { 
        ...song, 
        videos: [...(song.videos || []), video] 
      } : song
    ));
  };

  const addSlide = (songId, slide) => {
    setSongs(prev => prev.map(song => 
      song.id === songId ? { 
        ...song, 
        slides: [...(song.slides || []), slide] 
      } : song
    ));
  };

  const createPlaylist = (playlist) => {
    const newPlaylist = {
      ...playlist,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      songs: []
    };
    setPlaylists(prev => [...prev, newPlaylist]);
  };

  const updatePlaylist = (id, updates) => {
    setPlaylists(prev => prev.map(playlist => 
      playlist.id === id ? { ...playlist, ...updates } : playlist
    ));
  };

  const deletePlaylist = (id) => {
    setPlaylists(prev => prev.filter(playlist => playlist.id !== id));
  };

  const addSongToPlaylist = (playlistId, songId) => {
    setPlaylists(prev => prev.map(playlist => 
      playlist.id === playlistId ? { 
        ...playlist, 
        songs: [...playlist.songs, songId] 
      } : playlist
    ));
  };

  const removeSongFromPlaylist = (playlistId, songId) => {
    setPlaylists(prev => prev.map(playlist => 
      playlist.id === playlistId ? { 
        ...playlist, 
        songs: playlist.songs.filter(id => id !== songId) 
      } : playlist
    ));
  };

  const updateHolidayGreeting = (greeting) => {
    setHolidayGreeting(greeting);
  };

  const getSongById = (id) => songs.find(song => song.id === id);
  const getPlaylistById = (id) => playlists.find(playlist => playlist.id === id);
  const getPublishedSongs = () => songs.filter(song => song.status === 'published');
  const getPendingSongs = () => songs.filter(song => song.status === 'pending');

  const value = {
    songs,
    playlists,
    currentSong,
    transposeValue,
    holidayGreeting,
    setCurrentSong,
    setTransposeValue,
    addSong,
    updateSong,
    approveSong,
    rejectSong,
    deleteSong,
    addTranslation,
    addVideo,
    addSlide,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    updateHolidayGreeting,
    getSongById,
    getPlaylistById,
    getPublishedSongs,
    getPendingSongs,
    getDailyVerse
  };

  return (
    <SongContext.Provider value={value}>
      {children}
    </SongContext.Provider>
  );
};