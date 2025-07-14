import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { useUsers } from '../../contexts/UserContext';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX, FiInfo } = FiIcons;

const PermissionMatrix = ({ roleId, permissions, onChange, readOnly = false }) => {
  const { permissions: allPermissions } = useUsers();
  const [expandedCategories, setExpandedCategories] = useState({});

  // Group permissions by category
  const permissionCategories = {
    'Hymns': Object.keys(allPermissions).filter(p => p.startsWith('hymns.')),
    'Prayers': Object.keys(allPermissions).filter(p => p.startsWith('prayers.')),
    'Collections': Object.keys(allPermissions).filter(p => p.startsWith('collections.')),
    'Users': Object.keys(allPermissions).filter(p => p.startsWith('users.')),
    'System': Object.keys(allPermissions).filter(p => p.startsWith('system.')),
    'Export': Object.keys(allPermissions).filter(p => p.startsWith('export.'))
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const togglePermission = (permission) => {
    if (readOnly) return;
    
    const newPermissions = permissions.includes(permission)
      ? permissions.filter(p => p !== permission)
      : [...permissions, permission];
    
    onChange(newPermissions);
  };

  const toggleCategoryPermissions = (category) => {
    if (readOnly) return;
    
    const categoryPermissions = permissionCategories[category];
    const allSelected = categoryPermissions.every(p => permissions.includes(p));
    
    let newPermissions;
    if (allSelected) {
      // Remove all category permissions
      newPermissions = permissions.filter(p => !categoryPermissions.includes(p));
    } else {
      // Add all category permissions
      newPermissions = [...new Set([...permissions, ...categoryPermissions])];
    }
    
    onChange(newPermissions);
  };

  const getCategoryStatus = (category) => {
    const categoryPermissions = permissionCategories[category];
    const selectedCount = categoryPermissions.filter(p => permissions.includes(p)).length;
    
    if (selectedCount === 0) return 'none';
    if (selectedCount === categoryPermissions.length) return 'all';
    return 'partial';
  };

  return (
    <div className="space-y-4">
      {Object.entries(permissionCategories).map(([category, categoryPermissions]) => {
        const isExpanded = expandedCategories[category];
        const status = getCategoryStatus(category);
        
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-peace-50 dark:bg-peace-700 rounded-xl overflow-hidden"
          >
            {/* Category Header */}
            <div 
              className={`
                flex items-center justify-between p-4 cursor-pointer
                hover:bg-peace-100 dark:hover:bg-peace-600 transition-colors
                ${readOnly ? 'cursor-default' : ''}
              `}
              onClick={() => !readOnly && toggleCategory(category)}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={`
                    w-6 h-6 rounded border-2 flex items-center justify-center transition-colors
                    ${status === 'all' 
                      ? 'bg-primary-500 border-primary-500' 
                      : status === 'partial'
                      ? 'bg-yellow-500 border-yellow-500'
                      : 'border-peace-300 dark:border-peace-500'
                    }
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategoryPermissions(category);
                  }}
                >
                  {status === 'all' && (
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-white" />
                  )}
                  {status === 'partial' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                
                <div>
                  <h4 className="font-medium text-peace-900 dark:text-white font-body">
                    {category}
                  </h4>
                  <p className="text-sm text-peace-600 dark:text-peace-300 font-body">
                    {categoryPermissions.filter(p => permissions.includes(p)).length} of {categoryPermissions.length} selected
                  </p>
                </div>
              </div>
              
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <SafeIcon 
                  icon={FiInfo} 
                  className="w-5 h-5 text-peace-500 dark:text-peace-400" 
                />
              </motion.div>
            </div>

            {/* Category Permissions */}
            <motion.div
              initial={false}
              animate={{ 
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-2">
                {categoryPermissions.map(permission => (
                  <div
                    key={permission}
                    className={`
                      flex items-center space-x-3 p-3 rounded-lg
                      hover:bg-peace-100 dark:hover:bg-peace-600 transition-colors
                      ${readOnly ? 'cursor-default' : 'cursor-pointer'}
                    `}
                    onClick={() => togglePermission(permission)}
                  >
                    <div 
                      className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                        ${permissions.includes(permission)
                          ? 'bg-primary-500 border-primary-500'
                          : 'border-peace-300 dark:border-peace-500'
                        }
                      `}
                    >
                      {permissions.includes(permission) && (
                        <SafeIcon icon={FiCheck} className="w-3 h-3 text-white" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-peace-900 dark:text-white font-body">
                        {allPermissions[permission]}
                      </p>
                      <p className="text-xs text-peace-500 dark:text-peace-400 font-body">
                        {permission}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PermissionMatrix;