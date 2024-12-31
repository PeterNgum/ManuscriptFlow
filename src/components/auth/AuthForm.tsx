import React from 'react';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  title: string;
  subtitle: string;
  alternateLink: {
    text: string;
    linkText: string;
    to: string;
  };
  children: React.ReactNode;
}

export function AuthForm({ title, subtitle, alternateLink, children }: AuthFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <FileText className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
            ManuscriptFlow
          </h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {alternateLink.text}{' '}
            <Link to={alternateLink.to} className="font-medium text-indigo-600 hover:text-indigo-500">
              {alternateLink.linkText}
            </Link>
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}