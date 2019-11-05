import { Observable } from "rxjs";
import { useEffect, useState } from "react";

export function useObservable<T>(
  observable$:
    | (() => Observable<T> | undefined | null)
    | Observable<T>
    | undefined
    | null,
  defaultValue: T
): T {
  const [observableState, setObservableState] = useState<T>(defaultValue);

  useEffect((): (() => void) | undefined => {
    if (!observable$) {
      return;
    }
    let toSubscribe: Observable<T> | undefined | null;
    if (typeof observable$ === "function") {
      toSubscribe = observable$();
    } else {
      toSubscribe = observable$;
    }

    if (toSubscribe) {
      const subscription = toSubscribe.subscribe(value => {
        setObservableState(value);
      });
      return (): void => subscription.unsubscribe();
    }
  }, [observable$]);

  return observableState;
}
