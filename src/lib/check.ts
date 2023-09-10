export function check<T>(val: T | undefined | null, message?: string): T {
  if (val === undefined || val === null || val === "") {
    throw new Error(`Check failed. ${message}`);
  }
  return val;
}
