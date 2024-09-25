// PLAYER
// import player_01 from '../assets/sprites/players/sprite_player_01.png';
import player_16 from '../assets/sprites/players/sprite_player_16.png';

// ENEMIES
// From Rogue Adventures Asset Pack
import abyssal_cyclopean_wraith from '../assets/sprites/enemies/sprite_enemy_abyssal_cyclopean_wraith.png';
import cerberus_pup from '../assets/sprites/enemies/sprite_enemy_cerberus_pup.png';
import corrupt_minotaur from '../assets/sprites/enemies/sprite_enemy_corrupt_minotaur.png';
import corrupt_olympian from '../assets/sprites/enemies/sprite_enemy_corrupt_olympian.png';
import erebus_fiend from '../assets/sprites/enemies/sprite_enemy_erebus_fiend.png';
import infernal_minotaur from '../assets/sprites/enemies/sprite_enemy_infernal_minotaur.png';
import myrmidon_hound from '../assets/sprites/enemies/sprite_enemy_myrmidon_hound.png';
import enemy_skyward_titan from '../assets/sprites/enemies/sprite_enemy_skyward_titan.png';
import stygian_wraith from '../assets/sprites/enemies/sprite_enemy_stygian_wraith.png';
import tartarian_hound from '../assets/sprites/enemies/sprite_enemy_tartarian_hound.png';
import tartarian_lycan from '../assets/sprites/enemies/sprite_enemy_tartarian_lycan.png';

// SKILL ANIMATION
import skill_17 from '../assets/sprites/skills/sprite_skill_17.png';
import skill_21 from '../assets/sprites/skills/sprite_skill_21.png';
import skill_22 from '../assets/sprites/skills/sprite_skill_22.png';
import skill_31 from '../assets/sprites/skills/sprite_skill_31.png';
import skill_34 from '../assets/sprites/skills/sprite_skill_34.png';
import skill_39 from '../assets/sprites/skills/sprite_skill_39.png';
import skill_43 from '../assets/sprites/skills/sprite_skill_43.png';
import skill_45 from '../assets/sprites/skills/sprite_skill_45.png';
import skill_48 from '../assets/sprites/skills/sprite_skill_48.png';
import skill_58 from '../assets/sprites/skills/sprite_skill_58.png';
import skill_64 from '../assets/sprites/skills/sprite_skill_64.png';
import skill_65 from '../assets/sprites/skills/sprite_skill_65.png';
import skill_72 from '../assets/sprites/skills/sprite_skill_72.png';
import skill_74 from '../assets/sprites/skills/sprite_skill_74.png';
import skill_81 from '../assets/sprites/skills/sprite_skill_81.png';
import skill_86 from '../assets/sprites/skills/sprite_skill_86.png';
import skill_90 from '../assets/sprites/skills/sprite_skill_90.png';
import skill_91 from '../assets/sprites/skills/sprite_skill_91.png';
import skill_92 from '../assets/sprites/skills/sprite_skill_92.png';
import skill_100 from '../assets/sprites/skills/sprite_skill_100.png';
import skill_105 from '../assets/sprites/skills/sprite_skill_105.png';
import skill_111 from '../assets/sprites/skills/sprite_skill_111.png';
import skill_119 from '../assets/sprites/skills/sprite_skill_119.png';
import skill_125 from '../assets/sprites/skills/sprite_skill_125.png';
import skill_128 from '../assets/sprites/skills/sprite_skill_128.png';
import skill_132 from '../assets/sprites/skills/sprite_skill_132.png';
import skill_133 from '../assets/sprites/skills/sprite_skill_133.png';
import skill_135 from '../assets/sprites/skills/sprite_skill_135.png';
import skill_137 from '../assets/sprites/skills/sprite_skill_137.png';
import skill_149 from '../assets/sprites/skills/sprite_skill_149.png';

export const spriteSize = 64;
export const FLOOR_SIZE = 32;

export enum SPRITE_ID {
  // PLAYER
  // PLAYER_01 = 'PLAYER_01',
  PLAYER_16 = 'PLAYER_16',

  // ENEMIES
  // From Rogue Adventures Asset Pack
  ABYSSAL_CYCLOPEAN_WRAITH = 'ABYSSAL_CYCLOPEAN_WRAITH',
  CERBERUS_PUP = 'CERBERUS_PUP',
  CORRUPT_MINOTAUR = 'CORRUPT_MINOTAUR',
  CORRUPT_OLYMPIAN = 'CORRUPT_OLYMPIAN',
  EREBUS_FIEND = 'EREBUS_FIEND',
  INFERNAL_MINOTAUR = 'INFERNAL_MINOTAUR',
  MYRMIDON_HOUND = 'MYRMIDON_HOUND',
  ENEMY_SKYWARD_TITAN = 'ENEMY_SKYWARD_TITAN',
  STYGIAN_WRAITH = 'STYGIAN_WRAITH',
  TARTARIAN_HOUND = 'TARTARIAN_HOUND',
  TARTARIAN_LYCAN = 'TARTARIAN_LYCAN',

