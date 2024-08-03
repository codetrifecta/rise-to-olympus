import { create } from 'zustand';
import { IScriptItem } from '../types';

interface IScriptStore {
  currentScript: IScriptItem[] | null;
  currentScriptItem: IScriptItem | null;
  currentScriptItemIndex: number;
  setCurrentScript: (script: IScriptItem[] | null) => void;
  setCurrentScriptItem: (scriptItem: IScriptItem | null) => void;
  setCurrentScriptItemIndex: (index: number) => void;
}

export const useScriptStore = create<IScriptStore>((set) => ({
  currentScript: null,
  currentScriptItem: null,
  currentScriptItemIndex: 0,
  setCurrentScript: (script) => {
    set({ currentScript: script });
  },
  setCurrentScriptItem: (scriptItem) => {
    set({ currentScriptItem: scriptItem });
  },
  setCurrentScriptItemIndex: (index) => {
    set({ currentScriptItemIndex: index });
  },
}));
