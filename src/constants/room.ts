import { IRoom } from '../types';
import art_room_tutorial_floor from '../assets/sprites/tiles/tutorial/room_tutorial_floor.png';
import art_room_tutorial_obstacle from '../assets/sprites/tiles/tutorial/room_tutorial_obstacle.png';
import art_room_tutorial_wall from '../assets/sprites/tiles/tutorial/room_tutorial_wall.png';

export enum ROOM_TYPE {
  NULL = 0,
  COMMON = 1,
  START = 2,
  BOSS = 3,
  MINIBOSS = 4,
  SHOP = 5,
  INTERMEDIATE = 6,
}

export const BASE_ROOM: IRoom = {
  id: 0,
  position: [0, 0],
  type: ROOM_TYPE.NULL,
  isKnown: false,
  isCleared: false,
  northDoor: false,
  southDoor: false,
  eastDoor: false,
  westDoor: false,
  enemies: [],
  roomEntityPositions: new Map(),
  roomLength: 21,
  roomTileMatrix: [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
    [3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 5, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 3],
    [4, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 4],
    [3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 3],
    [3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
    [3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ],
  artFloor: art_room_tutorial_floor,
  artObstacle: art_room_tutorial_obstacle,
  artWall: art_room_tutorial_wall,
};

import art_room_tartarus_common_floor_01 from '../assets/sprites/tiles/tartarus/room_tartarus_common_floor_01.png';
import art_room_tartarus_common_obstacle_01 from '../assets/sprites/tiles/tartarus/room_tartarus_common_obstacle_01.png';

import art_room_tartarus_common_floor_02 from '../assets/sprites/tiles/tartarus/room_tartarus_common_floor_02.png';
import art_room_tartarus_common_obstacle_02 from '../assets/sprites/tiles/tartarus/room_tartarus_common_obstacle_02.png';

import art_room_tartarus_common_floor_03 from '../assets/sprites/tiles/tartarus/room_tartarus_common_floor_03.png';
import art_room_tartarus_common_obstacle_03 from '../assets/sprites/tiles/tartarus/room_tartarus_common_obstacle_03.png';

import art_room_tartarus_common_floor_04 from '../assets/sprites/tiles/tartarus/room_tartarus_common_floor_04.png';
import art_room_tartarus_common_obstacle_04 from '../assets/sprites/tiles/tartarus/room_tartarus_common_obstacle_04.png';

import art_room_tartarus_common_floor_05 from '../assets/sprites/tiles/tartarus/room_tartarus_common_floor_05.png';
import art_room_tartarus_common_obstacle_05 from '../assets/sprites/tiles/tartarus/room_tartarus_common_obstacle_05.png';

import art_room_tartarus_common_floor_06 from '../assets/sprites/tiles/tartarus/room_tartarus_common_floor_06.png';
import art_room_tartarus_common_obstacle_06 from '../assets/sprites/tiles/tartarus/room_tartarus_common_obstacle_06.png';

import art_room_tartarus_common_floor_07 from '../assets/sprites/tiles/tartarus/room_tartarus_common_floor_07.png';
import art_room_tartarus_common_obstacle_07 from '../assets/sprites/tiles/tartarus/room_tartarus_common_obstacle_07.png';

import art_room_tartarus_common_floor_08 from '../assets/sprites/tiles/tartarus/room_tartarus_common_floor_08.png';
import art_room_tartarus_common_obstacle_08 from '../assets/sprites/tiles/tartarus/room_tartarus_common_obstacle_08.png';

import art_room_tartarus_common_floor_09 from '../assets/sprites/tiles/tartarus/room_tartarus_common_floor_09.png';
import art_room_tartarus_common_obstacle_09 from '../assets/sprites/tiles/tartarus/room_tartarus_common_obstacle_09.png';

import art_room_tartarus_common_floor_10 from '../assets/sprites/tiles/tartarus/room_tartarus_common_floor_10.png';
import art_room_tartarus_common_obstacle_10 from '../assets/sprites/tiles/tartarus/room_tartarus_common_obstacle_10.png';

import art_room_tartarus_boss_floor from '../assets/sprites/tiles/tartarus/room_tartarus_boss_floor.png';
import art_room_tartarus_boss_obstacle from '../assets/sprites/tiles/tartarus/room_tartarus_boss_obstacle.png';
import { ENEMY_PRESET_ID, ENEMY_PRESETS, ENTITY_TYPE } from './entity';

export const ROOM_TARTARUS_START: IRoom = {
  ...BASE_ROOM,
  id: 0,
  type: ROOM_TYPE.START,
  isKnown: true,
  isCleared: true,
  roomTileMatrix: [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
    [3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 5, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 3],
    [4, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 4],
    [3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 2, 3],
    [3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
    [3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ],
  artFloor: art_room_tutorial_floor,
  artObstacle: art_room_tutorial_obstacle,
};

export const ROOM_TARTARUS_BOSS: IRoom = {
  ...BASE_ROOM,
  id: 0,
  type: ROOM_TYPE.BOSS,
  roomTileMatrix: [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
    [3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 3],
    [3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ],
  enemies: [
    {
      ...ENEMY_PRESETS[ENEMY_PRESET_ID.CORRUPT_MINOTAUR],
      id: 1,
    },
    {
      ...ENEMY_PRESETS[ENEMY_PRESET_ID.INFERNAL_MINOTAUR],
      id: 2,
    },
    {
      ...ENEMY_PRESETS[ENEMY_PRESET_ID.INFERNAL_MINOTAUR],
      id: 3,
    },
    {
      ...ENEMY_PRESETS[ENEMY_PRESET_ID.INFERNAL_MINOTAUR],
      id: 4,
    },
  ],
  roomEntityPositions: new Map([
    ['10,10', [ENTITY_TYPE.ENEMY, 1]],
    ['4,4', [ENTITY_TYPE.ENEMY, 2]],
    ['5,15', [ENTITY_TYPE.ENEMY, 3]],
    ['15,12', [ENTITY_TYPE.ENEMY, 4]],
  ]),
  artFloor: art_room_tartarus_boss_floor,
  artObstacle: art_room_tartarus_boss_obstacle,
};

export const ROOMS_TARTARUS_COMMON: IRoom[] = [
  {
    ...BASE_ROOM,
    id: 1,
    type: ROOM_TYPE.COMMON,
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 2, 1, 3],
      [3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3],
      [3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3],
      [4, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [3, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 3],
      [3, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 2, 2, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 3],
      [3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 1,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 2,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 3,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 4,
      },
    ],
    roomEntityPositions: new Map([
      ['11,4', [ENTITY_TYPE.ENEMY, 1]],
      ['7,10', [ENTITY_TYPE.ENEMY, 2]],
      ['11,15', [ENTITY_TYPE.ENEMY, 3]],
      ['15,10', [ENTITY_TYPE.ENEMY, 4]],
    ]),
    artFloor: art_room_tartarus_common_floor_01,
    artObstacle: art_room_tartarus_common_obstacle_01,
  },
  {
    ...BASE_ROOM,
    id: 2,
    type: ROOM_TYPE.COMMON,
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0, 2, 2, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 4],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.TARTARIAN_HOUND],
        id: 1,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
        id: 2,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
        id: 3,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
        id: 4,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
        id: 5,
      },
    ],
    roomEntityPositions: new Map([
      ['11,10', [ENTITY_TYPE.ENEMY, 1]],
      ['7,6', [ENTITY_TYPE.ENEMY, 2]],
      ['9,15', [ENTITY_TYPE.ENEMY, 3]],
      ['16,13', [ENTITY_TYPE.ENEMY, 4]],
      ['14,15', [ENTITY_TYPE.ENEMY, 5]],
    ]),
    artFloor: art_room_tartarus_common_floor_02,
    artObstacle: art_room_tartarus_common_obstacle_02,
  },
  {
    ...BASE_ROOM,
    id: 3,
    type: ROOM_TYPE.COMMON,
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3],
      [3, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 0, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 2, 2, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 2, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.SKYWARD_TITAN],
        id: 1,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.SKYWARD_TITAN],
        id: 2,
      },
    ],
    roomEntityPositions: new Map([
      ['8,8', [ENTITY_TYPE.ENEMY, 1]],
      ['13,11', [ENTITY_TYPE.ENEMY, 2]],
    ]),
    artFloor: art_room_tartarus_common_floor_03,
    artObstacle: art_room_tartarus_common_obstacle_03,
  },
  {
    ...BASE_ROOM,
    id: 4,
    type: ROOM_TYPE.COMMON,
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 3],
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 3],
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 3],
      [4, 1, 1, 1, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 4],
      [4, 1, 1, 1, 2, 2, 2, 1, 1, 1, 5, 1, 2, 2, 2, 2, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 4],
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 3],
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
      [3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
      [3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3],
      [3, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 3],
      [3, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.INFERNAL_MINOTAUR],
        id: 1,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.INFERNAL_MINOTAUR],
        id: 2,
      },
    ],
    roomEntityPositions: new Map([
      ['8,10', [ENTITY_TYPE.ENEMY, 1]],
      ['12,10', [ENTITY_TYPE.ENEMY, 2]],
    ]),
    artFloor: art_room_tartarus_common_floor_04,
    artObstacle: art_room_tartarus_common_obstacle_04,
  },
  {
    ...BASE_ROOM,
    id: 5,
    type: ROOM_TYPE.COMMON,
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 2, 1, 1, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 3],
      [3, 1, 1, 1, 5, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 2, 1, 1, 3],
      [4, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [3, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3],
      [3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 0, 0, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.EREBUS_FIEND],
        id: 1,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.EREBUS_FIEND],
        id: 2,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 3,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 4,
      },
    ],
    roomEntityPositions: new Map([
      ['8,7', [ENTITY_TYPE.ENEMY, 1]],
      ['13,13', [ENTITY_TYPE.ENEMY, 2]],
      ['13,8', [ENTITY_TYPE.ENEMY, 3]],
      ['10,12', [ENTITY_TYPE.ENEMY, 4]],
    ]),
    artFloor: art_room_tartarus_common_floor_05,
    artObstacle: art_room_tartarus_common_obstacle_05,
  },
  {
    ...BASE_ROOM,
    id: 6,
    type: ROOM_TYPE.COMMON,
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3],
      [3, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 3],
      [3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
      [3, 1, 1, 1, 1, 0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 3],
      [4, 1, 1, 1, 2, 0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 4],
      [3, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 3],
      [3, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 3],
      [3, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 3],
      [3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 3],
      [3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.TARTARIAN_LYCAN],
        id: 1,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.TARTARIAN_LYCAN],
        id: 2,
      },
    ],
    roomEntityPositions: new Map([
      ['7,6', [ENTITY_TYPE.ENEMY, 1]],
      ['16,14', [ENTITY_TYPE.ENEMY, 2]],
    ]),
    artFloor: art_room_tartarus_common_floor_06,
    artObstacle: art_room_tartarus_common_obstacle_06,
  },
  {
    ...BASE_ROOM,
    id: 7,
    type: ROOM_TYPE.COMMON,
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 3],
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 3],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [3, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
      [3, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 3],
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.INFERNAL_MINOTAUR],
        id: 1,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
        id: 2,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
        id: 3,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
        id: 4,
      },
    ],
    roomEntityPositions: new Map([
      ['9,10', [ENTITY_TYPE.ENEMY, 1]],
      ['4,2', [ENTITY_TYPE.ENEMY, 2]],
      ['14,1', [ENTITY_TYPE.ENEMY, 3]],
      ['17,19', [ENTITY_TYPE.ENEMY, 4]],
    ]),
    artFloor: art_room_tartarus_common_floor_07,
    artObstacle: art_room_tartarus_common_obstacle_07,
  },
  {
    ...BASE_ROOM,
    id: 8,
    type: ROOM_TYPE.COMMON,
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 3],
      [3, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 3],
      [3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3],
      [4, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 4],
      [4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4],
      [4, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 4],
      [3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3],
      [3, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 3],
      [3, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 3],
      [3, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.TARTARIAN_LYCAN],
        id: 1,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 2,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 3,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 4,
      },
    ],
    roomEntityPositions: new Map([
      ['9,10', [ENTITY_TYPE.ENEMY, 1]],
      ['6,5', [ENTITY_TYPE.ENEMY, 2]],
      ['6,15', [ENTITY_TYPE.ENEMY, 3]],
      ['15,10', [ENTITY_TYPE.ENEMY, 4]],
    ]),
    artFloor: art_room_tartarus_common_floor_08,
    artObstacle: art_room_tartarus_common_obstacle_08,
  },
  {
    ...BASE_ROOM,
    id: 9,
    type: ROOM_TYPE.COMMON,
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3],
      [3, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
      [4, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [3, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 3],
      [3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 3],
      [3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 1,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 2,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 3,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 4,
      },
    ],
    roomEntityPositions: new Map([
      ['7,7', [ENTITY_TYPE.ENEMY, 1]],
      ['8,14', [ENTITY_TYPE.ENEMY, 2]],
      ['12,9', [ENTITY_TYPE.ENEMY, 3]],
      ['13,11', [ENTITY_TYPE.ENEMY, 4]],
    ]),
    artFloor: art_room_tartarus_common_floor_09,
    artObstacle: art_room_tartarus_common_obstacle_09,
  },
  {
    ...BASE_ROOM,
    id: 10,
    type: ROOM_TYPE.COMMON,
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 0, 0, 0, 2, 1, 0, 0, 2, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 5, 1, 2, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 3],
      [3, 1, 2, 2, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3],
      [3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.TARTARIAN_LYCAN],
        id: 1,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.TARTARIAN_LYCAN],
        id: 2,
      },
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.STYGIAN_WRAITH],
        id: 3,
      },
    ],
    roomEntityPositions: new Map([
      ['8,8', [ENTITY_TYPE.ENEMY, 1]],
      ['12,12', [ENTITY_TYPE.ENEMY, 2]],
      ['14,7', [ENTITY_TYPE.ENEMY, 3]],
    ]),
    artFloor: art_room_tartarus_common_floor_10,
    artObstacle: art_room_tartarus_common_obstacle_10,
  },
];
