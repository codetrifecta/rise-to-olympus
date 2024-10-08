import { IHelmet, IChestpiece, ILegging } from '../types';
import { ICON_ID } from './icon';
import { ITEM_TYPE } from './item';

export enum ARMOR_PART {
  HELMET = 'HELMET',
  CHESTPIECE = 'CHESTPIECE',
  LEGGING = 'LEGGING',
}

export const BASE_ARMOR = {
  id: 0,
  name: 'Armor',
  icon: ICON_ID.HELMET_LEATHER_1,
  itemType: ITEM_TYPE.ARMOR,
  stats: {
    strength: 5,
    intelligence: 5,
    defense: 5,
    constitution: 5,
  },
};

export const BASE_HELMET: IHelmet = {
  ...BASE_ARMOR,
  name: 'Leather Helmet',
  icon: ICON_ID.HELMET_LEATHER_1,
  itemType: ITEM_TYPE.ARMOR,
  armorPart: ARMOR_PART.HELMET,
  stats: {
    strength: 6,
    intelligence: 2,
    defense: 5,
    constitution: 5,
  },
};

export const BASE_COWL: IHelmet = {
  ...BASE_ARMOR,
  name: 'Leather Cowl',
  icon: ICON_ID.HELMET_LEATHER_2,
  itemType: ITEM_TYPE.ARMOR,
  armorPart: ARMOR_PART.HELMET,
  stats: {
    strength: 2,
    intelligence: 6,
    defense: 5,
    constitution: 5,
  },
};

export const BASE_HELMETS: IHelmet[] = [BASE_HELMET, BASE_COWL];

export const BASE_CHESTPLATE: IChestpiece = {
  ...BASE_ARMOR,
  name: 'Leather Chestplate',
  icon: ICON_ID.CHESTPIECE_LEATHER_1,
  itemType: ITEM_TYPE.ARMOR,
  armorPart: ARMOR_PART.CHESTPIECE,
  stats: {
    strength: 6,
    intelligence: 2,
    defense: 5,
    constitution: 5,
  },
};

export const BASE_ROBE: IChestpiece = {
  ...BASE_ARMOR,
  name: 'Leather Robe',
  icon: ICON_ID.CHESTPIECE_LEATHER_2,
  itemType: ITEM_TYPE.ARMOR,
  armorPart: ARMOR_PART.CHESTPIECE,
  stats: {
    strength: 2,
    intelligence: 6,
    defense: 5,
    constitution: 5,
  },
};

export const BASE_BRIGANDINE: IChestpiece = {
  ...BASE_ARMOR,
  name: 'Leather Brigandine',
  icon: ICON_ID.CHESTPIECE_LEATHER_3,
  itemType: ITEM_TYPE.ARMOR,
  armorPart: ARMOR_PART.CHESTPIECE,
  stats: {
    strength: 4,
    intelligence: 4,
    defense: 5,
    constitution: 5,
  },
};

export const BASE_CHESTPIECES: IChestpiece[] = [
  BASE_CHESTPLATE,
  BASE_ROBE,
  BASE_BRIGANDINE,
];

export const BASE_GREAVES: ILegging = {
  ...BASE_ARMOR,
  id: 0,
  name: 'Leather Greaves',
  icon: ICON_ID.LEGGING_LEATHER_1,
  itemType: ITEM_TYPE.ARMOR,
  armorPart: ARMOR_PART.LEGGING,
  stats: {
    strength: 6,
    intelligence: 2,
    defense: 5,
    constitution: 5,
  },
};

export const BASE_PANTALOONS: ILegging = {
  ...BASE_ARMOR,
  name: 'Leather Pantaloons',
  icon: ICON_ID.LEGGING_LEATHER_1,
  itemType: ITEM_TYPE.ARMOR,
  armorPart: ARMOR_PART.LEGGING,
  stats: {
    strength: 2,
    intelligence: 6,
    defense: 5,
    constitution: 5,
  },
};

export const BASE_CUISSES: ILegging = {
  ...BASE_ARMOR,
  name: 'Leather Cuisses',
  icon: ICON_ID.LEGGING_LEATHER_1,
  itemType: ITEM_TYPE.ARMOR,
  armorPart: ARMOR_PART.LEGGING,
  stats: {
    strength: 4,
    intelligence: 4,
    defense: 5,
    constitution: 5,
  },
};

export const BASE_LEGGINGS: ILegging[] = [
  BASE_GREAVES,
  BASE_PANTALOONS,
  BASE_CUISSES,
];

export const BASE_ARMORS = [
  ...BASE_HELMETS,
  ...BASE_CHESTPIECES,
  ...BASE_LEGGINGS,
];

