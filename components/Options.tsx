
import React, { useState } from 'react';
import { Language, GameSettings } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  language: Language;
  settings: GameSettings;
  onSave: (s: GameSettings) => void;
  onClose: () => void;
}

const Options: React.FC<Props> = ({ language, settings, onSave, onClose }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [tab, setTab] = useState<'SOUND' | 'DISPLAY'>('SOUND');

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const Slider = ({ label, value, min = 0, max = 100, onChange }: { label: string, value: number, min?: number, max?: number, onChange: (v: number) => void }) => (
    <div className="flex items-center justify-between gap-8 py-2">
      <span className="w-32">{label}</span>
      <input 
        type="range" min={min} max={max} value={value} 
        onChange={e => onChange(parseInt(e.target.value))}
        className="flex-1 accent-red-600"
      />
      <span className="w-12 text-right">{value}</span>
    </div>
  );

  return (
    <div className="h-full w-full bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-black border border-neutral-700 rounded-xl overflow-hidden shadow-2xl">
        <div className="flex border-b border-neutral-700">
          <button 
            onClick={() => setTab('SOUND')}
            className={`flex-1 py-4 text-lg font-bold ${tab === 'SOUND' ? 'bg-neutral-800 text-red-500' : 'text-neutral-500'}`}
          >
            SOUND
          </button>
          <button 
            onClick={() => setTab('DISPLAY')}
            className={`flex-1 py-4 text-lg font-bold ${tab === 'DISPLAY' ? 'bg-neutral-800 text-red-500' : 'text-neutral-500'}`}
          >
            DISPLAY
          </button>
        </div>

        <div className="p-10 h-96 overflow-y-auto">
          {tab === 'SOUND' ? (
            <div className="space-y-4">
              <Slider label="Master Volume" value={localSettings.masterVolume} onChange={v => setLocalSettings(s => ({...s, masterVolume: v}))} />
              <Slider label="BGM Volume" value={localSettings.bgmVolume} onChange={v => setLocalSettings(s => ({...s, bgmVolume: v}))} />
              <Slider label="SFX Volume" value={localSettings.sfxVolume} onChange={v => setLocalSettings(s => ({...s, sfxVolume: v}))} />
              <Slider label="Voice Volume" value={localSettings.voiceVolume} onChange={v => setLocalSettings(s => ({...s, voiceVolume: v}))} />
            </div>
          ) : (
            <div className="space-y-4">
              <Slider label="Text Speed" value={localSettings.textSpeed} min={1} max={5} onChange={v => setLocalSettings(s => ({...s, textSpeed: v}))} />
              <div className="flex items-center justify-between py-2">
                <span>Auto Mode</span>
                <input 
                  type="checkbox" checked={localSettings.autoMode} 
                  onChange={e => setLocalSettings(s => ({...s, autoMode: e.target.checked}))}
                  className="w-6 h-6 accent-red-600"
                />
              </div>
              <Slider label="Box Opacity" value={Math.round(localSettings.textboxOpacity * 100)} onChange={v => setLocalSettings(s => ({...s, textboxOpacity: v / 100}))} />
            </div>
          )}
        </div>

        <div className="flex p-6 border-t border-neutral-700 gap-4">
          <button onClick={handleSave} className="flex-1 py-3 bg-red-800 hover:bg-red-700 rounded text-white font-bold transition-all">SAVE & CLOSE</button>
          <button onClick={onClose} className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 rounded text-white font-bold transition-all">CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default Options;
