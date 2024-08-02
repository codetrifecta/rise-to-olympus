import { SCRIPT_PARENT, SCRIPT_TYPE } from './constants/scripts';

interface IScriptsCompleted {
  tutorial: boolean;
}

export interface ICampaign {
  id: string;
  campaignName: string;
  playerName: string;
  numberOfDeaths: number;
  scriptsCompleted: IScriptsCompleted;
  createdAt: string;
  updatedAt: string;
}

export interface IScriptItem {
  id: number;
  parent: SCRIPT_PARENT;
  type: SCRIPT_TYPE;
  speakerNames: string[];
  text: string;
}
