import { immerable } from "immer";

export function Immerable(): ClassDecorator {
  return (target: any) => {
    target[immerable] = true;
  };
}
