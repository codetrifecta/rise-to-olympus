import { IWeapon } from '../types';
import { ICON_ID } from './icon';
import { ITEM_TYPE } from './item';

export enum WEAPON_ATTACK_TYPE {
  MELEE = 'melee',
  RANGED = 'ranged',
}

export enum WEAPON_TYPE {
  ONE_HANDED = 'one-handed',
  TWO_HANDED = 'two-handed',
  BOW = 'bow',
  WAND = 'wand',
  STAFF = 'staff',
}

export const WEAPONS: IWeapon[] = [
  {
    id: 1,
    name: 'Fists',
    icon: ICON_ID.WEAPON_FIST,
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.ONE_HANDED,
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
    type: WEAPON_TYPE.ONE_HANDED,
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
    type: WEAPON_TYPE.ONE_HANDED,
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
    type: WEAPON_TYPE.TWO_HANDED,
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
    type: WEAPON_TYPE.TWO_HANDED,
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
    range: 3,
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
    range: 4,
    cost: 2,
  },
  {
    id: 9,
    name: 'Test Sword',
    icon: ICON_ID.WEAPON_GREATSWORD,
    attackType: WEAPON_ATTACK_TYPE.MELEE,
    type: WEAPON_TYPE.TWO_HANDED,
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
