import React from 'react';
import { FileText, Send, Edit } from 'lucide-react';
import type { Database } from '../../../types/database';

type Status = Database['public']['Tables']['manuscripts']['Row']['status'];

interface ManuscriptActionsProps {
  status: Status;
  isAuthor: boolean;
  onSubmit?: () => void;
  onEdit?: () => void;
  onUploadVersion?: () => void;
}

export function ManuscriptActions({
  status,
  isAuthor,
  onSubmit,
  onEdit,
  onUploadVersion
}: ManuscriptActionsProps) {
  if (!isAuthor) return null;

  return (
    <div className="flex justify-end space-x-4">
      {status === 'draft' && (
        <>
          <button
            onClick={onSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Submit for Review
          </button>
          <button
            onClick={onEdit}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
        </>
      )}
      {(status === 'revision_requested' || status === 'draft') && (
        <button
          onClick={onUploadVersion}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <FileText className="h-4 w-4 mr-2" />
          Upload New Version
        </button>
      )}
    </div>
  );
}