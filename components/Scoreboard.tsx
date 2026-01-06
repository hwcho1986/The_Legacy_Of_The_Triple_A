
import React from 'react';
import { Language, ScoreEntry } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  language: Language;
  scores: ScoreEntry[];
  onClose: () => void;
}

const Scoreboard: React.FC<Props> = ({ language, scores, onClose }) => {
  const totalPlaytime = scores.reduce((acc, s) => acc + s.playtime, 0);

  return (
    <div className="h-full w-full bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-black border border-neutral-700 rounded-xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-neutral-700 flex justify-between items-center">
          <h2 className="text-3xl font-cinzel text-red-500">SCORE BOARD</h2>
          <div className="text-right">
            <div className="text-sm text-neutral-500">Total Cleared: {scores.length}</div>
            <div className="text-sm text-neutral-500">Total Playtime: {Math.floor(totalPlaytime / 1000)}s</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-500">
                <th className="py-2 px-4">Nickname</th>
                <th className="py-2 px-4">Playtime</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-10 text-center text-neutral-600">No data yet. Complete the game to record your score!</td>
                </tr>
              ) : (
                scores.map((score, i) => (
                  <tr key={i} className="border-b border-neutral-900 hover:bg-neutral-900 transition-colors">
                    <td className="py-3 px-4 font-bold">{score.nickname}</td>
                    <td className="py-3 px-4">{Math.floor(score.playtime / 1000)}s</td>
                    <td className="py-3 px-4 text-sm text-neutral-400">{score.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-neutral-700">
          <button onClick={onClose} className="w-full py-4 bg-red-800 hover:bg-red-700 rounded font-bold transition-all">BACK TO MENU</button>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
