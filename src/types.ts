import { SCRIPT_TYPE } from './constants/scripts';

export interface ICampaign {
  id: string;
  campaignName: string;
  playerName: string;
  numberOfDeaths: number;
  createdAt: string;
  updatedAt: string;
}

export interface IScriptItem {
  id: number;
  type: SCRIPT_TYPE;
  speakerNames: string[];
  text: string;
}
