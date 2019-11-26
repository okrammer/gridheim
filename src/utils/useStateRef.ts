import { useRef, useState } from "react";

export const useStateRef = <T>(initial: T): [() => T, (v: T) => void, T] => {
  const ref = useRef<T>(initial);
  const [state, setState] = useState(ref.current);
  const set = (v: T): void => {
    ref.current = v;
    setState(v);
  };
  const get = (): T => {
    return ref.current;
  };
  return [get, set, state];
};
