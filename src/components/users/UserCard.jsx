import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { useUsers } from '../../contexts/UserContext';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMail, FiPhone, FiCalendar, FiClock, FiEdit, FiTrash2, FiPower, FiShield } = FiIcons;

const UserCard = ({ user, onEdit, onDelete, onToggleStatus }) => {
  const { getRoleById } = useUsers();
  const role = getRoleById(user.roleId);

  const getRoleColor = (roleColor) => {
    const colorMap = {
      red: 'from-red-500 to-red-600',
      orange: 'from-orange-500 to-orange-600',
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      gray: 'from-gray-500 to-gray-600'
    };
    return colorMap[roleColor] || 'from-gray-500 to-gray-600';
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-peace-800 rounded-2xl p-6 shadow-lg border border-peace-200 dark:border-peace-700 hover:shadow-xl transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-r ${getRoleColor(role?.color)} rounded-full flex items-center justify-center`}>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-white text-lg font-medium font-body">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-peace-900 dark:text-white">
              {user.name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium font-body ${getStatusColor(user.status)}`}>
                {user.status}
              </span>
              {role && (
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium font-body">
                  {role.name}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(user)}
            className="p-2 rounded-lg hover:bg-peace-100 dark:hover:bg-peace-700 transition-colors"
            title="Edit User"
          >
            <SafeIcon icon={FiEdit} className="w-4 h-4 text-peace-600 dark:text-peace-300" />
          </button>
          <button
            onClick={() => onToggleStatus(user.id)}
            className={`p-2 rounded-lg transition-colors ${
              user.status === 'active' 
                ? 'hover:bg-red-100 dark:hover:bg-red-900' 
                : 'hover:bg-green-100 dark:hover:bg-green-900'
            }`}
            title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
          >
            <SafeIcon 
              icon={FiPower} 
              className={`w-4 h-4 ${
                user.status === 'active' 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-green-600 dark:text-green-400'
              }`} 
            />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
            title="Delete User"
          >
            <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-peace-600 dark:text-peace-300">
          <SafeIcon icon={FiMail} className="w-4 h-4" />
          <span className="font-body">{user.email}</span>
        </div>
        
        {user.phone && (
          <div className="flex items-center space-x-2 text-sm text-peace-600 dark:text-peace-300">
            <SafeIcon icon={FiPhone} className="w-4 h-4" />
            <span className="font-body">{user.phone}</span>
          </div>
        )}
        
        {user.department && (
          <div className="flex items-center space-x-2 text-sm text-peace-600 dark:text-peace-300">
            <SafeIcon icon={FiShield} className="w-4 h-4" />
            <span className="font-body">{user.department}</span>
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 text-sm text-peace-500 dark:text-peace-400">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiCalendar} className="w-4 h-4" />
          <div>
            <p className="font-body">Joined</p>
            <p className="font-body">{new Date(user.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiClock} className="w-4 h-4" />
          <div>
            <p className="font-body">Last Login</p>
            <p className="font-body">
              {user.lastLogin === 'Never' ? 'Never' : new Date(user.lastLogin).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Notes */}
      {user.notes && (
        <div className="mt-4 pt-4 border-t border-peace-200 dark:border-peace-700">
          <p className="text-sm text-peace-600 dark:text-peace-300 font-body italic">
            "{user.notes}"
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default UserCard;