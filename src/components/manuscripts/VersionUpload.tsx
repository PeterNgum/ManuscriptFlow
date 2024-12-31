import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { manuscriptsService } from '../../services/manuscripts.service';

interface VersionUploadProps {
  manuscriptId: string;
  currentVersion: number;
  onVersionUploaded: () => void;
}

export function VersionUpload({ manuscriptId, currentVersion, onVersionUploaded }: VersionUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      await manuscriptsService.uploadVersion(manuscriptId, currentVersion + 1, file);
      onVersionUploaded();
    } catch (err) {
      setError('Failed to upload version');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      {error && (
        <div className="mb-4 text-sm text-red-600">
          {error}
        </div>
      )}
      <label className="block">
        <span className="sr-only">Choose file</span>
        <div className="relative">
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <button
            onClick={() => document.querySelector('input[type="file"]')?.click()}
            disabled={uploading}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <Upload className="h-5 w-5 mr-2" />
            {uploading ? 'Uploading...' : 'Upload New Version'}
          </button>
        </div>
      </label>
    </div>
  );
}