import { IEnemy, IEntity, IPlayer, ISkill, ISummon } from '../types';
import { getPlayerMaxHealth } from '../utils/entity';
import { LEGGINGS } from './armor';
import { SKILL_ID, SKILLS } from './skill';
import { SPRITE_ID } from './sprite';
import { TILE_SIZE } from './tile';
import { WEAPONS } from './weapon';

export const STARTING_ACTION_POINTS = 4;

export const MAX_ACTION_POINTS = 6;

export enum ENTITY_TYPE {
  PLAYER = 'player',
  ENEMY = 'enemy',
  SUMMON = 'summon',
}

export enum ENTITY_SPRITE_DIRECTION {
  LEFT = 'left',
  RIGHT = 'right',
}

export const DEFAULT_MOVEMENT_RANGE = 2;

export const STARTING_MAX_HEALTH = 25;

export const BASE_ENTITY: IEntity = {
  id: 0,
  name: '',
  entityType: ENTITY_TYPE.PLAYER,
  health: 0,
  maxHealth: 0,
  statuses: [],
  damageBonus: 0,
  movementRange: DEFAULT_MOVEMENT_RANGE,
  actionPoints: STARTING_ACTION_POINTS,
  sprite: SPRITE_ID.PLAYER_16,
  spriteSize: TILE_SIZE * 1.5,
  spritesheetRows: 12,
  spritesheetColumns: 6,
  spritesheetIdleRow: 0,
  spritesheetMovementRow: 1,
  spritesheetAttackRow: 2,
  spritesheetDamagedRow: 8,
  spritesheetDefeatRow: 9,
};

export const PLAYER: IPlayer = {
  ...BASE_ENTITY,
  id: 1,
  name: 'Kratos',
  sprite: SPRITE_ID.PLAYER_16,
  spriteSize: TILE_SIZE * 1.7,
  spritesheetRows: 12,
  spritesheetColumns: 6,
  spritesheetIdleRow: 0,
  spritesheetMovementRow: 1,
  spritesheetAttackRow: 2,
  spritesheetDamagedRow: 8,
  spritesheetDefeatRow: 9,
  entityType: ENTITY_TYPE.PLAYER,
  health: 1,
  maxHealth: 1,
  damageBonus: 0,
  actionPoints: STARTING_ACTION_POINTS,
  movementRange: 2,
  skills: SKILLS,
  statuses: [],
  state: {
    isAttacking: false,
    isMoving: false,
    isUsingSkill: false,
  },
  equipment: {
    weapon: WEAPONS.find((weapon) => weapon.id === 1) || null,
    helmet: null,
    chestpiece: null,
    legging: LEGGINGS.find((legging) => legging.id === 1) || null,
  },
  healthPotions: 0,
};

// const equippedSkills = [SKILL_ID.CLEAVE, SKILL_ID.FIREBALL, SKILL_ID.FOCUS].map(
//   (id) => SKILLS.find((skill) => skill.id === id)
// );

// const equippedSkills = SKILLS.slice(0, 0 + 11); // 11 strength-based damage dealing skills
// const equippedSkills = SKILLS.slice(11, 11 + 12); // 12 intelligence-based damage dealing skills
// const equippedSkills = SKILLS.slice(23, 23 + 16); // 16 self targeted skills
// const equippedSkills = SKILLS.slice(39, 39 + 4); // 4 only debuff skills
// const equippedSkills = SKILLS.slice(43, 43 + 4); // 4 movement skills

const equippedSkills = [
  SKILL_ID.CLEAVE,
  SKILL_ID.FIREBALL,
  // SKILL_ID.FOCUS,
  SKILL_ID.FLY,
].map((id) => SKILLS.find((skill) => skill.id === id));

const filterUndefinedEquippedSkills = (
  equippedSkills: (ISkill | undefined)[]
) => equippedSkills.filter((skill) => skill !== undefined) as ISkill[];

export const getDefaultPlayer = (): IPlayer => {
  return {
    ...PLAYER,
    health: getPlayerMaxHealth(PLAYER),
    // health: 5,
    maxHealth: getPlayerMaxHealth(PLAYER),
    actionPoints: STARTING_ACTION_POINTS,
    skills: filterUndefinedEquippedSkills(equippedSkills),
  };
};

let id = 1;

export enum SUMMON_PRESET_ID {
  CLONE = id++,
}

export const SUMMON_PRESETS: Record<SUMMON_PRESET_ID, ISummon> = {
  [SUMMON_PRESET_ID.CLONE]: {
    ...BASE_ENTITY,
    id: 0,
    name: 'Clone',
    sprite: SPRITE_ID.PLAYER_16,
    spriteSize: 64,
    spritesheetRows: 12,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 8,
    spritesheetDefeatRow: 9,
    entityType: ENTITY_TYPE.SUMMON,
    health: 1,
    maxHealth: 1,
    damageBonus: 0,
    statuses: [],
    owner: getDefaultPlayer(),
    ownerId: 1,
  },
};

