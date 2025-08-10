import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'error';
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ 
  isOpen, 
  onClose, 
  message, 
  type 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {type === 'success' ? (
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
            ) : (
              <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
            )}
            <h3 className="text-lg font-semibold text-gray-800">
              {type === 'success' ? 'Success!' : 'Error!'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        <button
          onClick={onClose}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            type === 'success'
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          Close
        </button>
      </div>
    </div>
  );
};