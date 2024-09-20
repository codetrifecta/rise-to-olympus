import { create } from 'zustand';
import { ILog } from '../types';
import { LOG_TUTORIAL_START_ROOM } from '../constants/log';

interface ILogStore {
  logs: ILog[];
  addLog: (log: ILog) => void;
  clearLogs: () => void;
  setLogs: (logs: ILog[]) => void;
}

export const useLogStore = create<ILogStore>((set, get) => ({
  logs: LOG_TUTORIAL_START_ROOM,
  addLog: (log) => set({ logs: [...get().logs, log] }),
  clearLogs: () => set({ logs: [] }),
  setLogs: (logs) => set({ logs }),
}));
