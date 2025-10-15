
import React from 'react';
import type { ToastType } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { CloseIcon } from './icons/CloseIcon';
import { InfoIcon } from './icons/InfoIcon';
import { ErrorIcon } from './icons/ErrorIcon';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const typeConfig = {
  success: {
    classes: 'bg-green-900/60 text-green-300 border border-green-500/50',
    Icon: CheckIcon,
    iconContainerClasses: 'p-1.5 bg-green-500/20 rounded-full'
  },
  info: {
    classes: 'bg-blue-900/60 text-blue-300 border border-blue-500/50',
    Icon: InfoIcon,
    iconContainerClasses: 'p-1.5 bg-blue-500/20 rounded-full'
  },
  error: {
    classes: 'bg-red-900/60 text-red-300 border border-red-500/50',
    Icon: ErrorIcon,
    iconContainerClasses: 'p-1.5 bg-red-500/20 rounded-full'
  },
};

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const { classes, Icon, iconContainerClasses } = typeConfig[type];
  
  return (
    <div 
      className={`fixed top-24 right-5 z-50 flex items-center p-4 max-w-sm w-full rounded-lg shadow-lg backdrop-blur-sm animate-slide-in ${classes}`} 
      role="alert"
    >
      <div className={iconContainerClasses}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="ml-3 font-medium flex-1">{message}</div>
      <button 
        onClick={onClose} 
        className="ml-auto -mr-1 p-1.5 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Close"
      >
        <CloseIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
