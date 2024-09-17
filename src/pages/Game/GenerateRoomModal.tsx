import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useGameStateStore } from '../../stores/game';
import { Button } from './Button';
import {
  ENEMY_PRESET_ID,
  ENEMY_PRESETS,
  ENTITY_TYPE,
  getDefaultPlayer,
} from '../../constants/entity';
import { IEnemy } from '../../types';
import { useEnemyStore } from '../../stores/enemy';
import { usePlayerStore } from '../../stores/player';
import { TILE_TYPE } from '../../constants/tile';
import { ROOM_LENGTH } from '../../constants/game';

const MAX_ROOM_LENGTH = 100;

let firstRender = true;

export const GenerateRoomModal: FC = () => {
  const {
    floorArtFile,
    wallArtFile,
    setFloorArtFile,
    setWallArtFile,
    setRoomLength,
    setRoomTileMatrix,
    setRoomEntityPositions,
    setTurnCycle,
    setIsGameOver,
    setIsGenerateRoomOpen,
  } = useGameStateStore();

  const { setEnemies } = useEnemyStore();

  const { getPlayer, setPlayer } = usePlayerStore();
  const player = getPlayer();

  const lastRoomLengthInput = useRef<string>(ROOM_LENGTH.toString());
  const [roomLengthInput, setRoomLengthInput] = useState<string>(
    ROOM_LENGTH.toString()
  ); // Default room length
  const [roomMatrix, setRoomMatrix] = useState<string>('');
  const [playerPositionInput, setPlayerPositionInput] = useState<
    [string, string]
  >(['13', '7']);
  const [enemyPositionsInput, setEnemyPositionsInput] = useState<
    [string, string, ENEMY_PRESET_ID][]
  >([
    ['11', '12', ENEMY_PRESET_ID.CERBERUS_PUP],
    ['8', '6', ENEMY_PRESET_ID.STYGIAN_WRAITH],
    ['5', '2', ENEMY_PRESET_ID.ABYSSAL_CYCLOPEAN_WRAITH],
    ['3', '7', ENEMY_PRESET_ID.INFERNAL_MINOTAUR],
  ]);

  // When room length input changes, generate default room matrix
  // Also when room first renders, set default room matrix
  useEffect(() => {
    if (firstRender) {
      setRoomMatrix(
        '[\n[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],\n[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],\n[2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2],\n[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],\n[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],\n[2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2],\n[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],\n[2, 1, 1, 2, 2, 1, 1, 1, 0, 0, 1, 2, 2, 2, 2],\n[2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 2, 2, 2, 2],\n[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],\n[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],\n[2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],\n[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2],\n[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],\n[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]\n]'
      );
      firstRender = false;
      return;
    }

    // Only update room matrix if the input has changed
    if (roomLengthInput === lastRoomLengthInput.current) {
      return;
    }

    const roomLength = parseInt(roomLengthInput);

    let roomMatrixString = '[\n';
    for (let row = 0; row < roomLength; row++) {
      roomMatrixString += '[';
      for (let col = 0; col < roomLength; col++) {
        // Surround room with walls and place door in the middle of the top wall and bottom wall
        if (
          row === 0 ||
          row === 1 ||
          row === roomLength - 1 ||
          col === 0 ||
          col === roomLength - 1
        ) {
          if (
            (row === 0 || row === 1) &&
            [
              Math.floor(roomLength / 2),
              Math.floor(roomLength / 2) - 1,
              Math.floor(roomLength / 2) + 1,
            ].includes(col)
          ) {
            // Place door in the middle of the top wall
            if (row === 0) {
              // First row
              if (col === Math.floor(roomLength / 2)) {
                // Middle
                roomMatrixString += `${TILE_TYPE.WALL}`;
              } else if (col === Math.floor(roomLength / 2) - 1) {
                // Left of middle
                roomMatrixString += `${TILE_TYPE.WALL}`;
              } else {
                // Right of middle
                roomMatrixString += `${TILE_TYPE.WALL}`;
              }
            } else {
              // Second row
              if (col === Math.floor(roomLength / 2)) {
                // Middle
                roomMatrixString += `${TILE_TYPE.DOOR}`;
              } else if (col === Math.floor(roomLength / 2) - 1) {
                // Left of middle
                roomMatrixString += `${TILE_TYPE.WALL}`;
              } else {
                // Right of middle
                roomMatrixString += `${TILE_TYPE.WALL}`;
              }
            }
          } else {
            // Place corners
            if (row === 0 && col === 0) {
              // Top left corner
              roomMatrixString += `${TILE_TYPE.WALL}`;
            } else if (row === 0 && col === roomLength - 1) {
              // Top right corner
              roomMatrixString += `${TILE_TYPE.WALL}`;
            } else if (row === roomLength - 1 && col === 0) {
              // Bottom left corner
              roomMatrixString += `${TILE_TYPE.WALL}`;
            } else if (row === roomLength - 1 && col === roomLength - 1) {
              // Bottom right corner
              roomMatrixString += `${TILE_TYPE.WALL}`;
            }

            // Place non-corner walls
            else if (row === 0 && col !== 0 && col !== roomLength - 1) {
              // Top wall
              roomMatrixString += `${TILE_TYPE.WALL}`;
            } else if (row === 1 && col > 0 && col < roomLength - 1) {
              // Top wall - 1
              roomMatrixString += `${TILE_TYPE.WALL}`;
            } else if (row === 1 && col === 0) {
              // Top wall - 1 left wall
              roomMatrixString += `${TILE_TYPE.WALL}`;
            } else if (row === 1 && col === roomLength - 1) {
              // Top wall - 1 right wall
              roomMatrixString += `${TILE_TYPE.WALL}`;
            } else if (
              row === roomLength - 1 &&
              col !== 0 &&
              col !== roomLength - 1
            ) {
              // Bottom wall
              roomMatrixString += `${TILE_TYPE.WALL}`;
            } else if (col === 0 && row !== 0 && row !== roomLength - 1) {
              // Left wall
              roomMatrixString += `${TILE_TYPE.WALL}`;
            } else if (
              col === roomLength - 1 &&
              row !== 0 &&
              row !== roomLength - 1
            ) {
              // Right wall
              roomMatrixString += `${TILE_TYPE.WALL}`;
            } else {
              roomMatrixString += `${TILE_TYPE.WALL}`;
            }
          }
        } else {
          // Place floor tiles everywhere else
          roomMatrixString += `${TILE_TYPE.FLOOR}`;
        }

        if (col !== roomLength - 1) {
          roomMatrixString += ', ';
        }
      }
      roomMatrixString += ']';
      if (row !== roomLength - 1) {
        roomMatrixString += ',\n';
      }
    }

    roomMatrixString += '\n]';

    setRoomMatrix(roomMatrixString);
    lastRoomLengthInput.current = roomLengthInput;
  }, [roomLengthInput]);

  const handleGenerateRoom = () => {
    const parsedRoomMatrix = JSON.parse(roomMatrix);

    const newRoomEntityPositions = new Map(); // Map of entity type and id to position
    const newEnemies: IEnemy[] = [];

    // Validate player position
    const playerPosition: [number, number] = [
      parseInt(playerPositionInput[0]),
      parseInt(playerPositionInput[1]),
    ];

    if (playerPosition.some((pos) => isNaN(pos))) {
      console.error('Player position is invalid!');
      return;
    }

    if (
      playerPosition[0] < 0 ||
      playerPosition[1] < 0 ||
      playerPosition[0] >= parsedRoomMatrix.length ||
      playerPosition[1] >= parsedRoomMatrix[0].length
    ) {
      console.error('Player position is out of bounds!');
      return;
    }

    // Place player
    newRoomEntityPositions.set(`${playerPosition[0]},${playerPosition[1]}`, [
      ENTITY_TYPE.PLAYER,
      1,
    ]);

    // Place enemies
    enemyPositionsInput.forEach((enemyPositionInput, index) => {
      const enemyPosition: [number, number] = [
        parseInt(enemyPositionInput[0]),
        parseInt(enemyPositionInput[1]),
      ];

      if (enemyPosition.some((pos) => isNaN(pos))) {
        console.error('Enemy position is invalid!');
        return;
      }

      if (
        enemyPosition[0] < 0 ||
        enemyPosition[1] < 0 ||
        enemyPosition[0] >= parsedRoomMatrix.length ||
        enemyPosition[1] >= parsedRoomMatrix[0].length
      ) {
        console.error(`Enemy ${index + 1} position is out of bounds!`);
        return;
      }

      newRoomEntityPositions.set(`${enemyPosition[0]},${enemyPosition[1]}`, [
        ENTITY_TYPE.ENEMY,
        index + 1,
      ]);

      const enemyPreset = ENEMY_PRESETS[enemyPositionInput[2]];

      newEnemies.push({
        ...enemyPreset,
        id: index + 1,
        statuses: [],
      });
    });

    // Set room length, room entity positions, enemies, and room tile matrix
    setRoomLength(parseInt(roomLengthInput));
    setEnemies(newEnemies);
    setTurnCycle([player, ...newEnemies]);
    setRoomEntityPositions(newRoomEntityPositions);
    setRoomTileMatrix(parsedRoomMatrix);
    setPlayer({ ...getDefaultPlayer(), statuses: [] });
    setIsGameOver(false);
    setIsGenerateRoomOpen(false);
  };

  const handleFloorArtFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      console.error('Input files is null');
      return;
    }

    setFloorArtFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleWallArtFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      console.error('Input files is null');
      return;
    }

    setWallArtFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="bg-zinc-900 p-5 border border-white h-full">
      <div className="relative">
        <div
          className="absolute top-0 right-0 cursor-pointer text-red-500"
          onClick={() => setIsGenerateRoomOpen(false)}
        >
          X
        </div>
        <h2 className="mb-5 pb-3 w-full border-b">Generate Room Matrix</h2>
      </div>

      <div
        className="flex flex-col overflow-auto"
        style={{ maxHeight: 'calc(100% - 70px)' }}
      >
        <div className="mb-5 flex flex-col items-center justify-center">
          <div className="mb-3 flex">
            <div className="mr-3 ">
              <label htmlFor="roomLength ">Room Length</label>
            </div>
            <input
              id="roomLength"
              className="bg-zinc-700 w-[70px] px-2"
              value={roomLengthInput}
              onChange={(e) => {
                if (/\D/.test(e.target.value)) {
                  console.log(
                    'Only allow numbers (no decimals)',
                    e.target.value
                  );
                  // Only allow numbers (no decimals)
                  // setRoomLengthInput(roomLengthInput);
                } else {
                  if (parseInt(e.target.value) >= MAX_ROOM_LENGTH) {
                    setRoomLengthInput(MAX_ROOM_LENGTH + '');
                  } else {
                    setRoomLengthInput(e.target.value);
                  }
                }
              }}
            ></input>
          </div>

          <div className="flex justify-center items-center ">
            <button
              className="hover:border-white mr-3"
              onClick={() => {
                const fileInput = document.getElementById('floorArtFile-input');

                if (fileInput === null) {
                  console.error('File input is null');
                  return;
                }

                fileInput.click();
              }}
            >
              Input floor art file
            </button>
            <input
              id="floorArtFile-input"
              className="hidden"
              type="file"
              onChange={handleFloorArtFileChange}
            />
            <p>File: {floorArtFile ? floorArtFile : 'No floor art chosen'}</p>
          </div>

          <div className="flex items-center">
            <button
              className="hover:border-white mr-3"
              onClick={() => {
                const fileInput = document.getElementById('wallArtFile-input');

                if (fileInput === null) {
                  console.error('File input is null');
                  return;
                }

                fileInput.click();
              }}
            >
              Input wall art file
            </button>
            <input
              id="wallArtFile-input"
              className="hidden"
              type="file"
              onChange={handleWallArtFileChange}
            />
            <p>File: {wallArtFile ? wallArtFile : 'No wall art chosen'}</p>
          </div>
        </div>

        <div className="mb-5">
          <div className="mb-3">
            <label htmlFor="roomMatrix">Input room 2D array matrix</label>
          </div>
          <textarea
            id="roomMatrix"
            value={roomMatrix}
            onChange={(e) => setRoomMatrix(e.target.value)}
            className="p-2 bg-zinc-700 text-white border border-white rounded w-full h-48"
          />
        </div>

        <div className="mb-5 flex justify-center items-center">
          <p className="mr-3">Player Position (0-indexed)</p>
          <input
            id="playerRowPos"
            className="bg-zinc-700 w-16 px-2 mr-3"
            placeholder="Row"
            value={playerPositionInput[0]}
            onChange={(e) =>
              setPlayerPositionInput([e.target.value, playerPositionInput[1]])
            }
          ></input>
          <input
            id="playerRowPos"
            className="bg-zinc-700 w-16 px-2"
            placeholder="Column"
            value={playerPositionInput[1]}
            onChange={(e) =>
              setPlayerPositionInput([playerPositionInput[0], e.target.value])
            }
          ></input>
        </div>

        <div className="mb-5">
          <p className="mb-3">Enemy Position(s) (0-indexed)</p>
          {enemyPositionsInput.map((enemyPosition, index) => (
            <div className="flex justify-center items-center mb-3" key={index}>
              <p className="mr-3">Enemy {index + 1}</p>
              <input
                className="bg-zinc-700 w-16 px-2 mr-3"
                placeholder="Row"
                value={enemyPosition[0]}
                onChange={(e) =>
                  setEnemyPositionsInput((prevEnemyPositions) => {
                    const newEnemyPositions = [...prevEnemyPositions];
                    newEnemyPositions[index] = [
                      e.target.value,
                      enemyPosition[1],
                      enemyPosition[2],
                    ];
                    return newEnemyPositions;
                  })
                }
              ></input>
              <input
                className="bg-zinc-700 w-16 px-2 mr-3"
                placeholder="Column"
                value={enemyPosition[1]}
                onChange={(e) =>
                  setEnemyPositionsInput((prevEnemyPositions) => {
                    const newEnemyPositions = [...prevEnemyPositions];
                    newEnemyPositions[index] = [
                      enemyPosition[0],
                      e.target.value,
                      enemyPosition[2],
                    ];
                    return newEnemyPositions;
                  })
                }
              ></input>
              <select
                name="enemyPreset"
                id="enemyPreset-select"
                className="bg-zinc-700 h-6"
                value={enemyPosition[2]}
                onChange={(e) =>
                  setEnemyPositionsInput((prevEnemyPositions) => {
                    const newEnemyPositions = [...prevEnemyPositions];
                    newEnemyPositions[index] = [
                      enemyPosition[0],
                      enemyPosition[1],
                      parseInt(e.target.value) as ENEMY_PRESET_ID,
                    ];
                    return newEnemyPositions;
                  })
                }
              >
                {Object.entries(ENEMY_PRESETS).map((enemyPreset, index) => {
                  return (
                    <option key={index} value={enemyPreset[0]}>
                      {enemyPreset[1].name}
                    </option>
                  );
                })}
              </select>
              <div
                className="cursor-pointer text-red-500 ml-3"
                onClick={() =>
                  setEnemyPositionsInput((prevEnemyPositions) => {
                    const newEnemyPositions = [...prevEnemyPositions];
                    newEnemyPositions.splice(index, 1);
                    return newEnemyPositions;
                  })
                }
              >
                X
              </div>
            </div>
          ))}
          <Button
            onClick={() =>
              setEnemyPositionsInput((prevEnemyPositions) => [
                ...prevEnemyPositions,
                [
                  prevEnemyPositions.length.toString(),
                  prevEnemyPositions.length.toString(),
                  ENEMY_PRESET_ID.CERBERUS_PUP,
                ],
              ])
            }
          >
            Add More Enemies
          </Button>
        </div>

        <Button onClick={handleGenerateRoom}>Generate</Button>
      </div>
    </div>
  );
};
