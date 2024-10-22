import { IEnemy, IRoom } from '../types';
import art_room_tutorial_wall from '../assets/sprites/tiles/tutorial/room_tutorial_wall.png';

import art_room_tutorial_background from '../assets/sprites/tiles/tutorial/room_tutorial_background.png';
import art_room_tutorial_foreground from '../assets/sprites/tiles/tutorial/room_tutorial_foreground.png';

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
  artBackground: art_room_tutorial_background,
  artForeground: art_room_tutorial_foreground,
  artWall: art_room_tutorial_wall,
};

import art_room_tartarus_common_background_01 from '../assets/sprites/tiles/tartarus/room_tartarus_common_background_01.png';
import art_room_tartarus_common_foreground_01 from '../assets/sprites/tiles/tartarus/room_tartarus_common_foreground_01.png';

import art_room_tartarus_common_background_02 from '../assets/sprites/tiles/tartarus/room_tartarus_common_background_02.png';
import art_room_tartarus_common_foreground_02 from '../assets/sprites/tiles/tartarus/room_tartarus_common_foreground_02.png';

import art_room_tartarus_common_background_03 from '../assets/sprites/tiles/tartarus/room_tartarus_common_background_03.png';
import art_room_tartarus_common_foreground_03 from '../assets/sprites/tiles/tartarus/room_tartarus_common_foreground_03.png';

import art_room_tartarus_common_background_04 from '../assets/sprites/tiles/tartarus/room_tartarus_common_background_04.png';
import art_room_tartarus_common_foreground_04 from '../assets/sprites/tiles/tartarus/room_tartarus_common_foreground_04.png';

import art_room_tartarus_common_background_05 from '../assets/sprites/tiles/tartarus/room_tartarus_common_background_05.png';
import art_room_tartarus_common_foreground_05 from '../assets/sprites/tiles/tartarus/room_tartarus_common_foreground_05.png';

import art_room_tartarus_common_background_06 from '../assets/sprites/tiles/tartarus/room_tartarus_common_background_06.png';
import art_room_tartarus_common_foreground_06 from '../assets/sprites/tiles/tartarus/room_tartarus_common_foreground_06.png';

import art_room_tartarus_common_background_07 from '../assets/sprites/tiles/tartarus/room_tartarus_common_background_07.png';
import art_room_tartarus_common_foreground_07 from '../assets/sprites/tiles/tartarus/room_tartarus_common_foreground_07.png';

import art_room_tartarus_common_background_08 from '../assets/sprites/tiles/tartarus/room_tartarus_common_background_08.png';
import art_room_tartarus_common_foreground_08 from '../assets/sprites/tiles/tartarus/room_tartarus_common_foreground_08.png';

import art_room_tartarus_common_background_09 from '../assets/sprites/tiles/tartarus/room_tartarus_common_background_09.png';
import art_room_tartarus_common_foreground_09 from '../assets/sprites/tiles/tartarus/room_tartarus_common_foreground_09.png';

import art_room_tartarus_common_background_10 from '../assets/sprites/tiles/tartarus/room_tartarus_common_background_10.png';
import art_room_tartarus_common_foreground_10 from '../assets/sprites/tiles/tartarus/room_tartarus_common_foreground_10.png';

import art_room_tartarus_boss_background from '../assets/sprites/tiles/tartarus/room_tartarus_boss_background.png';
import art_room_tartarus_boss_foreground from '../assets/sprites/tiles/tartarus/room_tartarus_boss_foreground.png';
import { ENEMY_PRESET_ID, ENEMY_PRESETS, ENTITY_TYPE } from './entity';

export const ROOM_TARTARUS_ENEMY_OPTIONS: Record<
  number,
  {
    enemies: IEnemy[];
    enemyPositions: Map<string, [ENTITY_TYPE, number]>;
  }[]
