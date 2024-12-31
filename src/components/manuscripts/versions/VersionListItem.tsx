import React from 'react';
import { FileDown } from 'lucide-react';
import type { Database } from '../../../types/database';

type Version = Database['public']['Tables']['manuscript_versions']['Row'];

interface VersionListItemProps {
  version: Version;
}

export function VersionListItem({ version }: VersionListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 last:border-0">
      <div>
        <h4 className="text-sm font-medium text-gray-900">
          Version {version.version_number}
        </h4>
        <p className="text-sm text-gray-500">
          {new Date(version.created_at).toLocaleDateString()}
        </p>
      </div>
      <a
        href={version.file_url}
        download
        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <FileDown className="h-4 w-4 mr-2" />
        Download
      </a>
    </div>
  );
}