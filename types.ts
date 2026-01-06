
export type ScreenType = 'DISCLAIMER' | 'MENU' | 'GAME' | 'OPTIONS' | 'SCORE' | 'CREDITS' | 'EXIT_CONFIRM';

export enum Language {
  KO = 'KO',
  EN = 'EN',
  JP = 'JP',
  CN_S = 'CN_S',
  CN_T = 'CN_T',
  ES = 'ES'
}

export interface LocalizationTable {
  [key: string]: {
    [key in Language]: string;
  };
}

export interface Quiz {
  question: string;
  answer: string;
  successId: string;
  failureId: string;
}

export interface Scene {
  id: string;
  background: string;
  character?: string;
  name?: string;
  dialogue: string;
  nextId?: string;
  quiz?: Quiz;
}

export interface GameSettings {
  masterVolume: number;
  bgmVolume: number;
  sfxVolume: number;
  voiceVolume: number;
  textSpeed: number;
  autoMode: boolean;
  textboxOpacity: number;
}

export interface ScoreEntry {
  nickname: string;
  playtime: number;
  date: string;
}
