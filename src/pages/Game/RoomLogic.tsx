import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Tile } from './Tile';
import {
  DEFAULT_MOVEMENT_RANGE,
  ENTITY_SPRITE_DIRECTION,
  ENTITY_TYPE,
  MAX_ACTION_POINTS,
  STARTING_ACTION_POINTS,
} from '../../constants/entity';
import { TILE_SIZE, TILE_TYPE } from '../../constants/tile';
import {
  aoeSkillIDs,
  selfTargetedSkillIDs,
  singleTargetSkillIDs,
  SKILL_ID,
  SKILL_TYPE,
  weaponRangeBasedSkillIDs,
} from '../../constants/skill';
import { STATUS_ID, STATUSES } from '../../constants/status';
import { WEAPON_ATTACK_TYPE, WEAPON_TYPE } from '../../constants/weapon';
import {
  IEnemy,
  IEntity,
  IPlayer,
  IRoom,
  ISkill,
  ISkillAnimation,
} from '../../types';
import { useGameStateStore } from '../../stores/game';
import { usePlayerStore } from '../../stores/player';
import { useEnemyStore } from '../../stores/enemy';
import {
  damageEntity,
  displayGeneralMessage,
  displayStatusEffect,
  getEntityDodgeChance,
  getEntityPosition,
  getEntitySpriteDirection,
  getPlayerTotalDefense,
  getPlayerTotalIntelligence,
  getPlayerWeaponDamage,
  handlePlayerEndTurn,
  healEntity,
  isEnemy,
  isPlayer,
  setEntityAnimationAttack,
  setEntityAnimationIdle,
  setEntityAnimationWalk,
} from '../../utils/entity';
import { updateRoomEntityPositions } from '../../utils/room';
import { useLogStore } from '../../stores/log';
import { handleSkill } from '../../utils/skill';
import {
  findPathsFromCurrentLocation,
  getApCostForPath,
} from '../../utils/pathfinding';
import { getVisionFromEntityPosition } from '../../utils/vision';
import debounce from 'debounce';
import { useSummonStore } from '../../stores/summon';
import { useSkillAnimationStore } from '../../stores/skillAnimation';
import {
  SKILL_ANIMATION_PRESET,
  WEAPON_ATTACK_ANIMATION,
} from '../../constants/skillAnimation';
import { useFloorStore } from '../../stores/floor';
import { sleep } from '../../utils/general';
import { ROOM_TYPE } from '../../constants/room';

