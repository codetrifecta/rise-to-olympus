export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const pick = <T>(arr: Array<T>) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
