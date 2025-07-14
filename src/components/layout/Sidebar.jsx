import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../components/common/SafeIcon';
import { useAuth } from '../../contexts/AuthContext';
import { useUsers } from '../../contexts/UserContext';
import * as FiIcons from 'react-icons/fi';

const {
  FiHome,
  FiMusic,
  FiBookOpen,
  FiUsers,
  FiTarget,
  FiCalendar,
  FiSettings,
  FiX,
  FiHeart,
  FiLogIn,
  FiEye,
  FiChevronDown,
  FiChevronRight,
  FiList,
  FiEdit,
  FiMonitor,
  FiHelpCircle,
  FiInfo,
  FiMail,
  FiDollarSign,
  FiMessageCircle,
  FiBarChart3,
  FiPlay,
  FiUserX,
  FiSend,
  FiMapPin,
  FiCheck,
  FiClock,
  FiGlobe,
  FiFlag
} = FiIcons;

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isGuest, user } = useAuth();
  const { hasPermission, currentUser } = useUsers();
  const [expandedSection, setExpandedSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if user is admin
  const isAdmin = hasPermission(currentUser?.id, 'users.view') || 
                  hasPermission(currentUser?.id, 'system.settings') || 
                  currentUser?.roleId === 'admin' || 
                  currentUser?.roleId === 'super_admin';

  // Detect if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-expand section based on current path (web only)
  useEffect(() => {
    if (!isMobile) {
      const currentSection = findSectionByPath(location.pathname);
      if (currentSection && currentSection !== expandedSection) {
        setExpandedSection(currentSection);
      }
    }
  }, [location.pathname, isMobile]);

  // Find which section contains the current path
  const findSectionByPath = (pathname) => {
    const structure = getNavigationStructure();
    for (const section of structure) {
      if (section.path === pathname) {
        return section.id;
      }
      if (section.subsections?.some(sub => sub.path === pathname)) {
        return section.id;
      }
    }
    return null;
  };

  // Define navigation structure with sections and subsections
  const getNavigationStructure = () => {
    const baseStructure = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: FiHome,
        path: '/',
        subsections: []
      },
      {
        id: 'hymns',
        label: 'Hymns',
        icon: FiMusic,
        subsections: [
          { path: '/library', label: 'Hymn Library', icon: FiMusic },
          { path: '/playlists', label: 'Collections', icon: FiList },
          { path: '/submit', label: 'Submit Lyrics', icon: FiEdit }
        ]
      },
      {
        id: 'prayers',
        label: 'Prayers',
        icon: FiBookOpen,
        subsections: [
          { path: '/prayers', label: 'Prayer Library', icon: FiBookOpen },
          { path: '/prayers/submit', label: 'Submit Prayer', icon: FiSend }
        ]
      },
      {
        id: 'members',
        label: 'Community',
        icon: FiUsers,
        subsections: [
          { path: '/members', label: 'Members', icon: FiUsers },
          { path: '/centers', label: 'Centers', icon: FiMapPin }
        ]
      },
      {
        id: 'projects',
        label: 'Projects',
        icon: FiTarget,
        subsections: [
          { path: '/projects', label: 'Active Projects', icon: FiTarget },
          { path: '/projects/requests', label: 'Project Requests', icon: FiSend },
          { path: '/projects/completed', label: 'Completed Projects', icon: FiCheck }
        ]
      },
      {
        id: 'events',
        label: 'Events',
        icon: FiCalendar,
        subsections: [
          { path: '/setlists', label: 'Event Setlists', icon: FiMonitor },
          { path: '/events/national', label: 'National Events', icon: FiFlag },
          { path: '/events/worldwide', label: 'Worldwide Events', icon: FiGlobe }
        ]
      },
      {
        id: 'help',
        label: 'Help & Support',
        icon: FiHelpCircle,
        subsections: [
          { path: '/help', label: 'Help Hub', icon: FiHelpCircle },
          { path: '/about', label: 'About Us', icon: FiInfo },
          { path: '/contact', label: 'Contact Us', icon: FiMail },
          { path: '/feedback', label: 'Feedback', icon: FiMessageCircle }
        ]
      }
    ];

    if (isGuest) {
      // Guest users have limited access
      return [
        ...baseStructure,
        {
          id: 'account',
          label: 'Account',
          icon: FiLogIn,
          subsections: [
            { path: '/login', label: 'Create Account', icon: FiLogIn, highlight: true }
          ]
        }
      ];
    }

    // Authenticated users get additional sections
    const authenticatedSections = [
      ...baseStructure,
      {
        id: 'donations',
        label: 'Donations',
        icon: FiDollarSign,
        subsections: [
          { path: '/donate', label: 'Donate', icon: FiDollarSign }
        ]
      },
      {
        id: 'account',
        label: 'Account',
        icon: FiSettings,
        subsections: [
          { path: '/settings', label: 'Settings', icon: FiSettings },
          { path: '/delete-account', label: 'Delete Account', icon: FiUserX, danger: true }
        ]
      }
    ];

    // Only add Admin section for admin users
    if (isAdmin) {
      authenticatedSections.splice(-1, 0, {
        id: 'admin',
        label: 'Admin',
        icon: FiSettings,
        subsections: [
          { path: '/analytics', label: 'Analytics', icon: FiBarChart3 },
          { path: '/users', label: 'User Management', icon: FiUsers },
          { path: '/onboarding', label: 'Get Started', icon: FiPlay }
        ]
      });
    }

    return authenticatedSections;
  };

  const navigationStructure = getNavigationStructure();

  const handleSectionClick = (sectionId) => {
    if (isMobile) {
      // Mobile behavior: toggle sections
      if (expandedSection === sectionId) {
        setExpandedSection(null);
      } else {
        setExpandedSection(sectionId);
      }
    } else {
      // Web behavior: always expand clicked section
      setExpandedSection(sectionId);
    }
  };

  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
      setExpandedSection(null);
    }
    // On web, don't collapse - let useEffect handle it
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  const isCurrentSection = (section) => {
    if (section.path && location.pathname === section.path) {
      return true;
    }
    return section.subsections?.some(sub => location.pathname === sub.path);
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden no-print"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-peace-800 shadow-xl z-50 lg:relative lg:translate-x-0 lg:shadow-none border-r border-peace-200 dark:border-peace-700 no-print overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-peace-200 dark:border-peace-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-blue-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <SafeIcon icon={FiHeart} className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-primary-600 dark:text-primary-400 italic">
                With Hymn
              </span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg hover:bg-peace-100 dark:hover:bg-peace-700 transition-colors"
            >
              <SafeIcon icon={FiX} className="w-5 h-5 text-peace-600 dark:text-peace-300" />
            </button>
          </div>

          {/* Guest Notice */}
          {isGuest && (
            <div className="p-4 m-4 bg-blue-50 dark:bg-blue-900 rounded-xl border border-blue-200 dark:border-blue-700">
              <div className="flex items-start space-x-2">
                <SafeIcon icon={FiEye} className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200 font-body">
                    Guest Mode
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 font-body">
                    Browse-only access. Create an account for full features.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationStructure.map((section) => (
                <li key={section.id}>
                  {/* Section Header */}
                  {section.path ? (
                    // Direct link for Dashboard
                    <Link
                      to={section.path}
                      onClick={handleLinkClick}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium font-body ${
                        isCurrentPath(section.path)
                          ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg'
                          : 'text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 hover:text-peace-900 dark:hover:text-white'
                      }`}
                    >
                      <SafeIcon icon={section.icon} className="w-5 h-5" />
                      <span>{section.label}</span>
                    </Link>
                  ) : (
                    // Expandable section
                    <div>
                      <button
                        onClick={() => handleSectionClick(section.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium font-body ${
                          isCurrentSection(section)
                            ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg'
                            : 'text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 hover:text-peace-900 dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <SafeIcon icon={section.icon} className="w-5 h-5" />
                          <span>{section.label}</span>
                        </div>
                        <SafeIcon
                          icon={expandedSection === section.id ? FiChevronDown : FiChevronRight}
                          className="w-4 h-4 transition-transform duration-200"
                        />
                      </button>

                      {/* Subsections */}
                      <AnimatePresence>
                        {expandedSection === section.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-2 space-y-1">
                              {section.subsections.map((subsection) => (
                                <li key={subsection.path}>
                                  <Link
                                    to={subsection.path}
                                    onClick={handleLinkClick}
                                    className={`flex items-center space-x-3 px-4 py-2 ml-6 rounded-lg transition-all duration-200 font-medium font-body ${
                                      isCurrentPath(subsection.path)
                                        ? subsection.highlight
                                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                                          : subsection.danger
                                          ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                                          : 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                                        : subsection.highlight
                                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
                                        : subsection.danger
                                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900'
                                        : 'text-peace-500 dark:text-peace-400 hover:bg-peace-100 dark:hover:bg-peace-700 hover:text-peace-700 dark:hover:text-peace-200'
                                    }`}
                                  >
                                    <SafeIcon icon={subsection.icon} className="w-4 h-4" />
                                    <span className="text-sm">{subsection.label}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-peace-200 dark:border-peace-700">
            <div className="text-center text-sm text-peace-500 dark:text-peace-400">
              <p className="font-hymn italic">Made with ❤️ for worship</p>
              {isGuest && (
                <p className="text-xs mt-1 font-body">
                  Guest mode - Limited functionality
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;