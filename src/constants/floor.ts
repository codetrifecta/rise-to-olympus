import { IArmor, IFloor, Item, IWeapon } from '../types';
import { ENEMY_PRESET_ID, ENEMY_PRESETS, ENTITY_TYPE } from './entity';
import { BASE_ROOM, ROOM_TYPE } from './room';

import art_room_tutorial_floor from '../assets/sprites/tiles/tutorial/room_tutorial_floor.png';
import art_room_tutorial_obstacle from '../assets/sprites/tiles/tutorial/room_tutorial_obstacle.png';

import art_room_tutorial_floor_2 from '../assets/sprites/tiles/tutorial/room_tutorial_floor_2.png';
import art_room_tutorial_obstacle_2 from '../assets/sprites/tiles/tutorial/room_tutorial_obstacle_2.png';

import art_room_tutorial_floor_3 from '../assets/sprites/tiles/tutorial/room_tutorial_floor_3.png';
import art_room_tutorial_obstacle_3 from '../assets/sprites/tiles/tutorial/room_tutorial_obstacle_3.png';

import art_room_tutorial_floor_4 from '../assets/sprites/tiles/tutorial/room_tutorial_floor_4.png';
import art_room_tutorial_obstacle_4 from '../assets/sprites/tiles/tutorial/room_tutorial_obstacle_4.png';

import art_room_tartarus_camp_floor from '../assets/sprites/tiles/tartarus/room_tartarus_camp_floor.png';
import art_room_tartarus_camp_wall from '../assets/sprites/tiles/tartarus/room_tartarus_camp_wall.png';
import { ICON_ID } from './icon';
import { ITEM_TYPE } from './item';
import { ARMOR_PART } from './armor';
import { WEAPON_ATTACK_TYPE, WEAPON_TYPE } from './weapon';

export const DEFAULT_CHEST_ITEM_COUNT = 10;

export const FLOOR_TARTARUS_CAMP: IFloor = [
  [
    {
      ...BASE_ROOM,
      id: 1,
      type: ROOM_TYPE.START,
      isKnown: true,
      roomLength: 9,
      position: [0, 0],
      roomTileMatrix: [
        [3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 4, 4, 4, 3, 3, 3],
        [3, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3],
      ],
      artFloor: art_room_tartarus_camp_floor,
      artObstacle: '',
      artWall: art_room_tartarus_camp_wall,
    },
  ],
];

const createTutorialFloor = () => {
  let id = 0;
  const tutorialFloor: IFloor = [];

  for (let row = 0; row < 3; row++) {
    tutorialFloor[row] = [];
    for (let col = 0; col < 3; col++) {
      tutorialFloor[row][col] = {
        ...BASE_ROOM,
        id: id++,
        roomLength: 21,
        position: [row, col],
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
        nextFloor: FLOOR_TARTARUS_CAMP,
      };
    }
  }

  tutorialFloor[0][2] = {
    ...tutorialFloor[0][2],
    type: ROOM_TYPE.BOSS,
    southDoor: true,
    enemies: [
      {
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.ABYSSAL_CYCLOPEAN_WRAITH],
        id: 4,
      },
    ],
    roomEntityPositions: new Map([['5,10', [ENTITY_TYPE.ENEMY, 4]]]),
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 3],
      [4, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 2, 1, 4],
      [4, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 2, 1, 4],
      [4, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 2, 1, 4],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    artFloor: art_room_tutorial_floor_4,
    artObstacle: art_room_tutorial_obstacle_4,
  };
  tutorialFloor[1][2] = {
    ...tutorialFloor[1][2],
    type: ROOM_TYPE.COMMON,
    northDoor: true,
    southDoor: true,
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
        ...ENEMY_PRESETS[ENEMY_PRESET_ID.INFERNAL_MINOTAUR],
        id: 4,
      },
    ],
    roomEntityPositions: new Map([
      ['8,6', [ENTITY_TYPE.ENEMY, 1]],
      ['10,18', [ENTITY_TYPE.ENEMY, 2]],
      ['16,14', [ENTITY_TYPE.ENEMY, 3]],
      ['4,10', [ENTITY_TYPE.ENEMY, 4]],
    ]),
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 3],
      [3, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 4],
      [4, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 4],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 2, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    artFloor: art_room_tutorial_floor_3,
    artObstacle: art_room_tutorial_obstacle_3,
  };
  tutorialFloor[2][2] = {
    ...tutorialFloor[2][2],
    type: ROOM_TYPE.COMMON,
    westDoor: true,
    northDoor: true,
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
    ],
    roomEntityPositions: new Map([
      ['12,9', [ENTITY_TYPE.ENEMY, 1]],
      ['5,14', [ENTITY_TYPE.ENEMY, 2]],
      ['16,16', [ENTITY_TYPE.ENEMY, 3]],
      ['14,10', [ENTITY_TYPE.ENEMY, 4]],
      ['6,16', [ENTITY_TYPE.ENEMY, 5]],
    ]),
    roomTileMatrix: [
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 2, 3],
      [4, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 4],
      [4, 1, 1, 1, 1, 1, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 4],
      [3, 2, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 3],
      [3, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ],
    artFloor: art_room_tutorial_floor_2,
    artObstacle: art_room_tutorial_obstacle_2,
  };
  tutorialFloor[2][1] = {
    ...tutorialFloor[2][1],
    type: ROOM_TYPE.START,
    eastDoor: true,
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

  return tutorialFloor;
};

