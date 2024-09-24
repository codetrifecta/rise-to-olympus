import { FC, useEffect, useMemo, useRef, useState } from 'react';

import { PlayerControlPanel } from './PlayerControlPanel';
import { IEntity, IRoom } from '../../types';
import { Room } from './Room';
import { TurnInfo } from './TurnInfo';
import { PlayerInfo } from './PlayerInfo';
import { useGameStateStore } from '../../stores/game';
import { usePlayerStore } from '../../stores/player';
import { useEnemyStore } from '../../stores/enemy';
import { Logger } from './Logger';
import clsx from 'clsx';
// import { InventoryChooser } from './InventoryChooser';
import { CharacterSheet } from './CharacterSheet';
import { GenerateRoomModal } from './GenerateRoomModal';
import { PLAYER_CONTROL_PANEL_HEIGHT } from '../../constants/game';
import { Compendium } from './Compendium';
import { EntityTurnText } from './EntityTurnText';
import { ChestItemsDisplay } from './ChestItemsDisplay';
import { Minimap } from './Minimap';
import { useFloorStore } from '../../stores/floor';
import { ROOM_TYPE } from '../../constants/room';
import { ENTITY_SPRITE_DIRECTION, ENTITY_TYPE } from '../../constants/entity';
import { useCampaignStore } from '../../stores/campaign';
import { ProceedToNextFloor } from './ProceedToNextFloor';
import { setEntityAnimationIdle } from '../../utils/entity';
import { FLOOR_ID } from '../../constants/floor';

const MAX_CAMERA_STRIGHT_MOVE_SPEED = 8;
const MAX_CAMERA_DIAGONAL_MOVE_SPEED = Math.sqrt(
  MAX_CAMERA_STRIGHT_MOVE_SPEED ** 2 / 2
);
const DELTA_ACCELERATION = 0.03;
const DELTA_DECELERATION = 0.94;

let deltaX = 0;
let deltaY = 0;

// Keys that are available for camera movement
const availableKeys = ['w', 'a', 's', 'd', 'l', 'c', 'i', '+', '=', '-'];

// Camera scale and scale step
let currentScale = 1;
const scaleStep = 0.02;

// Record of keys that are currently pressed
const keyPressed: Record<string, boolean> = {};

