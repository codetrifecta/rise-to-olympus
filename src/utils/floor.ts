import {
  BASE_ROOM,
  ROOM_TARTARUS_BOSS,
  ROOM_TARTARUS_ENEMY_OPTIONS,
  ROOM_TARTARUS_START,
  ROOM_TYPE,
  ROOMS_TARTARUS_COMMON,
} from '../constants/room';
import { IRoom, Item } from '../types';
import { scaleEnemy } from './entity';
import { pick } from './general';
import { getScaledItems } from './item';

/**
 * Convert a floor to a string array representation.
 * @param floor 2D array of ROOM_TYPE representing the room
 * @returns String array of the floor where
 *          null rooms are represented by '#',
 *          common rooms are represented by '.',
 *          start room is represented by 'S',
 *          boss room is represented by 'B',
 *          miniboss room is represented by 'M',
 *          shop room is represented by '$',
 *          and all other rooms are represented by 'X',
 *          each separated by a space.
 */
export const floorToStringArray = (floor: ROOM_TYPE[][]): string[] => {
  const floorString: string[] = [];
  for (let row = 0; row < floor.length; row++) {
    let rowString = ' ';
    for (let col = 0; col < floor[row].length; col++) {
      if (floor[row][col] === ROOM_TYPE.NULL) {
        rowString += '# ';
      } else if (floor[row][col] === ROOM_TYPE.COMMON) {
        rowString += '. ';
      } else if (floor[row][col] === ROOM_TYPE.START) {
        rowString += 'S ';
      } else if (floor[row][col] === ROOM_TYPE.BOSS) {
        rowString += 'B ';
      } else if (floor[row][col] === ROOM_TYPE.MINIBOSS) {
        rowString += 'M ';
      } else if (floor[row][col] === ROOM_TYPE.SHOP) {
        rowString += '$ ';
        // } else if (floor[row][col] == ROOM_TYPE.INTERMEDIATE) {
        //   rowString += '. ';
      } else {
        rowString += 'X ';
      }
    }
    floorString.push(rowString);
  }
  return floorString;
};

/**
 * Convert a floor to a string array representation.
 * @param floor 2D array of ROOM_TYPE representing the room
 * @returns String array of the floor where
 *          null rooms are represented by '#',
 *          common rooms are represented by '.',
 *          start room is represented by 'S',
 *          boss room is represented by 'B',
 *          miniboss room is represented by 'M',
 *          shop room is represented by '$',
 *          and all other rooms are represented by 'X',
 *          each separated by a space.
 */
export const floorRoomsToStringArray = (floorRooms: IRoom[][]): string[] => {
  const floorRoomsString: string[] = [];
  for (let row = 0; row < floorRooms.length; row++) {
    let rowString = ' ';
    for (let col = 0; col < floorRooms[row].length; col++) {
      if (floorRooms[row][col].type === ROOM_TYPE.NULL) {
        rowString += '# ';
      } else if (floorRooms[row][col].type === ROOM_TYPE.COMMON) {
        rowString += '. ';
      } else if (floorRooms[row][col].type === ROOM_TYPE.START) {
        rowString += 'S ';
      } else if (floorRooms[row][col].type === ROOM_TYPE.BOSS) {
        rowString += 'B ';
      } else if (floorRooms[row][col].type === ROOM_TYPE.MINIBOSS) {
        rowString += 'M ';
      } else if (floorRooms[row][col].type === ROOM_TYPE.SHOP) {
        rowString += '$ ';
        // } else if (floor[row][col] == ROOM_TYPE.INTERMEDIATE) {
        //   rowString += '. ';
      } else {
        rowString += 'X ';
      }
    }
    floorRoomsString.push(rowString);
  }
  return floorRoomsString;
};

/**
 * Function to determine the best path from start to end in a 5x5 grid, given as parameters.
 * @param floor ROOM_TYPE type, 2d 5x5 matrix represemting the floor layout.
 * @param startCoord [number, number] type, start coordinate in order of row -> column.
 * @param goalCoord [number, number] type, goal coordinate in order of row -> column.
 * @param phase number type, determines if the function is finding the path between Start and Boss (1), Start and Intermediate (2),
 *              Intermediate and Boss (3), Intermediate (Path) and Miniboss (4), or Intermediate (Path) and Shop (5)
 */
