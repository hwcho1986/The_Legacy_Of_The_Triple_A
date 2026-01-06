
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  language: Language;
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitConfirm: React.FC<Props> = ({ language, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 p-10 rounded-2xl text-center shadow-2xl">
        <p className="text-xl mb-8 leading-relaxed">
          {TRANSLATIONS.EXIT_POPUP[language]}
        </p>
        <div className="flex gap-4">
          <button 
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-800 hover:bg-red-700 rounded font-bold transition-all"
          >
            {TRANSLATIONS.YES[language]}
          </button>
          <button 
            onClick={onCancel}
            className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 rounded font-bold transition-all"
          >
            {TRANSLATIONS.NO[language]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitConfirm;
