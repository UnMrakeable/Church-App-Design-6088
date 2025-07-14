import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../components/common/SafeIcon';
import { useUsers } from '../contexts/UserContext';
import * as FiIcons from 'react-icons/fi';

const {
  FiTarget,
  FiSend,
  FiX,
  FiInfo,
  FiUser,
  FiMail,
  FiMapPin,
  FiShield,
  FiDollarSign,
  FiCalendar,
  FiCamera,
  FiPhone,
  FiHome,
  FiHeart,
  FiUpload
} = FiIcons;

const ProjectRequestSubmission = () => {
  const navigate = useNavigate();
  const { currentUser, hasPermission } = useUsers();
  const [formData, setFormData] = useState({
    // Project Information
    projectTitle: '',
    projectType: 'Building',
    description: '',
    location: '',
    estimatedBudget: '',
    timeline: '',
    urgencyLevel: 'Medium',
    
    // Submitter Information
    submitterName: '',
    submitterEmail: '',
    submitterPhone: '',
    submitterCenter: '',
    submitterRole: '',
    
    // Documentation
    reasonForSupport: '',
    communityImpact: '',
    alternativesConsidered: '',
    supportingDocuments: [],
    photos: [],
    
    // Verification
    religiousAffiliation: '',
    centerVerification: '',
    pastorContact: '',
    captchaVerified: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const projectTypes = [
    'Building Construction',
    'Renovation/Repair',
    'Equipment/Instruments',
    'Educational Support',
    'Medical/Health',
    'Community Outreach',
    'Disaster Relief',
    'Youth Ministry',
    'Missionary Support',
    'Other'
  ];

  const urgencyLevels = ['Low', 'Medium', 'High', 'Emergency'];

  // Check if user can auto-approve (admin or editor)
  const canAutoApprove = hasPermission(currentUser?.id, 'projects.approve') || 
                        currentUser?.roleId === 'admin' || 
                        currentUser?.roleId === 'super_admin';

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files.map(file => file.name)]
    }));
  };

  const handleCaptchaVerification = () => {
    const userInput = prompt("Please enter the sum of 8 + 3 to verify you're human:");
    if (userInput === "11") {
      setFormData(prev => ({ ...prev, captchaVerified: true }));
      alert("Human verification successful!");
    } else {
      alert("Verification failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for non-admin users
    if (!canAutoApprove && !formData.captchaVerified) {
      alert('Please complete the human verification first.');
      return;
    }

    if (!formData.religiousAffiliation.trim()) {
      alert('Please specify your religious affiliation for verification.');
      return;
    }

    setIsSubmitting(true);

    try {
      const projectRequestData = {
        ...formData,
        id: Date.now().toString(),
        status: canAutoApprove ? 'approved' : 'pending',
        submittedAt: new Date().toISOString(),
        submittedBy: currentUser?.id || 'guest'
      };

      // In a real app, this would save to database
      console.log('Project Request Submitted:', projectRequestData);

      // Show success message
      if (canAutoApprove) {
        alert('Project request approved and published successfully!');
      } else {
        alert('Project request submitted successfully! Our team will review your submission and contact you within 3-5 business days. Please ensure all contact information is accurate.');
      }

      // Reset form
      setFormData({
        projectTitle: '',
        projectType: 'Building',
        description: '',
        location: '',
        estimatedBudget: '',
        timeline: '',
        urgencyLevel: 'Medium',
        submitterName: '',
        submitterEmail: '',
        submitterPhone: '',
        submitterCenter: '',
        submitterRole: '',
        reasonForSupport: '',
        communityImpact: '',
        alternativesConsidered: '',
        supportingDocuments: [],
        photos: [],
        religiousAffiliation: '',
        centerVerification: '',
        pastorContact: '',
        captchaVerified: false
      });
      setUploadedFiles([]);

      navigate('/projects');
    } catch (error) {
      console.error('Error submitting project request:', error);
      alert('There was an error submitting your project request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiTarget} className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white mb-2">
          Submit Project Request
        </h1>
        <p className="text-peace-600 dark:text-peace-300 font-body max-w-3xl mx-auto">
          Request support for church and community projects. We focus on helping brothers and sisters who share our faith and values.
          {!canAutoApprove && ' All requests will be thoroughly reviewed and verified before approval.'}
        </p>
      </motion.div>

      {/* Important Notice */}
      <motion.div variants={itemVariants} className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiInfo} className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="text-blue-800 dark:text-blue-200 font-bold font-body mb-2">
              Project Support Guidelines
            </h3>
            <div className="text-blue-700 dark:text-blue-300 text-sm font-body space-y-2">
              <p>• <strong>Religious Affiliation Required:</strong> We primarily support projects from churches and religious organizations that share our faith and values.</p>
              <p>• <strong>Verification Process:</strong> All requests undergo thorough vetting including documentation review, reference checks, and community verification.</p>
              <p>• <strong>Documentation Required:</strong> Clear photos, detailed explanations, pastor/leader endorsement, and proof of genuine need.</p>
              <p>• <strong>Transparency:</strong> Approved projects will be publicly tracked with progress updates and fund distribution documentation.</p>
              <p>• <strong>Response Time:</strong> Initial review takes 3-5 business days. Complex projects may require additional verification time.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-peace-800 rounded-2xl p-8 shadow-lg border border-peace-200 dark:border-peace-700 space-y-8"
      >
        {/* Project Information Section */}
        <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
          <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-6 flex items-center space-x-2">
            <SafeIcon icon={FiTarget} className="w-5 h-5" />
            <span>Project Information</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Project Title *
              </label>
              <input
                type="text"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                placeholder="e.g., New Church Building for Rural Community"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Project Type *
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              >
                {projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
              Project Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
              placeholder="Provide a detailed description of your project, including current situation and what needs to be accomplished..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                placeholder="City, State/Province, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Estimated Budget (USD) *
              </label>
              <input
                type="number"
                name="estimatedBudget"
                value={formData.estimatedBudget}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Urgency Level *
              </label>
              <select
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              >
                {urgencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submitter Information Section */}
        <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
          <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-6 flex items-center space-x-2">
            <SafeIcon icon={FiUser} className="w-5 h-5" />
            <span>Contact Information</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Full Name *
              </label>
              <input
                type="text"
                name="submitterName"
                value={formData.submitterName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Email Address *
              </label>
              <input
                type="email"
                name="submitterEmail"
                value={formData.submitterEmail}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Phone Number *
              </label>
              <input
                type="tel"
                name="submitterPhone"
                value={formData.submitterPhone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Church/Center Name *
              </label>
              <input
                type="text"
                name="submitterCenter"
                value={formData.submitterCenter}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                placeholder="Your church or center name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Your Role *
              </label>
              <input
                type="text"
                name="submitterRole"
                value={formData.submitterRole}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                placeholder="Pastor, Elder, Member, etc."
              />
            </div>
          </div>
        </div>

        {/* Documentation & Justification Section */}
        <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
          <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-6 flex items-center space-x-2">
            <SafeIcon icon={FiHeart} className="w-5 h-5" />
            <span>Project Justification</span>
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Reason for Support Request *
              </label>
              <textarea
                name="reasonForSupport"
                value={formData.reasonForSupport}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
                placeholder="Explain why you need support for this project. Include details about your current situation, challenges faced, and why external help is necessary..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Community Impact *
              </label>
              <textarea
                name="communityImpact"
                value={formData.communityImpact}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
                placeholder="How will this project benefit your community and congregation? Include expected number of people impacted..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Alternatives Considered
              </label>
              <textarea
                name="alternativesConsidered"
                value={formData.alternativesConsidered}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
                placeholder="What other solutions have you considered? Why is external support the best option?"
              />
            </div>
          </div>
        </div>

        {/* Religious Verification Section */}
        <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
          <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-6 flex items-center space-x-2">
            <SafeIcon icon={FiHome} className="w-5 h-5" />
            <span>Religious Affiliation Verification</span>
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                Religious Affiliation & Denomination *
              </label>
              <textarea
                name="religiousAffiliation"
                value={formData.religiousAffiliation}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
                placeholder="Please specify your church denomination, religious beliefs, and how they align with our community values..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Center/Church Verification Contact
                </label>
                <input
                  type="text"
                  name="centerVerification"
                  value={formData.centerVerification}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  placeholder="Name of person who can verify your membership"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Pastor/Leader Contact
                </label>
                <input
                  type="text"
                  name="pastorContact"
                  value={formData.pastorContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  placeholder="Pastor's name and contact information"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
          <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-6 flex items-center space-x-2">
            <SafeIcon icon={FiCamera} className="w-5 h-5" />
            <span>Supporting Documentation</span>
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
              Upload Photos/Documents *
            </label>
            <p className="text-xs text-peace-500 dark:text-peace-400 mb-4 font-body">
              Please upload clear photos showing current conditions, documents supporting your request, and any relevant paperwork. Accepted formats: JPG, PNG, PDF
            </p>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-peace-300 dark:border-peace-600 border-dashed rounded-xl cursor-pointer bg-peace-50 dark:bg-peace-700 hover:bg-peace-100 dark:hover:bg-peace-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <SafeIcon icon={FiUpload} className="w-8 h-8 mb-4 text-peace-500 dark:text-peace-400" />
                  <p className="mb-2 text-sm text-peace-500 dark:text-peace-400 font-body">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-peace-500 dark:text-peace-400 font-body">
                    PNG, JPG, PDF (MAX. 10MB each)
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Uploaded Files:
                </p>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-peace-600 dark:text-peace-300">
                      <SafeIcon icon={FiCamera} className="w-4 h-4" />
                      <span className="font-body">{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Verification - Only for non-admin users */}
        {!canAutoApprove && (
          <div className="border-b border-peace-200 dark:border-peace-700 pb-6">
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white mb-4 flex items-center space-x-2">
              <SafeIcon icon={FiShield} className="w-5 h-5" />
              <span>Security Verification</span>
            </h3>
            <div className="flex items-center justify-between p-4 bg-peace-50 dark:bg-peace-700 rounded-xl">
              <div>
                <p className="font-medium text-peace-900 dark:text-white font-body">
                  Human Verification Required
                </p>
                <p className="text-sm text-peace-600 dark:text-peace-300 font-body">
                  Please complete the verification to prove you're not a robot
                </p>
              </div>
              <button
                type="button"
                onClick={handleCaptchaVerification}
                className={`px-4 py-2 rounded-lg font-medium font-body transition-colors ${
                  formData.captchaVerified
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                {formData.captchaVerified ? 'Verified ✓' : 'Verify Human'}
              </button>
            </div>
          </div>
        )}

        {/* Timeline Information */}
        <div>
          <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
            Project Timeline & Milestones
          </label>
          <textarea
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
            placeholder="Describe your project timeline, key milestones, and when you expect completion..."
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="flex-1 px-6 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiX} className="w-5 h-5" />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            disabled={isSubmitting || (!canAutoApprove && !formData.captchaVerified)}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-body flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiSend} className="w-5 h-5" />
            <span>
              {isSubmitting ? 'Submitting...' : (canAutoApprove ? 'Submit & Approve' : 'Submit for Review')}
            </span>
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ProjectRequestSubmission;