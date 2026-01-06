
import React from 'react';
import { Language } from '../types';

interface Props {
  language: Language;
  onClose: () => void;
}

const Credits: React.FC<Props> = ({ language, onClose }) => {
  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center p-10 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/id/160/1920/1080')] bg-cover"></div>
      
      <div className="relative z-10 text-center space-y-12 animate-fadeIn">
        <h2 className="text-5xl font-cinzel text-red-600 tracking-tighter">THE LEGACY OF THE TRIPLE A</h2>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-2">Director & Design</h3>
            <p className="text-2xl">Creative Visionary</p>
          </section>

          <section>
            <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-2">Scenario Writing</h3>
            <p className="text-2xl">Mystery Weaver</p>
          </section>

          <section>
            <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-2">Programming</h3>
            <p className="text-2xl">Senior Frontend Engineer</p>
          </section>

          <section>
            <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-2">Original Source</h3>
            <p className="text-neutral-400 text-sm">zzgulani.wo.to archives</p>
          </section>
        </div>

        <button 
          onClick={onClose}
          className="mt-12 px-12 py-3 border border-white/20 hover:bg-white/10 transition-all uppercase tracking-widest"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Credits;