export const HELMETS: IHelmet[] = [
  {
    id: 1,
    name: 'Leather Helmet',
    icon: ICON_ID.HELMET_LEATHER_1,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.HELMET,
    stats: {
      defense: 3,
      strength: 2,
      intelligence: 0,
      constitution: 3,
    },
  },
  {
    id: 2,
    name: 'Leather Wizard Hat',
    icon: ICON_ID.HELMET_LEATHER_2,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.HELMET,
    stats: {
      defense: 3,
      strength: 0,
      intelligence: 2,
      constitution: 3,
    },
  },
  {
    id: 3,
    name: 'Steel Helmet',
    icon: ICON_ID.HELMET_STEEL_1,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.HELMET,
    stats: {
      defense: 4,
      strength: 3,
      intelligence: 1,
      constitution: 4,
    },
  },
  {
    id: 4,
    name: 'Steel Wizard Hat',
    icon: ICON_ID.HELMET_STEEL_2,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.HELMET,
    stats: {
      defense: 4,
      strength: 1,
      intelligence: 3,
      constitution: 1,
    },
  },
  {
    id: 5,
    name: 'Gold Helmet',
    icon: ICON_ID.HELMET_GOLD_1,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.HELMET,
    stats: {
      defense: 5,
      strength: 3,
      intelligence: 1,
      constitution: 5,
    },
  },
  {
    id: 6,
    name: 'Gold Wizard Hat',
    icon: ICON_ID.HELMET_GOLD_2,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.HELMET,
    stats: {
      defense: 5,
      strength: 1,
      intelligence: 3,
      constitution: 5,
    },
  },
  {
    id: 7,
    name: 'Diamond Helmet',
    icon: ICON_ID.HELMET_DIAMOND_1,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.HELMET,
    stats: {
      defense: 6,
      strength: 4,
      intelligence: 1,
      constitution: 6,
    },
  },
  {
    id: 8,
    name: 'Diamond Wizard Hat',
    icon: ICON_ID.HELMET_DIAMOND_2,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.HELMET,
    stats: {
      defense: 6,
      strength: 1,
      intelligence: 4,
      constitution: 6,
    },
  },
];

export const CHESTPIECES: IChestpiece[] = [
  {
    id: 1,
    name: 'Leather Chestpiece',
    icon: ICON_ID.CHESTPIECE_LEATHER_1,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.CHESTPIECE,
    stats: {
      defense: 5,
      strength: 3,
      intelligence: 0,
      constitution: 5,
    },
  },
  {
    id: 2,
    name: 'Leather Wizard Robes',
    icon: ICON_ID.CHESTPIECE_LEATHER_2,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.CHESTPIECE,
    stats: {
      defense: 5,
      strength: 0,
      intelligence: 3,
      constitution: 5,
    },
  },
  {
    id: 3,
    name: 'Steel Chestpiece',
    icon: ICON_ID.CHESTPIECE_STEEL_1,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.CHESTPIECE,
    stats: {
      defense: 6,
      strength: 4,
      intelligence: 1,
      constitution: 6,
    },
  },
  {
    id: 4,
    name: 'Steel Wizard Robes',
    icon: ICON_ID.CHESTPIECE_STEEL_2,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.CHESTPIECE,
    stats: {
      defense: 6,
      strength: 1,
      intelligence: 4,
      constitution: 6,
    },
  },
  {
    id: 5,
    name: 'Gold Chestpiece',
    icon: ICON_ID.CHESTPIECE_GOLD_1,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.CHESTPIECE,
    stats: {
      defense: 7,
      strength: 5,
      intelligence: 1,
      constitution: 7,
    },
  },
  {
    id: 6,
    name: 'Gold Wizard Robes',
    icon: ICON_ID.CHESTPIECE_GOLD_2,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.CHESTPIECE,
    stats: {
      defense: 7,
      strength: 1,
      intelligence: 5,
      constitution: 7,
    },
  },
  {
    id: 7,
    name: 'Diamond Chestpiece',
    icon: ICON_ID.CHESTPIECE_DIAMOND_1,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.CHESTPIECE,
    stats: {
      defense: 8,
      strength: 6,
      intelligence: 1,
      constitution: 8,
    },
  },
  {
    id: 8,
    name: 'Diamond Wizard Robes',
    icon: ICON_ID.CHESTPIECE_DIAMOND_2,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.CHESTPIECE,
    stats: {
      defense: 8,
      strength: 1,
      intelligence: 6,
      constitution: 8,
    },
  },
];

export const LEGGINGS: ILegging[] = [
  {
    id: 1,
    name: 'Leather Pants',
    icon: ICON_ID.LEGGING_LEATHER_1,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.LEGGING,
    stats: {
      defense: 5,
      strength: 1,
      intelligence: 1,
      constitution: 5,
    },
  },
  {
    id: 2,
    name: 'Steel Leggings',
    icon: ICON_ID.LEGGING_STEEL_1,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.LEGGING,
    stats: {
      defense: 7,
      strength: 2,
      intelligence: 2,
      constitution: 7,
    },
  },
  {
    id: 3,
    name: 'Gold Leggings',
    icon: ICON_ID.LEGGING_GOLD_1,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.LEGGING,
    stats: {
      defense: 9,
      strength: 3,
      intelligence: 3,
      constitution: 9,
    },
  },
  {
    id: 4,
    name: 'Diamond Leggings',
    icon: ICON_ID.LEGGING_DIAMOND_1,
    itemType: ITEM_TYPE.ARMOR,
    armorPart: ARMOR_PART.LEGGING,
    stats: {
      defense: 11,
      strength: 4,
      intelligence: 4,
      constitution: 11,
    },
  },
];
