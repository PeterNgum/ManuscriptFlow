import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <FileText className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ManuscriptFlow</span>
            </Link>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center text-gray-700 hover:text-indigo-600"
              >
                <User className="h-5 w-5 mr-1" />
                <span>{user.firstName}</span>
              </Link>
              <button
                onClick={signOut}
                className="flex items-center text-gray-700 hover:text-indigo-600"
              >
                <LogOut className="h-5 w-5 mr-1" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}