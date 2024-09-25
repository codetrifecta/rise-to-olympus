import { BASE_ARMORS } from '../constants/armor';
import { ICON_ID } from '../constants/icon';
import { ITEM_TYPE } from '../constants/item';
import { BASE_WEAPONS, WEAPON_TYPE } from '../constants/weapon';
import { IArmor, Item, IWeapon } from '../types';
import { pick } from './general';

export const getScaledItems = (level: number): Item[] => {
  // Gets scaled items based on the level of the rooms
  // The calling function will need to reassign the id of the items

  let numberOfItems = 5 + Math.round(level / 3);
  if (numberOfItems > 10) numberOfItems = 10;

  const items: Item[] = [];

  for (let i = 0; i < numberOfItems; i++) {
    const random = Math.random();
    if (random <= 0.2) {
      items.push(getRandomConsumable());
    } else if (random <= 0.6) {
      items.push(getRandomScaledWeapon(level));
    } else {
      items.push(getRandomScaledArmor(level));
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

const randomlyScaleStat = (base: number, level: number) => {
  return base * (1 + Math.random() * 0.6 * (level / 3));
};

const getRandomScaledWeapon = (level: number): Item => {
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
      strength: Math.round(randomlyScaleStat(baseWeaponStats.strength, level)),
      intelligence: Math.round(
        randomlyScaleStat(baseWeaponStats.intelligence, level)
      ),
      defense: Math.round(randomlyScaleStat(baseWeaponStats.defense, level)),
      constitution: Math.round(
        randomlyScaleStat(baseWeaponStats.constitution, level)
      ),
    },
  };
};

const getRandomScaledArmor = (level: number): Item => {
  // Pick one of the base armors
  const baseArmor: IArmor = pick(BASE_ARMORS);

  const baseArmorStats = baseArmor.stats;

  return {
    ...baseArmor,
    id: 0,
    stats: {
      ...baseArmorStats,
      strength: Math.round(randomlyScaleStat(baseArmorStats.strength, level)),
      intelligence: Math.round(
        randomlyScaleStat(baseArmorStats.intelligence, level)
      ),
      defense: Math.round(randomlyScaleStat(baseArmorStats.defense, level)),
      constitution: Math.round(
        randomlyScaleStat(baseArmorStats.constitution, level)
      ),
    },
  };
};
