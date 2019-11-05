import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export abstract class AbstractService {
  private readonly disposeS$ = new Subject<void>();
  protected readonly dispose$ = this.disposeS$.asObservable();

  dispose(): void {
    this.disposeS$.next();
    this.disposeS$.complete();
  }

  protected untilDisposed<T>(o: Observable<T>): Observable<T> {
    return o.pipe(takeUntil(this.dispose$));
  }
}
