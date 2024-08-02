import { IScriptItem } from '../types';

let id = 0;

export enum SCRIPT_PARENT {
  TUTORIAL = 'TUTORIAL',
}

export enum SCRIPT_TYPE {
  SCENE = 'SCENE',
  NARRATOR = 'NARRATOR',
  PROMPT = 'PROMPT',
  DIALOG = 'DIALOG',
}

export const SCRIPT_TUTORIAL: IScriptItem[] = [
  {
    id: id++,
    parent: SCRIPT_PARENT.TUTORIAL,
    type: SCRIPT_TYPE.SCENE,
    speakerNames: [],
    text: 'The screen fades from black, revealing a dark, cavernous landscape. Shadows flicker against the walls, and eerie sounds echo through the air. The camera slowly pans down to show $PLAYER_NAME, chained and lying on the cold ground. His eyes open, filled with determination.',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.TUTORIAL,
    type: SCRIPT_TYPE.NARRATOR,
    speakerNames: [],
    text: "In the depths of Tartarus, where the ancient evils dwell, a young demigod awakens. Imprisoned by Zeus for his growing power, $PLAYER_NAME's journey begins here, in darkness and despair.",
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.TUTORIAL,
    type: SCRIPT_TYPE.SCENE,
    speakerNames: [],
    text: 'The camera zooms in on $PLAYER_NAME as he struggles to his feet, breaking the chains that bind him.',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.TUTORIAL,
    type: SCRIPT_TYPE.DIALOG,
    speakerNames: ['$PLAYER_NAME'],
    text: 'I will not be a prisoner any longer. I will find my way out and uncover the truth.',
  },
];
