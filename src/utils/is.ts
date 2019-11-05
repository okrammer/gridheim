export function is<T, R extends T>(...isEqualToOneOf: R[]): (v: T) => boolean {
  return value => isEqualToOneOf.some(i => i === value);
}
