
import React, { useState, useEffect } from 'react';
import { ScreenType, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  language: Language;
  onNavigate: (screen: ScreenType) => void;
}

const MENU_ITEMS: { id: ScreenType; labelKey: string }[] = [
  { id: 'GAME', labelKey: 'START_GAME' },
  { id: 'OPTIONS', labelKey: 'OPTIONS' },
  { id: 'SCORE', labelKey: 'SCORE' },
  { id: 'CREDITS', labelKey: 'CREDITS' },
  { id: 'EXIT_CONFIRM', labelKey: 'EXIT' },
];

const MainMenu: React.FC<Props> = ({ language, onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w': case 'W': case 'ArrowUp':
          setSelectedIndex(prev => (prev === 0 ? MENU_ITEMS.length - 1 : prev - 1));
          break;
        case 's': case 'S': case 'ArrowDown':
          setSelectedIndex(prev => (prev === MENU_ITEMS.length - 1 ? 0 : prev + 1));
          break;
        case 'Enter':
          onNavigate(MENU_ITEMS[selectedIndex].id);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onNavigate]);

  return (
    <div className="h-full w-full bg-neutral-900 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/id/164/1920/1080')] bg-cover bg-center"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-cinzel text-4xl md:text-7xl mb-2 text-white drop-shadow-lg tracking-widest text-center">
          The Legacy Of The Triple A
        </h1>
        <p className="font-cinzel text-xl text-neutral-400 mb-20 tracking-[0.5em]">
          대괴도 AAA의 유산
        </p>

        <div className="space-y-4">
          {MENU_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`
                w-64 py-3 text-xl transition-all duration-200 border-l-4
                ${selectedIndex === index 
                  ? 'bg-white text-black border-red-600 pl-8 scale-105' 
                  : 'bg-transparent text-white border-transparent pl-4 hover:border-white'
                }
              `}
            >
              {TRANSLATIONS[item.labelKey][language]}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 text-neutral-500 text-sm">
        Use W/S, Arrow Keys or Mouse to Navigate
      </div>
    </div>
  );
};

export default MainMenu;
