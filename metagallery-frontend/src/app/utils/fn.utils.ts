export const throttle = (fn: Function, wait: number) => {
  let time = Date.now();
  return function (...args: any[]) {
    if (time + wait - Date.now() < 0) {
      fn(...args);
      time = Date.now();
    }
  };
};
