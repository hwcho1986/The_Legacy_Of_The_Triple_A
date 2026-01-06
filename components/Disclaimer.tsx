
import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  onFinish: () => void;
  language: Language;
}

const Disclaimer: React.FC<Props> = ({ onFinish, language }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade In
    const fadeIn = setTimeout(() => setOpacity(1), 500);
    // Start Fade Out
    const fadeOut = setTimeout(() => setOpacity(0), 4000);
    // Trigger Finish
    const finish = setTimeout(onFinish, 5500);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
      clearTimeout(finish);
    };
  }, [onFinish]);

  return (
    <div className="flex items-center justify-center h-full p-10 bg-black">
      <p 
        className="text-center text-lg md:text-2xl leading-relaxed max-w-4xl transition-opacity duration-1000 ease-in-out"
        style={{ opacity }}
      >
        {TRANSLATIONS.DISCLAIMER_TEXT[language]}
      </p>
    </div>
  );
};

export default Disclaimer;
