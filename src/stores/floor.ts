import { create } from 'zustand';
import { IFloor, IRoom } from '../types';
import { TARTARUS_CAMP_FLOOR, TUTORIAL_FLOOR } from '../constants/floor';

interface IFloorStore {
  floor: IFloor;
  setFloor: (floor: IFloor) => void;

  currentRoom: IRoom | null;
  setCurrentRoom: (currentRoom: IRoom) => void;
}

export const useFloorStore = create<IFloorStore>((set) => ({
  floor: TARTARUS_CAMP_FLOOR,
  setFloor: (floor: IFloor) => set({ floor }),

  currentRoom: null,
  setCurrentRoom: (currentRoom: IRoom) => set({ currentRoom }),
}));
