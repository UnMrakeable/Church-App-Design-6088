import React, { createContext, useContext, useState } from 'react';

const SetlistContext = createContext();

export const useSetlists = () => {
  const context = useContext(SetlistContext);
  if (!context) {
    throw new Error('useSetlists must be used within a SetlistProvider');
  }
  return context;
};

// Sample setlist data
const sampleSetlists = [
  {
    id: '1',
    title: 'Sunday Morning Worship',
    description: 'Main worship service',
    date: '2024-02-04',
    service: 'Sunday Morning',
    notes: 'Focus on God\'s faithfulness theme',
    createdAt: '2024-01-28',
    items: [
      {
        songId: '1',
        key: 'G',
        tempo: 'Medium',
        duration: '4:30',
        intro: 'Start with piano only, build with drums on verse 2',
        transition: 'End softly, lead into prayer time',
        notes: 'Emphasize the chorus, repeat 2x at the end'
      },
      {
        songId: '2',
        key: 'C',
        tempo: 'Upbeat',
        duration: '5:15',
        intro: 'Full band entrance, energetic start',
        transition: 'Seamless into next song, same key',
        notes: 'Congregation favorite, encourage participation'
      }
    ]
  },
  {
    id: '2',
    title: 'Prayer Night Worship',
    description: 'Intimate worship for prayer meeting',
    date: '2024-02-07',
    service: 'Wednesday Prayer',
    notes: 'Keep it simple and intimate',
    createdAt: '2024-01-25',
    items: [
      {
        songId: '3',
        key: 'D',
        tempo: 'Slow',
        duration: '6:00',
        intro: 'Acoustic guitar and vocals only',
        transition: 'Leave space for spontaneous worship',
        notes: 'Very intimate, encourage quiet reflection'
      }
    ]
  }
];

export const SetlistProvider = ({ children }) => {
  const [setlists, setSetlists] = useState(sampleSetlists);

  const createSetlist = (setlistData) => {
    const newSetlist = {
      ...setlistData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      items: []
    };
    setSetlists(prev => [...prev, newSetlist]);
    return newSetlist;
  };

  const updateSetlist = (id, updates) => {
    setSetlists(prev => prev.map(setlist => 
      setlist.id === id ? { ...setlist, ...updates } : setlist
    ));
  };

  const deleteSetlist = (id) => {
    setSetlists(prev => prev.filter(setlist => setlist.id !== id));
  };

  const getSetlistById = (id) => {
    return setlists.find(setlist => setlist.id === id);
  };

  const addSongToSetlist = (setlistId, songItem) => {
    setSetlists(prev => prev.map(setlist => 
      setlist.id === setlistId 
        ? { ...setlist, items: [...(setlist.items || []), songItem] }
        : setlist
    ));
  };

  const removeSongFromSetlist = (setlistId, itemIndex) => {
    setSetlists(prev => prev.map(setlist => 
      setlist.id === setlistId 
        ? { 
            ...setlist, 
            items: setlist.items.filter((_, index) => index !== itemIndex)
          }
        : setlist
    ));
  };

  const updateSetlistItem = (setlistId, itemIndex, updates) => {
    setSetlists(prev => prev.map(setlist => 
      setlist.id === setlistId 
        ? {
            ...setlist,
            items: setlist.items.map((item, index) => 
              index === itemIndex ? { ...item, ...updates } : item
            )
          }
        : setlist
    ));
  };

  const reorderSetlistItems = (setlistId, fromIndex, toIndex) => {
    setSetlists(prev => prev.map(setlist => {
      if (setlist.id === setlistId) {
        const newItems = [...setlist.items];
        const [movedItem] = newItems.splice(fromIndex, 1);
        newItems.splice(toIndex, 0, movedItem);
        return { ...setlist, items: newItems };
      }
      return setlist;
    }));
  };

  const duplicateSetlist = (id) => {
    const original = getSetlistById(id);
    if (original) {
      const duplicate = {
        ...original,
        id: Date.now().toString(),
        title: `${original.title} (Copy)`,
        createdAt: new Date().toISOString()
      };
      setSetlists(prev => [...prev, duplicate]);
      return duplicate;
    }
  };

  const value = {
    setlists,
    createSetlist,
    updateSetlist,
    deleteSetlist,
    getSetlistById,
    addSongToSetlist,
    removeSongFromSetlist,
    updateSetlistItem,
    reorderSetlistItems,
    duplicateSetlist
  };

  return (
    <SetlistContext.Provider value={value}>
      {children}
    </SetlistContext.Provider>
  );
};