> = {
  // 0 is for boss
  0: [
    {
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
      enemyPositions: new Map([
        ['10,10', [ENTITY_TYPE.ENEMY, 1]],
        ['4,4', [ENTITY_TYPE.ENEMY, 2]],
        ['5,15', [ENTITY_TYPE.ENEMY, 3]],
        ['15,12', [ENTITY_TYPE.ENEMY, 4]],
      ]),
    },
  ],
  1: [
    {
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
      enemyPositions: new Map([
        ['11,4', [ENTITY_TYPE.ENEMY, 1]],
        ['7,10', [ENTITY_TYPE.ENEMY, 2]],
        ['11,15', [ENTITY_TYPE.ENEMY, 3]],
        ['15,10', [ENTITY_TYPE.ENEMY, 4]],
      ]),
    },
    {
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
      enemyPositions: new Map([
        ['6,4', [ENTITY_TYPE.ENEMY, 1]],
        ['6,16', [ENTITY_TYPE.ENEMY, 2]],
        ['16,4', [ENTITY_TYPE.ENEMY, 3]],
        ['16,16', [ENTITY_TYPE.ENEMY, 4]],
      ]),
    },
  ],
  2: [
    {
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
      enemyPositions: new Map([
        ['11,10', [ENTITY_TYPE.ENEMY, 1]],
        ['7,6', [ENTITY_TYPE.ENEMY, 2]],
        ['9,15', [ENTITY_TYPE.ENEMY, 3]],
        ['16,13', [ENTITY_TYPE.ENEMY, 4]],
        ['14,15', [ENTITY_TYPE.ENEMY, 5]],
      ]),
    },
    {
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
      enemyPositions: new Map([
        ['16,10', [ENTITY_TYPE.ENEMY, 1]],
        ['13,5', [ENTITY_TYPE.ENEMY, 2]],
        ['14,14', [ENTITY_TYPE.ENEMY, 3]],
        ['6,6', [ENTITY_TYPE.ENEMY, 4]],
        ['8,15', [ENTITY_TYPE.ENEMY, 5]],
      ]),
    },
  ],
  3: [
    {
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
      enemyPositions: new Map([
        ['8,8', [ENTITY_TYPE.ENEMY, 1]],
        ['13,11', [ENTITY_TYPE.ENEMY, 2]],
      ]),
    },
    {
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
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.EREBUS_FIEND],
          id: 3,
        },
      ],
      enemyPositions: new Map([
        ['8,6', [ENTITY_TYPE.ENEMY, 1]],
        ['10,15', [ENTITY_TYPE.ENEMY, 2]],
        ['14,10', [ENTITY_TYPE.ENEMY, 3]],
      ]),
    },
  ],
  4: [
    {
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
      enemyPositions: new Map([
        ['8,10', [ENTITY_TYPE.ENEMY, 1]],
        ['12,10', [ENTITY_TYPE.ENEMY, 2]],
      ]),
    },
    {
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
      enemyPositions: new Map([
        ['9,3', [ENTITY_TYPE.ENEMY, 1]],
        ['12,17', [ENTITY_TYPE.ENEMY, 2]],
      ]),
    },
  ],
  5: [
    {
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
      enemyPositions: new Map([
        ['8,7', [ENTITY_TYPE.ENEMY, 1]],
        ['13,13', [ENTITY_TYPE.ENEMY, 2]],
        ['13,8', [ENTITY_TYPE.ENEMY, 3]],
        ['10,12', [ENTITY_TYPE.ENEMY, 4]],
      ]),
    },
    {
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
      enemyPositions: new Map([
        ['10,8', [ENTITY_TYPE.ENEMY, 1]],
        ['10,13', [ENTITY_TYPE.ENEMY, 2]],
      ]),
    },
  ],
  6: [
    {
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
      enemyPositions: new Map([
        ['7,6', [ENTITY_TYPE.ENEMY, 1]],
        ['16,14', [ENTITY_TYPE.ENEMY, 2]],
      ]),
    },
    {
      enemies: [
        {
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.MYRMIDON_HOUND],
          id: 1,
        },
        {
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.MYRMIDON_HOUND],
          id: 2,
        },
      ],
      enemyPositions: new Map([
        ['7,15', [ENTITY_TYPE.ENEMY, 1]],
        ['17,8', [ENTITY_TYPE.ENEMY, 2]],
      ]),
    },
  ],
  7: [
    {
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
      enemyPositions: new Map([
        ['9,8', [ENTITY_TYPE.ENEMY, 1]],
        ['9,12', [ENTITY_TYPE.ENEMY, 2]],
      ]),
    },
    {
      enemies: [
        {
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
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
        {
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
          id: 6,
        },
        {
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
          id: 7,
        },
        {
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
          id: 8,
        },
        {
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.CERBERUS_PUP],
          id: 9,
        },
      ],
      enemyPositions: new Map([
        ['4,6', [ENTITY_TYPE.ENEMY, 1]],
        ['4,14', [ENTITY_TYPE.ENEMY, 2]],
        ['9,4', [ENTITY_TYPE.ENEMY, 3]],
        ['9,10', [ENTITY_TYPE.ENEMY, 4]],
        ['9,15', [ENTITY_TYPE.ENEMY, 5]],
        ['15,6', [ENTITY_TYPE.ENEMY, 6]],
        ['15,14', [ENTITY_TYPE.ENEMY, 7]],
        ['19,6', [ENTITY_TYPE.ENEMY, 8]],
        ['19,14', [ENTITY_TYPE.ENEMY, 9]],
      ]),
    },
  ],
  8: [
    {
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
      enemyPositions: new Map([
        ['9,10', [ENTITY_TYPE.ENEMY, 1]],
        ['6,5', [ENTITY_TYPE.ENEMY, 2]],
        ['6,15', [ENTITY_TYPE.ENEMY, 3]],
        ['15,10', [ENTITY_TYPE.ENEMY, 4]],
      ]),
    },
    {
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
      enemyPositions: new Map([
        ['10,5', [ENTITY_TYPE.ENEMY, 1]],
        ['10,15', [ENTITY_TYPE.ENEMY, 2]],
      ]),
    },
  ],
  9: [
    {
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
      enemyPositions: new Map([
        ['7,7', [ENTITY_TYPE.ENEMY, 1]],
        ['8,14', [ENTITY_TYPE.ENEMY, 2]],
        ['12,9', [ENTITY_TYPE.ENEMY, 3]],
        ['13,11', [ENTITY_TYPE.ENEMY, 4]],
      ]),
    },
    {
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
      enemyPositions: new Map([
        ['10,8', [ENTITY_TYPE.ENEMY, 1]],
        ['10,12', [ENTITY_TYPE.ENEMY, 2]],
        ['13,9', [ENTITY_TYPE.ENEMY, 3]],
        ['13,12', [ENTITY_TYPE.ENEMY, 4]],
      ]),
    },
  ],
  10: [
    {
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
      enemyPositions: new Map([
        ['8,8', [ENTITY_TYPE.ENEMY, 1]],
        ['12,12', [ENTITY_TYPE.ENEMY, 2]],
        ['14,7', [ENTITY_TYPE.ENEMY, 3]],
      ]),
    },
    {
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
          ...ENEMY_PRESETS[ENEMY_PRESET_ID.TARTARIAN_HOUND],
          id: 3,
        },
      ],
      enemyPositions: new Map([
        ['9,9', [ENTITY_TYPE.ENEMY, 1]],
        ['11,11', [ENTITY_TYPE.ENEMY, 2]],
        ['13,7', [ENTITY_TYPE.ENEMY, 3]],
      ]),
    },
  ],
};

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
  artBackground: art_room_tutorial_background,
  artForeground: art_room_tutorial_foreground,
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
    [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
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
  enemies: ROOM_TARTARUS_ENEMY_OPTIONS[0][0].enemies,
  roomEntityPositions: ROOM_TARTARUS_ENEMY_OPTIONS[0][0].enemyPositions,
  artBackground: art_room_tartarus_boss_background,
  artForeground: art_room_tartarus_boss_foreground,
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
    enemies: ROOM_TARTARUS_ENEMY_OPTIONS[1][0].enemies,
    roomEntityPositions: ROOM_TARTARUS_ENEMY_OPTIONS[1][0].enemyPositions,
    artBackground: art_room_tartarus_common_background_01,
    artForeground: art_room_tartarus_common_foreground_01,
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
    enemies: ROOM_TARTARUS_ENEMY_OPTIONS[2][0].enemies,
    roomEntityPositions: ROOM_TARTARUS_ENEMY_OPTIONS[2][0].enemyPositions,
    artBackground: art_room_tartarus_common_background_02,
    artForeground: art_room_tartarus_common_foreground_02,
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
    enemies: ROOM_TARTARUS_ENEMY_OPTIONS[3][0].enemies,
    roomEntityPositions: ROOM_TARTARUS_ENEMY_OPTIONS[3][0].enemyPositions,
    artBackground: art_room_tartarus_common_background_03,
    artForeground: art_room_tartarus_common_foreground_03,
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
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3],
      [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3],
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
      [3, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: ROOM_TARTARUS_ENEMY_OPTIONS[4][0].enemies,
    roomEntityPositions: ROOM_TARTARUS_ENEMY_OPTIONS[4][0].enemyPositions,
    artBackground: art_room_tartarus_common_background_04,
    artForeground: art_room_tartarus_common_foreground_04,
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
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 0, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: ROOM_TARTARUS_ENEMY_OPTIONS[5][0].enemies,
    roomEntityPositions: ROOM_TARTARUS_ENEMY_OPTIONS[5][0].enemyPositions,
    artBackground: art_room_tartarus_common_background_05,
    artForeground: art_room_tartarus_common_foreground_05,
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
    enemies: ROOM_TARTARUS_ENEMY_OPTIONS[6][0].enemies,
    roomEntityPositions: ROOM_TARTARUS_ENEMY_OPTIONS[6][0].enemyPositions,
    artBackground: art_room_tartarus_common_background_06,
    artForeground: art_room_tartarus_common_foreground_06,
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
    enemies: ROOM_TARTARUS_ENEMY_OPTIONS[7][0].enemies,
    roomEntityPositions: ROOM_TARTARUS_ENEMY_OPTIONS[7][0].enemyPositions,
    artBackground: art_room_tartarus_common_background_07,
    artForeground: art_room_tartarus_common_foreground_07,
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
    enemies: ROOM_TARTARUS_ENEMY_OPTIONS[9][0].enemies,
    roomEntityPositions: ROOM_TARTARUS_ENEMY_OPTIONS[9][0].enemyPositions,
    artBackground: art_room_tartarus_common_background_08,
    artForeground: art_room_tartarus_common_foreground_08,
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
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3],
      [3, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3],
      [3, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 2, 2, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 2, 2, 3],
      [4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 0, 1, 1, 0, 1, 1, 5, 1, 1, 0, 1, 1, 0, 1, 1, 1, 4],
      [3, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 3],
      [3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 3],
      [3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3],
      [3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    enemies: ROOM_TARTARUS_ENEMY_OPTIONS[9][0].enemies,
    roomEntityPositions: ROOM_TARTARUS_ENEMY_OPTIONS[9][0].enemyPositions,
    artBackground: art_room_tartarus_common_background_09,
    artForeground: art_room_tartarus_common_foreground_09,
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
    enemies: ROOM_TARTARUS_ENEMY_OPTIONS[10][0].enemies,
    roomEntityPositions: ROOM_TARTARUS_ENEMY_OPTIONS[10][0].enemyPositions,
    artBackground: art_room_tartarus_common_background_10,
    artForeground: art_room_tartarus_common_foreground_10,
  },
];