export const RoomLogic: FC<{
  currentHoveredEntity: IEntity | null;
  setCurrentHoveredEntity: (enemy: IEntity | null) => void;
}> = ({ currentHoveredEntity, setCurrentHoveredEntity }) => {
  // For handling AOE skill effects
  const [isEffectZoneHovered, setIsEffectZoneHovered] = useState(false);
  const [effectZoneHovered, setEffectZoneHovered] = useState<
    [number, number] | null
  >(null);

  const targetZones = useRef<[number, number][]>([]); // saves the target zones (row, col) for AOE skills

  const {
    roomLength,
    roomTileMatrix,
    roomEntityPositions,
    setRoomEntityPositions,
    turnCycle,
    prevTurnCycle,
    setTurnCycle,
    // setPrevTurnCycle,
    endTurn,
    isRoomOver,
    isGameOver,
    isCameraMoving,
    isEntityMoving,
    isChestOpen,
    setIsChestOpen,
    setIsGameOver,
    setIsRoomOver,
    setIsFloorCleared,
    setHoveredTile,
    setIsEntityMoving,
    setIsCharacterSheetOpen,
  } = useGameStateStore();
  const { setCurrentSkillAnimation } = useSkillAnimationStore();
  const {
    playerMovementAPCost,
    setPlayerMovementAPCost,
    player,
    getPlayerLifestealMultiplier,
    setPlayer,
    setPlayerActionPoints,
    setPlayerState,
  } = usePlayerStore();
  const playerLifestealMultiplier = getPlayerLifestealMultiplier();

  const { enemies, setEnemies, setEnemy } = useEnemyStore();
  const { summons } = useSummonStore();

  const { floor, currentRoom, setFloor, setCurrentRoom } = useFloorStore();

  const { addLog } = useLogStore();

  // When player changes room, check if the room is over and set it to true if it is
  useEffect(() => {
    console.log('handleRoomChange');

    const handleRoomChange = () => {
      if (currentRoom?.enemies.length === 0 || currentRoom?.isCleared) {
        setIsRoomOver(true);

        if (currentRoom.type === ROOM_TYPE.BOSS) {
          setIsFloorCleared(true);
        }
      }
    };

    handleRoomChange();
  }, [currentRoom, isRoomOver]);

  // When an enemy is defeated (i.e. removed from the game),
  // remove it from the room matrix,
  // remove it from the turn cycle and,
  // check if the room is over and log a message if it is.
  useEffect(() => {
    // Update enemy positions when enemy is defeated
    const updateEnemyPositionsWhenEnemyDefeated = () => {
      console.log('updateEnemyPositionsWhenEnemyDefeated');

      // Delete enemy from room entity positions
      const newRoomEntityPositions = new Map<string, [ENTITY_TYPE, number]>(
        roomEntityPositions
      );

      newRoomEntityPositions.forEach((value, key) => {
        if (value[0] === ENTITY_TYPE.ENEMY) {
          const enemy = enemies.find((e) => e.id === value[1]);
          if (!enemy) {
            newRoomEntityPositions.delete(key);
          }
        }
      });

      setRoomEntityPositions(newRoomEntityPositions);
    };

    // Update turn cycle to remove defeated enemies
    const updateTurnCycleWhenEnemyDefeated = () => {
      console.log('updateTurnCycleWhenEnemyDefeated');
      if (turnCycle.length > 0) {
        const newTurnCycle = turnCycle.filter((entity) => {
          if (entity.entityType === ENTITY_TYPE.ENEMY) {
            const enemy = enemies.find((e) => e.id === entity.id);
            if (!enemy) {
              return false;
            }
          }
          return true;
        });

        // prevTurnCycle.current = [...turnCycle];
        // Update game store turn cycle
        setTurnCycle(newTurnCycle);
      }
    };

    // If all enemies are defeated, log a message saying the player has completed the room
    const setRoomCompletion = () => {
      console.log('logRoomCompletion', enemies.length);
      if (enemies.length === 0 && currentRoom) {
        setIsRoomOver(true);

        // Mark current room as cleared
        const newFloor = floor.map((row) =>
          row.map((room) =>
            room.id === currentRoom?.id ? { ...room, isCleared: true } : room
          )
        );

        // Check cardinal directions for boss room,
        // and make it known if there is a boss room in that direction
        const [row, col] = currentRoom.position;
        if (
          currentRoom.northDoor &&
          floor[row - 1][col] &&
          floor[row - 1][col].type === ROOM_TYPE.BOSS
        ) {
          newFloor[row - 1][col] = {
            ...newFloor[row - 1][col],
            isKnown: true,
          };
        } else if (
          currentRoom.eastDoor &&
          floor[row][col + 1] &&
          floor[row][col + 1].type === ROOM_TYPE.BOSS
        ) {
          newFloor[row][col + 1] = {
            ...newFloor[row][col + 1],
            isKnown: true,
          };
        } else if (
          currentRoom.southDoor &&
          floor[row + 1][col] &&
          floor[row + 1][col].type === ROOM_TYPE.BOSS
        ) {
          newFloor[row + 1][col] = {
            ...newFloor[row + 1][col],
            isKnown: true,
          };
        } else if (
          currentRoom.westDoor &&
          floor[row][col - 1] &&
          floor[row][col - 1].type === ROOM_TYPE.BOSS
        ) {
          newFloor[row][col - 1] = {
            ...newFloor[row][col - 1],
            isKnown: true,
          };
        }

        const newCurrentRoom: IRoom = {
          ...currentRoom,
          isCleared: true,
          roomEntityPositions: roomEntityPositions,
        };

        setFloor(newFloor);
        setCurrentRoom(newCurrentRoom);

        const newPlayer: IPlayer = {
          ...player,
          actionPoints: STARTING_ACTION_POINTS,
          skills: player.skills.map((skill) => ({
            ...skill,
            cooldownCounter: 0,
          })),
          statuses: [],
        };

        setPlayer(newPlayer);
      }
    };

    // updateRoomMatrixWhenEnemyDefeated();
    updateEnemyPositionsWhenEnemyDefeated();
    updateTurnCycleWhenEnemyDefeated();
    setRoomCompletion();
  }, [enemies.length]);

  // When room is cleared, log a message and reset player's action points
  useEffect(() => {
    if (
      currentRoom &&
      currentRoom.enemies.length > 0 &&
      enemies.length === 0 &&
      currentRoom.isCleared
    ) {
      addLog({
        message: (
          <span className="text-green-500">Player cleared the room!</span>
        ),
        type: 'info',
      });
    }
  }, [currentRoom, player]);

  // When player's action points reach 0 and there are still enemies in the room (room is not over),
  // Automatically end player's turn
  useEffect(() => {
    const automaticallyEndPlayerTurn = () => {
      if (player.actionPoints === 0 && !isRoomOver && enemies.length > 0) {
        console.log('automaticallyEndPlayerTurn');
        handlePlayerEndTurn(turnCycle, player, setPlayer, endTurn);
        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> ended their
              turn.
            </>
          ),
          type: 'info',
        });
      }
    };
    automaticallyEndPlayerTurn();
  }, [player.actionPoints, isRoomOver, enemies.length]);

  // When turn cycle changes,
  // Handle DoT effects,
  // Handle enemy turn (Move closer to player and attack if within range)
  useEffect(() => {
    console.log('handleDoT');

    // Handle DoT check first
    const handleDoT = () => {
      if (
        turnCycle.length > 0 &&
        turnCycle[0].entityType === ENTITY_TYPE.ENEMY &&
        isEnemy(turnCycle[0])
      ) {
        // Simulate enemy action with a timeout
        const enemy = enemies.find((e) => e.id === turnCycle[0].id);

        if (!enemy) {
          addLog({ message: 'Enemy not found!', type: 'error' });
          return;
        }

        if (enemy.health <= 0) {
          return;
        }

        const affectedEnemy = { ...enemy };

        const dot = affectedEnemy.statuses.filter((status) =>
          [STATUS_ID.BURNED, STATUS_ID.BLEEDING].includes(status.id)
        );

        if (dot.length > 0) {
          setTimeout(() => {
            const totalDamage = dot.reduce((acc, status) => {
              return acc + status.effect.damageOverTime;
            }, 0);

            affectedEnemy.health = damageEntity(
              affectedEnemy,
              totalDamage,
              `tile_${enemy.entityType}_${enemy.id}`
            );

            if (affectedEnemy.health <= 0) {
              addLog({
                message: (
                  <>
                    <span className="text-red-500">{affectedEnemy.name}</span>{' '}
                    took {totalDamage} damage from burn and has been defeated!
                  </>
                ),
                type: 'info',
              });

              setEnemies(
                enemies.map((e) =>
                  e.id === affectedEnemy.id ? affectedEnemy : e
                )
              );

              setTimeout(() => {
                setEnemies(enemies.filter((e) => e.id !== affectedEnemy.id));
              }, 1200);
            } else {
              addLog({
                message: (
                  <>
                    <span className="text-red-500">{affectedEnemy.name}</span>{' '}
                    took {totalDamage} damage from burn.
                  </>
                ),
                type: 'info',
              });

              const damagedEnemy = setEnemy(affectedEnemy);

              handleEnemyTurn(damagedEnemy);
            }
          }, 1000);
        } else {
          handleEnemyTurn(affectedEnemy);
        }
      } else if (
        turnCycle.length > 0 &&
        turnCycle[0].entityType === ENTITY_TYPE.PLAYER &&
        isPlayer(turnCycle[0])
      ) {
        const affectedPlayer = { ...player };

        const burnedDoT = affectedPlayer.statuses.find(
          (status) => status.id === STATUS_ID.BURNED
        );

        if (burnedDoT) {
          const totalDamage = burnedDoT.effect.damageOverTime;

          affectedPlayer.health = damageEntity(
            affectedPlayer,
            totalDamage,
            `tile_${player.entityType}_${player.id}`
          );
          // affectedPlayer.health -= totalDamage;

          if (affectedPlayer.health <= 0) {
            addLog({
              message: (
                <>
                  <span className="text-green-500">{affectedPlayer.name}</span>{' '}
                  took 1 damage from burn and has been defeated!
                </>
              ),
              type: 'info',
            });
          } else {
            addLog({
              message: (
                <>
                  <span className="text-green-500">{affectedPlayer.name}</span>{' '}
                  took 1 damage from burn.
                </>
              ),
              type: 'info',
            });
          }

          setPlayer(affectedPlayer);
        }
      }
    };

    // Handle enemy's action and end turn
    const handleEnemyTurn = async (affectedEnemy: IEnemy) => {
      if (
        turnCycle.length > 0 &&
        turnCycle[0].entityType === ENTITY_TYPE.ENEMY &&
        isEnemy(turnCycle[0])
      ) {
        // Simulate enemy action with a timeout
        const enemy = enemies.find((e) => e.id === turnCycle[0].id);

        if (!enemy) {
          addLog({ message: 'Enemy not found!', type: 'error' });
          return;
        }

        // Check if enemy has a status effect that prevents them from moving
        const cannotMove = enemy.statuses.some(
          (status) => status.effect.canMove === false
        );

        // Check if enemy has a status effect that prevents them from attacking
        const cannotAttack = enemy.statuses.some(
          (status) => status.effect.canAttack === false
        );

        const enemyPosition: [number, number] | undefined = getEntityPosition(
          enemy,
          roomEntityPositions
        );

        // Update enemy
        let newEnemy = {
          ...affectedEnemy,
        };

        // Wait for a short time before enemy can move or attack
        await sleep(1000);

        // Check if enemy can move or attack
        if (cannotMove && cannotAttack) {
          addLog({
            message: (
              <>
                <span className="text-red-500">{enemy.name}</span> is unable to
                move or attack.
              </>
            ),
            type: 'info',
          });
        } else {
          if (!cannotMove) {
            // Move enemy to a random adjacent tile
            const [enemyAfterMove, enemyPosition] =
              await handleEnemyMove(newEnemy);

            newEnemy = {
              ...newEnemy,
              ...enemyAfterMove,
            };
            setEnemy(newEnemy);

            if (!cannotAttack) {
              let enemyAP = newEnemy.actionPoints;
              let newPlayer = player;
              while (enemyAP >= 2) {
                // Make enemy attack player if they can attack
                const [enemyAfterAttack, playerAfterAttack] =
                  await handleEnemyAttack(
                    newEnemy,
                    enemyPosition,
                    newPlayer,
                    playerPosition
                  );

                newEnemy = {
                  ...newEnemy,
                  ...enemyAfterAttack,
                };

                newPlayer = {
                  ...newPlayer,
                  ...playerAfterAttack,
                };

                enemyAP -= 2;
                setEnemy(newEnemy);
                await sleep(1500);
              }
            } else {
              addLog({
                message: (
                  <>
                    <span className="text-red-500">{enemy.name}</span> is unable
                    to attack.
                  </>
                ),
                type: 'info',
              });
            }
          } else {
            // Enemy cannot move
            addLog({
              message: (
                <>
                  <span className="text-red-500">{enemy.name}</span> is unable
                  to move.
                </>
              ),
              type: 'info',
            });

            // Make enemy attack player if they can attack
            if (!cannotAttack) {
              let enemyAP = newEnemy.actionPoints;
              let newPlayer = player;
              while (enemyAP >= 2) {
                if (!enemyPosition) {
                  console.error('Enemy position not found!');
                  return;
                }
                const [enemyAfterAttack, playerAfterAttack] =
                  await handleEnemyAttack(
                    newEnemy,
                    enemyPosition,
                    player,
                    playerPosition
                  );

                newEnemy = {
                  ...newEnemy,
                  ...enemyAfterAttack,
                };

                newPlayer = {
                  ...newPlayer,
                  ...playerAfterAttack,
                };

                if (newPlayer.health <= 0) {
                  return;
                }

                enemyAP -= 2;
                setEnemy(newEnemy);
                await sleep(1500);
              }
            } else {
              addLog({
                message: (
                  <>
                    <span className="text-red-500">{enemy.name}</span> is unable
                    to attack.
                  </>
                ),
                type: 'info',
              });
            }
          }
        }

        if (isGameOver) {
          return;
        }

        // End enemy's turn after moving and attacking (if they can)
        // Decrease enemy's statuses' duration
        // Increase enemy AP
        const decreasedStatuses = enemy.statuses.map((status) => {
          return {
            ...status,
            durationCounter: status.durationCounter - 1,
          };
        });

        // Filter out statuses with duration 0
        const filteredStatuses = decreasedStatuses.filter((status) => {
          if (status.durationCounter <= 0) {
            displayStatusEffect(
              status,
              false,
              `tile_${enemy.entityType}_${enemy.id}`
            );
            return false;
          }
          return true;
        });

        // Update enemy with new statuses
        newEnemy = {
          ...newEnemy,
          statuses: filteredStatuses,
        };

        // Update enemy with new action points
        newEnemy = {
          ...newEnemy,
          actionPoints:
            newEnemy.actionPoints <= 2
              ? newEnemy.actionPoints + STARTING_ACTION_POINTS
              : MAX_ACTION_POINTS,
        };

        // Check for enemy defeat and log message
        if (newEnemy.health <= 0) {
          addLog({
            message: (
              <>
                <span className="text-red-500">{newEnemy.name}</span> has been
                defeated!
              </>
            ),
            type: 'info',
          });
          return;
        } else {
          // Update enemy with new health
          setEnemy(newEnemy);
          addLog({
            message: (
              <>
                <span className="text-red-500">{enemy.name}</span> ended their
                turn.
              </>
            ),
            type: 'info',
          });

          await sleep(1000);
          endTurn();
        }
      }
    };

    if (!isGameOver) {
      if (prevTurnCycle.length > 0) {
        console.log(
          'prevTurnCycle',
          prevTurnCycle[0].entityType + '_' + prevTurnCycle[0].id,
          turnCycle[0].entityType + '_' + turnCycle[0].id
        );
      }
      if (
        prevTurnCycle.length === 0 ||
        prevTurnCycle[0].entityType + '_' + prevTurnCycle[0].id !==
          turnCycle[0].entityType + '_' + turnCycle[0].id
      ) {
        handleDoT();
      }
    }
  }, [turnCycle, prevTurnCycle, turnCycle.length, isGameOver]);

  // Handle player defeat
  useEffect(() => {
    console.log('handlePlayerDefeat');

    const handlePlayerDefeat = () => {
      if (player.health <= 0) {
        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> has been
              defeated!
            </>
          ),
          type: 'info',
        });
        // setPlayerDefeated(true);
      }
    };

    handlePlayerDefeat();
  }, [isGameOver, player.health, player.name, addLog]);

  // Get player's position in the room matrix
  const playerPosition: [number, number] = useMemo(() => {
    // console.log('playerPosition: ', roomEntityPositions);
    if (roomEntityPositions) {
      const playerPos = getEntityPosition(player, roomEntityPositions);
      return playerPos;
    } else {
      console.error('Room entity positions not found!');
      return [-1, -1];
    }
  }, [player, roomEntityPositions]);

  // Get player's vision range for weapon attack
  const playerVisionRange = useMemo(() => {
    if (player.state.isAttacking) {
      const weapon = player.equipment.weapon;

      if (!weapon) {
        return;
      }

      const weaponRange = weapon.range;

      const visionRangeForWeaponAttack = getVisionFromEntityPosition(
        roomTileMatrix,
        playerPosition,
        weaponRange,
        new Map(),
        weaponRange >= 50
          ? 360
          : weaponRange >= 8
            ? 122
            : weaponRange >= 6
              ? 100
              : 40
      );

      // console.log('visionRangeForWeaponAttack', visionRangeForWeaponAttack);

      return visionRangeForWeaponAttack;
    } else if (player.state.isUsingSkill) {
      const skill = player.skills.find(
        (skill) => skill.id === player.state.skillId
      );

      if (!skill) {
        console.error('Skill not found!');
        return;
      }

      const skillRange = skill.range;
      let range = skillRange;

      // Check if skill is a weapon-based skill and if player has a weapon equipped
      if (weaponRangeBasedSkillIDs.includes(skill.id)) {
        if (player.equipment.weapon) {
          if (player.equipment.weapon.attackType === WEAPON_ATTACK_TYPE.MELEE) {
            range = player.equipment.weapon.range;
          } else {
            if (player.equipment.weapon.type !== WEAPON_TYPE.STAFF) {
              range = 1;
            } else {
              range = 2;
            }
          }
        }
      }

      const visionRangeForSkill = getVisionFromEntityPosition(
        roomTileMatrix,
        playerPosition,
        range,
        new Map(),
        range >= 8 ? 122 : range >= 6 ? 100 : 40
      );

      // console.log('visionRangeForWeaponAttack', visionRangeForWeaponAttack);

      return visionRangeForSkill;
    } else {
      return;
    }
  }, [
    player.state.isAttacking,
    player.state.isUsingSkill,
    player.state.skillId,
    player.equipment.weapon,
  ]);

  // Get player's available movement possibilities (based on player's action points)
  const playerMovementPossibilities: [
    Map<string, [number, number][]>,
    Map<string, number>,
  ] = useMemo(() => {
    // console.log('playerMovementPossibilities');

    // Check for player's statuses that affect movement range like swiftness
    const movementRangeBonus = player.statuses.reduce((acc, status) => {
      return acc + status.effect.movementRangeBonus;
    }, 0);

    // console.log('movementRangeBonus', movementRangeBonus, player.statuses);

    const movementPossibilities = findPathsFromCurrentLocation(
      playerPosition,
      roomTileMatrix,
      isRoomOver ? 10 : player.actionPoints,
      roomEntityPositions,
      DEFAULT_MOVEMENT_RANGE + movementRangeBonus,
      isRoomOver
    );

    const apCostForMovementPossibilities = getApCostForPath(
      movementPossibilities,
      DEFAULT_MOVEMENT_RANGE + movementRangeBonus
    );

    return [movementPossibilities, apCostForMovementPossibilities];
  }, [
    player.actionPoints,
    playerPosition,
    roomTileMatrix.length,
    player.statuses,
    // isRoomOver,
  ]);

  // Debounce hovered tile
  const debouncedSetHoveredTile = debounce(setHoveredTile, 100);

  // Handle player clicking on a tile to use a skill with animations
  const handlePlayerSkillWithAnimation = (
    skill: ISkill,
    skillAnimation: ISkillAnimation,
    targetZones: [number, number][],
    rowIndex: number,
    columnIndex: number
  ) => {
    setTimeout(() => {
      const { newPlayer, newEnemies, newRoomEntityPositions } = handleSkill(
        skill,
        [rowIndex, columnIndex],
        player,
        [...enemies],
        summons,
        targetZones,
        roomEntityPositions,
        addLog
      );

      targetZones = [];

      // Change player's sprite direction if enemy is to the left side of the player
      if (columnIndex < playerPosition[1]) {
        setEntityAnimationIdle(player, ENTITY_SPRITE_DIRECTION.LEFT);
      } else if (columnIndex > playerPosition[1]) {
        setEntityAnimationIdle(player, ENTITY_SPRITE_DIRECTION.RIGHT);
      }

      const isEnemyDead = newEnemies.some((enemy) => {
        return enemy.health <= 0;
      });

      setEnemies([...newEnemies]);
      setPlayerState({
        ...newPlayer.state,
        isUsingSkill: false,
      });
      setRoomEntityPositions(newRoomEntityPositions);

      if (isEnemyDead) {
        setTimeout(() => {
          setEnemies(newEnemies.filter((enemy) => enemy.health > 0));
          setPlayer({
            ...newPlayer,
            state: {
              ...newPlayer.state,
              isUsingSkill: false,
              skillId: null,
            },
            actionPoints: newPlayer.actionPoints - skill.cost,
            skills: newPlayer.skills.map((s) =>
              s.id === skill.id ? { ...s, cooldownCounter: s.cooldown } : s
            ),
          });
        }, 1000);
      } else {
        setPlayer({
          ...newPlayer,
          state: {
            ...newPlayer.state,
            isUsingSkill: false,
            skillId: null,
          },
          actionPoints: newPlayer.actionPoints - skill.cost,
          skills: newPlayer.skills.map((s) =>
            s.id === skill.id ? { ...s, cooldownCounter: s.cooldown } : s
          ),
        });
      }
    }, skillAnimation.effectDelay);
  };

  // Handle player attacking an enemy
  const handleEnemyClick = (
    entityId: number | null
    // enemyPosition: [number, number]
  ) => {
    console.log('handleEnemyClick');

    if (entityId === null) {
      return;
    }

    const enemy = enemies.find((enemy) => enemy.id === entityId);
    const newPlayer = { ...player };

    if (!enemy) {
      addLog({ message: 'Enemy not found!', type: 'error' });
      return;
    }

    const statusDamageBonus = player.statuses.reduce((acc, status) => {
      return acc + status.effect.damageBonus;
    }, 0);

    if (newPlayer.state.isAttacking) {
      if (!newPlayer.equipment.weapon) {
        addLog({ message: 'Player has no weapon equipped!', type: 'error' });
        return;
      }

      // Compute base attack damage based on the higher of player's strength or intelligence
      const weaponDamage = getPlayerWeaponDamage(newPlayer);
      let totalDamage = weaponDamage + statusDamageBonus;

      // Check if enemy has any statuses that affect damage taken
      // Check for wounded status
      const woundedStatus = enemy.statuses.find(
        (status) => status.id === STATUS_ID.WOUNDED
      );

      if (woundedStatus) {
        // Wounded: Increase damage taken by 20%. If enemy is below 30% health, increase damage taken by 40%
        if (enemy.health < enemy.maxHealth * 0.3) {
          totalDamage += Math.round(totalDamage * 0.4);
        } else {
          totalDamage += Math.round(totalDamage * 0.2);
        }
      }

      // Check for player firebreaded status
      const firebrandedStatus = newPlayer.statuses.find(
        (status) => status.id === STATUS_ID.FIREBRANDED
      );

      if (
        firebrandedStatus &&
        newPlayer.equipment.weapon.attackType === WEAPON_ATTACK_TYPE.MELEE
      ) {
        console.log('Firebranded status found');
        // Firebranded: Damaging skills and attacks has a chance to burn. Increased damage on burning targets depending on player's intelligence
        const burnChance = firebrandedStatus.effect.burnChance;
        if (Math.random() < burnChance) {
          // Add burning status to enemy
          const burnedStatus = STATUSES.find(
            (status) => status.id === STATUS_ID.BURNED
          );

          if (burnedStatus === undefined) {
            console.error(
              'handleSkillDamage: No status found for the associated skill ID'
            );
          } else {
            burnedStatus.description = burnedStatus.description.replace(
              '#DAMAGE',
              Math.ceil(0.2 * getPlayerTotalIntelligence(newPlayer)).toString()
            );
            burnedStatus.effect.damageOverTime = Math.ceil(
              0.2 * getPlayerTotalIntelligence(newPlayer)
            );
            // Check how many stacks of burned status are on the enemy and assign a unique ID to each
            // const burnedStatuses = enemy.statuses.filter(
            //   (status) => status.id === STATUS_ID.BURNED
            // );
            // burnedStatus.id += burnedStatuses.length;

            enemy.statuses = [...enemy.statuses, burnedStatus];
            displayStatusEffect(
              burnedStatus,
              true,
              `tile_${enemy.entityType}_${enemy.id}`
            );
          }
        }

        if (enemy.statuses.some((status) => status.id === STATUS_ID.BURNED)) {
          totalDamage = Math.round(
            totalDamage * firebrandedStatus.effect.damageMultiplierForBurn
          );
        }
      }

      // Check for player icebranded status
      const icebrandedStatus = newPlayer.statuses.find(
        (status) => status.id === STATUS_ID.ICEBRANDED
      );

      if (
        icebrandedStatus &&
        newPlayer.equipment.weapon.attackType === WEAPON_ATTACK_TYPE.MELEE
      ) {
        console.log('Icebranded status found');
        // Icebranded: Damaging skills and attacks has a chance to freeze. Increased damage on frozen targets depending on player's intelligence
        const freezeChance = icebrandedStatus.effect.freezeChance;
        if (Math.random() < freezeChance) {
          // Add burning status to enemy
          const frozenStatus = STATUSES.find(
            (status) => status.id === STATUS_ID.FROZEN
          );

          if (frozenStatus === undefined) {
            console.error('handleSkillDamage: No status found for FROZEN');
          } else {
            // Check how many stacks of frozen status are on the enemy and assign a unique ID to each
            // const frozenStatuses = enemy.statuses.filter(
            //   (status) => status.id === STATUS_ID.FROZEN
            // );
            // frozenStatus.id += frozenStatuses.length;
            enemy.statuses = [...enemy.statuses, frozenStatus];
            displayStatusEffect(
              frozenStatus,
              true,
              `tile_${enemy.entityType}_${enemy.id}`
            );
          }
        }

        if (enemy.statuses.some((status) => status.id === STATUS_ID.FROZEN)) {
          totalDamage = Math.round(
            totalDamage * icebrandedStatus.effect.damageMultiplierForFreeze
          );
        }
      }

      // Check for player stormbranded status
      const stormbrandedStatus = newPlayer.statuses.find(
        (status) => status.id === STATUS_ID.STORMBRANDED
      );

      if (
        stormbrandedStatus &&
        newPlayer.equipment.weapon.attackType === WEAPON_ATTACK_TYPE.MELEE
      ) {
        console.log('Stormbrand status found');
        // Stormbranded: Damaging skills and attacks has a chance to shock. Increased damage on shocked targets depending on player's intelligence
        const shockChance = stormbrandedStatus.effect.shockChance;
        console.log('shockChance', shockChance);
        if (Math.random() < shockChance) {
          // Add shocked status to enemy
          const shockedStatus = STATUSES.find(
            (status) => status.id === STATUS_ID.SHOCKED
          );

          if (shockedStatus === undefined) {
            console.error('handleSkillDamage: No status found for SHOCKED');
          } else {
            // Check how many stacks of shocked status are on the enemy and assign a unique ID to each
            // const shockedStatuses = enemy.statuses.filter(
            //   (status) => status.id === STATUS_ID.SHOCKED
            // );
            // shockedStatus.id += shockedStatuses.length;
            enemy.statuses = [...enemy.statuses, shockedStatus];
            displayStatusEffect(
              shockedStatus,
              true,
              `tile_${enemy.entityType}_${enemy.id}`
            );
          }
        }

        console.log('totalDamage Before', totalDamage, enemy.statuses);

        if (enemy.statuses.some((status) => status.id === STATUS_ID.SHOCKED)) {
          totalDamage = Math.round(
            totalDamage * stormbrandedStatus.effect.damageMultiplierForShock
          );
        }

        console.log(
          'totalDamage After',
          totalDamage,
          stormbrandedStatus.effect.damageMultiplierForShock
        );
      }

      // Remove hidden status from player if enemy is attacked
      if (newPlayer.statuses.some((status) => status.id === STATUS_ID.HIDDEN)) {
        newPlayer.statuses = newPlayer.statuses.filter(
          (status) => status.id !== STATUS_ID.HIDDEN
        );

        const statusToBeRemoved = STATUSES.find(
          (status) => status.id === STATUS_ID.HIDDEN
        );

        if (statusToBeRemoved === undefined) {
          console.error(
            'handleSkillDamage: No status found for the associated skill ID'
          );
        } else {
          displayStatusEffect(
            statusToBeRemoved,
            false,
            `tile_${newPlayer.entityType}_${newPlayer.id}`
          );
        }
      }

      const newEnemy = { ...enemy };
      newEnemy.health = damageEntity(
        newEnemy,
        totalDamage,
        `tile_${enemy.entityType}_${enemy.id}`
      );
      // newEnemy.health = newEnemy.health - totalDamage;

      if (playerLifestealMultiplier > 0) {
        // Limit lifesteal to the enemy's remaining health
        let lifestealAmount = Math.round(
          (totalDamage > enemy.health ? enemy.health : totalDamage) *
            playerLifestealMultiplier
        );

        if (newPlayer.health + lifestealAmount > newPlayer.maxHealth) {
          lifestealAmount = newPlayer.maxHealth - newPlayer.health;
        }

        newPlayer.health = healEntity(
          newPlayer,
          lifestealAmount,
          `tile_${player.entityType}_${player.id}`
        );
      }

      const newPlayerState = {
        ...newPlayer.state,
        isAttacking: false,
        isMoving: false,
        isUsingSkill: false,
      };

      if (newEnemy.health <= 0) {
        // Wait for defeat animation to end before removing enemy from room
        // Also set enemy health to their new health (<= 0) if defeated
        setEnemies(
          enemies.map((e) => {
            if (e.id === entityId) {
              return newEnemy;
            }
            return e;
          })
        );
        setTimeout(() => {
          setEnemies(enemies.filter((e) => e.id !== entityId));

          if (!newPlayer.equipment.weapon) {
            console.error('No weapon found');
          } else {
            setPlayer({
              ...newPlayer,
              actionPoints:
                newPlayer.actionPoints - newPlayer.equipment.weapon.cost,
              state: newPlayerState,
            });
          }
        }, 1000);
        addLog({
          message: (
            <>
              <span className="text-red-500">{newEnemy.name}</span> took{' '}
              {totalDamage} damage and has been defeated!
            </>
          ),
          type: 'info',
        });
      } else {
        setEnemies(
          enemies.map((e) => {
            if (e.id === entityId) {
              return newEnemy;
            }
            return e;
          })
        );
        addLog({
          message: (
            <>
              <span className="text-red-500">{newEnemy.name}</span> took{' '}
              {totalDamage} damage.
            </>
          ),
          type: 'info',
        });
        setPlayer({
          ...newPlayer,
          actionPoints:
            newPlayer.actionPoints - newPlayer.equipment.weapon.cost,
        });
      }

      setPlayerState(newPlayerState);
    }
  };

  // Update room matrix when player moves
  // x = column, y = row
  const handlePlayerMove = async (row: number, col: number) => {
    console.log('handlePlayerMove');

    if (isEntityMoving || isChestOpen) {
      return;
    }

    // Set player's state to not moving to turn off effect tiles
    setPlayerState({
      ...player.state,
      isMoving: false,
    });

    let newPlayerPosition = playerPosition;
    let newRoomEntityPositions = new Map([...roomEntityPositions]);

    // Do nothing if player is already in the tile they are trying to move to
    if (newPlayerPosition[0] === row && newPlayerPosition[1] === col) {
      return;
    }

    if (playerMovementPossibilities[0].size === 0) {
      addLog({
        message: 'No available movement possibilities!',
        type: 'error',
      });
      return;
    }

    let path = playerMovementPossibilities[0].get(`${row},${col}`);

    if (path === undefined) {
      addLog({ message: 'Invalid movement! Path is undefined', type: 'error' });
      return;
    }

    setIsEntityMoving(true);

    const spriteDirection = getEntitySpriteDirection(player);
    if (col < newPlayerPosition[1]) {
      setEntityAnimationWalk(player, ENTITY_SPRITE_DIRECTION.LEFT);
    } else if (col > newPlayerPosition[1]) {
      setEntityAnimationWalk(player, ENTITY_SPRITE_DIRECTION.RIGHT);
    } else {
      setEntityAnimationWalk(player, spriteDirection);
    }

    while (path.length > 0) {
      const [row, col] = path[0];

      // Update player walking animation direction based on movement path if player is not already facing that direction
      const spriteDirection = getEntitySpriteDirection(player);
      if (
        col < newPlayerPosition[1] &&
        spriteDirection !== ENTITY_SPRITE_DIRECTION.LEFT
      ) {
        setEntityAnimationWalk(player, ENTITY_SPRITE_DIRECTION.LEFT);
      } else if (
        col > newPlayerPosition[1] &&
        spriteDirection !== ENTITY_SPRITE_DIRECTION.RIGHT
      ) {
        setEntityAnimationWalk(player, ENTITY_SPRITE_DIRECTION.RIGHT);
      }

      // Update player's position in the entity positions map
      newRoomEntityPositions = updateRoomEntityPositions(
        [row, col],
        newPlayerPosition,
        newRoomEntityPositions
      );
      setRoomEntityPositions(newRoomEntityPositions);

      addLog({
        message: (
          <>
            <span className="text-green-500">{player.name}</span> moved to tile
            ({col}, {row})
          </>
        ),
        type: 'info',
      });

      newPlayerPosition = [row, col];

      // Delete the first element in the path array
      path = path.slice(1);
      await sleep(isRoomOver ? 250 : 500);

      if (path.length === 0) {
        setIsEntityMoving(false);

        // Remove walking animation and set player back to idle depending on direction (left or right)
        const entitySpriteDirection = getEntitySpriteDirection(player);
        if (entitySpriteDirection === ENTITY_SPRITE_DIRECTION.LEFT) {
          setEntityAnimationIdle(player, ENTITY_SPRITE_DIRECTION.LEFT);
        } else if (entitySpriteDirection === ENTITY_SPRITE_DIRECTION.RIGHT) {
          setEntityAnimationIdle(player, ENTITY_SPRITE_DIRECTION.RIGHT);
        }

        // Check if player is on a door tile and if they are, move them to the next room
        if (!currentRoom) {
          console.error(
            'handlePlayerPathMovement: currentRoom is null or undefined'
          );
          return;
        }

        if (
          roomTileMatrix[newPlayerPosition[0]][newPlayerPosition[1]] ===
          TILE_TYPE.DOOR
        ) {
          handlePlayerMoveToDifferentRoom(
            roomTileMatrix[newPlayerPosition[0]][newPlayerPosition[1]],
            currentRoom,
            newRoomEntityPositions,
            [newPlayerPosition[0], newPlayerPosition[1]],
            [newPlayerPosition[0], newPlayerPosition[1]]
          );
        }
      }
    }

    if (!isRoomOver) {
      setPlayerActionPoints(player.actionPoints - playerMovementAPCost);
    }
  };

  // Handle player moving to a different room
  const handlePlayerMoveToDifferentRoom = (
    tileType: TILE_TYPE,
    currentRoom: IRoom,
    roomEntityPositions: Map<string, [ENTITY_TYPE, number]>,
    playerPosition: [number, number],
    tilePosition: [number, number]
  ) => {
    if (tileType !== TILE_TYPE.DOOR) {
      console.error('Player did not click on a door!');
      return;
    }
    // Find out which door the player clicked (north, south, east, west)

    const [playerRow, playerCol] = playerPosition;

    // Remove player position from current room to be updated in the floor state
    const newRoomEntityPositions = new Map(roomEntityPositions);
    newRoomEntityPositions.delete(`${playerRow},${playerCol}`);
    const newFloor = floor.map((row) => {
      return row.map((room) => {
        if (room.id === currentRoom.id) {
          return {
            ...room,
            roomEntityPositions: newRoomEntityPositions,
          };
        } else {
          return room;
        }
      });
    });

    let nextRoom: IRoom | null = null;

    const [tileRow, tileCol] = tilePosition;

    // Check north door
    if (tileRow < roomLength / 3) {
      // Move player to the next room
      // Go to north door of the current room
      console.log('North Door');

      // Remove room entity position for player for current room

      nextRoom = {
        ...floor[currentRoom.position[0] - 1][currentRoom.position[1]],
        roomEntityPositions: floor[currentRoom.position[0] - 1][
          currentRoom.position[1]
        ].roomEntityPositions.set(
          `${roomLength - 2},${Math.floor(roomLength / 2)}`,
          [ENTITY_TYPE.PLAYER, 1]
        ),
      };
    } else if (tileRow > (roomLength / 3) * 2) {
      // Go to south door of the current room
      console.log('South Door');

      nextRoom = {
        ...floor[currentRoom.position[0] + 1][currentRoom.position[1]],
        roomEntityPositions: floor[currentRoom.position[0] + 1][
          currentRoom.position[1]
        ].roomEntityPositions.set(`3,${Math.floor(roomLength / 2)}`, [
          ENTITY_TYPE.PLAYER,
          1,
        ]),
      };
    } else if (tileCol < roomLength / 3) {
      // Go to west door of the current room
      console.log('West Door');

      nextRoom = {
        ...floor[currentRoom.position[0]][currentRoom.position[1] - 1],
        roomEntityPositions: floor[currentRoom.position[0]][
          currentRoom.position[1] - 1
        ].roomEntityPositions.set(
          `${Math.floor(roomLength / 2)},${roomLength - 2}`,
          [ENTITY_TYPE.PLAYER, 1]
        ),
      };
    } else if (tileCol > (roomLength / 3) * 2) {
      // Go to east door of the current room
      console.log('East Door');

      nextRoom = {
        ...floor[currentRoom.position[0]][currentRoom.position[1] + 1],
        roomEntityPositions: floor[currentRoom.position[0]][
          currentRoom.position[1] + 1
        ].roomEntityPositions.set(`${Math.floor(roomLength / 2)},${1}`, [
          ENTITY_TYPE.PLAYER,
          1,
        ]),
      };
    }

    if (!nextRoom) {
      console.error('Next room not found!');
      return;
    }

    // Remove transition property from player
    document
      .getElementById('sprite_player_1')
      ?.classList.remove('transition-all');

    // Set next room to be known in the floor state
    newFloor[nextRoom.position[0]][nextRoom.position[1]] = {
      ...nextRoom,
      isKnown: true,
    };

    console.log('newFloor', newFloor);
    setFloor(newFloor);
    setCurrentRoom({ ...nextRoom, isKnown: true });
    addLog({
      message: (
        <>
          <span className="text-green-500">{player.name}</span> moved to the
          next room.
        </>
      ),
      type: 'info',
    });

    // Put back transition property to player
    setTimeout(() => {
      document
        .getElementById('sprite_player_1')
        ?.classList.add('transition-all');
    }, 500);
  };

  // Handle enemy movement (naive)
  // For now, just move the enemy to a random adjacent tile
  const handleEnemyMove = async (
    enemy: IEnemy
  ): Promise<[IEnemy, [number, number]]> => {
    console.log('handleEnemyMove');

    let newEnemy = { ...enemy };
    const [playerRow, playerCol] = playerPosition;

    let newRoomEntityPositions = new Map([...roomEntityPositions]);

    const enemyPosition = getEntityPosition(newEnemy, newRoomEntityPositions);
    let newEnemyPosition = enemyPosition;

    // Check if enemy is already within range of player
    const canAttackPlayer =
      Math.abs(playerRow - enemyPosition[0]) <= newEnemy.range &&
      Math.abs(playerCol - enemyPosition[1]) <= newEnemy.range;

    if (canAttackPlayer) {
      return [newEnemy, newEnemyPosition];
    }

    if (newEnemyPosition[0] === -1 || newEnemyPosition[1] === -1) {
      addLog({ message: 'Enemy not found in room matrix!', type: 'error' });
      return [newEnemy, newEnemyPosition];
    }

    // Get enemy range and get tiles around the player's vision with the same range (one of these will be the enemy's target tile)
    const range = newEnemy.range;
    const possibleTiles = getVisionFromEntityPosition(
      roomTileMatrix,
      playerPosition,
      range,
      newRoomEntityPositions
    );

    const possibleTilesInRange: [number, number][] = [];

    for (let row = 0; row < roomLength; row++) {
      for (let col = 0; col < roomLength; col++) {
        if (
          possibleTiles[row][col] === true &&
          roomTileMatrix[row][col] === TILE_TYPE.FLOOR &&
          !roomEntityPositions.has(`${row},${col}`) &&
          Math.max(Math.abs(row - playerRow), Math.abs(col - playerCol)) ===
            range
        ) {
          // Keep only the tiles that are:
          // - within the player's vision range
          // - floor tiles
          // - not occupied by another entity
          // - within the range of the enemy
          {
            possibleTilesInRange.push([row, col]);
          }
        }
      }
    }

    // Find path to the possible tiles for the enemy to move to
    const path = findPathsFromCurrentLocation(
      newEnemyPosition,
      roomTileMatrix,
      Math.round(roomLength / 2),
      newRoomEntityPositions
    );

    let shortestPath: [number, number][] = [];

    // Find the shortest path to the possible tiles
    for (const possibleTile of possibleTilesInRange) {
      const possibleTilePath = path.get(
        `${possibleTile[0]},${possibleTile[1]}`
      );

      if (!possibleTilePath) {
        continue;
      }

      if (shortestPath.length === 0) {
        shortestPath = possibleTilePath;
      } else {
        if (possibleTilePath.length < shortestPath.length) {
          shortestPath = possibleTilePath;
        }
      }
    }

    // If there is no shortest path, do nothing
    if (shortestPath.length === 0) {
      console.log('No shortest path found for enemy', newEnemy.id);
      return [newEnemy, newEnemyPosition];
    }

    // Shorten the path based on the enemy's available action points
    let apCost = Math.ceil(shortestPath.length / newEnemy.movementRange);

    if (apCost > newEnemy.actionPoints) {
      shortestPath = shortestPath.slice(
        0,
        newEnemy.actionPoints * newEnemy.movementRange
      );

      apCost = newEnemy.actionPoints;
    }

    // Update enemy action points
    newEnemy = {
      ...newEnemy,
      actionPoints: enemy.actionPoints - apCost,
    };

    // Get the tile the enemy will move to
    console.log('shortestPath of enemy', enemy.id, shortestPath);

    setIsEntityMoving(true);

    // Update enemy walking animation direction based on movement path
    const [, col] = shortestPath[0];
    const spriteDirection = getEntitySpriteDirection(enemy);
    if (col < newEnemyPosition[1]) {
      setEntityAnimationWalk(enemy, ENTITY_SPRITE_DIRECTION.LEFT);
    } else if (col > newEnemyPosition[1]) {
      setEntityAnimationWalk(enemy, ENTITY_SPRITE_DIRECTION.RIGHT);
    } else {
      setEntityAnimationWalk(enemy, spriteDirection);
    }

    while (shortestPath.length > 0) {
      const [row, col] = shortestPath[0];

      // Update enemy walking animation direction based on movement path
      const spriteDirection = getEntitySpriteDirection(enemy);
      if (
        col < newEnemyPosition[1] &&
        spriteDirection !== ENTITY_SPRITE_DIRECTION.LEFT
      ) {
        setEntityAnimationWalk(enemy, ENTITY_SPRITE_DIRECTION.LEFT);
      } else if (
        col > newEnemyPosition[1] &&
        spriteDirection !== ENTITY_SPRITE_DIRECTION.RIGHT
      ) {
        setEntityAnimationWalk(enemy, ENTITY_SPRITE_DIRECTION.RIGHT);
      }

      // Update enemy's position in the entity positions map
      newRoomEntityPositions = updateRoomEntityPositions(
        [row, col],
        newEnemyPosition,
        newRoomEntityPositions
      );
      setRoomEntityPositions(newRoomEntityPositions);

      addLog({
        message: (
          <>
            <span className="text-green-500">{enemy.name}</span> moved to tile (
            {col}, {row})
          </>
        ),
        type: 'info',
      });

      newEnemyPosition = [row, col];

      // Delete the first element in the path array
      await sleep(500);
      shortestPath = shortestPath.slice(1);

      if (shortestPath.length === 0) {
        setIsEntityMoving(false);

        // Remove walking animation and set enemy back to idle depending on direction (left or right)
        const entitySpriteDirection = getEntitySpriteDirection(enemy);
        if (entitySpriteDirection === ENTITY_SPRITE_DIRECTION.LEFT) {
          setEntityAnimationIdle(enemy, ENTITY_SPRITE_DIRECTION.LEFT);
        } else if (entitySpriteDirection === ENTITY_SPRITE_DIRECTION.RIGHT) {
          setEntityAnimationIdle(enemy, ENTITY_SPRITE_DIRECTION.RIGHT);
        }
      }
    }

    return [newEnemy, newEnemyPosition];
  };

  // Handle enemy attack (naive)
  // For now, just attack the player if they are in range
  const handleEnemyAttack = async (
    enemy: IEnemy,
    enemyPosition: [number, number],
    player: IPlayer,
    playerPosition: [number, number]
  ): Promise<[IEnemy, IPlayer]> => {
    console.log('handleEnemyAttack');

    let newEnemy: IEnemy = { ...enemy };
    const [enemyRow, enemyCol] = enemyPosition;
    let newPlayer: IPlayer = { ...player };
    const [playerRow, playerCol] = playerPosition;

    if (!enemyRow || !enemyCol || !playerRow || !playerCol) {
      addLog({ message: 'Enemy or player position not found!', type: 'error' });
      return [newEnemy, newPlayer];
    }

    const canAttackPlayer =
      Math.abs(playerRow - enemyRow) <= newEnemy.range &&
      Math.abs(playerCol - enemyCol) <= newEnemy.range;

    const isPlayerHidden = player.statuses.some(
      (status) => status.id === STATUS_ID.HIDDEN
    );

    if (canAttackPlayer && !isPlayerHidden) {
      // Change sprite animation from idle to attack
      const spriteDirection = getEntitySpriteDirection(newEnemy);
      if (playerCol < enemyCol) {
        setEntityAnimationAttack(newEnemy, ENTITY_SPRITE_DIRECTION.LEFT);
      } else if (playerCol > enemyCol) {
        setEntityAnimationAttack(newEnemy, ENTITY_SPRITE_DIRECTION.RIGHT);
      } else {
        setEntityAnimationAttack(newEnemy, spriteDirection);
      }

      // After attack animation ends, change back to idle animation
      setTimeout(() => {
        console.log('is this happening? 2');
        if (playerCol < enemyCol) {
          setEntityAnimationIdle(newEnemy, ENTITY_SPRITE_DIRECTION.LEFT);
        } else if (playerCol > enemyCol) {
          setEntityAnimationIdle(newEnemy, ENTITY_SPRITE_DIRECTION.RIGHT);
        } else {
          setEntityAnimationIdle(newEnemy, spriteDirection);
        }
      }, 500);

      // Check player dodge chance
      const playerDodgeChance = getEntityDodgeChance(player);

      // Check if player dodges attack
      const playerDodges = Math.random() < playerDodgeChance;

      if (playerDodges) {
        displayGeneralMessage(
          `tile_${player.entityType}_${player.id}`,
          'Dodged!'
        );
        addLog({
          message: (
            <>
              <span className="text-green-500">{player.name}</span> dodged{' '}
              <span className="text-red-500">
                {newEnemy.name}&apos;s attack!
              </span>
            </>
          ),
          type: 'info',
        });

        return [newEnemy, newPlayer];
      } else {
        // Calculate damage
        const baseDamage = newEnemy.damage;

        // Check for statuses that affect damage
        const statusDamageBonus = newEnemy.statuses.reduce((acc, status) => {
          return acc + status.effect.damageBonus;
        }, 0);

        // Check for statuses that increases or decrease damage
        const damageMultiplier = newEnemy.statuses.reduce((acc, status) => {
          if (status.effect.damageMultiplier === 1) return acc;

          if (status.effect.damageMultiplier > 1) {
            return acc + (status.effect.damageMultiplier - 1);
          } else {
            return acc - (1 - status.effect.damageMultiplier);
          }
        }, 1);

        // Check for statuses that increase or reduce damage taken
        const incomingDamageMultiplier = player.statuses.reduce(
          (acc, status) => {
            if (status.effect.incomingDamageMultiplier === 1) return acc;

            if (status.effect.incomingDamageMultiplier > 1) {
              return acc + (status.effect.incomingDamageMultiplier - 1);
            } else {
              return acc - (1 - status.effect.incomingDamageMultiplier);
            }
          },
          1
        );

        const playerTotalDefense = getPlayerTotalDefense(player);

        // If player has 10 DEF, then player takes 10% less damage
        const playerDamageTakenMultiplier = 1 - playerTotalDefense / 100;

        let totalDamage = Math.round(
          (baseDamage + statusDamageBonus) *
            damageMultiplier *
            playerDamageTakenMultiplier *
            incomingDamageMultiplier
        );

        if (totalDamage <= 0) totalDamage = 0;

        const playerHealth = damageEntity(
          player,
          totalDamage,
          `tile_${player.entityType}_${player.id}`
        );

        newEnemy = {
          ...newEnemy,
          actionPoints: newEnemy.actionPoints - 2,
        };

        newPlayer = {
          ...newPlayer,
          health: playerHealth < 0 ? 0 : playerHealth,
        };

        if (playerHealth <= 0) {
          addLog({
            message: (
              <>
                <span className="text-red-500">{newEnemy.name}</span> attacked{' '}
                <span className="text-green-500">{player.name}</span> for{' '}
                {totalDamage} damage and defeated them!
              </>
            ),
            type: 'info',
          });
          setPlayer({
            ...player,
            health: 0,
          });
          setIsGameOver(true);
        } else {
          setPlayer({
            ...player,
            health: player.health - totalDamage,
          });

          addLog({
            message: (
              <>
                <span className="text-red-500">{newEnemy.name}</span> attacked{' '}
                <span className="text-green-500">{player.name}</span> for{' '}
                {totalDamage} damage.
              </>
            ),
            type: 'info',
          });
        }

        // Check for statuses that deal damage to newEnemy when they attack
        // Check if player has a deflecting status effect
        const deflectingStatus = player.statuses.find(
          (status) => status.id === STATUS_ID.DEFLECTING
        );

        if (deflectingStatus) {
          const incomingDamageMultiplierFromDeflecting =
            deflectingStatus.effect.incomingDamageMultiplier;

          const damageToEnemy = Math.ceil(
            totalDamage * incomingDamageMultiplierFromDeflecting
          );

          console.log(
            damageToEnemy,
            totalDamage,
            incomingDamageMultiplierFromDeflecting
          );

          newEnemy.health = damageEntity(
            newEnemy,
            damageToEnemy,
            `tile_${newEnemy.entityType}_${newEnemy.id}`
          );

          if (newEnemy.health <= 0) {
            // Wait for defeat animation to end before removing newEnemy from room
            // Also set newEnemy health to their new health (<= 0) if defeated

            // setEnemy(newEnemy);

            await sleep(500);
            setEnemies(enemies.filter((e) => e.id !== newEnemy.id));
          }

          addLog({
            message: (
              <>
                <span className="text-green-500">{player.name}</span> deflected{' '}
                <span className="text-red-500">{newEnemy.name}</span>
                &apos;s attack and dealt {damageToEnemy} damage.
              </>
            ),
            type: 'info',
          });

          return [newEnemy, newPlayer];
        }

        return [newEnemy, newPlayer];
      }
    }

    return [newEnemy, newPlayer];
  };

  // console.log('targetZones', targetZones.current);

  return (
    <div
      id="room"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${roomLength}, ${TILE_SIZE}px)`,
        gridTemplateRows: `repeat(${roomLength}, ${TILE_SIZE}px)`,
      }}
    >
      {roomTileMatrix.map((row, rowIndex) => {
        return row.map((tileType, columnIndex) => {
          // Parse tile type to entity type
          const entityIfExists = roomEntityPositions.get(
            `${rowIndex},${columnIndex}`
          );

          let entityType: ENTITY_TYPE | null = null;
          let entityId: number | null = null;

          if (entityIfExists) {
            entityType = entityIfExists[0];
            entityId = entityIfExists[1];
          }

          // Check if tile is active (i.e. it's the entity's turn)
          let active: boolean = false;
          if (
            entityType !== null &&
            turnCycle[0] !== null &&
            turnCycle[0].entityType === entityType &&
            turnCycle[0].id === entityId
          ) {
            active = true;
          }

          // Check if tile (entity) is hovered
          let hovered: boolean = false;
          if (
            currentHoveredEntity?.entityType === entityType &&
            currentHoveredEntity?.id === entityId
          ) {
            hovered = true;
          }

          // Check if tile is an effect zone
          let isEffectZone: boolean = false;
          let isTargetZone: boolean = false;
          if (!playerPosition) {
            addLog({ message: 'Player position not found!', type: 'error' });
            return;
          }

          const [playerRow, playerCol] = playerPosition;

          // Check if player is attacking (basic attack)
          // Highlight tiles that can be attacked by player based on weapon range
          if (player.state.isAttacking && player.equipment.weapon) {
            if (
              playerVisionRange &&
              playerVisionRange[rowIndex][columnIndex] === true
            ) {
              isEffectZone = true;
            }
          }

          // Check if player is moving (move state)
          // Highlight tiles that can be moved to by player (5x5 area around player not including wall or door tiles).
          // Excluding wall and door tiles and floor tiles that have entities on them
          // If room is over, then the player can move anywhere in the room.
          if (player.state.isMoving) {
            if (isRoomOver) {
              isEffectZone = true;
            } else {
              const possibleMove = playerMovementPossibilities[0].get(
                `${rowIndex},${columnIndex}`
              );

              if (possibleMove) {
                isEffectZone = true;
              }
            }
          }

          // Check if player is using a skill (isUsingSkill state)
          // Highlight tiles that can be affected by player's skill
          if (player.state.isUsingSkill && player.state.skillId) {
            const skill = player.skills.find(
              (skill) => skill.id === player.state.skillId
            );

            // console.log('player.state.skillId', player.state.skillId);

            if (!skill) {
              console.error('Skill not found!');
            } else {
              // Check skill type
              if (skill.skillType === SKILL_TYPE.SELF) {
                // If skill is self-targeted, highlight player's tile
                if (rowIndex === playerRow && columnIndex === playerCol) {
                  isEffectZone = true;
                }
              } else if (skill.skillType === SKILL_TYPE.ST) {
                // If skill is single target, highlight tiles that can be affected by the skill
                // let range = skill.range;

                // // Check for weapon (range) dependent skills
                // if (weaponRangeBasedSkillIDs.includes(skill.id)) {
                //   if (player.equipment.weapon) {
                //     if (
                //       player.equipment.weapon.attackType ===
                //       WEAPON_ATTACK_TYPE.MELEE
                //     ) {
                //       range = player.equipment.weapon.range;
                //     }
                //   }
                // }

                // Check for the specific skill's effect zone
                // Depending on the skill, the effect zone could be different.
                // By default, single target will depend on the player's vision range.
                switch (skill.id) {
                  case SKILL_ID.FLY:
                    {
                      const skillRange = skill.range;
                      // For movement skills like fly, leap slam, and flame dive,
                      // player can target any empty tile that does not have an entity (exlcuding themselves).
                      // Leap Slam and Flame Dive handled in the AOE case
                      if (
                        rowIndex >= playerRow - skillRange &&
                        rowIndex <= playerRow + skillRange &&
                        columnIndex >= playerCol - skillRange &&
                        columnIndex <= playerCol + skillRange
                      ) {
                        if (entityIfExists) {
                          if (entityIfExists[0] === ENTITY_TYPE.PLAYER) {
                            isEffectZone = true;
                          } else {
                            isEffectZone = false;
                          }
                        } else {
                          isEffectZone = true;
                        }
                      }
                    }
                    break;
                  case SKILL_ID.BODY_DOUBLE:
                    {
                      // For body double, player can target any empty tile they can see that does not have an entity.
                      if (
                        playerVisionRange &&
                        playerVisionRange[rowIndex][columnIndex] === true &&
                        !(rowIndex === playerRow && columnIndex === playerCol)
                      ) {
                        if (entityIfExists) {
                          isEffectZone = false;
                        } else {
                          isEffectZone = true;
                        }
                      }
                    }
                    break;
                  default:
                    if (
                      playerVisionRange &&
                      playerVisionRange[rowIndex][columnIndex] === true &&
                      !(rowIndex === playerRow && columnIndex === playerCol)
                    ) {
                      isEffectZone = true;
                    }
                    break;
                }
              } else if (skill.skillType === SKILL_TYPE.AOE) {
                // If skill is AOE, highlight tiles that can be affected by the skill
                // For AOE skills, there are effect zones (which are how far the skill can reach) and target zones (defined above, which are the tiles that are affected by the skill's effect)

                // Compute effect zone based on skill range
                let range = skill.range;

                const weapon = player.equipment.weapon;

                // Range for weapon dependent skills
                if (weapon) {
                  if (weaponRangeBasedSkillIDs.includes(skill.id)) {
                    range = weapon.range;
                  }
                }

                // Determine if tile is in effect zone
                // Depending on the skill, the effect zone could be different
                // For example, projectile based AOE skills like fireball will need to depend on the player's vision range.
                // Whereas a skill like whirlwind and cleave will only need to depend on the player's target zone.
                switch (skill.id) {
                  case SKILL_ID.FIREBALL:
                    if (
                      playerVisionRange &&
                      playerVisionRange[rowIndex][columnIndex] === true
                      // For fireball, player can target themselves
                    ) {
                      isEffectZone = true;
                    }
                    break;
                  case SKILL_ID.LEAP_SLAM:
                  case SKILL_ID.FLAME_DIVE:
                    if (
                      tileType === TILE_TYPE.FLOOR &&
                      rowIndex >= playerRow - range &&
                      rowIndex <= playerRow + range &&
                      columnIndex >= playerCol - range &&
                      columnIndex <= playerCol + range
                    ) {
                      if (entityIfExists) {
                        if (entityIfExists[0] === ENTITY_TYPE.PLAYER) {
                          isEffectZone = true;
                        } else {
                          isEffectZone = false;
                        }
                      } else {
                        isEffectZone = true;
                      }
                    }
                    break;
                  case SKILL_ID.FLYING_KICK:
                    if (
                      playerVisionRange &&
                      playerVisionRange[rowIndex][columnIndex] === true &&
                      !(rowIndex === playerRow && columnIndex === playerCol)
                    ) {
                      if (!entityIfExists) {
                        isEffectZone = true;
                      }
                    }
                    break;
                  case SKILL_ID.KNIFE_BARRAGE:
                  case SKILL_ID.WHIRLWIND:
                  case SKILL_ID.MANA_BURST:
                  case SKILL_ID.SUPERNOVA:
                  case SKILL_ID.BLIZZARD:
                  case SKILL_ID.CLEAVE:
                  case SKILL_ID.AIR_SLASH:
                    if (
                      playerVisionRange &&
                      playerVisionRange[rowIndex][columnIndex] === true &&
                      !(rowIndex === playerRow && columnIndex === playerCol)
                    ) {
                      isEffectZone = true;
                    }
                    break;
                  default:
                    if (
                      rowIndex >= playerRow - range &&
                      rowIndex <= playerRow + range &&
                      columnIndex >= playerCol - range &&
                      columnIndex <= playerCol + range &&
                      !(rowIndex === playerRow && columnIndex === playerCol) // By default, players cannot target themselves
                    ) {
                      isEffectZone = true;
                    }
                    break;
                }

                // Compute target zone based on the specific skill requirement
                switch (skill.id) {
                  case SKILL_ID.WHIRLWIND:
                  case SKILL_ID.WARCRY:
                  case SKILL_ID.KNIFE_BARRAGE:
                  case SKILL_ID.WRATH_OF_THE_ANCIENTS:
                  case SKILL_ID.MANA_BURST:
                  case SKILL_ID.SUPERNOVA:
                  case SKILL_ID.STORM_PULSE: {
                    if (isEffectZone && isEffectZoneHovered) {
                      // Add tiles to target zone to use to compute the effect of the skill

                      const currentTargetZones = targetZones.current;

                      // Check if tile is in target zone
                      let isTileInTargetZone = false;
                      currentTargetZones.forEach(([row, col]) => {
                        if (row === rowIndex && col === columnIndex) {
                          isTileInTargetZone = true;
                        }
                      });

                      if (!isTileInTargetZone) {
                        currentTargetZones.push([rowIndex, columnIndex]);
                        targetZones.current = currentTargetZones;
                      }

                      // For whirlwind, the target zone is the same as the effect zone
                      isTargetZone = true;
                    }
                    break;
                  }
                  case SKILL_ID.FIREBALL:
                  case SKILL_ID.BLIZZARD: {
                    // For fireball, the target zone is a 3x3 area around the hovered effect zone tile so it could go beyond the effect zone
                    if (isEffectZoneHovered) {
                      // Add tiles to target zone to use to compute the effect of the skill

                      // For fireball, the target zone is a 3x3 area around the hovered effect zone tile
                      if (
                        effectZoneHovered &&
                        rowIndex >= effectZoneHovered[0] - 1 &&
                        rowIndex <= effectZoneHovered[0] + 1 &&
                        columnIndex >= effectZoneHovered[1] - 1 &&
                        columnIndex <= effectZoneHovered[1] + 1
                      ) {
                        const currentTargetZones = targetZones.current;

                        // Check if tile is in target zone
                        const isTileInTargetZone = currentTargetZones.some(
                          ([row, col]) => {
                            return row === rowIndex && col === columnIndex;
                          }
                        );

                        if (!isTileInTargetZone) {
                          currentTargetZones.push([rowIndex, columnIndex]);
                          targetZones.current = currentTargetZones;
                        }

                        isTargetZone = true;
                      }
                    }
                    break;
                  }
                  case SKILL_ID.CLEAVE: {
                    if (isEffectZone && isEffectZoneHovered) {
                      // Add tiles to target zone to use to compute the effect of the skill

                      const currentTargetZones = targetZones.current;

                      // Check if tile is in target zone
                      let isTileInTargetZone = false;
                      currentTargetZones.forEach(([row, col]) => {
                        if (row === rowIndex && col === columnIndex) {
                          isTileInTargetZone = true;
                        }
                      });

                      if (!isTileInTargetZone) {
                        currentTargetZones.push([rowIndex, columnIndex]);
                        targetZones.current = currentTargetZones;
                      }

                      // For cleave, the target zone is in the area in front of the player, depending on the direction of the effect zone hovered
                      if (!effectZoneHovered) {
                        console.error('Effect zone hovered not found!');
                        return;
                      }

                      let isValidTargetZone = false;

                      const isTop =
                        playerRow > effectZoneHovered[0] &&
                        playerCol === effectZoneHovered[1];
                      const isBottom =
                        playerRow < effectZoneHovered[0] &&
                        playerCol === effectZoneHovered[1];
                      const isLeft =
                        playerRow === effectZoneHovered[0] &&
                        playerCol > effectZoneHovered[1];
                      const isRight =
                        playerRow === effectZoneHovered[0] &&
                        playerCol < effectZoneHovered[1];
                      const isTopLeft =
                        playerRow > effectZoneHovered[0] &&
                        playerCol > effectZoneHovered[1];
                      const isTopRight =
                        playerRow > effectZoneHovered[0] &&
                        playerCol < effectZoneHovered[1];
                      const isBottomLeft =
                        playerRow < effectZoneHovered[0] &&
                        playerCol > effectZoneHovered[1];
                      const isBottomRight =
                        playerRow < effectZoneHovered[0] &&
                        playerCol < effectZoneHovered[1];

                      // Is row difference greater than column difference
                      // Target zone is a 3x1 line perpendicular to the row direction
                      if (isTop) {
                        if (rowIndex < playerRow) {
                          isValidTargetZone = true;
                        }
                      } else if (isBottom) {
                        if (rowIndex > playerRow) {
                          isValidTargetZone = true;
                        }
                      }
                      // Is column difference greater than row difference
                      // Target zone is a 3x1 line perpendicular to the column direction
                      else if (isLeft) {
                        if (columnIndex < playerCol) {
                          isValidTargetZone = true;
                        }
                      } else if (isRight) {
                        if (columnIndex > playerCol) {
                          isValidTargetZone = true;
                        }
                      } else if (isTopLeft) {
                        if (rowIndex <= playerRow && columnIndex <= playerCol) {
                          isValidTargetZone = true;
                        }
                      } else if (isTopRight) {
                        if (rowIndex <= playerRow && columnIndex >= playerCol) {
                          isValidTargetZone = true;
                        }
                      } else if (isBottomLeft) {
                        if (rowIndex >= playerRow && columnIndex <= playerCol) {
                          isValidTargetZone = true;
                        }
                      } else if (isBottomRight) {
                        if (rowIndex >= playerRow && columnIndex >= playerCol) {
                          isValidTargetZone = true;
                        }
                      }

                      if (isValidTargetZone) {
                        // Add tiles to target zone to use to compute the effect of the skill
                        const currentTargetZones = targetZones.current;

                        // Check if tile is in target zone
                        const isTileInTargetZone = currentTargetZones.some(
                          ([row, col]) => {
                            return row === rowIndex && col === columnIndex;
                          }
                        );

                        if (!isTileInTargetZone) {
                          currentTargetZones.push([rowIndex, columnIndex]);
                          targetZones.current = currentTargetZones;
                        }

                        isTargetZone = true;
                      } else {
                        // Remove tiles from target zone if they are not in the target zone
                        const currentTargetZones = targetZones.current;

                        // Check if tile is in target zone
                        const isTileInTargetZone = currentTargetZones.some(
                          ([row, col]) => {
                            return row === rowIndex && col === columnIndex;
                          }
                        );

                        if (isTileInTargetZone) {
                          targetZones.current = currentTargetZones.filter(
                            ([row, col]) => {
                              return row !== rowIndex || col !== columnIndex;
                            }
                          );
                        }

                        isTargetZone = false;
                      }
                    }
                    break;
                  }
                  case SKILL_ID.AIR_SLASH:
                    {
                      // For fireball, the target zone is a 3x1 area around the hovered effect zone tile
                      if (isEffectZoneHovered) {
                        // For air slash, the target zone is a 3x1 line perpendicular to the direction of hovered effect zone from the player.
                        if (!effectZoneHovered) {
                          console.error('Effect zone hovered not found!');
                          return;
                        }

                        let isValidTargetZone = false;

                        const rowDiff =
                          playerRow > effectZoneHovered[0]
                            ? playerRow - effectZoneHovered[0]
                            : effectZoneHovered[0] - playerRow;
                        const colDiff =
                          playerCol > effectZoneHovered[1]
                            ? playerCol - effectZoneHovered[1]
                            : effectZoneHovered[1] - playerCol;
                        const isTopLeft =
                          playerRow > effectZoneHovered[0] &&
                          playerCol > effectZoneHovered[1];
                        const isTopRight =
                          playerRow > effectZoneHovered[0] &&
                          playerCol < effectZoneHovered[1];
                        const isBottomLeft =
                          playerRow < effectZoneHovered[0] &&
                          playerCol > effectZoneHovered[1];
                        const isBottomRight =
                          playerRow < effectZoneHovered[0] &&
                          playerCol < effectZoneHovered[1];

                        if (rowDiff > colDiff) {
                          // Is row difference greater than column difference
                          // Target zone is a 3x1 line perpendicular to the row direction
                          if (
                            [rowIndex].includes(effectZoneHovered[0]) &&
                            [
                              columnIndex,
                              columnIndex + 1,
                              columnIndex - 1,
                            ].includes(effectZoneHovered[1])
                          ) {
                            isValidTargetZone = true;
                          }
                        } else if (colDiff > rowDiff) {
                          // Is column difference greater than row difference
                          // Target zone is a 3x1 line perpendicular to the column direction
                          if (
                            [columnIndex].includes(effectZoneHovered[1]) &&
                            [rowIndex, rowIndex + 1, rowIndex - 1].includes(
                              effectZoneHovered[0]
                            )
                          ) {
                            isValidTargetZone = true;
                          }
                        } else {
                          if (isTopLeft) {
                            if (
                              [
                                effectZoneHovered[0],
                                effectZoneHovered[0] + 1,
                              ].includes(rowIndex) &&
                              [
                                effectZoneHovered[1],
                                effectZoneHovered[1] + 1,
                              ].includes(columnIndex) &&
                              (rowIndex !== effectZoneHovered[0] + 1 ||
                                columnIndex !== effectZoneHovered[1] + 1)
                            ) {
                              isValidTargetZone = true;
                            }
                          } else if (isTopRight) {
                            if (
                              [
                                effectZoneHovered[0],
                                effectZoneHovered[0] + 1,
                              ].includes(rowIndex) &&
                              [
                                effectZoneHovered[1],
                                effectZoneHovered[1] - 1,
                              ].includes(columnIndex) &&
                              (rowIndex !== effectZoneHovered[0] + 1 ||
                                columnIndex !== effectZoneHovered[1] - 1)
                            ) {
                              isValidTargetZone = true;
                            }
                          } else if (isBottomLeft) {
                            if (
                              [
                                effectZoneHovered[0],
                                effectZoneHovered[0] - 1,
                              ].includes(rowIndex) &&
                              [
                                effectZoneHovered[1],
                                effectZoneHovered[1] + 1,
                              ].includes(columnIndex) &&
                              (rowIndex !== effectZoneHovered[0] - 1 ||
                                columnIndex !== effectZoneHovered[1] + 1)
                            ) {
                              isValidTargetZone = true;
                            }
                          } else if (isBottomRight) {
                            if (
                              [
                                effectZoneHovered[0],
                                effectZoneHovered[0] - 1,
                              ].includes(rowIndex) &&
                              [
                                effectZoneHovered[1],
                                effectZoneHovered[1] - 1,
                              ].includes(columnIndex) &&
                              (rowIndex !== effectZoneHovered[0] - 1 ||
                                columnIndex !== effectZoneHovered[1] - 1)
                            ) {
                              isValidTargetZone = true;
                            }
                          }
                        }

                        if (isValidTargetZone) {
                          // Add tiles to target zone to use to compute the effect of the skill
                          const currentTargetZones = targetZones.current;

                          // Check if tile is in target zone
                          const isTileInTargetZone = currentTargetZones.some(
                            ([row, col]) => {
                              return row === rowIndex && col === columnIndex;
                            }
                          );

                          if (!isTileInTargetZone) {
                            currentTargetZones.push([rowIndex, columnIndex]);
                            targetZones.current = currentTargetZones;
                          }

                          isTargetZone = true;
                        } else {
                          // Remove tiles from target zone if they are not in the target zone
                          const currentTargetZones = targetZones.current;

                          // Check if tile is in target zone
                          const isTileInTargetZone = currentTargetZones.some(
                            ([row, col]) => {
                              return row === rowIndex && col === columnIndex;
                            }
                          );

                          if (isTileInTargetZone) {
                            targetZones.current = currentTargetZones.filter(
                              ([row, col]) => {
                                return row !== rowIndex || col !== columnIndex;
                              }
                            );
                          }

                          isTargetZone = false;
                        }
                      }
                    }
                    break;
                  case SKILL_ID.LEAP_SLAM:
                  case SKILL_ID.FLAME_DIVE:
                  case SKILL_ID.FLYING_KICK: {
                    // For leap slam and flame dive, the target zone is a 3x3 area around the hovered effect zone tile so it could go beyond the effect zone
                    if (isEffectZoneHovered) {
                      // Add tiles to target zone to use to compute the effect of the skill

                      // console.log('Effect zone hovered', effectZoneHovered);
                      // For leap slam and flame dive, the target zone is a 3x3 area around the hovered effect zone tile not including the hovered tile
                      if (
                        effectZoneHovered &&
                        rowIndex >= effectZoneHovered[0] - 1 &&
                        rowIndex <= effectZoneHovered[0] + 1 &&
                        columnIndex >= effectZoneHovered[1] - 1 &&
                        columnIndex <= effectZoneHovered[1] + 1
                        // !(
                        //   rowIndex === effectZoneHovered[0] &&
                        //   columnIndex === effectZoneHovered[1]
                        // )
                      ) {
                        const currentTargetZones = targetZones.current;

                        // Check if tile is in target zone
                        const isTileInTargetZone = currentTargetZones.some(
                          ([row, col]) => {
                            return row === rowIndex && col === columnIndex;
                          }
                        );

                        if (!isTileInTargetZone) {
                          currentTargetZones.push([rowIndex, columnIndex]);
                          targetZones.current = currentTargetZones;
                        }

                        isTargetZone = true;
                      }
                    }
                    break;
                  }
                  default:
                    break;
                }
              }
              // Can only target floor tiles
              if (tileType !== TILE_TYPE.FLOOR) {
                isEffectZone = false;
                isTargetZone = false;
              }
            }
          }

          return (
            <Tile
              rowIndex={rowIndex}
              colIndex={columnIndex}
              tileType={tileType}
              entityIfExist={roomEntityPositions.get(
                `${rowIndex},${columnIndex}`
              )}
              key={`${rowIndex}-${columnIndex}`}
              playerState={player.state}
              active={active}
              hovered={hovered}
              isEffectZone={isEffectZone}
              isRoomOver={isRoomOver}
              isTargetZone={isTargetZone}
              onClick={() => {
                console.log(
                  'Tile clicked',
                  [rowIndex, columnIndex],
                  entityIfExists,
                  tileType,
                  player.state.isUsingSkill,
                  player.state.skillId,
                  targetZones.current
                );

                // If room is over, player can move to any valid tile (floor, door)
                if (isRoomOver && currentRoom) {
                  if (tileType === TILE_TYPE.DOOR) {
                    handlePlayerMove(rowIndex, columnIndex);
                  } else if (tileType === TILE_TYPE.FLOOR) {
                    handlePlayerMove(rowIndex, columnIndex);
                  } else if (tileType === TILE_TYPE.CHEST) {
                    // Only open chest if player is within 1 tile of the chest
                    if (
                      Math.abs(playerRow - rowIndex) <= 1 &&
                      Math.abs(playerCol - columnIndex) <= 1
                    ) {
                      if (isChestOpen) {
                        setIsChestOpen(false);
                        setIsCharacterSheetOpen(false);
                      } else {
                        setIsChestOpen(true);
                        setIsCharacterSheetOpen(true);
                      }
                    }
                  }

                  return;
                }

                if (isEffectZone) {
                  if (
                    player.state.isAttacking &&
                    entityIfExists &&
                    entityIfExists[0] === ENTITY_TYPE.ENEMY
                  ) {
                    setCurrentSkillAnimation({
                      ...WEAPON_ATTACK_ANIMATION,
                      position: [rowIndex, columnIndex],
                    });

                    setTimeout(() => {
                      handleEnemyClick(entityId);
                    }, WEAPON_ATTACK_ANIMATION.effectDelay);
                  } else if (
                    player.state.isMoving &&
                    !entityIfExists &&
                    tileType !== TILE_TYPE.WALL &&
                    tileType !== TILE_TYPE.DOOR
                  ) {
                    handlePlayerMove(rowIndex, columnIndex);
                  } else if (
                    // isAnimating.current === false &&
                    player.state.isUsingSkill &&
                    player.state.skillId
                  ) {
                    console.log('Skill clicked', player.state.skillId);
                    // Check tile clicked
                    // Defensive programming: Check if the tile clicked is valid for the specific skill. Prevents player from using skills on invalid tiles.
                    let isValid = false;

                    if (selfTargetedSkillIDs.includes(player.state.skillId)) {
                      // Check for self targeted skills
                      if (rowIndex === playerRow && columnIndex === playerCol) {
                        isValid = true;
                      }
                    } else if (
                      singleTargetSkillIDs.includes(player.state.skillId)
                    ) {
                      // Check for self targeted skills
                      if (
                        entityIfExists &&
                        entityIfExists[0] === ENTITY_TYPE.ENEMY
                      ) {
                        // Check if tile has an enemy
                        isValid = true;
                      }
                    } else if (aoeSkillIDs.includes(player.state.skillId)) {
                      // Check for AOE skills
                      if (isTargetZone) {
                        // Check if tile is in the target zone
                        if (
                          [SKILL_ID.LEAP_SLAM, SKILL_ID.FLAME_DIVE].includes(
                            player.state.skillId
                          ) &&
                          entityIfExists
                        ) {
                          // For the above skills, check if the clicked tile is not an entity
                          return;
                        } else {
                          isValid = true;
                        }
                      }
                    } else {
                      // Default to true for movement skills (that don't damage enemies)
                      isValid = true;
                    }

                    // If tile-skill click is not valid, do nothing.
                    // else handle skill effect
                    if (isValid === false) {
                      return;
                    }

                    const skill = player.skills.find(
                      (skill) => skill.id === player.state.skillId
                    );

                    if (!skill) {
                      addLog({ message: 'Skill not found!', type: 'error' });
                      return;
                    }

                    if (!isPlayer(player)) {
                      addLog({
                        message: 'onClick: player not a valid player type',
                        type: 'error',
                      });
                      return;
                    }

                    const skillAnimation = {
                      ...SKILL_ANIMATION_PRESET[player.state.skillId],
                    };

                    skillAnimation.position = [rowIndex, columnIndex];

                    // Override position for skills that start from the player's position
                    if (
                      [
                        SKILL_ID.WHIRLWIND,
                        SKILL_ID.WRATH_OF_THE_ANCIENTS,
                        SKILL_ID.KNIFE_BARRAGE,
                        SKILL_ID.MANA_BURST,
                        SKILL_ID.SUPERNOVA,
                        SKILL_ID.STORM_PULSE,
                        SKILL_ID.WARCRY,
                      ].includes(player.state.skillId)
                    ) {
                      skillAnimation.position = [playerRow, playerCol];
                    }

                    setCurrentSkillAnimation(skillAnimation);

                    handlePlayerSkillWithAnimation(
                      skill,
                      skillAnimation,
                      targetZones.current,
                      rowIndex,
                      columnIndex
                    );
                  }
                }
              }}
              onMouseEnter={() => {
                // Only allow setting hovered tile if no entity is moving nor camera is moving
                if (isCameraMoving || isEntityMoving) return;

                debouncedSetHoveredTile([rowIndex, columnIndex]);
                if (
                  isEffectZone &&
                  tileType !== TILE_TYPE.WALL &&
                  tileType !== TILE_TYPE.DOOR
                ) {
                  // Set isEffectZoneHovered to true when mouse enters effect zone
                  setIsEffectZoneHovered(true);

                  // Set target zones for skills that require them
                  setEffectZoneHovered([rowIndex, columnIndex]);
                }

                if (entityIfExists && entityIfExists[0] === ENTITY_TYPE.ENEMY) {
                  // Set currentHoveredEntity to the enemy when mouse enters enemy tile
                  const enemy = enemies.find((enemy) => enemy.id === entityId);
                  if (!enemy) {
                    console.error('Enemy not found!');
                    return;
                  }

                  setCurrentHoveredEntity(enemy);
                } else if (
                  entityIfExists &&
                  entityIfExists[0] === ENTITY_TYPE.PLAYER
                ) {
                  // Set currentHoveredEntity to the player when mouse enters player tile
                  setCurrentHoveredEntity(player);
                }

                // Update ap cost for movement possibilities
                if (player.state.isMoving) {
                  const APCost = playerMovementPossibilities[1].get(
                    `${rowIndex},${columnIndex}`
                  );
                  if (APCost !== undefined) {
                    // console.log(APCost);
                    setPlayerMovementAPCost(APCost);
                  }
                }
              }}
              onMouseLeave={() => {
                // Set isEffectZoneHovered to true when mouse leaves any tile
                // and reset saved target zones and effect zone hovered
                setIsEffectZoneHovered(false);
                targetZones.current = [];
                setEffectZoneHovered(null);

                if (entityIfExists) {
                  // Set currentHoveredEntity to null when mouse leaves enemy or player tile
                  setCurrentHoveredEntity(null);
                }
              }}
            />
          );
        });
      })}
    </div>
  );
};
