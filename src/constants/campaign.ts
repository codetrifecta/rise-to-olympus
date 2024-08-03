import { ICampaign } from '../types';

export const BASE_CAMPAIGN: ICampaign = {
  id: '1',
  campaignName: 'New Campaign',
  playerName: 'Player 1',
  numberOfDeaths: 0,
  scriptsCompleted: {
    tutorial: false,
    shopTutorial: false,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