export function generatePath(
  floor: ROOM_TYPE[][],
  startCoord: [number, number],
  goalCoord: [number, number],
  phase: number
) {
  // Initialize directions
  const dir: [number, number][] = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
  ]; // (vertical is dir[0], horizontal is dir[1])

  // Initialize frontier queue
  const frontier_queue: [number, number][] = [];
  frontier_queue.push(startCoord); // Push start coordinate to frontier

  // Initialize explored dictionary
  const explored = new Map<string, [number, number]>();
  explored.set(`${startCoord[0]},${startCoord[1]}`, [-1, -1]); // Add start coordinate to explored dict

  // Explore room
  while (frontier_queue.length > 0) {
    // While frontier isnt empty
    const current: [number, number] | undefined = frontier_queue.shift(); // Get current from frontier

    if (current === undefined) {
      break;
    }

    // Get neighbors from current
    for (let i = 0; i < dir.length; i++) {
      const row: number = current[0] + dir[i][0]; // Row
      const col: number = current[1] + dir[i][1]; // Col

      // If row and col are valid and within the floor space, and isnt in explored, then add to frontier and explored
      if (
        row >= 0 &&
        col >= 0 &&
        row < floor.length &&
        col < floor.length &&
        explored.has(`${row},${col}`) === false
      ) {
        frontier_queue.push([row, col]); // Push [row, col] location to frontier
        explored.set(`${row},${col}`, current); // Add current to explored
        // console.log(explored)
      }
    }
  }
  // console.log(explored)

  // Find path
  const goal: [number, number] = goalCoord; // Intialize goal coordinates
  let current: [number, number] = goal; // Set current position as the goal
  // const pathway: [number, number][] = []; // Initialize pathway array (from goal to Start)

  // Start and Intermediate Rooms will always be starting rooms.
  // Boss, Miniboss and Shop Rooms will always be goal rooms.
  // Start will only always connect to either Boss or Intermediate Rooms
  // Intermediate Rooms will only always connect to Boss, Miniboss or Shop rooms.
  switch (phase) {
    // Start Room -> Boss Room
    case 1: {
      // Until we reach back to the Start room, keep adding to pathway
      while (floor[current[0]][current[1]] !== ROOM_TYPE.START) {
        // While current room is not Start room
        // pathway.push(current); // Push current coordinate to pathway list
        if (
          // Ignore if current room is Boss Room
          floor[current[0]][current[1]] == ROOM_TYPE.BOSS
        ) {
          const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
          if (prevPathLocation !== undefined) {
            current = prevPathLocation; // Update new current
          }
          continue;
        } else {
          floor[current[0]][current[1]] = ROOM_TYPE.COMMON; // Assign this room as Common room (between Start, Boss, Mini Boss and Shop rooms)
        }

        const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
        if (prevPathLocation !== undefined) {
          current = prevPathLocation; // Update new current
        }
      }
      // pathway.reverse(); // Reverse order of path from beginning to goal/end

      break;
    }

    // Start Room -> Intermediate Room
    case 2: {
      // Until we reach back to the Start room, keep adding to pathway
      while (floor[current[0]][current[1]] !== ROOM_TYPE.START) {
        // While current room is not Start room
        // pathway.push(current); // Push current coordinate to pathway list
        if (
          // Ignore if current room is Intermediate or Boss Room
          floor[current[0]][current[1]] == ROOM_TYPE.INTERMEDIATE ||
          floor[current[0]][current[1]] == ROOM_TYPE.BOSS
        ) {
          const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
          if (prevPathLocation !== undefined) {
            current = prevPathLocation; // Update new current
          }
          continue;
        } else {
          floor[current[0]][current[1]] = ROOM_TYPE.COMMON; // Assign this room as Common room (between Start, Boss, Mini Boss and Shop rooms)
        }

        const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
        if (prevPathLocation !== undefined) {
          current = prevPathLocation; // Update new current
        }
      }
      // pathway.reverse(); // Reverse order of path from beginning to goal/end

      break;
    }

    // Intermediate Room -> Boss Room
    case 3: {
      // Until we reach back to the Intermediate room, keep adding to pathway
      while (floor[current[0]][current[1]] !== ROOM_TYPE.INTERMEDIATE) {
        // While current room is not Intermediate room
        // pathway.push(current); // Push current coordinate to pathway list
        if (
          // Ignore if current room is Boss or Start Room
          floor[current[0]][current[1]] == ROOM_TYPE.BOSS ||
          floor[current[0]][current[1]] == ROOM_TYPE.START
        ) {
          const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
          if (prevPathLocation !== undefined) {
            current = prevPathLocation; // Update new current
          }
          continue;
        } else {
          floor[current[0]][current[1]] = ROOM_TYPE.COMMON; // Assign this room as Common room (between Start, Boss, Mini Boss and Shop rooms)
        }

        const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
        if (prevPathLocation !== undefined) {
          current = prevPathLocation; // Update new current
        }
      }
      // pathway.reverse(); // Reverse order of path from beginning to goal/end

      break;
    }

    // Intermediate Room -> Miniboss Room
    case 4: {
      // Until we reach back to the Intermediate room, keep adding to pathway
      while (floor[current[0]][current[1]] !== ROOM_TYPE.INTERMEDIATE) {
        // While current room is not Intermediate room
        // pathway.push(current); // Push current coordinate to pathway list
        if (
          // Ignore if current room is Miniboss, Boss, Start or Shop Room
          floor[current[0]][current[1]] == ROOM_TYPE.MINIBOSS ||
          floor[current[0]][current[1]] == ROOM_TYPE.START ||
          floor[current[0]][current[1]] == ROOM_TYPE.BOSS ||
          floor[current[0]][current[1]] == ROOM_TYPE.SHOP
        ) {
          const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
          if (prevPathLocation !== undefined) {
            current = prevPathLocation; // Update new current
          }
          continue;
        } else {
          floor[current[0]][current[1]] = ROOM_TYPE.COMMON; // Assign this room as Common room (between Start, Boss, Mini Boss and Shop rooms)
        }

        const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
        if (prevPathLocation !== undefined) {
          current = prevPathLocation; // Update new current
        }
      }
      // pathway.reverse(); // Reverse order of path from beginning to goal/end

      break;
    }

    // Intermediate Room -> Shop Room
    case 5: {
      // Until we reach back to the Intermediate room, keep adding to pathway
      while (floor[current[0]][current[1]] !== ROOM_TYPE.INTERMEDIATE) {
        // While current room is not Intermediate room
        // pathway.push(current); // Push current coordinate to pathway list
        if (
          // Ignore if current room is Shop, Miniboss, Start or Boss Room
          floor[current[0]][current[1]] == ROOM_TYPE.SHOP ||
          floor[current[0]][current[1]] == ROOM_TYPE.MINIBOSS ||
          floor[current[0]][current[1]] == ROOM_TYPE.START ||
          floor[current[0]][current[1]] == ROOM_TYPE.BOSS
        ) {
          const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
          if (prevPathLocation !== undefined) {
            current = prevPathLocation; // Update new current
          }
          continue;
        } else {
          floor[current[0]][current[1]] = ROOM_TYPE.COMMON; // Assign this room as Common room (between Start, Boss, Mini Boss and Shop rooms)
        }

        const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
        if (prevPathLocation !== undefined) {
          current = prevPathLocation; // Update new current
        }
      }
      // pathway.reverse(); // Reverse order of path from beginning to goal/end

      break;
    }
  }

  // console.log(floor)
}

