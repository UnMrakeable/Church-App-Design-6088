import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

// Configuration
import questConfig from '../questConfig';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import SongLibrary from './pages/SongLibrary';
import SongView from './pages/SongView';
import Prayers from './pages/Prayers';
import PrayerSubmission from './pages/PrayerSubmission';
import Playlists from './pages/Playlists';
import Analytics from './pages/Analytics';
import UserManagement from './pages/UserManagement';
import Feedback from './pages/Feedback';
import About from './pages/About';
import Settings from './pages/Settings';
import SubmitLyrics from './pages/SubmitLyrics';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Login from './pages/Login';
import OnboardingPage from './pages/Onboarding';
import Members from './pages/Members';
import Centers from './pages/Centers';
import Projects from './pages/Projects';
import ProjectRequestSubmission from './pages/ProjectRequestSubmission';
import DeleteAccount from './pages/DeleteAccount';

// New Setlist Pages
import Setlists from './pages/Setlists';
import SetlistBuilder from './pages/SetlistBuilder';
import PresentationMode from './pages/PresentationMode';

// Contexts
import { ThemeProvider } from './contexts/ThemeContext';
import { SongProvider } from './contexts/SongContext';
import { PrayerProvider } from './contexts/PrayerContext';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';
import { PaymentProvider } from './contexts/PaymentContext';
import { SetlistProvider } from './contexts/SetlistContext';

import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <QuestProvider
          apiKey={questConfig.APIKEY}
          entityId={questConfig.ENTITYID}
          apiType="PRODUCTION"
        >
          <UserProvider>
            <SongProvider>
              <PrayerProvider>
                <PaymentProvider>
                  <SetlistProvider>
                    <Router>
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/onboarding" element={<OnboardingPage />} />
                        
                        {/* Presentation Mode - Full Screen */}
                        <Route path="/presentation/:id" element={<PresentationMode />} />
                        
                        {/* Protected Routes */}
                        <Route path="/*" element={
                          <ProtectedRoute>
                            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 dark:from-peace-900 dark:to-peace-800 transition-colors duration-300">
                              <div className="flex h-screen overflow-hidden">
                                {/* Sidebar - Always visible on desktop */}
                                <div className="hidden lg:block">
                                  <Sidebar isOpen={true} onClose={() => {}} />
                                </div>
                                
                                {/* Mobile Sidebar */}
                                <div className="lg:hidden">
                                  <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                                </div>
                                
                                {/* Main Content */}
                                <div className="flex-1 flex flex-col overflow-hidden">
                                  <Header onMenuClick={() => setSidebarOpen(true)} />
                                  <main className="flex-1 overflow-auto">
                                    <AnimatePresence mode="wait">
                                      <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/library" element={<SongLibrary />} />
                                        <Route path="/song/:id" element={<SongView />} />
                                        <Route path="/prayers" element={<Prayers />} />
                                        <Route path="/prayers/submit" element={<PrayerSubmission />} />
                                        <Route path="/playlists" element={<Playlists />} />
                                        <Route path="/submit" element={<SubmitLyrics />} />
                                        <Route path="/analytics" element={<Analytics />} />
                                        <Route path="/users" element={<UserManagement />} />
                                        <Route path="/feedback" element={<Feedback />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/help" element={<Help />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/donate" element={<Donate />} />
                                        <Route path="/settings" element={<Settings />} />
                                        <Route path="/delete-account" element={<DeleteAccount />} />
                                        <Route path="/members" element={<Members />} />
                                        <Route path="/centers" element={<Centers />} />
                                        <Route path="/projects" element={<Projects />} />
                                        <Route path="/projects/requests" element={<ProjectRequestSubmission />} />
                                        
                                        {/* Setlist Routes */}
                                        <Route path="/setlists" element={<Setlists />} />
                                        <Route path="/setlist/new" element={<SetlistBuilder />} />
                                        <Route path="/setlist/:id" element={<SetlistBuilder />} />
                                        
                                        {/* Placeholder routes for remaining sections */}
                                        <Route path="/projects/completed" element={<div className="p-6 text-center"><h1 className="text-2xl font-display font-bold text-peace-900 dark:text-white">Completed Projects</h1><p className="text-peace-600 dark:text-peace-300 font-body mt-2">View successfully completed projects with full documentation and proof of fund delivery.</p></div>} />
                                        <Route path="/events/national" element={<div className="p-6 text-center"><h1 className="text-2xl font-display font-bold text-peace-900 dark:text-white">National Events</h1><p className="text-peace-600 dark:text-peace-300 font-body mt-2">Discover and submit national church events and gatherings.</p></div>} />
                                        <Route path="/events/worldwide" element={<div className="p-6 text-center"><h1 className="text-2xl font-display font-bold text-peace-900 dark:text-white">Worldwide Events</h1><p className="text-peace-600 dark:text-peace-300 font-body mt-2">Global church events and international gatherings for our community.</p></div>} />
                                      </Routes>
                                    </AnimatePresence>
                                  </main>
                                </div>
                              </div>
                            </div>
                          </ProtectedRoute>
                        } />
                      </Routes>
                    </Router>
                  </SetlistProvider>
                </PaymentProvider>
              </PrayerProvider>
            </SongProvider>
          </UserProvider>
        </QuestProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;