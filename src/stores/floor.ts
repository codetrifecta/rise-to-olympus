import { create } from 'zustand';
import { IFloor, IRoom, Item } from '../types';
import { TUTORIAL_FLOOR, TUTORIAL_FLOOR_CHEST_ITEMS } from '../constants/floor';

interface IFloorStore {
  floor: IFloor;
  setFloor: (floor: IFloor) => void;

  currentRoom: IRoom | null;
  setCurrentRoom: (currentRoom: IRoom) => void;

  floorChestItems: Map<string, Item[]>;
  setFloorChestItems: (floorChestItems: Map<string, Item[]>) => void;
}

export const useFloorStore = create<IFloorStore>((set) => ({
  floor: TUTORIAL_FLOOR,
  setFloor: (floor: IFloor) => set({ floor }),

  currentRoom: null,
  setCurrentRoom: (currentRoom: IRoom) => set({ currentRoom }),

  floorChestItems: TUTORIAL_FLOOR_CHEST_ITEMS,
  setFloorChestItems: (floorChestItems: Map<string, Item[]>) =>
    set({ floorChestItems }),
}));
