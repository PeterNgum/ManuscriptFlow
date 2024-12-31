import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, Users, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Navigation() {
  const { user } = useAuth();

  const navItems = [
    { to: '/manuscripts', label: 'Manuscripts', icon: FileText },
    ...(user?.role === 'admin' ? [
      { to: '/admin/reviewers', label: 'Reviewers', icon: Users },
      { to: '/admin/settings', label: 'Settings', icon: Settings }
    ] : [])
  ];

  return (
    <nav className="bg-gray-50 border-r border-gray-200">
      <div className="flex flex-col h-full">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium ${
                isActive
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-2" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}