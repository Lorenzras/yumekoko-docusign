

/**
 * Deeply turn all of object's keys optional
 * Author: Ras
 */
type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;
