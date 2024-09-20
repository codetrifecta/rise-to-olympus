import { ILog } from '../types';

export const LOG_TUTORIAL_START_ROOM: ILog[] = [
  {
    type: 'info',
    message: 'Welcome to the tutorial!',
  },
  {
    type: 'info',
    message:
      'You can move around the battlefield, attack enemies, and use skills to gain the upper hand in combat.',
  },
  {
    type: 'info',
    message:
      'Each action you take consumes action points (AP). You can see your remaining health and AP at the bottom of the screen.',
  },
  {
    type: 'info',
    message:
      'You can use WASD or scroll to inspect the battlefield and +/= and - to zoom in/out.',
  },
  {
    type: 'info',
    message:
      'Your objective is to defeat all the enemies in all the rooms in a floor to progress to the next floor.',
  },
  {
    type: 'info',
    message:
      'After clearing each room, you can interact with the chest to collect loot as well as doors that open to move to the next room.',
  },
  {
    type: 'info',
    message:
      'You can use the minimap at the top right of the screen to keep track of the rooms you have visited and the rooms you have cleared.',
  },
  {
    type: 'info',
    message:
      'You can use the log to keep track of the actions you have taken and the events that have occurred.',
  },
  {
    type: 'info',
    message: 'You can press ESC to go back to the main menu to exit the game.',
  },
  {
    type: 'info',
    message: 'Good luck and have fun!',
  },
];
