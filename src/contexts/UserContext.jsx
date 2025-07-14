import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

// Permission definitions
const PERMISSIONS = {
  // Hymn permissions
  'hymns.view': 'View hymns',
  'hymns.create': 'Create hymns',
  'hymns.edit': 'Edit hymns',
  'hymns.delete': 'Delete hymns',
  'hymns.manage_media': 'Manage hymn media (videos/slides)',

  // Prayer permissions
  'prayers.view': 'View prayers',
  'prayers.create': 'Create prayers',
  'prayers.edit': 'Edit prayers',
  'prayers.delete': 'Delete prayers',

  // Collection permissions
  'collections.view': 'View collections',
  'collections.create': 'Create collections',
  'collections.edit': 'Edit collections',
  'collections.delete': 'Delete collections',
  'collections.share': 'Share collections',

  // User management permissions
  'users.view': 'View users',
  'users.create': 'Create users',
  'users.edit': 'Edit users',
  'users.delete': 'Delete users',
  'users.manage_roles': 'Manage user roles',

  // System permissions
  'system.analytics': 'View analytics',
  'system.feedback': 'View feedback',
  'system.settings': 'Manage system settings',
  'system.backup': 'Backup and restore data',

  // Print and export permissions
  'export.print': 'Print hymns and prayers',
  'export.download': 'Download content',
  'export.bulk': 'Bulk export data'
};

// Predefined roles with permissions
const DEFAULT_ROLES = {
  'super_admin': {
    name: 'Super Administrator',
    description: 'Full system access with all permissions',
    permissions: Object.keys(PERMISSIONS),
    color: 'red',
    isSystem: true
  },
  'admin': {
    name: 'Administrator',
    description: 'Full content management with user oversight',
    permissions: [
      'hymns.view', 'hymns.create', 'hymns.edit', 'hymns.manage_media',
      'prayers.view', 'prayers.create', 'prayers.edit',
      'collections.view', 'collections.create', 'collections.edit', 'collections.delete', 'collections.share',
      'users.view', 'users.create', 'users.edit',
      'system.analytics', 'system.feedback',
      'export.print', 'export.download', 'export.bulk'
    ],
    color: 'orange',
    isSystem: true
  },
  'editor': {
    name: 'Content Editor',
    description: 'Can create and edit content but limited user access',
    permissions: [
      'hymns.view', 'hymns.create', 'hymns.edit', 'hymns.manage_media',
      'prayers.view', 'prayers.create', 'prayers.edit',
      'collections.view', 'collections.create', 'collections.edit', 'collections.share',
      'users.view',
      'export.print', 'export.download'
    ],
    color: 'blue',
    isSystem: true
  },
  'contributor': {
    name: 'Contributor',
    description: 'Can create content and manage own collections',
    permissions: [
      'hymns.view', 'hymns.create',
      'prayers.view', 'prayers.create',
      'collections.view', 'collections.create', 'collections.edit',
      'export.print', 'export.download'
    ],
    color: 'green',
    isSystem: true
  },
  'viewer': {
    name: 'Viewer',
    description: 'Read-only access to content',
    permissions: [
      'hymns.view',
      'prayers.view',
      'collections.view',
      'export.print'
    ],
    color: 'gray',
    isSystem: true
  }
};

// Sample users data
const sampleUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@church.com',
    roleId: 'super_admin',
    status: 'active',
    joinDate: '2024-01-15',
    lastLogin: '2024-01-28',
    avatar: null,
    department: 'IT',
    phone: '+1 (555) 123-4567',
    notes: 'System administrator and technical lead'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@church.com',
    roleId: 'admin',
    status: 'active',
    joinDate: '2024-01-20',
    lastLogin: '2024-01-27',
    avatar: null,
    department: 'Worship',
    phone: '+1 (555) 234-5678',
    notes: 'Worship leader and music director'
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@church.com',
    roleId: 'editor',
    status: 'active',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-25',
    avatar: null,
    department: 'Media',
    phone: '+1 (555) 345-6789',
    notes: 'Media team coordinator'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah@church.com',
    roleId: 'contributor',
    status: 'inactive',
    joinDate: '2024-01-05',
    lastLogin: '2024-01-20',
    avatar: null,
    department: 'Youth',
    phone: '+1 (555) 456-7890',
    notes: 'Youth ministry volunteer'
  }
];

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(sampleUsers);
  const [roles, setRoles] = useState(DEFAULT_ROLES);
  const [currentUser] = useState(sampleUsers[0]); // Mock current user

  // User management functions
  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      status: 'active'
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (id, updates) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updates } : user
    ));
  };

  const deleteUser = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { 
        ...user, 
        status: user.status === 'active' ? 'inactive' : 'active' 
      } : user
    ));
  };

  // Role management functions
  const createRole = (roleData) => {
    const roleId = roleData.name.toLowerCase().replace(/\s+/g, '_');
    const newRole = {
      ...roleData,
      isSystem: false
    };
    setRoles(prev => ({ ...prev, [roleId]: newRole }));
    return roleId;
  };

  const updateRole = (roleId, updates) => {
    if (roles[roleId]?.isSystem) {
      throw new Error('Cannot modify system roles');
    }
    setRoles(prev => ({ 
      ...prev, 
      [roleId]: { ...prev[roleId], ...updates } 
    }));
  };

  const deleteRole = (roleId) => {
    if (roles[roleId]?.isSystem) {
      throw new Error('Cannot delete system roles');
    }

    // Check if any users have this role
    const usersWithRole = users.filter(user => user.roleId === roleId);
    if (usersWithRole.length > 0) {
      throw new Error('Cannot delete role that is assigned to users');
    }

    setRoles(prev => {
      const newRoles = { ...prev };
      delete newRoles[roleId];
      return newRoles;
    });
  };

  // Permission checking functions
  const hasPermission = (userId, permission) => {
    const user = users.find(u => u.id === userId);
    if (!user || user.status !== 'active') return false;

    const role = roles[user.roleId];
    if (!role) return false;

    return role.permissions.includes(permission);
  };

  const hasAnyPermission = (userId, permissions) => {
    return permissions.some(permission => hasPermission(userId, permission));
  };

  const hasAllPermissions = (userId, permissions) => {
    return permissions.every(permission => hasPermission(userId, permission));
  };

  const getUserPermissions = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user || user.status !== 'active') return [];

    const role = roles[user.roleId];
    return role?.permissions || [];
  };

  // Utility functions
  const getUserById = (id) => users.find(user => user.id === id);
  const getRoleById = (roleId) => roles[roleId];
  const getUsersByRole = (roleId) => users.filter(user => user.roleId === roleId);
  const getActiveUsers = () => users.filter(user => user.status === 'active');
  const getInactiveUsers = () => users.filter(user => user.status === 'inactive');

  // Bulk operations
  const bulkUpdateUsers = (userIds, updates) => {
    setUsers(prev => prev.map(user => 
      userIds.includes(user.id) ? { ...user, ...updates } : user
    ));
  };

  const bulkDeleteUsers = (userIds) => {
    setUsers(prev => prev.filter(user => !userIds.includes(user.id)));
  };

  const value = {
    // Data
    users,
    roles,
    currentUser,
    permissions: PERMISSIONS,

    // User management
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    bulkUpdateUsers,
    bulkDeleteUsers,

    // Role management
    createRole,
    updateRole,
    deleteRole,

    // Permission checking
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getUserPermissions,

    // Utility functions
    getUserById,
    getRoleById,
    getUsersByRole,
    getActiveUsers,
    getInactiveUsers
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};