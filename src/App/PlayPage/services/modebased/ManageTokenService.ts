import { BattleMapService } from "../BattleMapService";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map, takeUntil, tap } from "rxjs/operators";
import { TokenType } from "../../../../model/TokenType";
import { AssetService } from "../AssetService";
import { is } from "../../../../utils/is";
import { AbstractModeBasedService } from "../../../../services/AbstractModeBasedService";
import { ModeBasedService } from "./ModeBasedService";

export type Mode =
  | "switch-token-type"
  | "add-token"
  | "remove-token"
  | "inactive";

export class ManageTokenService extends AbstractModeBasedService {
  readonly mode$S = new BehaviorSubject<Mode>("add-token");
  readonly mode$ = this.mode$S
    .asObservable()
    .pipe(tap(m => console.log("manageTokenMode", m)));

  private readonly modeCallbacks: { [T in Mode]: ModeBasedService | null } = {
    "switch-token-type": {
      activate: () => {
        this.battleMapService.setTokenSelectable(false);
        this.battleMapService.setSquareSelectable(false);
        this.battleMapService.selectSquare(null);
        this.battleMapService.selectToken(null);
      }
    },

    "add-token": {
      activate: deactivate$ => {
        this.battleMapService.setTokenSelectable(false);
        this.battleMapService.setSquareSelectable(true);
        this.battleMapService.selectSquare(null);
        this.battleMapService.selectToken(null);
        this.battleMapService.setTokenSize(this.tokenSizeS$.value);
        combineLatest([
          this.tokenType$,
          this.tokenLabel$,
          this.tokenSize$,
          this.battleMapService.selectedSquare$
        ])
          .pipe(takeUntil(deactivate$))
          .subscribe(([tokenType, tokenLabel, tokenSize, selectedSquare]) => {
            if (selectedSquare && tokenType && tokenLabel && tokenSize) {
              this.battleMapService.selectSquare(null);
              this.battleMapService.addToken(
                tokenType,
                tokenLabel,
                tokenSize,
                selectedSquare
              );
            }
          });

        deactivate$.subscribe({
          next: () => {
            this.battleMapService.setTokenSize(1);
          }
        });
      }
    },

    "remove-token": {
      activate: deactivate$ => {
        this.battleMapService.setTokenSelectable(true);
        this.battleMapService.setSquareSelectable(false);
        this.battleMapService.selectSquare(null);
        this.battleMapService.selectToken(null);
        combineLatest([
          this.tokenType$,
          this.tokenLabel$,
          this.battleMapService.selectedToken$
        ])
          .pipe(takeUntil(deactivate$))
          .subscribe(([tokenType, tokenLabel, selectedToken]) => {
            if (selectedToken && tokenType && tokenLabel) {
              this.battleMapService.removeSelectedToken();
            }
          });
      }
    },

    inactive: null
  };

  readonly isSwitchTokenType$ = this.mode$.pipe(map(is("switch-token-type")));

  private readonly tokenTypeS$ = new BehaviorSubject<TokenType>(
    this.assetService.tokenTypes[0]
  );
  readonly tokenType$ = this.tokenTypeS$.asObservable();

  private readonly tokenLabelS$ = new BehaviorSubject<string>(
    this.assetService.tokenLabels[0]
  );
  readonly tokenLabel$ = this.tokenLabelS$.asObservable();

  private readonly tokenSizeS$ = new BehaviorSubject<number>(1);
  readonly tokenSize$ = this.tokenSizeS$.asObservable();

  constructor(
    private readonly battleMapService: BattleMapService,
    private readonly assetService: AssetService
  ) {
    super();
  }

  onActivate(deactivate$: Observable<void>): void {
    ModeBasedService.controlServices(
      this.mode$.pipe(takeUntil(deactivate$)),
      this.modeCallbacks
    );

    deactivate$.subscribe({
      next: () => {
        this.mode$S.next("inactive");
      }
    });

    this.mode$S.next("add-token");
  }

  setTokenType(tokenType: TokenType): void {
    this.tokenTypeS$.next(tokenType);
  }

  get tokenType(): TokenType | null {
    return this.tokenTypeS$.value;
  }

  get tokenLabel(): string | null {
    return this.tokenLabelS$.value;
  }

  setTokenLabel(label: string): void {
    this.tokenLabelS$.next(label);
  }

  get tokenSize(): number {
    return this.tokenSizeS$.value;
  }

  setTokenSize(size: number): void {
    this.tokenSizeS$.next(size);
  }

  switchMode(mode: Mode): void {
    this.mode$S.next(mode);
  }
}