  // SKILL ANIMATION
  SKILL_17 = 'SKILL_17',
  SKILL_21 = 'SKILL_21',
  SKILL_22 = 'SKILL_22',
  SKILL_31 = 'SKILL_31',
  SKILL_34 = 'SKILL_34',
  SKILL_39 = 'SKILL_39',
  SKILL_43 = 'SKILL_43',
  SKILL_45 = 'SKILL_45',
  SKILL_48 = 'SKILL_48',
  SKILL_58 = 'SKILL_58',
  SKILL_64 = 'SKILL_64',
  SKILL_65 = 'SKILL_65',
  SKILL_72 = 'SKILL_72',
  SKILL_74 = 'SKILL_74',
  SKILL_81 = 'SKILL_81',
  SKILL_86 = 'SKILL_86',
  SKILL_90 = 'SKILL_90',
  SKILL_91 = 'SKILL_91',
  SKILL_92 = 'SKILL_92',
  SKILL_100 = 'SKILL_100',
  SKILL_105 = 'SKILL_105',
  SKILL_111 = 'SKILL_111',
  SKILL_119 = 'SKILL_119',
  SKILL_125 = 'SKILL_125',
  SKILL_128 = 'SKILL_128',
  SKILL_132 = 'SKILL_132',
  SKILL_133 = 'SKILL_133',
  SKILL_135 = 'SKILL_135',
  SKILL_137 = 'SKILL_137',
  SKILL_149 = 'SKILL_149',
}

export const SPRITES: Record<SPRITE_ID, string> = {
  // PLAYER
  // [SPRITE_ID.PLAYER_01]: player_01,
  [SPRITE_ID.PLAYER_16]: player_16,

  // ENEMIES
  // From Rogue Adventures Asset Pack
  [SPRITE_ID.ABYSSAL_CYCLOPEAN_WRAITH]: abyssal_cyclopean_wraith,
  [SPRITE_ID.CERBERUS_PUP]: cerberus_pup,
  [SPRITE_ID.CORRUPT_MINOTAUR]: corrupt_minotaur,
  [SPRITE_ID.CORRUPT_OLYMPIAN]: corrupt_olympian,
  [SPRITE_ID.EREBUS_FIEND]: erebus_fiend,
  [SPRITE_ID.INFERNAL_MINOTAUR]: infernal_minotaur,
  [SPRITE_ID.MYRMIDON_HOUND]: myrmidon_hound,
  [SPRITE_ID.ENEMY_SKYWARD_TITAN]: enemy_skyward_titan,
  [SPRITE_ID.STYGIAN_WRAITH]: stygian_wraith,
  [SPRITE_ID.TARTARIAN_HOUND]: tartarian_hound,
  [SPRITE_ID.TARTARIAN_LYCAN]: tartarian_lycan,

  // SKILL ANIMATION
  [SPRITE_ID.SKILL_17]: skill_17,
  [SPRITE_ID.SKILL_21]: skill_21,
  [SPRITE_ID.SKILL_22]: skill_22,
  [SPRITE_ID.SKILL_31]: skill_31,
  [SPRITE_ID.SKILL_34]: skill_34,
  [SPRITE_ID.SKILL_39]: skill_39,
  [SPRITE_ID.SKILL_43]: skill_43,
  [SPRITE_ID.SKILL_45]: skill_45,
  [SPRITE_ID.SKILL_48]: skill_48,
  [SPRITE_ID.SKILL_58]: skill_58,
  [SPRITE_ID.SKILL_64]: skill_64,
  [SPRITE_ID.SKILL_65]: skill_65,
  [SPRITE_ID.SKILL_72]: skill_72,
  [SPRITE_ID.SKILL_74]: skill_74,
  [SPRITE_ID.SKILL_81]: skill_81,
  [SPRITE_ID.SKILL_86]: skill_86,
  [SPRITE_ID.SKILL_90]: skill_90,
  [SPRITE_ID.SKILL_91]: skill_91,
  [SPRITE_ID.SKILL_92]: skill_92,
  [SPRITE_ID.SKILL_100]: skill_100,
  [SPRITE_ID.SKILL_105]: skill_105,
  [SPRITE_ID.SKILL_111]: skill_111,
  [SPRITE_ID.SKILL_119]: skill_119,
  [SPRITE_ID.SKILL_125]: skill_125,
  [SPRITE_ID.SKILL_128]: skill_128,
  [SPRITE_ID.SKILL_132]: skill_132,
  [SPRITE_ID.SKILL_133]: skill_133,
  [SPRITE_ID.SKILL_135]: skill_135,
  [SPRITE_ID.SKILL_137]: skill_137,
  [SPRITE_ID.SKILL_149]: skill_149,
};

export const getSpriteSrc = (spriteID: SPRITE_ID) => SPRITES[spriteID] || '';