/**
 * Function to generate a randomized 5x5 floor path including the Start, Boss, Mini Boss, and Shop rooms as destinations.
 * @param start Boolean, True means start at middle of bottom row (Stages 1 & 3), False means start at middle of middle row (Stage 2).
 * @returns 2D array of ROOM_TYPE
 */
export function generateFloorPlan(start: boolean): ROOM_TYPE[][] {
  // Initialize Floor
  const floor: ROOM_TYPE[][] = new Array(5); // Generate a 5x5 floor matrix
  for (let row = 0; row < 5; row++) {
    // Fill each tile with NULL (0)
    floor[row] = new Array(5).fill(ROOM_TYPE.NULL);
  }

  let startCoord: [number, number];
  let bossCoord: [number, number];
  let intermediateCoord: [number, number];

  // Initialize Start and Boss rooms
  let bossRow = Math.floor(Math.random() * 5);
  const bossCol = Math.floor(Math.random() * 5);
  const stage2Col = Math.floor(Math.random() * 2); // Which column (left or right) the boss will spawn in
  if (start) {
    // Start at middle bottom row, Boss at top row
    floor[4][2] = ROOM_TYPE.START; // Initialize Start
    startCoord = [4, 2];
    floor[0][bossCol] = ROOM_TYPE.BOSS; // Initialize Boss
    bossCoord = [0, bossCol];
  } else {
    // Start at the middle of floor, Boss at side columns
    // Initialize Start
    floor[2][2] = ROOM_TYPE.START;
    startCoord = [2, 2];

    // Initialize Boss
    while (bossRow == 2) {
      // If Boss room is directly two tiles to the left or right of Start, rng again
      bossRow = Math.floor(Math.random() * 5);
    }

    if (stage2Col == 0) {
      // Left side
      floor[bossRow][0] = ROOM_TYPE.BOSS;
      bossCoord = [bossRow, 0];
    } else {
      // Right side
      floor[bossRow][4] = ROOM_TYPE.BOSS;
      bossCoord = [bossRow, 4];
    }
  }
  // console.log(floor);
  // console.log(floorToStringArray(floor));

  // Get path from Start to Boss Room.
  // Get a random boolean to determine existance of Intermediate Room between Start and Boss Rooms.
  // const simple: boolean = Boolean(Math.floor(Math.random() * 2)); // Commented out for now.
  const simple = false;

  if (simple) {
    // If there is no Intermediate Room.
    generatePath(floor, startCoord, bossCoord, 1);
  } else {
    // If there is an Intermediate Room.
    let intermediateRow = Math.floor(Math.random() * 5);
    let intermediateCol = Math.floor(Math.random() * 5);

    // While Intermediate room coordinates overlap with either Start or Boss Rooms (not NULL ROOM_TYPE), RNG again.
    while (floor[intermediateRow][intermediateCol] !== ROOM_TYPE.NULL) {
      intermediateRow = Math.floor(Math.random() * 5);
      intermediateCol = Math.floor(Math.random() * 5);
    }
    floor[intermediateRow][intermediateCol] = ROOM_TYPE.INTERMEDIATE; // Temporarily assign this room as Intermediate Room.
    intermediateCoord = [intermediateRow, intermediateCol];

    generatePath(floor, startCoord, intermediateCoord, 2);
    generatePath(floor, intermediateCoord, bossCoord, 3);
    floor[intermediateRow][intermediateCol] = ROOM_TYPE.COMMON; // Unassign this room as Intermediate Room.
  }
  // console.log(floorToStringArray(floor));

  // Get path from Intermediate to Miniboss Room
  // Determine which rooms are Common Rooms
  const commons: [number, number][] = [];
  for (let i = 0; i < floor.length; i++) {
    for (let j = 0; j < floor.length; j++) {
      if (floor[i][j] === ROOM_TYPE.COMMON) {
        commons.push([i, j]);
      }
    }
  }

  // console.log(floor, commons);

  // Get an Intermediate Room from one of the Common Rooms
  const intermediate = Math.floor(Math.random() * commons.length);
  floor[commons[intermediate][0]][commons[intermediate][1]] =
    ROOM_TYPE.INTERMEDIATE; // Temporarily assign this room as Intermediate Room.
  intermediateCoord = [commons[intermediate][0], commons[intermediate][1]];

  // Initialize Miniboss Room
  // Determine which rooms are NULL Rooms in the current state of the Floor
  const mbNulls: [number, number][] = [];
  for (let i = 0; i < floor.length; i++) {
    for (let j = 0; j < floor.length; j++) {
      // If assigned tile is a NULL ROOM_TYPE
      if (floor[i][j] === ROOM_TYPE.NULL) {
        // If Right adjacent tile is within bounds
        if (j + 1 < 5) {
          // If Right adjacent tile is NOT a COMMON and NOT NULL ROOM_TYPE
          if (
            floor[i][j + 1] !== ROOM_TYPE.COMMON &&
            floor[i][j + 1] !== ROOM_TYPE.NULL
          ) {
            continue;
          }
        }

        // If Left adjacent tile is within bounds
        if (j - 1 >= 0) {
          // If Left adjacent tile is NOT a COMMON and NOT NULL ROOM_TYPE
          if (
            floor[i][j - 1] !== ROOM_TYPE.COMMON &&
            floor[i][j - 1] !== ROOM_TYPE.NULL
          ) {
            continue;
          }
        }

        // If Down adjacent tile is within bounds
        if (i + 1 < 5) {
          // If Down adjacent tile is NOT a COMMON and NOT NULL ROOM_TYPE
          if (
            floor[i + 1][j] !== ROOM_TYPE.COMMON &&
            floor[i + 1][j] !== ROOM_TYPE.NULL
          ) {
            continue;
          }
        }

        // If Up adjacent tile is within bounds
        if (i - 1 >= 0) {
          // If Up adjacent tile is NOT a COMMON and NOT NULL ROOM_TYPE
          if (
            floor[i - 1][j] !== ROOM_TYPE.COMMON &&
            floor[i - 1][j] !== ROOM_TYPE.NULL
          ) {
            continue;
          }
        }

        mbNulls.push([i, j]);
      }
    }
  }
  // console.log(mbNulls);
  // Get a MiniBoss Room from one of the NULL Rooms and assign it on the Floor
  const mbNull = Math.floor(Math.random() * mbNulls.length);
  const miniBossRow = mbNulls[mbNull][0];
  const miniBossCol = mbNulls[mbNull][1];
  // console.log(miniBossRow);
  // console.log(miniBossCol);

  floor[miniBossRow][miniBossCol] = ROOM_TYPE.MINIBOSS;
  const minibossCoord: [number, number] = [miniBossRow, miniBossCol];

  generatePath(floor, intermediateCoord, minibossCoord, 4);
  floor[commons[intermediate][0]][commons[intermediate][1]] = ROOM_TYPE.COMMON; // Unassign this room as Intermediate Room.

  // FROM HERE ON, THE CODE IS COMMENTED OUT BECAUSE IT IS NOT NEEDED FOR THE CURRENT IMPLEMENTATION.
  // Unassign miniboss room as Common Room
  floor[miniBossRow][miniBossCol] = ROOM_TYPE.COMMON; // Unassign this room as MiniBoss Room.
  // console.log(floorToStringArray(floor));

  // // Get path from Intermediate to Shop Room
  // // Determine again which rooms are Common Rooms
  // for (let i = 0; i < floor.length; i++) {
  //   for (let j = 0; j < floor.length; j++) {
  //     if (floor[i][j] === ROOM_TYPE.COMMON) {
  //       commons.push([i, j]);
  //     }
  //   }
  // }

  // // Get an Intermediate Room from one of the Common Rooms
  // intermediate = Math.floor(Math.random() * commons.length);
  // floor[commons[intermediate][0]][commons[intermediate][1]] =
  //   ROOM_TYPE.INTERMEDIATE; // Temporarily assign this room as Intesrmediate Room.
  // intermediateCoord = [commons[intermediate][0], commons[intermediate][1]];

  // // Initialize Shop Room
  // // Determine again which rooms are NULL Rooms in the current state of the Floor
  // const shNulls: [number, number][] = [];
  // for (let i = 0; i < floor.length; i++) {
  //   for (let j = 0; j < floor.length; j++) {
  //     // If assigned tile is a NULL ROOM_TYPE
  //     if (floor[i][j] === ROOM_TYPE.NULL) {
  //       // If Right adjacent tile is within bounds
  //       if (j + 1 < 5) {
  //         // If Right adjacent tile is NOT a COMMON and NOT NULL ROOM_TYPE
  //         if (
  //           floor[i][j + 1] !== ROOM_TYPE.COMMON &&
  //           floor[i][j + 1] !== ROOM_TYPE.NULL
  //         ) {
  //           continue;
  //         }
  //       }

  //       // If Left adjacent tile is within bounds
  //       if (j - 1 >= 0) {
  //         // If Left adjacent tile is NOT a COMMON and NOT NULL ROOM_TYPE
  //         if (
  //           floor[i][j - 1] !== ROOM_TYPE.COMMON &&
  //           floor[i][j - 1] !== ROOM_TYPE.NULL
  //         ) {
  //           continue;
  //         }
  //       }

  //       // If Down adjacent tile is within bounds
  //       if (i + 1 < 5) {
  //         // If Down adjacent tile is NOT a COMMON and NOT NULL ROOM_TYPE
  //         if (
  //           floor[i + 1][j] !== ROOM_TYPE.COMMON &&
  //           floor[i + 1][j] !== ROOM_TYPE.NULL
  //         ) {
  //           continue;
  //         }
  //       }

  //       // If Up adjacent tile is within bounds
  //       if (i - 1 >= 0) {
  //         // If Up adjacent tile is NOT a COMMON and NOT NULL ROOM_TYPE
  //         if (
  //           floor[i - 1][j] !== ROOM_TYPE.COMMON &&
  //           floor[i - 1][j] !== ROOM_TYPE.NULL
  //         ) {
  //           continue;
  //         }
  //       }

  //       shNulls.push([i, j]);
  //     }
  //   }
  // }
  // console.log(shNulls);

  // // Get a Shop Room from one of the NULL Rooms and assign it on the Floor
  // const shNull = Math.floor(Math.random() * shNulls.length);
  // const shopRow = shNulls[shNull][0];
  // const shopCol = shNulls[shNull][1];
  // // console.log(shopRow);
  // // console.log(shopCol);

  // floor[shopRow][shopCol] = ROOM_TYPE.SHOP;
  // const shopCoord: [number, number] = [shopRow, shopCol];

  // generatePath(floor, intermediateCoord, shopCoord, 5);
  // floor[commons[intermediate][0]][commons[intermediate][1]] = ROOM_TYPE.COMMON; // Unassign this room as Intermediate Room.
  // // console.log(floorToStringArray(floor));
  // // console.log(floor);

  return floor;
}

