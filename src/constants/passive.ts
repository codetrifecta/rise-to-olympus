import { IPassive } from '../types';
import { ICON_ID } from './icon';

export const enum PASSIVE_ID {
  SKILL_SLOTS = 'SKILL_SLOTS',
  STRENGTH = 'STRENGTH',
  INTELLIGENCE = 'INTELLIGENCE',
  DEFENSE = 'DEFENSE',
  CONSTITUTION = 'CONSTITUTION',
}

export const PASSIVES: IPassive[] = [
  {
    id: PASSIVE_ID.SKILL_SLOTS,
    name: 'Skill Slots',
    description: 'Unlocks additional skill slots.',
    icon: ICON_ID.SKILLS,
    currentLevel: 0,
    maxLevel: 3,
  },
];