export enum ENEMY_PRESET_ID {
  ABYSSAL_CYCLOPEAN_WRAITH = id++,
  CERBERUS_PUP = id++,
  CORRUPT_MINOTAUR = id++,
  CORRUPT_OLYMPIAN = id++,
  EREBUS_FIEND = id++,
  INFERNAL_MINOTAUR = id++,
  MYRMIDON_HOUND = id++,
  SKYWARD_TITAN = id++,
  STYGIAN_WRAITH = id++,
  TARTARIAN_HOUND = id++,
  TARTARIAN_LYCAN = id++,
  // SHADE = id++,
  // GORGON = id++,
  // HARPY = id++,
  // MINOTAUR = id++,
  // FLAMING_SKULL_A = id++,
}

const BASE_ENEMY: IEnemy = {
  ...BASE_ENTITY,
  presetID: ENEMY_PRESET_ID.CERBERUS_PUP,
  range: 1,
  damage: 1,
  divinity: 10,
};

export const ENEMY_PRESETS: Record<ENEMY_PRESET_ID, IEnemy> = {
  // Miniboss
  [ENEMY_PRESET_ID.ABYSSAL_CYCLOPEAN_WRAITH]: {
    ...BASE_ENEMY,
    id: 0,
    name: 'Abyssal Cyclopean Wraith',
    sprite: SPRITE_ID.ABYSSAL_CYCLOPEAN_WRAITH,
    presetID: ENEMY_PRESET_ID.ABYSSAL_CYCLOPEAN_WRAITH,
    spriteSize: TILE_SIZE * 3.2,
    spritesheetRows: 7,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 5,
    spritesheetDefeatRow: 6,
    entityType: ENTITY_TYPE.ENEMY,
    health: 50,
    maxHealth: 50,
    range: 2,
    damage: 8,
    damageBonus: 0,
    statuses: [],
    divinity: 30,
  },
  // Tier 1
  [ENEMY_PRESET_ID.CERBERUS_PUP]: {
    ...BASE_ENEMY,
    id: 0,
    name: 'Corrupted Cat',
    sprite: SPRITE_ID.CERBERUS_PUP,
    presetID: ENEMY_PRESET_ID.CERBERUS_PUP,
    spriteSize: TILE_SIZE * 2,
    spritesheetRows: 5,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 3,
    spritesheetDefeatRow: 4,
    entityType: ENTITY_TYPE.ENEMY,
    health: 10,
    maxHealth: 10,
    range: 1,
    damage: 4,
    damageBonus: 0,
    statuses: [],
    divinity: 10,
  },
  // Boss
  [ENEMY_PRESET_ID.CORRUPT_MINOTAUR]: {
    ...BASE_ENEMY,
    id: 0,
    name: 'Corrupt Minotaur',
    sprite: SPRITE_ID.CORRUPT_MINOTAUR,
    presetID: ENEMY_PRESET_ID.CORRUPT_MINOTAUR,
    spriteSize: TILE_SIZE * 3.5,
    spritesheetRows: 6,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 4,
    spritesheetDefeatRow: 5,
    entityType: ENTITY_TYPE.ENEMY,
    health: 60,
    maxHealth: 60,
    range: 1,
    damage: 15,
    damageBonus: 0,
    statuses: [],
    divinity: 30,
  },
  // Tier 3
  [ENEMY_PRESET_ID.CORRUPT_OLYMPIAN]: {
    ...BASE_ENEMY,
    id: 0,
    name: 'Corrupt Olympian',
    sprite: SPRITE_ID.CORRUPT_OLYMPIAN,
    presetID: ENEMY_PRESET_ID.CORRUPT_OLYMPIAN,
    spriteSize: TILE_SIZE * 3.5,
    spritesheetRows: 9,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 7,
    spritesheetDefeatRow: 8,
    entityType: ENTITY_TYPE.ENEMY,
    health: 60,
    maxHealth: 60,
    range: 2,
    damage: 6,
    damageBonus: 0,
    statuses: [],
    divinity: 30,
  },
  // Tier 2
  [ENEMY_PRESET_ID.EREBUS_FIEND]: {
    ...BASE_ENEMY,
    id: 0,
    name: 'Erebus Fiend',
    sprite: SPRITE_ID.EREBUS_FIEND,
    presetID: ENEMY_PRESET_ID.EREBUS_FIEND,
    spriteSize: TILE_SIZE * 2.5,
    spritesheetRows: 7,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 4,
    spritesheetDamagedRow: 5,
    spritesheetDefeatRow: 6,
    entityType: ENTITY_TYPE.ENEMY,
    health: 25,
    maxHealth: 25,
    range: 2,
    damage: 6,
    damageBonus: 0,
    statuses: [],
    divinity: 20,
  },
  // Tier 3
  [ENEMY_PRESET_ID.INFERNAL_MINOTAUR]: {
    ...BASE_ENEMY,
    id: 0,
    name: 'Infernal Minotaur',
    sprite: SPRITE_ID.INFERNAL_MINOTAUR,
    presetID: ENEMY_PRESET_ID.INFERNAL_MINOTAUR,
    spriteSize: TILE_SIZE * 3,
    spritesheetRows: 6,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 4,
    spritesheetDefeatRow: 5,
    entityType: ENTITY_TYPE.ENEMY,
    health: 40,
    maxHealth: 40,
    range: 1,
    damage: 8,
    damageBonus: 0,
    statuses: [],
    divinity: 20,
  },
  // Tier 2
  [ENEMY_PRESET_ID.MYRMIDON_HOUND]: {
    ...BASE_ENEMY,
    id: 0,
    name: 'Myrmidon Hound',
    sprite: SPRITE_ID.MYRMIDON_HOUND,
    presetID: ENEMY_PRESET_ID.MYRMIDON_HOUND,
    spriteSize: TILE_SIZE * 3,
    spritesheetRows: 7,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 3,
    spritesheetDamagedRow: 5,
    spritesheetDefeatRow: 6,
    entityType: ENTITY_TYPE.ENEMY,
    health: 45,
    maxHealth: 45,
    range: 1,
    damage: 5,
    damageBonus: 0,
    statuses: [],
    divinity: 20,
  },
  // Tier 3
  [ENEMY_PRESET_ID.SKYWARD_TITAN]: {
    ...BASE_ENEMY,
    id: 0,
    name: 'Skyward Titan',
    sprite: SPRITE_ID.ENEMY_SKYWARD_TITAN,
    presetID: ENEMY_PRESET_ID.SKYWARD_TITAN,
    spriteSize: TILE_SIZE * 2.5,
    spritesheetRows: 5,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 3,
    spritesheetDefeatRow: 4,
    entityType: ENTITY_TYPE.ENEMY,
    health: 35,
    maxHealth: 35,
    range: 1,
    damage: 10,
    damageBonus: 0,
    statuses: [],
    divinity: 20,
  },
  // Tier 1
  [ENEMY_PRESET_ID.STYGIAN_WRAITH]: {
    ...BASE_ENEMY,
    id: 0,
    name: 'Stygian Wraith',
    sprite: SPRITE_ID.STYGIAN_WRAITH,
    presetID: ENEMY_PRESET_ID.STYGIAN_WRAITH,
    spriteSize: TILE_SIZE * 1.3,
    spritesheetRows: 5,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 2,
    spritesheetDamagedRow: 3,
    spritesheetDefeatRow: 4,
    entityType: ENTITY_TYPE.ENEMY,
    health: 12,
    maxHealth: 12,
    range: 4,
    damage: 2,
    damageBonus: 0,
    statuses: [],
    divinity: 10,
  },
  // Tier 2
  [ENEMY_PRESET_ID.TARTARIAN_HOUND]: {
    ...BASE_ENEMY,
    id: 0,
    name: 'Tartarian Hound',
    sprite: SPRITE_ID.TARTARIAN_HOUND,
    presetID: ENEMY_PRESET_ID.TARTARIAN_HOUND,
    spriteSize: TILE_SIZE * 3,
    spritesheetRows: 9,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 3,
    spritesheetDamagedRow: 7,
    spritesheetDefeatRow: 8,
    entityType: ENTITY_TYPE.ENEMY,
    health: 25,
    maxHealth: 25,
    range: 1,
    damage: 10,
    damageBonus: 0,
    statuses: [],
    divinity: 20,
  },
  // Tier 2
  [ENEMY_PRESET_ID.TARTARIAN_LYCAN]: {
    ...BASE_ENEMY,
    id: 0,
    name: 'Tartarian Lycan',
    sprite: SPRITE_ID.TARTARIAN_LYCAN,
    presetID: ENEMY_PRESET_ID.TARTARIAN_LYCAN,
    spriteSize: TILE_SIZE * 2.8,
    spritesheetRows: 8,
    spritesheetColumns: 6,
    spritesheetIdleRow: 0,
    spritesheetMovementRow: 1,
    spritesheetAttackRow: 5,
    spritesheetDamagedRow: 6,
    spritesheetDefeatRow: 7,
    entityType: ENTITY_TYPE.ENEMY,
    health: 30,
    maxHealth: 30,
    range: 1,
    damage: 8,
    damageBonus: 0,
    statuses: [],
    divinity: 20,
  },
};
