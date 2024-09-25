import { FC, useMemo, useState } from 'react';
import { IEntity } from '../../types';
import { ENTITY_TYPE } from '../../constants/entity';
import clsx from 'clsx';
import { useGameStateStore } from '../../stores/game';
import { usePlayerStore } from '../../stores/player';
import { useEnemyStore } from '../../stores/enemy';
import { StatusEffect } from './StatusEffect';

export const TurnInfo: FC<{
  currentHoveredEntity: IEntity | null;
  setCurrentHoveredEntity: (entity: IEntity | null) => void;
}> = ({ currentHoveredEntity, setCurrentHoveredEntity }) => {
  const { turnCycle } = useGameStateStore();
  const { player } = usePlayerStore();

  const { enemies } = useEnemyStore();

  // Map turn cycle to entities (player and enemies)
  // This is to ensure that the correct entity is displayed in the turn cycle as the player and enemies are updated
  const turnEntities = useMemo(() => {
    return turnCycle.map((entity) => {
      if (entity.entityType === ENTITY_TYPE.PLAYER) {
        return player;
      } else {
        const enemy = enemies.find((enemy) => enemy.id === entity.id);
        if (enemy) {
          return enemy;
        }
        return null;
      }
    });
  }, [enemies, player, turnCycle]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-[135px] mx-auto flex justify-center">
        {turnEntities.map((entity) => {
          if (!entity) {
            return null;
          }

          return (
            <div key={entity.entityType + entity.id} className="mr-1">
              <EntityCard
                entity={entity}
                active={
                  currentHoveredEntity?.entityType === entity.entityType &&
                  currentHoveredEntity?.id === entity.id
                }
                onMouseEnter={() => setCurrentHoveredEntity(entity)}
                onMouseLeave={() => setCurrentHoveredEntity(null)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
const EntityCard: FC<{
  entity: IEntity | null;
  active: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ entity, active, onMouseEnter, onMouseLeave }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!entity) {
    return null;
  }

  const renderEntityHP = () => {
    let str = 'HP: ';
    if (isHovered) {
      str +=
        entity.health > 0
          ? Math.round((entity.health / entity.maxHealth) * 100)
          : 0;
      str += '%';
    } else {
      str +=
        entity.health > 0
          ? entity.health + ' / ' + entity.maxHealth
          : 0 + ' / ' + entity.maxHealth;
    }

    return str;
  };

  return (
    <div>
      <div
        className={clsx('relative border p-3 cursor-default', {
          'z-0 hover:shadow-intense-green hover:z-10':
            entity.entityType === ENTITY_TYPE.PLAYER && !active,
          'z-0 hover:shadow-intense-red hover:z-10':
            entity.entityType === ENTITY_TYPE.ENEMY && !active,
          'shadow-intense-green z-10':
            entity.entityType === ENTITY_TYPE.PLAYER && active,
          'shadow-intense-red z-10':
            entity.entityType === ENTITY_TYPE.ENEMY && active,
        })}
        onMouseEnter={() => {
          onMouseEnter();
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          onMouseLeave();
          setIsHovered(false);
        }}
      >
        <div
          className={clsx(
            'absolute z-[-10] bottom-0 left-0 w-full transition-all ease-in-out duration-300 delay-0',
            {
              'bg-green-700': entity.entityType === ENTITY_TYPE.PLAYER,
              'bg-red-700': entity.entityType === ENTITY_TYPE.ENEMY,
            }
          )}
          style={{
            height:
              ((entity.health > 0 ? entity.health : 0) / entity.maxHealth) *
                100 +
              '%',
          }}
        ></div>
        <h3 className="whitespace-nowrap">{entity.name}</h3>
        <h4 className="whitespace-nowrap">{renderEntityHP()}</h4>
      </div>
      {/* Display statuses if present */}
      <div className="mt-3 flex flex-wrap justify-center items-center">
        {entity.statuses.length > 0 &&
          // Display only unique statuses
          entity.statuses
            .filter(
              (status, index, self) =>
                index ===
                self.findIndex(
                  (s) => s.name === status.name && s.id === status.id
                )
            )
            .map((status) => {
              const stacks = entity.statuses.filter(
                (s) => s.name === status.name && s.id === status.id
              ).length;

              return (
                <StatusEffect key={status.id} status={status} stacks={stacks} />
              );
            })}
      </div>
    </div>
  );
};
