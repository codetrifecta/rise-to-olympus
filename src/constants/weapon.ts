import { IWeapon } from '../types';
import { ICON_ID } from './icon';
import { ITEM_TYPE } from './item';

export enum WEAPON_ATTACK_TYPE {
  MELEE = 'melee',
  RANGED = 'ranged',
}

export enum WEAPON_TYPE {
  FIST = 'fist',
  BROADSWORD = 'broadsword',
  KATANA = 'katana',
  GREATSWORD = 'greatsword',
  POLEARM = 'polearm',
  BOW = 'bow',
  WAND = 'wand',
  STAFF = 'staff',
}

export const BASE_FIST: IWeapon = {
  id: 1,
  name: 'Fists',
  icon: ICON_ID.WEAPON_FIST,
  attackType: WEAPON_ATTACK_TYPE.MELEE,
  type: WEAPON_TYPE.FIST,
  itemType: ITEM_TYPE.WEAPON,
  damageMultiplier: 0.6,
  stats: {
    strength: 5,
    intelligence: 5,
    defense: 0,
    constitution: 0,
  },
  range: 1,
  cost: 1,
};

export const BASE_BROADSWORD: IWeapon = {
  ...BASE_FIST,
  name: 'Broadsword',
  icon: ICON_ID.WEAPON_SWORD,
  attackType: WEAPON_ATTACK_TYPE.MELEE,
  type: WEAPON_TYPE.BROADSWORD,
  itemType: ITEM_TYPE.WEAPON,
  damageMultiplier: 0.6,
  stats: {
    strength: 6,
    intelligence: 1,
    defense: 10,
    constitution: 0,
  },
  range: 1,
  cost: 1,
};

export const BASE_KATANA: IWeapon = {
  ...BASE_FIST,
  name: 'Katana',
  icon: ICON_ID.WEAPON_KATANA,
  attackType: WEAPON_ATTACK_TYPE.MELEE,
  type: WEAPON_TYPE.KATANA,
  itemType: ITEM_TYPE.WEAPON,
  damageMultiplier: 0.6,
  stats: {
    strength: 8,
    intelligence: 1,
    defense: 3,
    constitution: 0,
  },
  range: 1,
  cost: 1,
};

export const BASE_GREATSWORD: IWeapon = {
  ...BASE_FIST,
  name: 'Greatsword',
  icon: ICON_ID.WEAPON_GREATSWORD,
  attackType: WEAPON_ATTACK_TYPE.MELEE,
  type: WEAPON_TYPE.GREATSWORD,
  itemType: ITEM_TYPE.WEAPON,
  damageMultiplier: 0.6,
  stats: {
    strength: 9,
    intelligence: 1,
    defense: 20,
    constitution: 0,
  },
  range: 2,
  cost: 2,
};

export const BASE_GLAIVE: IWeapon = {
  ...BASE_FIST,
  name: 'Glaive',
  icon: ICON_ID.WEAPON_GLAIVE,
  attackType: WEAPON_ATTACK_TYPE.MELEE,
  type: WEAPON_TYPE.POLEARM,
  itemType: ITEM_TYPE.WEAPON,
  damageMultiplier: 0.6,
  stats: {
    strength: 11,
    intelligence: 1,
    defense: 6,
    constitution: 0,
  },
  range: 2,
  cost: 2,
};

export const BASE_MAGIC_WAND: IWeapon = {
  ...BASE_FIST,
  name: 'Magic Wand',
  icon: ICON_ID.WEAPON_MAGIC_WAND,
  attackType: WEAPON_ATTACK_TYPE.RANGED,
  type: WEAPON_TYPE.WAND,
  itemType: ITEM_TYPE.WEAPON,
  damageMultiplier: 0.4,
  stats: {
    strength: 1,
    intelligence: 5,
    defense: 0,
    constitution: 0,
  },
  range: 4,
  cost: 1,
};

export const BASE_MAGIC_STAFF: IWeapon = {
  ...BASE_FIST,
  name: 'Magic Staff',
  icon: ICON_ID.WEAPON_MAGIC_STAFF,
  attackType: WEAPON_ATTACK_TYPE.RANGED,
  type: WEAPON_TYPE.STAFF,
  itemType: ITEM_TYPE.WEAPON,
  damageMultiplier: 0.3,
  stats: {
    strength: 1,
    intelligence: 8,
    defense: 2,
    constitution: 0,
  },
  range: 7,
  cost: 2,
};

