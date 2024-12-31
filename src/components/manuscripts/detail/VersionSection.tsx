import React from 'react';
import { VersionListItem } from '../versions/VersionListItem';
import { VersionUploadButton } from '../versions/VersionUploadButton';
import type { Database } from '../../../types/database';

type Version = Database['public']['Tables']['manuscript_versions']['Row'];

interface VersionSectionProps {
  versions: Version[];
  canUpload: boolean;
  onVersionUpload: (file: File) => Promise<void>;
}

export function VersionSection({ versions, canUpload, onVersionUpload }: VersionSectionProps) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Versions</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {versions.map((version) => (
          <VersionListItem key={version.id} version={version} />
        ))}
      </div>
      {canUpload && (
        <div className="p-4 border-t border-gray-200">
          <VersionUploadButton onFileSelect={onVersionUpload} />
        </div>
      )}
    </div>
  );
}