/**
 * Function to determine the existence of adjacent rooms in
 * @param floor ROOM_TYPE type, 2d 5x5 matrix represemting the floor layout.
 * @returns A 2d 5x5 matrix of IRoom type.
 */
export function connectAdjacentRooms(floor: ROOM_TYPE[][]): IRoom[][] {
  // Initialize directions
  const dir: [number, number][] = [
    [0, 1], // East
    [0, -1], // West
    [1, 0], // South
    [-1, 0], // North
  ]; // (vertical is dir[0], horizontal is dir[1])

  // Initialize IRoom variable (adjRooms.type is automatically assigned during initialization with the values of 'floor', which is a
  // 'ROOM_TYPE' type)
  const adjRooms: IRoom[][] = floor.map((row) =>
    row.map((roomType) => {
      const adjRoom: IRoom = {
        ...BASE_ROOM,
        type: roomType,
      };
      return adjRoom;
    })
  );

  // Check for each room, whether it has adjacent rooms in each cardinal direction.
  for (let row = 0; row < floor.length; row++) {
    for (let col = 0; col < floor.length; col++) {
      // Skip if the room is a NULL room.
      if (adjRooms[row][col].type === ROOM_TYPE.NULL) {
        continue;
      }

      // Check Right/East
      if (
        col + dir[0][1] < floor.length && // The room to the right/east is within the bounds of the grid
        adjRooms[row + dir[0][0]][col + dir[0][1]].type !== ROOM_TYPE.NULL // The room isn't ROOM_TYPE NULL.
      ) {
        adjRooms[row][col].eastDoor = true;
      }

      // Check Left/West
      if (
        col + dir[1][1] >= 0 && // The room to the left/west is within the bounds of the grid
        adjRooms[row + dir[1][0]][col + dir[1][1]].type !== ROOM_TYPE.NULL // The room isn't ROOM_TYPE NULL.
      ) {
        adjRooms[row][col].westDoor = true;
      }

      // Check Down/South
      if (
        row + dir[2][0] < floor.length && // The room down/south is within the bounds of the grid
        adjRooms[row + dir[2][0]][col + dir[2][1]].type !== ROOM_TYPE.NULL // The room isn't ROOM_TYPE NULL.
      ) {
        adjRooms[row][col].southDoor = true;
      }

      // Check Up/North
      if (
        row + dir[3][0] >= 0 && // The room up/north is within the bounds of the grid
        adjRooms[row + dir[3][0]][col + dir[3][1]].type !== ROOM_TYPE.NULL // The room isn't ROOM_TYPE NULL.
      ) {
        adjRooms[row][col].northDoor = true;
      }

      // adjRooms[row][col].explored = true; // Room has been explored.
    }
  }

  return adjRooms;
}