export const BASE_MELEE_WEAPONS: IWeapon[] = [
  { ...BASE_FIST },
  { ...BASE_BROADSWORD },
  { ...BASE_KATANA },
  { ...BASE_GREATSWORD },
  { ...BASE_GLAIVE },
];

export const BASE_RANGED_WEAPONS: IWeapon[] = [
  { ...BASE_MAGIC_WAND },
  { ...BASE_MAGIC_STAFF },
];

export const BASE_WEAPONS: IWeapon[] = [
  ...BASE_MELEE_WEAPONS,
  ...BASE_RANGED_WEAPONS,
];

export const WEAPONS: IWeapon[] = [
  {
    id: 1,
    name: 'Fists',
    icon: ICON_ID.WEAPON_FIST,
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.FIST,
    itemType: ITEM_TYPE.WEAPON,
    damageMultiplier: 0.6,
    stats: {
      strength: 5,
      intelligence: 5,
      defense: 0,
      constitution: 0,
    },
    range: 1,
    cost: 1,
  },
  {
    id: 2,
    name: 'Sword',
    icon: ICON_ID.WEAPON_SWORD,
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.BROADSWORD,
    itemType: ITEM_TYPE.WEAPON,
    damageMultiplier: 0.6,
    stats: {
      strength: 8,
      intelligence: 1,
      defense: 4,
      constitution: 0,
    },
    range: 1,
    cost: 1,
  },
  {
    id: 3,
    name: 'Katana',
    icon: ICON_ID.WEAPON_KATANA,
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.KATANA,
    itemType: ITEM_TYPE.WEAPON,
    damageMultiplier: 0.6,
    stats: {
      strength: 10,
      intelligence: 1,
      defense: 2,
      constitution: 0,
    },
    range: 1,
    cost: 1,
  },
  {
    id: 4,
    name: 'Greatsword',
    icon: ICON_ID.WEAPON_GREATSWORD,
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.GREATSWORD,
    itemType: ITEM_TYPE.WEAPON,
    damageMultiplier: 1,
    stats: {
      strength: 12,
      intelligence: 1,
      defense: 8,
      constitution: 0,
    },
    range: 2,
    cost: 2,
  },
  {
    id: 5,
    name: 'Glaive',
    icon: ICON_ID.WEAPON_GLAIVE,
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.POLEARM,
    itemType: ITEM_TYPE.WEAPON,
    damageMultiplier: 1,
    stats: {
      strength: 14,
      intelligence: 1,
      defense: 2,
      constitution: 0,
    },
    range: 2,
    cost: 2,
  },
  {
    id: 6,
    name: 'Bow',
    icon: ICON_ID.WEAPON_BOW,
    attackType: WEAPON_ATTACK_TYPE.RANGED,
    type: WEAPON_TYPE.BOW,
    itemType: ITEM_TYPE.WEAPON,
    damageMultiplier: 0.3,
    stats: {
      strength: 8,
      intelligence: 1,
      defense: 0,
      constitution: 0,
    },
    range: 4,
    cost: 2,
  },
  {
    id: 7,
    name: 'Magic Wand',
    icon: ICON_ID.WEAPON_MAGIC_WAND,
    attackType: WEAPON_ATTACK_TYPE.RANGED,
    type: WEAPON_TYPE.WAND,
    itemType: ITEM_TYPE.WEAPON,
    damageMultiplier: 0.4,
    stats: {
      strength: 1,
      intelligence: 5,
      defense: 0,
      constitution: 0,
    },
    range: 4,
    cost: 1,
  },
  {
    id: 8,
    name: 'Magic Staff',
    icon: ICON_ID.WEAPON_MAGIC_STAFF,
    attackType: WEAPON_ATTACK_TYPE.RANGED,
    type: WEAPON_TYPE.STAFF,
    itemType: ITEM_TYPE.WEAPON,
    damageMultiplier: 0.3,
    stats: {
      strength: 1,
      intelligence: 8,
      defense: 2,
      constitution: 0,
    },
    range: 6,
    cost: 2,
  },
  {
    id: 9,
    name: 'Test Sword',
    icon: ICON_ID.WEAPON_GREATSWORD,
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.GREATSWORD,
    itemType: ITEM_TYPE.WEAPON,
    damageMultiplier: 1,
    stats: {
      strength: 100,
      intelligence: 100,
      defense: 0,
      constitution: 0,
    },
    range: 100,
    cost: 1,
  },
];
