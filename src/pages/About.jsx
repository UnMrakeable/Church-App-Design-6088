import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBookOpen, FiHeart, FiUsers, FiMusic, FiTarget, FiAward } = FiIcons;

const About = () => {
  const features = [
    {
      icon: FiMusic,
      title: 'Comprehensive Hymn Library',
      description: 'Store and organize thousands of hymns with proper chord notation and lyrics formatting.'
    },
    {
      icon: FiBookOpen,
      title: 'Multi-language Prayers',
      description: 'Access prayers in English, Tagalog, Ilocano, and more languages for diverse congregations.'
    },
    {
      icon: FiUsers,
      title: 'Team Collaboration',
      description: 'Work together with worship teams, pastors, and musicians to create meaningful services.'
    },
    {
      icon: FiHeart,
      title: 'Built for Worship',
      description: 'Designed specifically for churches and worship leaders with features that matter most.'
    }
  ];

  const team = [
    {
      name: 'Development Team',
      role: 'Software Engineering',
      description: 'Passionate developers creating tools for worship communities worldwide.'
    },
    {
      name: 'Worship Leaders',
      role: 'Advisory Board',
      description: 'Experienced worship leaders providing insights and feedback for better functionality.'
    },
    {
      name: 'Church Community',
      role: 'Beta Testing',
      description: 'Churches and congregations helping us test and improve With Hymn.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Hymns Stored' },
    { number: '500+', label: 'Churches Using' },
    { number: '50+', label: 'Languages Supported' },
    { number: '24/7', label: 'Support Available' }
  ];

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
      className="p-6 space-y-12"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-peace-400 to-peace-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <SafeIcon icon={FiBookOpen} className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-peace-900 dark:text-white mb-4">
          About With Hymn
        </h1>
        <p className="text-xl text-peace-600 dark:text-peace-300 max-w-3xl mx-auto font-body">
          With Hymn is a comprehensive worship resource platform designed to help churches and worship leaders organize, share, and preserve sacred music and prayers for generations to come.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl p-8 shadow-lg border border-peace-200 dark:border-peace-700">
        <div className="text-center mb-8">
          <SafeIcon icon={FiTarget} className="w-16 h-16 text-peace-500 mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-lg text-peace-600 dark:text-peace-300 max-w-2xl mx-auto font-body">
            To empower worship communities with tools that preserve the beauty of sacred music and prayers, making them easily accessible for meaningful worship experiences.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 text-center shadow-lg border border-peace-200 dark:border-peace-700"
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">
              {stat.number}
            </h3>
            <p className="text-peace-600 dark:text-peace-300 font-body">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Features */}
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-display font-bold text-peace-900 dark:text-white text-center mb-8">
          Why Choose With Hymn?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-peace-400 to-peace-500 rounded-xl flex items-center justify-center mb-4">
                <SafeIcon icon={feature.icon} className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-peace-600 dark:text-peace-300 font-body">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl font-display font-bold text-peace-900 dark:text-white text-center mb-8">
          Our Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-peace-800 rounded-2xl p-6 text-center shadow-lg border border-peace-200 dark:border-peace-700"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-sacred-400 to-sacred-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiUsers} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-2">
                {member.name}
              </h3>
              <p className="text-primary-600 dark:text-primary-400 font-medium mb-3 font-body">
                {member.role}
              </p>
              <p className="text-peace-600 dark:text-peace-300 font-body">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Values */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-peace-500 to-sacred-500 rounded-2xl p-8 text-white">
        <div className="text-center">
          <SafeIcon icon={FiAward} className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-display font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-display font-bold mb-3">Excellence</h3>
              <p className="opacity-90 font-body">
                We strive for the highest quality in everything we create for worship communities.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-display font-bold mb-3">Community</h3>
              <p className="opacity-90 font-body">
                Building bridges between congregations and fostering collaboration in worship.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-display font-bold mb-3">Accessibility</h3>
              <p className="opacity-90 font-body">
                Making worship resources available to everyone, regardless of technical expertise.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact CTA */}
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-2xl font-display font-bold text-peace-900 dark:text-white mb-4">
          Join Our Community
        </h2>
        <p className="text-peace-600 dark:text-peace-300 mb-6 font-body">
          Ready to transform your worship experience? Get started with With Hymn today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary-500 text-white px-8 py-3 rounded-xl font-medium font-body hover:bg-primary-600 transition-colors">
            Get Started Free
          </button>
          <button className="border border-peace-300 dark:border-peace-600 text-peace-700 dark:text-peace-300 px-8 py-3 rounded-xl font-medium font-body hover:bg-peace-100 dark:hover:bg-peace-700 transition-colors">
            Learn More
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;