export const getPathsFromStart = (
  rooms: IRoom[][],
  startCoord: [number, number]
): Map<string, [number, number][]> => {
  const dir: [number, number][] = [
    [0, 1], // Right
    [0, -1], // Left
    [1, 0], // Down
    [-1, 0], // Up
  ]; // (vertical is dir[0], horizontal is dir[1])

  const path_dict = new Map<string, [number, number][]>(); // Initialize path dictionary

  const frontierQueue: [number, number][] = [];
  const explored = new Map<string, [number, number]>();

  frontierQueue.push(startCoord);
  explored.set(`${startCoord[0]},${startCoord[1]}`, [-1, -1]);

  while (frontierQueue.length > 0) {
    const current: [number, number] | undefined = frontierQueue.shift();

    if (current === undefined) {
      break;
    }

    for (let i = 0; i < dir.length; i++) {
      const row: number = current[0] + dir[i][0];
      const col: number = current[1] + dir[i][1];

      if (
        row >= 0 &&
        col >= 0 &&
        row < rooms.length &&
        col < rooms.length &&
        (rooms[row][col].type === ROOM_TYPE.COMMON ||
          rooms[row][col].type === ROOM_TYPE.BOSS) &&
        explored.has(`${row},${col}`) === false
      ) {
        frontierQueue.push([row, col]);
        explored.set(`${row},${col}`, current);
      }
    }
  }

  // Find path
  const goals: [number, number][] = []; // Intialize goal coordinates

  // Get goal coordinates
  for (let row = 0; row < rooms.length; row++) {
    for (let col = 0; col < rooms[row].length; col++) {
      // If row and col are player location, skip
      if (startCoord[0] == row && startCoord[1] == col) {
        continue;
      }

      // If row and col indicate a floor tile, push to goal
      if (
        rooms[row][col].type == ROOM_TYPE.COMMON ||
        rooms[row][col].type === ROOM_TYPE.BOSS
      ) {
        goals.push([row, col]);
      }
    }
  }

  for (const goal of goals) {
    // While goal is not empty
    let current: [number, number] = goal; // Set current position as the goal
    const pathway: [number, number][] = []; // Initialize pathway array (from goal to player)

    // Until we reach back to the player location, keep adding to pathway
    while (current[0] !== startCoord[0] || current[1] !== startCoord[1]) {
      // Check if the current location is an explored location
      if (explored.get(`${current[0]},${current[1]}`) === undefined) {
        break;
      }

      pathway.push(current); // Push current coordinate to pathway list
      const prevPathLocation = explored.get(`${current[0]},${current[1]}`);
      if (prevPathLocation !== undefined) {
        current = prevPathLocation; // Update new current
      }
    }

    pathway.reverse(); // Reverse order of path from beginning to goal/end

    path_dict.set(`${goal[0]},${goal[1]}`, pathway);
  }

  return path_dict;
};

