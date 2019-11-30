import { BehaviorSubject, Observable } from "rxjs";
import { ModeBasedService } from "./modebased/ModeBasedService";
import { AbstractService } from "../../../services/AbstractService";
import { is } from "../../../utils/is";
import { map } from "rxjs/operators";

export type Mode =
  | "play"
  | "draw-background"
  | "draw-notes"
  | "manage-token"
  | "zoom";

export class ModeService extends AbstractService {
  private readonly modeS$ = new BehaviorSubject<Mode>(this.initalMode);
  readonly mode$ = this.modeS$.asObservable();

  constructor(
    private readonly initalMode: Mode,
    modeBasedServices: { [T in Mode]: ModeBasedService | null }
  ) {
    super();
    ModeBasedService.controlServices(
      this.untilDisposed(this.mode$),
      modeBasedServices
    );
  }

  switchMode(mode: Mode): void {
    this.modeS$.next(mode);
  }

  get mode(): Mode {
    return this.modeS$.value;
  }

  oneOf(...modes: Mode[]): Observable<boolean> {
    return this.mode$.pipe(map(is(...modes)));
  }
}
