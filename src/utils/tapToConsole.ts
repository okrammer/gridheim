import { tap } from "rxjs/operators";
import { MonoTypeOperatorFunction } from "rxjs";

export const tapToConsole = <T>(
  message: string
): MonoTypeOperatorFunction<T> => {
  return tap(value => console.log(message, { value }));
};
