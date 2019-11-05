import { BehaviorSubject, Observable } from "rxjs";
import { ModeBasedService } from "../App/PlayApp/services/modebased/ModeBasedService";
import { AbstractService } from "./AbstractService";

export abstract class AbstractModeBasedService extends AbstractService
  implements ModeBasedService {
  private readonly activeS$ = new BehaviorSubject(false);
  readonly active$ = this.activeS$.asObservable();

  activate(onDeactivate$: Observable<void>): void {
    this.onActivate(onDeactivate$);
    onDeactivate$.subscribe({
      next: () => this.activeS$.next(false)
    });
    this.activeS$.next(true);
  }

  abstract onActivate(onDeactivate$: Observable<void>): void;

  get active(): boolean {
    return this.activeS$.value;
  }
}
