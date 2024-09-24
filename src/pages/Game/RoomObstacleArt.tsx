import { FC, useEffect, useRef } from 'react';

import { TILE_SIZE, TILE_TYPE } from '../../constants/tile';
import { useGameStateStore } from '../../stores/game';
import { useFloorStore } from '../../stores/floor';
// import { ENTITY_TYPE } from '../../constants/entity';

export const RoomObstacleArt: FC<{
  width: number;
  height: number;
  grayscale?: boolean;
}> = ({ grayscale }) => {
  const {
    roomLength,
    isRoomOver,
    wallArtFile,
    roomEntityPositions,
    roomTileMatrix,
    hoveredTile,
  } = useGameStateStore();

  const { currentRoom, floor } = useFloorStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create a canvas element and draw the wall art on it
  // Modify the alpha channel of the wall art based on the entities that are covered by the wall art
  // Modify the alpha channel of the wall art based on the hovered tile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('RoomObstacleArt: No canvas');
      return;
    }

    const context = canvas.getContext('2d', { willReadFrequently: true });

    const image = new Image();

    if (!currentRoom) {
      console.error('RoomObstacleArt: No current room');
      return;
    }

    if (!floor) {
      console.error('RoomObstacleArt: No current floor');
      return;
    }

    const imgSrc = currentRoom.artObstacle;

    image.src = imgSrc;

    image.onload = function () {
      if (!context) return;
      context.reset();
      context.imageSmoothingEnabled = false;

      if (!currentRoom.artObstacle) {
        // console.log(
        //   'RoomObstacleArt: No obstacle art',
        //   currentRoom.artObstacle
        // );
        context.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      if (grayscale) {
        context.filter = 'grayscale(1)';
      }

      const width = (image.naturalWidth / 16) * TILE_SIZE;
      const height = (image.naturalHeight / 16) * TILE_SIZE;

      context.drawImage(image, 0, 0, width, height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      const data = imageData.data;

      // Change alpha channel for tiles that have entities covered by the wall
      Array.from(roomEntityPositions).forEach(([positionString, entity]) => {
        const [entityRow, entityCol] = positionString.split(',').map(Number);

        // // Skip if no tile nearby is a wall (in this case, check for the 2 tiles below the entity)
        // if (
        //   roomTileMatrix[entityRow + 1][entityCol] !== TILE_TYPE.OBSTACLE &&
        //   roomTileMatrix[entityRow + 2][entityCol] !== TILE_TYPE.OBSTACLE
        // ) {
        //   return;
        // }

        // Skip if no wall art is overlapping the entity
        let isObstacleArtOverlapping = false;
        for (
          let y = entityRow * TILE_SIZE;
          y < entityRow * TILE_SIZE + TILE_SIZE;
          y++
        ) {
          for (
            let x = entityCol * TILE_SIZE;
            x < entityCol * TILE_SIZE + TILE_SIZE;
            x++
          ) {
            const index = (y * imageData.width + x) * 4;

            // Only change the alpha channel if the tile is an overlapping wall (aka data[index], data[index + 1], data[index + 2] are all NOT 0)
            if (
              data[index] !== 0 &&
              data[index + 1] !== 0 &&
              data[index + 2] !== 0
            ) {
              isObstacleArtOverlapping = true;
              break;
            }
          }
          if (isObstacleArtOverlapping) {
            break;
          }
        }

        if (isObstacleArtOverlapping === false) {
          return;
        }

        const [entityType, entityId] = entity;
        const entityRender = document.getElementById(
          entityType + '_' + entityId
        );

        if (entityRender === null) {
          console.error('Entity not found in DOM:', entityType, entityId);
          return;
        }

        const entityWidth = Number(entityRender.style.width.replace('px', ''));
        const entityHeight = Number(
          entityRender.style.height.replace('px', '')
        );

        const cutOffHeight = TILE_SIZE * 2.1;
        const cutOffWidth = TILE_SIZE * 2.3;

        // Initially start right at the entity's position
        let startRow = entityRow * TILE_SIZE;
        const endRow = startRow + TILE_SIZE;

        // console.log('entityRender.style.width', entityRender.style.width);
        // console.log('entityRender.style.height', entityRender.style.height);
        // console.log('cutOffSize', cutOffHeight, cutOffWidth);

        // If the entity is bigger than 1 tile (whats seen on screen, the entity render size is usually bigger due to padding),
        // adjust the starting position to start at the top left corner of the entity
        if (entityHeight >= cutOffHeight) {
          startRow -= TILE_SIZE;
          // endRow += TILE_SIZE;
        }

        // Get the end row and column of the entity
        let startCol = entityCol * TILE_SIZE;
        let endCol = startCol + TILE_SIZE;

        // If the entity is bigger than 1 tile (whats seen on screen, the entity render size is usually bigger due to padding),
        // adjust the end position to end at the bottom right corner of the entity
        if (entityWidth >= cutOffWidth) {
          endCol += TILE_SIZE;
          startCol -= TILE_SIZE;
        }

        // Modify the alpha channel for a specific area
        for (let y = startRow; y < endRow; y++) {
          for (let x = startCol; x < endCol; x++) {
            const index = (y * imageData.width + x) * 4;

            // Only change the alpha channel if the tile is an overlapping wall (aka data[index], data[index + 1], data[index + 2] are all NOT 0)
            // data[index], data[index + 1], data[index + 2] are the RGB values of the pixel
            if (
              data[index] !== 0 &&
              data[index + 1] !== 0 &&
              data[index + 2] !== 0
            ) {
              data[index + 3] = 128; // Set alpha to 50% (128 out of 255)
            }
          }
        }
      });

      // Logic for hovered tiles
      // Modify the alpha channel for the hovered tile (if any)
      const [hoveredTileRow, hoveredTileCol] = hoveredTile ?? [-1, -1];

      // Skip if no tile is hovered
      if (hoveredTileRow === -1 || hoveredTileCol === -1) {
        // Do nothing if no tile is hovered
      } else {
        // Skip if no tile nearby is an obstacle (in this case, check for the 2 tiles below the entity)
        // console.log(hoveredTileRow, hoveredTileCol);
        if (
          roomTileMatrix[hoveredTileRow][hoveredTileCol] === TILE_TYPE.FLOOR &&
          ((hoveredTileRow + 1 < roomTileMatrix.length &&
            roomTileMatrix[hoveredTileRow + 1][hoveredTileCol] ===
              TILE_TYPE.OBSTACLE) ||
            (hoveredTileRow + 2 < roomTileMatrix.length &&
              roomTileMatrix[hoveredTileRow + 2][hoveredTileCol] ===
                TILE_TYPE.OBSTACLE))
        ) {
          // Modify the alpha channel for a specific area
          for (
            let y = hoveredTileRow * TILE_SIZE;
            y < hoveredTileRow * TILE_SIZE + TILE_SIZE;
            y++
          ) {
            for (
              let x = hoveredTileCol * TILE_SIZE;
              x < hoveredTileCol * TILE_SIZE + TILE_SIZE;
              x++
            ) {
              const index = (y * imageData.width + x) * 4;
              // Only change the alpha channel if the tile is an overlapping wall (aka data[index], data[index + 1], data[index + 2] are all NOT 0)
              if (
                data[index] !== 0 &&
                data[index + 1] !== 0 &&
                data[index + 2] !== 0
              ) {
                data[index + 3] = 128; // Set alpha to 50% (128 out of 255)
              }
            }
          }
        }
      }

      // Put the modified image data back on the canvas
      context.putImageData(imageData, 0, 0);
    };
  }, [
    canvasRef.current,
    grayscale,
    isRoomOver,
    wallArtFile,
    roomEntityPositions,
    hoveredTile,
    currentRoom,
  ]);

  return (
    <>
      <canvas
        id="room_obstacle_art"
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: 0,
          zIndex: 34,
        }}
        ref={canvasRef}
        width={TILE_SIZE * roomLength}
        height={TILE_SIZE * roomLength}
      ></canvas>
    </>
  );
};
