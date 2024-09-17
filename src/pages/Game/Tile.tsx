import { FC, useMemo } from 'react';
import { ENTITY_TYPE } from '../../constants/entity';
import { TILE_SIZE, TILE_TYPE } from '../../constants/tile';
import clsx from 'clsx';
import { IPlayerState } from '../../types';

const TILE_HIGHLIGHT_PADDING = 12;

export const Tile: FC<{
  rowIndex: number;
  colIndex: number;
  tileType: number;
  entityIfExist?: [ENTITY_TYPE, number] | undefined;
  playerState: IPlayerState;
  active: boolean;
  hovered: boolean;
  isEffectZone: boolean;
  isTargetZone: boolean | null;
  isRoomOver: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  classNames?: string;
}> = ({
  tileType,
  entityIfExist,
  // playerState,
  active,
  hovered,
  isEffectZone,
  isTargetZone = false,
  isRoomOver,
  onClick,
  onMouseEnter,
  onMouseLeave,
  classNames = '',
}) => {
  const hasPlayer = useMemo(() => {
    if (entityIfExist) {
      return entityIfExist[0] === ENTITY_TYPE.PLAYER;
    }
  }, [entityIfExist]);

  const hasEnemy = useMemo(() => {
    if (entityIfExist) {
      return entityIfExist[0] === ENTITY_TYPE.ENEMY;
    }
  }, [entityIfExist]);

  const entityTileID = useMemo(() => {
    let idString = 'tile_';

    if (entityIfExist) {
      if (entityIfExist[0] === ENTITY_TYPE.PLAYER) {
        idString += 'player_';
      } else if (entityIfExist[0] === ENTITY_TYPE.ENEMY) {
        idString += 'enemy_';
      }

      idString += entityIfExist[1];
    }

    return idString;
  }, [entityIfExist]);

  const isAttackEffectTile = useMemo(() => {
    return (
      tileType !== TILE_TYPE.OBSTACLE &&
      tileType !== TILE_TYPE.WALL &&
      tileType !== TILE_TYPE.DOOR &&
      tileType !== TILE_TYPE.CHEST &&
      !hasPlayer
    );
  }, [hasPlayer, tileType]);

  const isSkillEffectTile = useMemo(() => {
    return (
      tileType !== TILE_TYPE.OBSTACLE &&
      tileType !== TILE_TYPE.WALL &&
      tileType !== TILE_TYPE.DOOR &&
      tileType !== TILE_TYPE.CHEST
    );
  }, [tileType]);

  const targetZoneClasses = useMemo(() => {
    let classStr = '';

    if (isTargetZone) {
      // Checking for AOE skills
      if (hasPlayer) {
        classStr += '!shadow-intense-green z-[31]';
      } else if (hasEnemy) {
        // Make sure enemy target skills highlight red on enemy tile
        classStr += '!shadow-intense-red z-[31]';
      }
    }

    return classStr;
  }, [isTargetZone, hasPlayer, hasEnemy]);

  return (
    <div
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        padding: 5,
      }}
      className={clsx('relative group', {
        // Add tile type as classname
        null: tileType === TILE_TYPE.NULL,
        floor: tileType === TILE_TYPE.FLOOR,
        wall: tileType === TILE_TYPE.WALL,
        door: tileType === TILE_TYPE.DOOR,
        chest: tileType === TILE_TYPE.CHEST,

        // Only use cursor-pointer non-wall tiles (and door tiles and chest tiles if room is over)
        'cursor-pointer':
          tileType === TILE_TYPE.FLOOR ||
          (tileType === TILE_TYPE.DOOR && isRoomOver) ||
          (tileType === TILE_TYPE.CHEST && isRoomOver),
      })}
      onClick={onClick}
      onMouseEnter={() => {
        onMouseEnter();
      }}
      onMouseLeave={onMouseLeave}
      id={entityTileID}
    >
      <div
        style={{
          width: TILE_SIZE - TILE_HIGHLIGHT_PADDING,
          height: TILE_SIZE - TILE_HIGHLIGHT_PADDING,
          left: TILE_HIGHLIGHT_PADDING / 2,
          top: TILE_HIGHLIGHT_PADDING / 2,
        }}
        className={clsx('absolute w-full h-full', classNames, {
          // Only put shadow black on non-wall tiles
          'group-hover:shadow-mild-black group-hover:z-30':
            (tileType == TILE_TYPE.FLOOR && !(hasPlayer || hasEnemy)) ||
            (tileType == TILE_TYPE.DOOR && isRoomOver) ||
            (tileType == TILE_TYPE.CHEST && isRoomOver),

          // Tile type color
          // 'bg-white': tileType === TILE_TYPE.FLOOR,
          // 'bg-yellow-500': tileType === TILE_TYPE.DOOR,

          // Player and enemy tile
          'shadow-intense-green z-[31]': hasPlayer && hovered,
          'shadow-intense-red z-[31]': hasEnemy && hovered,

          // Active tile
          'shadow-mild-green z-20': hasPlayer && active && !hovered,
          'shadow-mild-red z-20': hasEnemy && active && !hovered,

          // Non-active tile
          'z-0': !active,

          // Effect zone
          // [effectZoneClasses]:
          //   isEffectZone &&
          //   (isAttackEffectTile || isMovingEffectTile || isSkillEffectTile),

          // Target zone
          // 'opacity-80': isTargetZone && isSkillEffectTile,
          [targetZoneClasses]:
            isTargetZone && (isAttackEffectTile || isSkillEffectTile),
          // 'shadow-mild-green': isTargetZone && isSkillEffectTile && hasPlayer,
        })}
      ></div>
      <div
        style={{ width: TILE_SIZE, height: TILE_SIZE }}
        className={clsx('absolute top-0 left-0 z-0', {
          // Effect zone
          'bg-black group-hover:opacity-50 opacity-30':
            isEffectZone && isSkillEffectTile && !isTargetZone,

          // Target zone
          'bg-black opacity-60': isTargetZone && isSkillEffectTile,
        })}
      ></div>
      {/* {renderEntity()} */}
    </div>
  );
};
