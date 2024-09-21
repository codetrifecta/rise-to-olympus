import { ICampaign } from '../types';
import { SKILL_ID } from './skill';

export enum CHECKPOINT {
  TUTORIAL = 'TUTORIAL',
  TARTARUS_CAMP = 'TARTARUS_CAMP',
  FLOOR1 = 'FLOOR1',
  FLOOR2 = 'FLOOR2',
  FLOOR3 = 'FLOOR3',
}

export const BASE_CAMPAIGN: ICampaign = {
  id: '1',
  campaignName: 'New Campaign',
  playerName: 'Player 1',
  playerEquippedSkillIDs: [SKILL_ID.CLEAVE, SKILL_ID.FIREBALL, SKILL_ID.FLY],
  numberOfDeaths: 0,
  scriptsCompleted: {
    tutorial: false,
    tutorialStartRoom: false,
    shopTutorial: false,
    floor1: false,
    floor2: false,
    floor3: false,
    floor4: false,
    floor5: false,
    floor6: false,
    floor7: false,
    floor8: false,
    floor9: false,
  },
  checkpoint: CHECKPOINT.TUTORIAL,
  unlockedSkillIDs: [SKILL_ID.CLEAVE, SKILL_ID.FIREBALL, SKILL_ID.FLY],
  divinity: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as const;
