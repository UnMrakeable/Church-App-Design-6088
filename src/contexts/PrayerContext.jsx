import React, { createContext, useContext, useState } from 'react';

const PrayerContext = createContext();

export const usePrayers = () => {
  const context = useContext(PrayerContext);
  if (!context) {
    throw new Error('usePrayers must be used within a PrayerProvider');
  }
  return context;
};

// Sample prayer data with translations and approval system
const samplePrayers = [
  {
    id: '1',
    title: 'Opening Prayer',
    category: 'English',
    status: 'published',
    submittedBy: 'admin',
    translations: [
      { language: 'Tagalog', title: 'Panalangin sa Pagbubukas', id: '1-tl' },
      { language: 'Ilocano', title: 'Kararag iti Pangrugian', id: '1-il' }
    ],
    content: `Heavenly Father,

We gather in Your holy presence today with grateful hearts. Thank You for bringing us together as one body in Christ. Open our hearts to receive Your Word and prepare our spirits for worship.

Guide our thoughts and intentions, that they may be pleasing to You. Help us to set aside the distractions of this world and focus our minds on You alone.

Bless this time of fellowship and worship. May Your Spirit move among us and draw us closer to You and to one another.

In Jesus' precious name we pray,
Amen.`,
    tags: ['Opening', 'Worship', 'Fellowship'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Panalangin sa Pagbubukas',
    category: 'Tagalog',
    status: 'published',
    submittedBy: 'admin',
    translations: [
      { language: 'English', title: 'Opening Prayer', id: '1' },
      { language: 'Ilocano', title: 'Kararag iti Pangrugian', id: '1-il' }
    ],
    content: `Aming Panginoong Diyos,

Nagtitipon kami ngayon sa Inyong banal na presensya na may pasasalamat na puso. Salamat po sa pagdadala sa amin bilang isang katawan sa Cristo. Buksan po ninyo ang aming mga puso upang tanggapin ang Inyong Salita.

Ihanda po ninyo ang aming mga espiritu para sa pagsamba. Gabayan po ninyo ang aming mga isip at layunin, upang maging nakalulugod sa Inyo.

Tulungan po ninyo kaming iwaksi ang mga bagay na nakakagulo sa mundong ito. Pagpalain po ninyo ang aming panahong ito ng pakikipagkapwa at pagsamba.

Sa pangalan ni Hesus,
Amen.`,
    tags: ['Pagbubukas', 'Pagsamba', 'Pakikipagkapwa'],
    createdAt: '2024-01-16'
  },
  {
    id: '3',
    title: 'Prayer for Healing',
    category: 'English',
    status: 'pending',
    submittedBy: 'user456',
    translations: [],
    content: `Lord Jesus, Great Physician,

We come before You today seeking Your healing touch. You who made the lame walk, the blind see, and the deaf hear, we ask for Your mercy and grace.

Touch those who are suffering with physical pain, emotional wounds, and spiritual burdens. Restore their bodies, minds, and souls according to Your perfect will.

Give wisdom to doctors and caregivers. Comfort families and friends who watch their loved ones struggle. Help us to trust in Your goodness even in difficult times.

We pray for complete healing and restoration, knowing that You are able to do immeasurably more than we can ask or imagine.

In Your holy name,
Amen.`,
    tags: ['Healing', 'Comfort', 'Faith'],
    createdAt: '2024-01-20'
  }
];

const defaultCategories = ['English', 'Tagalog', 'Ilocano'];

export const PrayerProvider = ({ children }) => {
  const [prayers, setPrayers] = useState(samplePrayers);
  const [categories, setCategories] = useState(defaultCategories);

  const addPrayer = (prayer) => {
    const newPrayer = {
      ...prayer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      tags: prayer.tags || [],
      translations: prayer.translations || [],
      status: 'pending', // All new prayers need approval
      submittedBy: 'current_user' // In real app, get from auth
    };
    setPrayers(prev => [...prev, newPrayer]);
  };

  const updatePrayer = (id, updates) => {
    setPrayers(prev => prev.map(prayer => 
      prayer.id === id ? { ...prayer, ...updates } : prayer
    ));
  };

  const approvePrayer = (id) => {
    setPrayers(prev => prev.map(prayer => 
      prayer.id === id ? { ...prayer, status: 'published' } : prayer
    ));
  };

  const rejectPrayer = (id) => {
    setPrayers(prev => prev.map(prayer => 
      prayer.id === id ? { ...prayer, status: 'rejected' } : prayer
    ));
  };

  const deletePrayer = (id) => {
    setPrayers(prev => prev.filter(prayer => prayer.id !== id));
  };

  const addTranslation = (prayerId, translation) => {
    setPrayers(prev => prev.map(prayer => 
      prayer.id === prayerId 
        ? { ...prayer, translations: [...(prayer.translations || []), translation] }
        : prayer
    ));
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  };

  const getPrayerById = (id) => prayers.find(prayer => prayer.id === id);
  const getPublishedPrayers = () => prayers.filter(prayer => prayer.status === 'published');
  const getPendingPrayers = () => prayers.filter(prayer => prayer.status === 'pending');

  const value = {
    prayers,
    categories,
    addPrayer,
    updatePrayer,
    approvePrayer,
    rejectPrayer,
    deletePrayer,
    addTranslation,
    addCategory,
    getPrayerById,
    getPublishedPrayers,
    getPendingPrayers
  };

  return (
    <PrayerContext.Provider value={value}>
      {children}
    </PrayerContext.Provider>
  );
};