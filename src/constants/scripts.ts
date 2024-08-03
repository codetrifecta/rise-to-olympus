import { IScriptItem } from '../types';

export enum SCRIPT_PARENT {
  TUTORIAL = 'TUTORIAL',
  SHOP = 'SHOP',
  SHOP_TUTORIAL = 'SHOP_TUTORIAL',
  SHOP_BUY = 'SHOP_BUY',
  SHOP_SELL = 'SHOP_SELL',
  SHOP_LEAVE = 'SHOP_LEAVE',
}

export enum SCRIPT_TYPE {
  SCENE = 'SCENE',
  NARRATOR = 'NARRATOR',
  PROMPT = 'PROMPT',
  DIALOG = 'DIALOG',
  CHOICE = 'CHOICE',
}

let id = 0;
export const SCRIPT_TUTORIAL: IScriptItem[] = [
  {
    id: id++,
    parent: SCRIPT_PARENT.TUTORIAL,
    type: SCRIPT_TYPE.SCENE,
    text: 'The screen fades from black, revealing a dark, cavernous landscape. Shadows flicker against the walls, and eerie sounds echo through the air. The camera slowly pans down to show $PLAYER_NAME, chained and lying on the cold ground. His eyes open, filled with determination.',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.TUTORIAL,
    type: SCRIPT_TYPE.NARRATOR,
    text: "In the depths of Tartarus, where the ancient evils dwell, a young demigod awakens. Imprisoned by Zeus for his growing power, $PLAYER_NAME's journey begins here, in darkness and despair.",
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.TUTORIAL,
    type: SCRIPT_TYPE.SCENE,
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

id = 0;
export const SCRIPT_SHOP_TUTORIAL: IScriptItem[] = [
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.SCENE,
    text: 'The camera pans down to show $PLAYER_NAME standing in front of a small shop. The sign above the door reads "Hades\' Emporium."',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.NARRATOR,
    text: 'As $PLAYER_NAME enters the shop, the air is filled with the scent of incense and old parchment. The shopkeeper, a wizened old man with a twinkle in his eye, greets him warmly.',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.DIALOG,
    speakerNames: ['Shopkeeper'],
    text: 'Welcome, young demigod. I have been expecting you. You seek to escape the clutches of Zeus, do you not?',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.DIALOG,
    speakerNames: ['$PLAYER_NAME'],
    text: 'How did you know?',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.DIALOG,
    speakerNames: ['Shopkeeper'],
    text: 'I know many things, young one. But that is a tale for another time. My place here is a shop of sorts, where you may find items to aid you on your journey in exchange for gold.',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.CHOICE,
    text: 'What would you like to do?',
    choices: ['Buy', 'Sell', 'Leave'],
  },
];

id = 0;
export const SCRIPT_SHOP: IScriptItem[] = [
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP,
    type: SCRIPT_TYPE.DIALOG,
    speakerNames: ['Shopkeeper'],
    text: 'Welcome back, young demigod. What can I do for you today?',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP,
    type: SCRIPT_TYPE.CHOICE,
    text: 'What would you like to do?',
    choices: ['Buy', 'Sell', 'Leave'],
  },
];

id = 0;
export const SCRIPT_SHOP_BUY: IScriptItem[] = [
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.SCENE,
    text: 'Open up the shop menu to buy items.',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.DIALOG,
    speakerNames: ['Shopkeeper'],
    text: 'Thank you for your purchase. Anything else you need?',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.CHOICE,
    text: 'What would you like to do?',
    choices: ['Buy', 'Sell', 'Leave'],
  },
];

id = 0;
export const SCRIPT_SHOP_SELL: IScriptItem[] = [
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.SCENE,
    text: 'Open up the shop menu to sell items.',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.DIALOG,
    speakerNames: ['Shopkeeper'],
    text: 'Thank you for your sale. Anything else you need?',
  },
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.CHOICE,
    text: 'What would you like to do?',
    choices: ['Buy', 'Sell', 'Leave'],
  },
];

id = 0;
export const SCRIPT_SHOP_LEAVE: IScriptItem[] = [
  {
    id: id++,
    parent: SCRIPT_PARENT.SHOP_TUTORIAL,
    type: SCRIPT_TYPE.DIALOG,
    speakerNames: ['Shopkeeper'],
    text: 'Farewell, young demigod. May the fates be kind to you on your journey.',
  },
];
