import React from 'react';
import SafeIcon from '../common/SafeIcon';
import { useUsers } from '../../contexts/UserContext';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiUser, FiUsers, FiEye, FiEdit } = FiIcons;

const RoleSelector = ({ value, onChange, disabled = false, size = 'md' }) => {
  const { roles } = useUsers();

  const getRoleIcon = (roleId) => {
    switch (roleId) {
      case 'super_admin': return FiShield;
      case 'admin': return FiUsers;
      case 'editor': return FiEdit;
      case 'contributor': return FiUser;
      case 'viewer': return FiEye;
      default: return FiUser;
    }
  };

  const getRoleColor = (roleId) => {
    const role = roles[roleId];
    if (!role) return 'gray';
    
    const colorMap = {
      red: 'text-red-600 dark:text-red-400',
      orange: 'text-orange-600 dark:text-orange-400',
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      gray: 'text-gray-600 dark:text-gray-400'
    };
    
    return colorMap[role.color] || 'text-gray-600 dark:text-gray-400';
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-5 py-4 text-lg'
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`
          w-full bg-peace-100 dark:bg-peace-700 text-peace-900 dark:text-white 
          rounded-xl border border-peace-200 dark:border-peace-600
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          font-body appearance-none
          ${sizeClasses[size]}
        `}
      >
        <option value="">Select a role...</option>
        {Object.entries(roles).map(([roleId, role]) => (
          <option key={roleId} value={roleId}>
            {role.name}
          </option>
        ))}
      </select>
      
      {value && (
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <SafeIcon 
            icon={getRoleIcon(value)} 
            className={`w-4 h-4 ${getRoleColor(value)}`} 
          />
        </div>
      )}
    </div>
  );
};

export default RoleSelector;