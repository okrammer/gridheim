export type PropKeysOf<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export type PropsOf<T> = { [K in PropKeysOf<T>]: T[K] };
export type SomePropsOf<T> = Partial<PropsOf<T>>;
export type Dict<T> = { [key: string]: T };
