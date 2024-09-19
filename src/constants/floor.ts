import { IFloor } from '../types';
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

export const TARTARUS_CAMP_FLOOR: IFloor = [
  [
    {
      ...BASE_ROOM,
      id: 1,
      type: ROOM_TYPE.START,
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
        nextFloor: TARTARUS_CAMP_FLOOR,
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
    chestItems: [
      {
        id: 1,
        name: 'Leather Chestplate',
        icon: ICON_ID.CHESTPIECE_LEATHER_1,
        itemType: ITEM_TYPE.ARMOR,
        stats: {
          defense: 5,
          strength: 3,
          intelligence: 1,
          constitution: 5,
        },
      },
      {
        id: 2,
        name: 'Leather Robe',
        icon: ICON_ID.CHESTPIECE_LEATHER_2,
        itemType: ITEM_TYPE.ARMOR,
        stats: {
          defense: 5,
          strength: 1,
          intelligence: 3,
          constitution: 5,
        },
      },
      {
        id: 3,
        name: 'Leather Brigandine',
        icon: ICON_ID.CHESTPIECE_LEATHER_3,
        itemType: ITEM_TYPE.ARMOR,
        stats: {
          defense: 5,
          strength: 2,
          intelligence: 2,
          constitution: 5,
        },
      },
      {
        id: 4,
        name: 'Health Potion',
        icon: ICON_ID.HEALTH_POTION,
        itemType: ITEM_TYPE.CONSUMABLE,
      },
    ],
  };

  return tutorialFloor;
};

export const TUTORIAL_FLOOR: IFloor = createTutorialFloor();