export const FLOOR_TUTORIAL: IFloor = createTutorialFloor();

let id = 0;
export const TUTORIAL_FLOOR_CHEST_ITEMS: Map<string, Item[]> = new Map([
  [
    '2,1',
    [
      {
        id: id++,
        name: 'Leather Chestplate',
        icon: ICON_ID.CHESTPIECE_LEATHER_1,
        itemType: ITEM_TYPE.ARMOR,
        armorPart: ARMOR_PART.CHESTPIECE,
        stats: {
          strength: 6,
          intelligence: 2,
          defense: 5,
          constitution: 5,
        },
      } as IArmor,
      {
        id: id++,
        name: 'Leather Robe',
        icon: ICON_ID.CHESTPIECE_LEATHER_2,
        itemType: ITEM_TYPE.ARMOR,
        armorPart: ARMOR_PART.CHESTPIECE,
        stats: {
          strength: 2,
          intelligence: 6,
          defense: 5,
          constitution: 5,
        },
      } as IArmor,
      {
        id: id++,
        name: 'Leather Brigandine',
        icon: ICON_ID.CHESTPIECE_LEATHER_3,
        itemType: ITEM_TYPE.ARMOR,
        armorPart: ARMOR_PART.CHESTPIECE,
        stats: {
          strength: 4,
          intelligence: 4,
          defense: 5,
          constitution: 5,
        },
      } as IArmor,
      {
        id: id++,
        name: 'Health Potion',
        icon: ICON_ID.HEALTH_POTION,
        itemType: ITEM_TYPE.CONSUMABLE,
      },
      {
        id: id++,
        name: 'Health Potion',
        icon: ICON_ID.HEALTH_POTION,
        itemType: ITEM_TYPE.CONSUMABLE,
      },
      {
        id: id++,
        name: 'Health Potion',
        icon: ICON_ID.HEALTH_POTION,
        itemType: ITEM_TYPE.CONSUMABLE,
      },
    ],
  ],
  [
    '2,2',
    [
      {
        id: id++,
        name: 'Broadsword',
        icon: ICON_ID.WEAPON_SWORD,
        attackType: WEAPON_ATTACK_TYPE.MELEE,
        type: WEAPON_TYPE.ONE_HANDED,
        itemType: ITEM_TYPE.WEAPON,
        damageMultiplier: 0.6,
        stats: {
          strength: 6,
          intelligence: 1,
          defense: 4,
          constitution: 0,
        },
        range: 1,
        cost: 1,
      } as IWeapon,
      {
        id: id++,
        name: 'Katana',
        icon: ICON_ID.WEAPON_KATANA,
        attackType: WEAPON_ATTACK_TYPE.MELEE,
        type: WEAPON_TYPE.ONE_HANDED,
        itemType: ITEM_TYPE.WEAPON,
        damageMultiplier: 0.6,
        stats: {
          strength: 8,
          intelligence: 1,
          defense: 1,
          constitution: 0,
        },
        range: 1,
        cost: 1,
      } as IWeapon,
      {
        id: id++,
        name: 'Greatsword',
        icon: ICON_ID.WEAPON_GREATSWORD,
        attackType: WEAPON_ATTACK_TYPE.MELEE,
        type: WEAPON_TYPE.TWO_HANDED,
        itemType: ITEM_TYPE.WEAPON,
        damageMultiplier: 0.6,
        stats: {
          strength: 9,
          intelligence: 1,
          defense: 8,
          constitution: 0,
        },
        range: 2,
        cost: 2,
      } as IWeapon,
      {
        id: id++,
        name: 'Glaive',
        icon: ICON_ID.WEAPON_GLAIVE,
        attackType: WEAPON_ATTACK_TYPE.MELEE,
        type: WEAPON_TYPE.TWO_HANDED,
        itemType: ITEM_TYPE.WEAPON,
        damageMultiplier: 0.6,
        stats: {
          strength: 12,
          intelligence: 1,
          defense: 2,
          constitution: 0,
        },
        range: 2,
        cost: 2,
      } as IWeapon,
      {
        id: id++,
        name: 'Magic Wand',
        icon: ICON_ID.WEAPON_MAGIC_WAND,
        attackType: WEAPON_ATTACK_TYPE.RANGED,
        type: WEAPON_TYPE.WAND,
        itemType: ITEM_TYPE.WEAPON,
        damageMultiplier: 0.4,
        stats: {
          strength: 1,
          intelligence: 5,
          defense: 0,
          constitution: 0,
        },
        range: 4,
        cost: 1,
      } as IWeapon,
      {
        id: id++,
        name: 'Magic Staff',
        icon: ICON_ID.WEAPON_MAGIC_STAFF,
        attackType: WEAPON_ATTACK_TYPE.RANGED,
        type: WEAPON_TYPE.STAFF,
        itemType: ITEM_TYPE.WEAPON,
        damageMultiplier: 0.3,
        stats: {
          strength: 1,
          intelligence: 8,
          defense: 2,
          constitution: 0,
        },
        range: 6,
        cost: 2,
      } as IWeapon,
      {
        id: id++,
        name: 'Health Potion',
        icon: ICON_ID.HEALTH_POTION,
        itemType: ITEM_TYPE.CONSUMABLE,
      },
    ],
  ],
  [
    '1,2',
    [
      {
        id: id++,
        name: 'Leather Helmet',
        icon: ICON_ID.HELMET_LEATHER_1,
        itemType: ITEM_TYPE.ARMOR,
        armorPart: ARMOR_PART.HELMET,
        stats: {
          strength: 6,
          intelligence: 2,
          defense: 5,
          constitution: 5,
        },
      } as IArmor,
      {
        id: id++,
        name: 'Leather Cowl',
        icon: ICON_ID.HELMET_LEATHER_2,
        itemType: ITEM_TYPE.ARMOR,
        armorPart: ARMOR_PART.HELMET,
        stats: {
          strength: 2,
          intelligence: 6,
          defense: 5,
          constitution: 5,
        },
      } as IArmor,
      {
        id: id++,
        name: 'Health Potion',
        icon: ICON_ID.HEALTH_POTION,
        itemType: ITEM_TYPE.CONSUMABLE,
      },
    ],
  ],
  [
    '0,2',
    [
      {
        id: id++,
        name: 'Health Potion',
        icon: ICON_ID.HEALTH_POTION,
        itemType: ITEM_TYPE.CONSUMABLE,
      },
    ],
  ],
]);
