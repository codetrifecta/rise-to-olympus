import { create } from 'zustand';

interface IGameStore {}

export const useGameStore = create<IGameStore>((set, get) => ({
  currentScriptId: 0,
}));
