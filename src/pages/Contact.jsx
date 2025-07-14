import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiPhone, FiMapPin, FiSend, FiMessageCircle, FiHelpCircle, FiClock } = FiIcons;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold text-peace-900 dark:text-white mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-peace-600 dark:text-peace-300 font-body">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-4">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiMail} className="w-5 h-5 text-primary-500 mt-1" />
                <div>
                  <p className="font-medium text-peace-900 dark:text-white font-body">Email</p>
                  <p className="text-peace-600 dark:text-peace-300 font-body">support@withhymn.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <SafeIcon icon={FiClock} className="w-5 h-5 text-primary-500 mt-1" />
                <div>
                  <p className="font-medium text-peace-900 dark:text-white font-body">Response Time</p>
                  <p className="text-peace-600 dark:text-peace-300 font-body">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-4">
              Quick Help
            </h3>
            <div className="space-y-3">
              <a href="/help" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-body">
                <SafeIcon icon={FiHelpCircle} className="w-4 h-4" />
                <span>Help Center</span>
              </a>
              <a href="/feedback" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-body">
                <SafeIcon icon={FiMessageCircle} className="w-4 h-4" />
                <span>Send Feedback</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-peace-800 rounded-2xl p-8 shadow-lg border border-peace-200 dark:border-peace-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
                  placeholder="Tell us more about your question or feedback..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-medium font-body hover:from-primary-600 hover:to-primary-700 transition-colors flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiSend} className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;