import { ICON_ID } from '../constants/icon';
import { ITEM_TYPE } from '../constants/item';
import { BASE_WEAPONS, WEAPON_TYPE } from '../constants/weapon';
import { Item, IWeapon } from '../types';
import { pick } from './general';

export const getScaledItems = (level: number): Item[] => {
  // Gets scaled items based on the level of the rooms
  // The calling function will need to reassign the id of the items

  let numberOfItems = 3 + Math.round(level / 2);
  if (numberOfItems > 10) numberOfItems = 10;

  const items: Item[] = [];

  for (let i = 0; i < numberOfItems; i++) {
    const random = Math.random();
    if (random <= 0.2) {
      items.push(getRandomConsumable());
    } else if (random <= 0.6) {
      items.push(getRandomScaledWeapon(level));
    } else {
      items.push(getRandomScaledWeapon(level));
      //   items.push(getRandomScaledArmor());
    }
  }

  return items;
};

const getRandomConsumable = (): Item => {
  return {
    id: 0,
    name: 'Health Potion',
    icon: ICON_ID.HEALTH_POTION,
    itemType: ITEM_TYPE.CONSUMABLE,
  };
};

const getRandomScaledWeapon = (level: number): Item => {
  const scaledMultiplier = level / 10;

  // Pick one of the base weapons
  const baseWeapon: IWeapon = pick(
    BASE_WEAPONS.filter((w) => w.type !== WEAPON_TYPE.FIST)
  );

  const baseWeaponStats = baseWeapon.stats;

  return {
    ...baseWeapon,
    id: 0,
    stats: {
      ...baseWeaponStats,
      strength:
        baseWeaponStats.strength *
        Math.round(1 + Math.random() * scaledMultiplier),
      intelligence:
        baseWeaponStats.intelligence *
        Math.round(1 + Math.random() * scaledMultiplier),
      defense:
        baseWeaponStats.defense *
        Math.round(1 + Math.random() * scaledMultiplier),
      constitution:
        baseWeaponStats.constitution *
        Math.round(1 + Math.random() * scaledMultiplier),
    },
  };
};
