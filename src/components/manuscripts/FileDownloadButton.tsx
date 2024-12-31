import React from 'react';
import { FileDown } from 'lucide-react';
import { filesService } from '../../services/files.service';

interface FileDownloadButtonProps {
  fileUrl: string;
  fileName?: string;
  className?: string;
}

export function FileDownloadButton({
  fileUrl,
  fileName,
  className = ''
}: FileDownloadButtonProps) {
  const [downloading, setDownloading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleDownload = async () => {
    setDownloading(true);
    setError(null);

    try {
      await filesService.downloadManuscriptFile(fileUrl);
    } catch (err) {
      setError('Failed to download file');
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={className}>
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        <FileDown className="h-5 w-5 mr-2" />
        {downloading ? 'Downloading...' : fileName || 'Download File'}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}