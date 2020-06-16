import { Dict } from "./types";

export function arrayToDict<T>(
  list: ReadonlyArray<T>,
  fn: (t: T) => string
): Readonly<Dict<T>> {
  return list.reduce((dict, value) => {
    dict[fn(value)] = value;
    return dict;
  }, {} as Dict<T>);
}
