import { ICampaign } from '../types';

export const BASE_CAMPAIGN: ICampaign = {
  id: '1',
  campaignName: 'New Campaign',
  playerName: 'Player 1',
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
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as const;
