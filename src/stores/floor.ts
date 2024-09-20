import { create } from 'zustand';
import { IFloor, IRoom, Item } from '../types';

interface IFloorStore {
  floor: IFloor | null;
  setFloor: (floor: IFloor) => void;

  currentRoom: IRoom | null;
  setCurrentRoom: (currentRoom: IRoom) => void;

  floorChestItems: Map<string, Item[]>;
  setFloorChestItems: (floorChestItems: Map<string, Item[]>) => void;

  resetFloorStore: () => void;
}

export const useFloorStore = create<IFloorStore>((set) => ({
  floor: null,
  setFloor: (floor: IFloor) => set({ floor }),

  currentRoom: null,
  setCurrentRoom: (currentRoom: IRoom) => set({ currentRoom }),

  floorChestItems: new Map(),
  setFloorChestItems: (floorChestItems: Map<string, Item[]>) =>
    set({ floorChestItems }),

  resetFloorStore: () =>
    set({
      floor: null,
      currentRoom: null,
      floorChestItems: new Map(),
    }),
}));
