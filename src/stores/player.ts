import { create } from 'zustand';
import { getDefaultPlayer } from '../constants/entity';
import { WEAPON_TYPE, WEAPON_ATTACK_TYPE } from '../constants/weapon';
import {
  IChestpiece,
  IHelmet,
  ILegging,
  IPlayer,
  IPlayerState,
  ISkill,
  IStats,
  IStatus,
  IWeapon,
} from '../types';
import { getPlayerMaxHealth } from '../utils/entity';

interface IPlayerStore {
  player: IPlayer;
  playerMovementAPCost: number;
  setPlayerMovementAPCost: (playerMovementAPCost: number) => void;
  getPlayerBaseAttackDamage: () => number;
  getPlayerBonusDamage: () => number;
  getPlayerTotalStats: () => IStats;
  getPlayerTotalStrength: () => number;
  getPlayerTotalIntelligence: () => number;
  getPlayerTotalDefense: () => number;
  getPlayerTotalConstitution: () => number;
  getPlayerLifestealMultiplier: () => number;
  setPlayer: (player: IPlayer) => void;
  setPlayerActionPoints: (actionPoints: number) => void;
  setPlayerSkills: (skills: ISkill[]) => void;
  setPlayerStatuses: (statuses: IStatus[]) => void;
  setPlayerState: (state: IPlayerState) => void;
  setPlayerWeapon: (weapon: IWeapon | null) => void;
  setPlayerHelmet: (helmet: IHelmet | null) => void;
  setPlayerChestpiece: (chestpiece: IChestpiece | null) => void;
  setPlayerLegging: (legging: ILegging | null) => void;
  resetPlayerStore: () => void;
}

