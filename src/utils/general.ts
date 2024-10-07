export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Pick a random element from an array with uniform distribution.
 * @param arr Array to pick from.
 * @returns Random element from the array.
 */
export const pick = <T>(arr: Array<T>) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
