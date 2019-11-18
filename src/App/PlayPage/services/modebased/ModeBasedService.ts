import { Observable, Subject } from "rxjs";

export interface ModeBasedService {
  activate(onDeactivate: Observable<void>): void;
}

export class ModeBasedService {
  static controlServices<T extends string>(
    mode$: Observable<T>,
    services: { [K in T]: ModeBasedService | null }
  ): void {
    let disposeSubject: Subject<void> | null = null;
    const disposeLastState = (): void => {
      if (disposeSubject) {
        disposeSubject.next();
        disposeSubject.complete();
        disposeSubject = null;
      }
    };
    mode$.subscribe({
      next: mode => {
        disposeLastState();
        if (mode) {
          const service = services[mode];
          if (service) {
            disposeSubject = new Subject<void>();
            service.activate(disposeSubject);
          }
        }
      },
      complete: () => {
        console.log("mode based complete");
        disposeLastState();
      },
      error: () => {
        disposeLastState();
      }
    });
  }
}