export const usePlayerStore = create<IPlayerStore>((set, get) => ({
  player: getDefaultPlayer(),

  playerMovementAPCost: 0,

  setPlayerMovementAPCost: (playerMovementAPCost: number) =>
    set({ playerMovementAPCost }),

  getPlayerBaseAttackDamage: () => {
    const totalStrength = get().getPlayerTotalStrength();
    const totalIntelligence = get().getPlayerTotalIntelligence();
    const weapon = get().player.equipment.weapon;

    if (weapon === null) {
      return 0;
    }

    if (weapon.attackType === WEAPON_ATTACK_TYPE.MELEE) {
      return totalStrength;
    } else if (weapon.attackType === WEAPON_ATTACK_TYPE.RANGED) {
      if (weapon.type === WEAPON_TYPE.BOW) {
        return totalStrength;
      }
    }

    return totalIntelligence;
  },

  getPlayerBonusDamage: () => {
    const bonusDamage = get().player.statuses.reduce(
      (acc, status) => acc + status.effect.damageBonus,
      0
    );
    return bonusDamage;
  },

  getPlayerTotalStats: () => {
    const totalStrength = get().getPlayerTotalStrength();
    const totalIntelligence = get().getPlayerTotalIntelligence();
    const totalDefense = get().getPlayerTotalDefense();
    const totalConstitution = get().getPlayerTotalConstitution();

    return {
      strength: totalStrength,
      intelligence: totalIntelligence,
      defense: totalDefense,
      constitution: totalConstitution,
    };
  },

  getPlayerTotalStrength: () => {
    const weaponStrength = get().player.equipment.weapon?.stats.strength || 0;
    const helmetStrength = get().player.equipment.helmet?.stats.strength || 0;
    const chestpieceStrength =
      get().player.equipment.chestpiece?.stats.strength || 0;
    const leggingStrength = get().player.equipment.legging?.stats.strength || 0;

    const totalStrength =
      weaponStrength + helmetStrength + chestpieceStrength + leggingStrength;

    // 0, 0, 1, 1, 0.6, 1.2 = 0.8

    const strengthMultiplier = get().player.statuses.reduce((acc, status) => {
      // console.log('status', status);

      if (status.effect.strengthMultiplier === 0) return acc;

      if (status.effect.strengthMultiplier > 1) {
        return acc + (status.effect.strengthMultiplier - 1);
      } else {
        return acc - (1 - status.effect.strengthMultiplier);
      }
    }, 1);

    // console.log('strengthMultiplier', strengthMultiplier);

    return Math.round(totalStrength * strengthMultiplier);
  },

  getPlayerTotalIntelligence: () => {
    const weaponIntelligence =
      get().player.equipment.weapon?.stats.intelligence || 0;
    const helmetIntelligence =
      get().player.equipment.helmet?.stats.intelligence || 0;
    const chestpieceIntelligence =
      get().player.equipment.chestpiece?.stats.intelligence || 0;
    const leggingIntelligence =
      get().player.equipment.legging?.stats.intelligence || 0;

    const intelligenceMultiplier = get().player.statuses.reduce(
      (acc, status) => {
        if (status.effect.intelligenceMultiplier === 0) return acc;

        if (status.effect.intelligenceMultiplier > 1) {
          return acc + (status.effect.intelligenceMultiplier - 1);
        } else {
          return acc - (1 - status.effect.intelligenceMultiplier);
        }
      },
      1
    );

    const totalIntelligence =
      weaponIntelligence +
      helmetIntelligence +
      chestpieceIntelligence +
      leggingIntelligence;

    return Math.round(totalIntelligence * intelligenceMultiplier);
  },

  getPlayerTotalDefense: () => {
    const weaponDefense = get().player.equipment.weapon?.stats.defense || 0;
    const helmetDefense = get().player.equipment.helmet?.stats.defense || 0;
    const chestpieceDefense =
      get().player.equipment.chestpiece?.stats.defense || 0;
    const leggingDefense = get().player.equipment.legging?.stats.defense || 0;

    // Get defense from status effects
    const totalDefenseFromStatuses = get().player.statuses.reduce(
      (acc, status) => acc + status.effect.incomingDamageReduction,
      0
    );

    const defenseMultiplier = get().player.statuses.reduce((acc, status) => {
      if (status.effect.defenseMultiplier === 0) return acc;

      if (status.effect.defenseMultiplier > 1) {
        return acc + (status.effect.defenseMultiplier - 1);
      } else {
        return acc - (1 - status.effect.defenseMultiplier);
      }
    }, 1);

    const equipmentDefense =
      weaponDefense + helmetDefense + chestpieceDefense + leggingDefense;

    return (
      Math.round(equipmentDefense * defenseMultiplier) +
      totalDefenseFromStatuses
    );
  },

  getPlayerTotalConstitution: () => {
    const weaponConstitution =
      get().player.equipment.weapon?.stats.constitution || 0;
    const helmetConstitution =
      get().player.equipment.helmet?.stats.constitution || 0;
    const chestpieceConstitution =
      get().player.equipment.chestpiece?.stats.constitution || 0;
    const leggingConstitution =
      get().player.equipment.legging?.stats.constitution || 0;

    const totalConstitution =
      weaponConstitution +
      helmetConstitution +
      chestpieceConstitution +
      leggingConstitution;

    return totalConstitution;
  },

  getPlayerLifestealMultiplier: () => {
    const lifestealMultiplier = get().player.statuses.reduce(
      (acc, status) => acc + status.effect.lifesteal,
      0
    );

    return lifestealMultiplier;
  },

  setPlayer: (player: IPlayer) =>
    set({ player: { ...player, maxHealth: getPlayerMaxHealth(player) } }),

  setPlayerActionPoints: (actionPoints: number) =>
    set({ player: { ...get().player, actionPoints } }),

  setPlayerSkills: (skills: ISkill[]) =>
    set({ player: { ...get().player, skills } }),

  setPlayerStatuses: (statuses: IStatus[]) =>
    set({ player: { ...get().player, statuses } }),

  setPlayerState: (state: IPlayerState) =>
    set({ player: { ...get().player, state } }),

  setPlayerWeapon: (weapon: IWeapon | null) => {
    const player = get().player;
    const newEquipment = { ...player.equipment, weapon };
    const newMaxHealth = getPlayerMaxHealth(player);
    const newPlayer = {
      ...player,
      equipment: newEquipment,
      maxHealth: newMaxHealth,
    };

    set({ player: newPlayer });
  },
  setPlayerHelmet: (helmet: IHelmet | null) => {
    const player = get().player;
    const newEquipment = { ...player.equipment, helmet };
    const newMaxHealth = getPlayerMaxHealth(player);
    const newPlayer = {
      ...player,
      equipment: newEquipment,
      maxHealth: newMaxHealth,
    };

    set({ player: newPlayer });
  },
  setPlayerChestpiece: (chestpiece: IChestpiece | null) => {
    const player = get().player;
    const newEquipment = { ...player.equipment, chestpiece };
    const newMaxHealth = getPlayerMaxHealth(player);
    const newPlayer = {
      ...player,
      equipment: newEquipment,
      maxHealth: newMaxHealth,
    };

    set({ player: newPlayer });
  },
  setPlayerLegging: (legging: ILegging | null) => {
    const player = get().player;
    const newEquipment = { ...player.equipment, legging };
    const newMaxHealth = getPlayerMaxHealth(player);
    const newPlayer = {
      ...player,
      equipment: newEquipment,
      maxHealth: newMaxHealth,
    };

    set({ player: newPlayer });
  },

  resetPlayerStore: () =>
    set({
      player: {
        ...getDefaultPlayer(),
        name: get().player.name,
        skills: get().player.skills,
      },
    }),
}));
