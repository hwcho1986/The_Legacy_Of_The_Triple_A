
import React, { useState, useEffect, useCallback } from 'react';
import { ScreenType, Language, GameSettings, ScoreEntry } from './types';
import Disclaimer from './components/Disclaimer';
import MainMenu from './components/MainMenu';
import GameEngine from './components/GameEngine';
import Options from './components/Options';
import Scoreboard from './components/Scoreboard';
import Credits from './components/Credits';
import ExitConfirm from './components/ExitConfirm';

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenType>('DISCLAIMER');
  const [language, setLanguage] = useState<Language>(Language.KO);
  const [settings, setSettings] = useState<GameSettings>({
    masterVolume: 80,
    bgmVolume: 50,
    sfxVolume: 60,
    voiceVolume: 100,
    textSpeed: 1,
    autoMode: false,
    textboxOpacity: 0.8
  });

  const [scores, setScores] = useState<ScoreEntry[]>([]);

  // Detect Language
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0].toUpperCase();
    if (browserLang === 'KO') setLanguage(Language.KO);
    else if (browserLang === 'EN') setLanguage(Language.EN);
    else if (browserLang === 'JA') setLanguage(Language.JP);
    else if (browserLang === 'ZH') setLanguage(Language.CN_S);
    else if (browserLang === 'ES') setLanguage(Language.ES);
    else setLanguage(Language.EN);
  }, []);

  const handleFinishDisclaimer = useCallback(() => {
    setScreen('MENU');
  }, []);

  const addScore = (nickname: string, playtime: number) => {
    const newScore: ScoreEntry = {
      nickname,
      playtime,
      date: new Date().toLocaleString()
    };
    setScores(prev => [newScore, ...prev]);
  };

  return (
    <div className="w-full h-screen relative bg-black select-none">
      {screen === 'DISCLAIMER' && (
        <Disclaimer onFinish={handleFinishDisclaimer} language={language} />
      )}
      
      {screen === 'MENU' && (
        <MainMenu 
          language={language} 
          onNavigate={(target) => setScreen(target)} 
        />
      )}

      {screen === 'GAME' && (
        <GameEngine 
          language={language} 
          settings={settings}
          onQuit={() => setScreen('MENU')}
          onFinish={(nick, time) => {
            addScore(nick, time);
            setScreen('SCORE');
          }}
        />
      )}

      {screen === 'OPTIONS' && (
        <Options 
          language={language} 
          settings={settings} 
          onSave={setSettings} 
          onClose={() => setScreen('MENU')} 
        />
      )}

      {screen === 'SCORE' && (
        <Scoreboard 
          language={language} 
          scores={scores} 
          onClose={() => setScreen('MENU')} 
        />
      )}

      {screen === 'CREDITS' && (
        <Credits 
          language={language} 
          onClose={() => setScreen('MENU')} 
        />
      )}

      {screen === 'EXIT_CONFIRM' && (
        <ExitConfirm 
          language={language} 
          onConfirm={() => window.close()} 
          onCancel={() => setScreen('MENU')} 
        />
      )}
    </div>
  );
};

export default App;