export const GameRoom: FC = () => {
  const [firstRoomRender, setFirstRoomRender] = useState(true);

  const [currentHoveredEntity, setCurrentHoveredEntity] =
    useState<IEntity | null>(null);

  const roomContainerRef = useRef<HTMLDivElement>(null);
  const roomScrollRef = useRef<HTMLDivElement>(null);

  const {
    isRoomOver,
    isFloorCleared,
    isChestOpen,
    turnCycle,
    isInventoryOpen,
    isGameLogOpen,
    isCharacterSheetOpen,
    isGenerateRoomOpen,
    isCompendiumOpen,
    isMinimapOpen,
    isCameraMoving,
    isGameOver,
    setIsRoomOver,
    setIsInventoryOpen,
    setIsGameLogOpen,
    setIsCharacterSheetOpen,
    setIsCompendiumOpen,
    setIsMinimapOpen,
    setTurnCycle,
    setIsLoading,
    setRoomEntityPositions,
    setRoomLength,
    setRoomTileMatrix,
    setIsCameraMoving,
  } = useGameStateStore();

  const { floor, currentRoom, setCurrentRoom } = useFloorStore();

  const { player } = usePlayerStore();

  const { setEnemies } = useEnemyStore();

  const { selectedCampaign } = useCampaignStore();

  // Initialize key press handlers
  useEffect(() => {
    const handleKeydownEvent = (e: KeyboardEvent) => {
      if (availableKeys.includes(e.key.toLowerCase())) {
        if (keyPressed[e.key] === undefined) {
          keyPressed[e.key] = true;
        }
      }
    };

    const handleKeyupEvent = (e: KeyboardEvent) => {
      if (availableKeys.includes(e.key.toLowerCase())) {
        delete keyPressed[e.key];
      }
    };

    // Add event listeners for keyboard input
    document.body.addEventListener('keydown', handleKeydownEvent);
    document.body.addEventListener('keyup', handleKeyupEvent);

    // Remove event listeners on unmount
    return () => {
      document.body.removeEventListener('keydown', handleKeydownEvent);
      document.body.removeEventListener('keyup', handleKeyupEvent);
    };
  }, []);

  // When floor is initialized, set current room to the start room
  useEffect(() => {
    const handleFloorInitialization = () => {
      if (floor && currentRoom === null) {
        console.log('Floor initialized');
        setFirstRoomRender(true);

        // Set first room to START room
        let startRoom: IRoom | null = null;

        const rooms = floor.rooms;

        for (let row = 0; row < rooms.length; row++) {
          for (let col = 0; col < rooms[row].length; col++) {
            if (rooms[row][col].type === ROOM_TYPE.START) {
              startRoom = rooms[row][col];
              break;
            }
          }
          if (startRoom) {
            break;
          }
        }

        if (!startRoom) {
          console.error('No start room found in floor!');
          return;
        }

        // Initialize player position to the start room
        const newStartRoom: IRoom = {
          ...startRoom,
          roomEntityPositions: new Map([
            [
              `${Math.floor(startRoom.roomLength / 2)},${Math.floor(startRoom.roomLength / 2)}`,
              [ENTITY_TYPE.PLAYER, 1],
            ],
          ]),
        };

        console.log('Setting current room to start room', newStartRoom);

        setCurrentRoom(newStartRoom);
      }
    };
    handleFloorInitialization();
  }, [floor]);

  // When room changes, initialize game state according to the room specifications
  useEffect(() => {
    const handleRoomInitialization = () => {
      console.log('handleRoomInitialization', currentRoom);
      if (currentRoom !== null) {
        const roomEnemies = currentRoom.enemies;
        const roomEntityPositions = currentRoom.roomEntityPositions;
        const roomLength = currentRoom.roomLength;
        const roomTileMatrix = currentRoom.roomTileMatrix;

        if (currentRoom.isCleared) {
          console.log('Room is cleared', roomEntityPositions);
          // Filter out player entity from room entity positions
          const newRoomEntityPositions = new Map<
            string,
            [ENTITY_TYPE, number]
          >();
          roomEntityPositions.forEach((value, key) => {
            if (value[0] === ENTITY_TYPE.PLAYER) {
              newRoomEntityPositions.set(key, value);
            }
          });

          console.log('newRoomEntityPositions', newRoomEntityPositions);

          // Set room is over to true
          setIsRoomOver(true);

          // Setup room
          setRoomLength(roomLength);
          setRoomTileMatrix(roomTileMatrix);

          // Setup entities
          setEnemies([]);
          setRoomEntityPositions(roomEntityPositions);

          // Set turn cycle
          setTurnCycle([player]);
        } else {
          // Reset room is over
          setIsRoomOver(false);

          // Setup room
          setRoomLength(roomLength);
          setRoomTileMatrix(roomTileMatrix);

          // Setup entities
          setEnemies(roomEnemies);
          setRoomEntityPositions(roomEntityPositions);

          // Setup animations for enemies
          setTimeout(() => {
            roomEnemies.forEach((enemy) => {
              setEntityAnimationIdle(
                enemy,
                Math.random() > 0.5
                  ? ENTITY_SPRITE_DIRECTION.RIGHT
                  : ENTITY_SPRITE_DIRECTION.LEFT
              );
            });
          }, 100);

          // Set turn cycle
          setTurnCycle([player, ...roomEnemies]);
        }

        setIsLoading(false);
      }
    };

    handleRoomInitialization();
  }, [currentRoom]);

  // When room container ref value changes, (in this case when the room container is mounted).
  // Scroll into the middle of the room container (to view the room)
  const scrollIntoMiddleOfRoom = () => {
    if (
      roomContainerRef.current !== null &&
      roomScrollRef.current !== null &&
      firstRoomRender
    ) {
      //   await sleep(200);
      setTimeout(() => {
        if (
          roomContainerRef.current !== null &&
          roomScrollRef.current !== null
        ) {
          const roomContainerX = roomContainerRef.current.offsetWidth / 2;
          const roomContainerY = roomContainerRef.current.offsetHeight / 2;

          roomScrollRef.current.scrollLeft =
            roomContainerX - window.innerWidth / 2;
          roomScrollRef.current.scrollTop =
            roomContainerY - window.innerHeight / 2 + 50;
        }

        setFirstRoomRender(false);

        if (
          floor &&
          floor.id !== FLOOR_ID.TARTARUS_CAMP &&
          floor.id !== FLOOR_ID.TUTORIAL
        ) {
          setIsMinimapOpen(true);
        }
      }, 300);
    }
  };

  useEffect(() => {
    const handleRoomContainerRefChange = () => {
      scrollIntoMiddleOfRoom();
    };
    handleRoomContainerRefChange();
  }, [
    roomContainerRef.current,
    roomScrollRef.current,
    currentRoom,
    firstRoomRender,
  ]);

  // Check every 50ms to check input to move camera
  useEffect(() => {
    const cameraKeyInputCheckInterval = setInterval(() => {
      if (isGenerateRoomOpen) return;

      if (roomContainerRef.current && roomScrollRef.current) {
        if (keyPressed['w'] === true && keyPressed['a'] === true) {
          if (deltaY > -MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaY -= MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaY = -MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }

          if (deltaX > -MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaX -= MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaX = -MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }
        } else if (keyPressed['w'] === true && keyPressed['s'] === true) {
          // Do nothing if both w and s are pressed
        } else if (keyPressed['w'] === true && keyPressed['d'] === true) {
          if (deltaY > -MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaY -= MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaY = -MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }

          if (deltaX < MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaX += MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaX = MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }
        } else if (keyPressed['s'] === true && keyPressed['a'] === true) {
          if (deltaY < MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaY += MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaY = MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }

          if (deltaX > -MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaX -= MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaX = -MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }
        } else if (keyPressed['s'] === true && keyPressed['d'] === true) {
          if (deltaY < MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaY += MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaY = MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }

          if (deltaX < MAX_CAMERA_DIAGONAL_MOVE_SPEED) {
            deltaX += MAX_CAMERA_DIAGONAL_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaX = MAX_CAMERA_DIAGONAL_MOVE_SPEED;
          }
        } else if (keyPressed['a'] === true && keyPressed['d'] === true) {
          // Do nothing if both w and s are pressed
        } else if (keyPressed['w'] === true) {
          if (deltaY > -MAX_CAMERA_STRIGHT_MOVE_SPEED) {
            deltaY -= MAX_CAMERA_STRIGHT_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaY = -MAX_CAMERA_STRIGHT_MOVE_SPEED;
          }
        } else if (keyPressed['a'] === true) {
          if (deltaX > -MAX_CAMERA_STRIGHT_MOVE_SPEED) {
            deltaX -= MAX_CAMERA_STRIGHT_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaX = -MAX_CAMERA_STRIGHT_MOVE_SPEED;
          }
        } else if (keyPressed['s'] === true) {
          if (deltaY < MAX_CAMERA_STRIGHT_MOVE_SPEED) {
            deltaY += MAX_CAMERA_STRIGHT_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaY = MAX_CAMERA_STRIGHT_MOVE_SPEED;
          }
        } else if (keyPressed['d'] === true) {
          if (deltaX < MAX_CAMERA_STRIGHT_MOVE_SPEED) {
            deltaX += MAX_CAMERA_STRIGHT_MOVE_SPEED * DELTA_ACCELERATION;
          } else {
            deltaX = MAX_CAMERA_STRIGHT_MOVE_SPEED;
          }
        }

        roomScrollRef.current.scrollTop =
          roomScrollRef.current.scrollTop + deltaY;
        roomScrollRef.current.scrollLeft =
          roomScrollRef.current.scrollLeft + deltaX;

        // If no movement keys are pressed, decelerate
        if (!keyPressed['a'] && !keyPressed['d']) {
          if (Math.abs(deltaX) < 0.8) {
            deltaX = 0;
          } else {
            deltaX *= DELTA_DECELERATION;
          }
        }
        if (!keyPressed['w'] && !keyPressed['s']) {
          if (Math.abs(deltaY) < 0.8) {
            deltaY = 0;
          } else {
            deltaY *= DELTA_DECELERATION;
          }
        }

        if (keyPressed['+'] === true || keyPressed['='] === true) {
          if (currentScale < 1.6) {
            currentScale += scaleStep;
            roomContainerRef.current.style.transform = `scale(${currentScale})`;
          }
        } else if (keyPressed['-'] === true) {
          if (currentScale > 0.7) {
            currentScale -= scaleStep;
            roomContainerRef.current.style.transform = `scale(${currentScale})`;
          }
        }
      }
    }, 10);

    return () => {
      clearInterval(cameraKeyInputCheckInterval);
    };
  }, [isGenerateRoomOpen]);

  useEffect(() => {
    // Check if camera is moving, then set isCameraMoving to false
    // We are setting isCameraMoving to false when camera is moving to prevent hover events from firing
    const setTileHoverableIfCameraMoving = setInterval(() => {
      if (
        Math.round(deltaX) !== 0 ||
        (Math.round(deltaY) !== 0 && !isCameraMoving)
      ) {
        setIsCameraMoving(true);
        // console.log('Camera moving');
      } else if (
        Math.round(deltaX) === 0 &&
        Math.round(deltaY) === 0 &&
        isCameraMoving
      ) {
        setIsCameraMoving(false);
        // console.log('Camera not moving');
      }
    }, 100);

    return () => {
      clearInterval(setTileHoverableIfCameraMoving);
    };
  }, [isCameraMoving]);

  // Add event listeres for other shortcuts
  useEffect(() => {
    const handleShortcutKeys = (e: KeyboardEvent) => {
      // if (e.key === "Escape") {
      //   setIsInventoryOpen(false);
      //   setIsGameLogOpen(false);
      //   setIsCharacterSheetOpen(false);
      //   setIsGenerateRoomOpen(false);
      // }

      if (isGenerateRoomOpen) {
        return;
      } else {
        if (e.key === 'i') {
          setIsInventoryOpen(!isInventoryOpen);
        }

        if (e.key === 'l') {
          setIsGameLogOpen(!isGameLogOpen);
        }

        if (e.key === 'c') {
          setIsCharacterSheetOpen(!isCharacterSheetOpen);
        }

        if (e.key === 'k') {
          setIsCompendiumOpen(!isCompendiumOpen);
        }

        if (e.key === 'm') {
          setIsMinimapOpen(!isMinimapOpen);
        }
      }
    };

    // Add event listeners for keyboard input
    document.body.addEventListener('keydown', handleShortcutKeys);

    // Remove event listeners on unmount
    return () => {
      document.body.removeEventListener('keydown', handleShortcutKeys);
    };
  }, [
    isGameLogOpen,
    isInventoryOpen,
    isCharacterSheetOpen,
    isCompendiumOpen,
    isMinimapOpen,
    setIsGameLogOpen,
    setIsCharacterSheetOpen,
    setIsInventoryOpen,
    setIsCompendiumOpen,
    setIsMinimapOpen,
    isGenerateRoomOpen,
  ]);

  const isInitialized = useMemo(() => {
    return turnCycle.length > 0;
  }, [turnCycle]);

  // Wait for game initialization
  if (!isInitialized) {
    return (
      <h1 className="w-screen h-screen flex justify-center items-center bg-black"></h1>
    );
  }

  return (
    <>
      {firstRoomRender === true || !floor || !currentRoom ? (
        <h1 className="fixed w-screen h-screen flex justify-center items-center z-[1000] bg-black"></h1>
      ) : null}
      <div className="relative max-w-screen h-screen flex flex-col justify-start overflow-hidden">
        {/* Chest Items Display (Only display when chest is clicked and room is over) */}
        {isRoomOver && isChestOpen ? (
          <section
            className="fixed z-[60] top-[50%] left-[50%]  shadow-lg flex"
            style={{
              maxHeight: `calc(100vh - ${PLAYER_CONTROL_PANEL_HEIGHT}px)`,
              visibility: 'visible',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <ChestItemsDisplay />
          </section>
        ) : null}

        {/* Game Info (Currently only displays turn cycle) */}
        {!isRoomOver ? (
          <section
            className="fixed z-40 mt-1 mb-6"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <TurnInfo
              currentHoveredEntity={currentHoveredEntity}
              setCurrentHoveredEntity={setCurrentHoveredEntity}
            />
          </section>
        ) : null}

        {/* Game Log */}
        <div
          className={clsx('fixed left-10 xl:w-[23%] w-[28%]', {
            'z-[50]': isGameLogOpen,
            'z-[-10] opacity-0': !isGameLogOpen,
          })}
          style={{ bottom: `calc(${PLAYER_CONTROL_PANEL_HEIGHT}px + 2.1rem)` }}
        >
          <Logger />
        </div>

        {/* Character Sheet */}
        <div
          className={clsx(
            'fixed left-0 w-[400px] shadow-lg transition-all ease duration-300 delay-0 z-[51]'
          )}
          style={{
            height: `calc(100vh - ${PLAYER_CONTROL_PANEL_HEIGHT}px)`,
            left: isCharacterSheetOpen ? 0 : -400,
            visibility: isCharacterSheetOpen ? 'visible' : 'hidden',
          }}
        >
          <CharacterSheet />
        </div>

        {/* Combat Room */}
        <section
          className={clsx('relative max-w-screen max-h-screen', {
            'pointer-events-none':
              isInventoryOpen ||
              isCharacterSheetOpen ||
              isCompendiumOpen ||
              !selectedCampaign?.scriptsCompleted.tutorialStartRoom,
          })}
        >
          <div
            className="relative max-w-screen max-h-screen pr-10 hidden-scrollbar overflow-scroll outline-none"
            ref={roomScrollRef}
          >
            <div
              className="relative min-w-[2000px] min-h-[1500px] flex justify-center items-center"
              ref={roomContainerRef}
            >
              <Room
                currentHoveredEntity={currentHoveredEntity}
                setCurrentHoveredEntity={setCurrentHoveredEntity}
              />
            </div>
          </div>
        </section>

        {/* Entity Turn Text */}
        {isRoomOver ? null : (
          <div
            className="fixed z-40"
            style={{
              bottom: `${PLAYER_CONTROL_PANEL_HEIGHT + 90}px`,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <EntityTurnText />
          </div>
        )}

        {/* Generate Room */}
        <section
          className="fixed z-[60] top-0 w-screen shadow-lg"
          style={{
            height: `calc(100vh - ${PLAYER_CONTROL_PANEL_HEIGHT}px)`,
            visibility: isGenerateRoomOpen ? 'visible' : 'hidden',
          }}
        >
          <GenerateRoomModal />
        </section>

        {/* Compendium */}
        <section
          className="fixed z-[60] top-[50%] left-[50%]  shadow-lg flex"
          style={{
            maxHeight: `calc(100vh - ${PLAYER_CONTROL_PANEL_HEIGHT}px)`,
            visibility: isCompendiumOpen ? 'visible' : 'hidden',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Compendium />
        </section>

        {/* Inventory Chooser (FOR DEBUGGING) */}
        {/* <section
          className="fixed z-[51] top-0 w-[400px] shadow-lg transition-all ease duration-300 delay-0"
          style={{
            height: `calc(100vh - ${PLAYER_CONTROL_PANEL_HEIGHT}px)`,
            right: isInventoryOpen ? 0 : -400,
            visibility: isInventoryOpen ? 'visible' : 'hidden',
          }}
        >
          <InventoryChooser />
          <div></div>
        </section> */}

        {/* Minimap */}
        <section
          className={clsx('fixed right-10 top-10 max-h-[200px]', {
            'z-[50]': isMinimapOpen,
            'z-[-10] opacity-0': !isMinimapOpen,
          })}
        >
          <Minimap />
        </section>

        {/* <div className="fixed bottom-0 flex flex-col justify-between items-center"> */}
        {/* Player Info */}
        <section
          className="max-w-[3400px] fixed z-50"
          style={{
            bottom: `${PLAYER_CONTROL_PANEL_HEIGHT}px`,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <PlayerInfo />
        </section>

        {/* Player Control Panel */}
        <section
          className="z-50 fixed bottom-0"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <PlayerControlPanel />
        </section>

        {/* Proceed to Next Floor Button */}
        {((isGameOver && player.health <= 0) ||
          (isFloorCleared && isRoomOver)) && (
          <section
            className="z-50 fixed right-10"
            style={{
              bottom: `calc(${PLAYER_CONTROL_PANEL_HEIGHT}px + 2rem)`,
            }}
          >
            <ProceedToNextFloor />
          </section>
        )}
      </div>
    </>
  );
};
