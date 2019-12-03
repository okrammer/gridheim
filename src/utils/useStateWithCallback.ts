import { Dispatch, SetStateAction, useState } from "react";

export const useStateWithCallback = <T>(
  initialState: T | (() => T),
  changeCallback: (value: T) => void
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialState);

  const setter: Dispatch<SetStateAction<T>> = (
    value: T | ((old: T) => T)
  ): void => {
    if (typeof value === "function") {
      let newValue: T | null = null;
      setState(
        (old: T): T => {
          const newValue = (value as Function)(old);
          return newValue;
        }
      );
      changeCallback(newValue!);
    } else {
      setState(value);
      changeCallback(value);
    }
  };

  return [state, setter];
};
