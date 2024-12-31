import React from 'react';
import { FileDown } from 'lucide-react';
import type { Database } from '../../types/database';

type Version = Database['public']['Tables']['manuscript_versions']['Row'];

interface VersionListProps {
  versions: Version[];
}

export function VersionList({ versions }: VersionListProps) {
  if (versions.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No versions available
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {versions.map((version) => (
        <div key={version.id} className="p-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              Version {version.version_number}
            </h3>
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
      ))}
    </div>
  );
}