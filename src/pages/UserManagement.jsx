import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../components/common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiPlus, FiEdit, FiTrash2, FiShield, FiMail, FiCalendar, FiSearch } = FiIcons;

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@church.com',
      role: 'Admin',
      status: 'Active',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-28'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@church.com',
      role: 'Editor',
      status: 'Active',
      joinDate: '2024-01-20',
      lastLogin: '2024-01-27'
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob@church.com',
      role: 'Viewer',
      status: 'Inactive',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-25'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Viewer' });

  const roles = ['Admin', 'Editor', 'Viewer'];
  const roleColors = {
    Admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    Editor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    Viewer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (newUser.name.trim() && newUser.email.trim()) {
      const user = {
        id: Date.now(),
        ...newUser,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: 'Never'
      };
      setUsers(prev => [...prev, user]);
      setNewUser({ name: '', email: '', role: 'Viewer' });
      setShowAddUser(false);
    }
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

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
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-peace-900 dark:text-white">User Management</h1>
          <p className="text-peace-600 dark:text-peace-300 font-body">
            Manage user access and permissions
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddUser(true)}
          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-medium font-body shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-5 h-5" />
          <span>Add User</span>
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700">
        <div className="relative">
          <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-peace-500 dark:text-peace-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white placeholder-peace-500 dark:placeholder-peace-400 focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
          />
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-peace-800 rounded-2xl shadow-lg border border-peace-200 dark:border-peace-700 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-peace-50 dark:bg-peace-700">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-peace-700 dark:text-peace-300 font-body">User</th>
                <th className="text-left py-4 px-6 font-medium text-peace-700 dark:text-peace-300 font-body">Role</th>
                <th className="text-left py-4 px-6 font-medium text-peace-700 dark:text-peace-300 font-body">Status</th>
                <th className="text-left py-4 px-6 font-medium text-peace-700 dark:text-peace-300 font-body">Join Date</th>
                <th className="text-left py-4 px-6 font-medium text-peace-700 dark:text-peace-300 font-body">Last Login</th>
                <th className="text-left py-4 px-6 font-medium text-peace-700 dark:text-peace-300 font-body">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-peace-100 dark:border-peace-700 hover:bg-peace-50 dark:hover:bg-peace-700">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-sacred-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium font-body">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-peace-900 dark:text-white font-body">{user.name}</h4>
                        <p className="text-sm text-peace-600 dark:text-peace-300 font-body">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium font-body ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium font-body ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-peace-600 dark:text-peace-300 font-body">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-peace-600 dark:text-peace-300 font-body">
                    {user.lastLogin === 'Never' ? 'Never' : new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-lg hover:bg-peace-100 dark:hover:bg-peace-600 transition-colors">
                        <SafeIcon icon={FiEdit} className="w-4 h-4 text-peace-600 dark:text-peace-300" />
                      </button>
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-peace-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-display font-bold text-peace-900 dark:text-white mb-4">Add New User</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  placeholder="Enter full name..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                  placeholder="Enter email address..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddUser(false)}
                className="flex-1 px-4 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-body"
              >
                Add User
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default UserManagement;