export const generateFloorRoomsAndChestItems = (): [
  IRoom[][],
  Map<string, Item[]>,
] => {
  const floorPlan = generateFloorPlan(true);
  const connectedFloor = connectAdjacentRooms(floorPlan);

  let roomsQueue: IRoom[] = [...ROOMS_TARTARUS_COMMON];

  // Shuffle the roomsQueue
  for (let i = 0; i < ROOMS_TARTARUS_COMMON.length; i++) {
    const randomIndex = Math.floor(
      Math.random() * (ROOMS_TARTARUS_COMMON.length - 1)
    );
    const temp = roomsQueue[i];
    roomsQueue[i] = roomsQueue[randomIndex];
    roomsQueue[randomIndex] = temp;
  }

  // Randomize enemies and enemy placements in each room
  roomsQueue = roomsQueue.map((room) => {
    const enemyOption = pick(ROOM_TARTARUS_ENEMY_OPTIONS[room.id]);
    const { enemies, enemyPositions } = enemyOption;

    return {
      ...room,
      enemies,
      roomEntityPositions: enemyPositions,
    };
  });

  // Assign rooms to the floor
  let roomId = 10;
  let itemId = 0;
  // Start position
  let startPosition: [number, number] = [0, 0];
  for (let r = 0; r < connectedFloor.length; r++) {
    for (let c = 0; c < connectedFloor[r].length; c++) {
      if (connectedFloor[r][c].type === ROOM_TYPE.START) {
        startPosition = [r, c];
        break;
      }
    }
  }

  const pathsFromStart = getPathsFromStart(connectedFloor, startPosition);

  const roomChestItems = new Map<string, Item[]>();

  const filledFloor = connectedFloor.map((row, r) =>
    row.map((room, c) => {
      const roomPosition: [number, number] = [r, c];

      if (room.type === ROOM_TYPE.START) {
        const startRoom: IRoom = {
          ...ROOM_TARTARUS_START,
          id: roomId++,
          position: roomPosition,
          northDoor: room.northDoor,
          southDoor: room.southDoor,
          eastDoor: room.eastDoor,
          westDoor: room.westDoor,
        };

        const newItems = getScaledItems(0).map((item) => {
          return { ...item, id: itemId++ };
        });

        roomChestItems.set(`${r},${c}`, newItems);

        return startRoom;
      } else if (room.type === ROOM_TYPE.COMMON) {
        const roomFromQueue = roomsQueue.shift();
        if (roomFromQueue === undefined) {
          console.error('generateFloorRooms: No more rooms in queue');
          return room;
        }
        roomsQueue.push(roomFromQueue);

        const pathFromStart = pathsFromStart.get(`${r},${c}`);

        let roomDifficulty = 0;
        if (pathFromStart !== undefined) {
          roomDifficulty = pathFromStart.length - 1;
        }

        const scaledEnemies = roomFromQueue.enemies.map((enemy) => {
          return {
            ...scaleEnemy(enemy.presetID, roomDifficulty),
            id: enemy.id,
          };
        });

        const newItems = getScaledItems(roomDifficulty).map((item) => {
          return { ...item, id: itemId++ };
        });

        roomChestItems.set(`${r},${c}`, newItems);

        return {
          ...room,
          id: roomId++,
          isCleared: false,
          // isKnown: true,
          position: roomPosition,
          roomTileMatrix: roomFromQueue.roomTileMatrix,
          enemies: scaledEnemies,
          roomEntityPositions: roomFromQueue.roomEntityPositions,
          artBackground: roomFromQueue.artBackground,
          artForeground: roomFromQueue.artForeground,
        };
      } else if (room.type === ROOM_TYPE.BOSS) {
        const tartarusBossRoom = { ...ROOM_TARTARUS_BOSS };

        const pathFromStart = pathsFromStart.get(`${r},${c}`);

        let roomDifficulty = 0;
        if (pathFromStart !== undefined) {
          roomDifficulty = pathFromStart.length - 1;
        }

        const scaledEnemies = tartarusBossRoom.enemies.map((enemy) => {
          return {
            ...scaleEnemy(enemy.presetID, roomDifficulty),
            id: enemy.id,
          };
        });

        // console.log('boss room enemies', scaledEnemies);

        const newItems = getScaledItems(roomDifficulty).map((item) => {
          return { ...item, id: itemId++ };
        });

        roomChestItems.set(`${r},${c}`, newItems);

        return {
          ...room,
          id: roomId++,
          isCleared: false,
          // isKnown: true,
          position: roomPosition,
          roomTileMatrix: tartarusBossRoom.roomTileMatrix,
          enemies: scaledEnemies,
          roomEntityPositions: tartarusBossRoom.roomEntityPositions,
          artBackground: tartarusBossRoom.artBackground,
          artForeground: tartarusBossRoom.artForeground,
        };
      } else if (room.type === ROOM_TYPE.NULL) {
        return {
          ...room,
          id: -1,
          position: roomPosition,
        };
      } else {
        return {
          ...room,
          position: roomPosition,
        };
      }
    })
  );

  return [filledFloor, roomChestItems];
};
