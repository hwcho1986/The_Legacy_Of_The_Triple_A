
import React, { useState, useEffect, useCallback } from 'react';
import { Language, GameSettings, Scene } from '../types';
import { SCENARIO, TRANSLATIONS } from '../constants';

interface Props {
  language: Language;
  settings: GameSettings;
  onQuit: () => void;
  onFinish: (nick: string, time: number) => void;
}

const GameEngine: React.FC<Props> = ({ language, settings, onQuit, onFinish }) => {
  const [currentSceneId, setCurrentSceneId] = useState("START");
  const [displayedText, setDisplayedText] = useState("");
  const [isTextDone, setIsTextDone] = useState(false);
  const [quizInput, setQuizInput] = useState("");
  const [startTime] = useState(Date.now());

  const currentScene = SCENARIO.find(s => s.id === currentSceneId) || SCENARIO[0];

  const handleNext = useCallback(() => {
    if (!isTextDone) {
      setDisplayedText(currentScene.dialogue);
      setIsTextDone(true);
      return;
    }
    
    if (currentScene.quiz) return; // Must answer quiz

    if (currentScene.nextId === "MENU") {
      onQuit();
    } else if (currentScene.nextId) {
      setCurrentSceneId(currentScene.nextId);
    }
  }, [currentScene, isTextDone, onQuit]);

  useEffect(() => {
    setDisplayedText("");
    setIsTextDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(prev => prev + currentScene.dialogue[i]);
      i++;
      if (i >= currentScene.dialogue.length) {
        clearInterval(interval);
        setIsTextDone(true);
      }
    }, (50 / settings.textSpeed));

    return () => clearInterval(interval);
  }, [currentSceneId, currentScene.dialogue, settings.textSpeed]);

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentScene.quiz) return;
    
    if (quizInput.trim() === currentScene.quiz.answer) {
      setCurrentSceneId(currentScene.quiz.successId);
    } else {
      setCurrentSceneId(currentScene.quiz.failureId);
    }
    setQuizInput("");
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden flex flex-col justify-end">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${currentScene.background})` }}
      />

      {/* Character */}
      {currentScene.character && (
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-10 transition-all duration-500">
          <img 
            src={currentScene.character} 
            alt="character" 
            className="h-[70vh] object-contain drop-shadow-2xl" 
          />
        </div>
      )}

      {/* UI Layer */}
      <div 
        className="relative z-20 w-full px-10 pb-10 flex flex-col items-center"
        onClick={handleNext}
      >
        <div 
          className="w-full max-w-6xl rounded-lg border-2 border-neutral-700 p-6 min-h-[200px] flex flex-col gap-2 cursor-pointer"
          style={{ backgroundColor: `rgba(0,0,0, ${settings.textboxOpacity})` }}
        >
          {currentScene.name && (
            <div className="text-xl font-bold text-red-500 mb-1 border-b border-red-900 w-fit px-4">
              {currentScene.name}
            </div>
          )}
          
          <div className="text-lg md:text-2xl leading-relaxed">
            {displayedText}
          </div>

          {currentScene.quiz && isTextDone && (
            <form onSubmit={handleQuizSubmit} className="mt-4 flex gap-4" onClick={(e) => e.stopPropagation()}>
              <input 
                autoFocus
                type="text" 
                value={quizInput}
                onChange={e => setQuizInput(e.target.value)}
                placeholder={currentScene.quiz.question}
                className="flex-1 bg-neutral-800 border border-neutral-600 px-4 py-2 text-white rounded outline-none focus:border-red-500"
              />
              <button 
                type="submit"
                className="px-6 py-2 bg-red-800 hover:bg-red-600 text-white rounded transition-colors"
              >
                입력
              </button>
            </form>
          )}

          {isTextDone && !currentScene.quiz && (
            <div className="self-end animate-bounce text-red-500 text-3xl mt-2">▼</div>
          )}
        </div>
      </div>

      {/* Global Control Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); onQuit(); }}
        className="absolute top-4 right-4 z-30 px-4 py-2 bg-black/50 border border-white/20 rounded hover:bg-white/20 transition-all text-sm"
      >
        Menu
      </button>
    </div>
  );
};

export default GameEngine;
