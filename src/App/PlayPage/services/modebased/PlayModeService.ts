import { BattleMapService } from "../BattleMapService";
import { combineLatest, Observable } from "rxjs";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";
import { AbstractModeBasedService } from "../../../../services/AbstractModeBasedService";

export class PlayModeService extends AbstractModeBasedService {
  constructor(private readonly battleMapService: BattleMapService) {
    super();
  }

  onActivate(onDeactivate$: Observable<void>): void {
    this.battleMapService.setTokenSelectable(true);
    this.battleMapService.setSquareSelectable(true);
    this.battleMapService.selectSquare(null);
    this.battleMapService.selectToken(null);

    combineLatest([
      this.battleMapService.selectedToken$,
      this.battleMapService.selectedSquare$
    ])
      .pipe(
        takeUntil(onDeactivate$),
        distinctUntilChanged((a1, a2) => a1 === a2, ([a, b]) => `${a}/${b}`)
      )
      .subscribe(([selectedToken, selectedSquare]) => {
        if (selectedToken && !selectedSquare) {
          this.battleMapService.setSquareSelectable(true);
        }
        if (!selectedToken && !selectedSquare) {
          this.battleMapService.setSquareSelectable(false);
        }
        if (selectedToken && selectedSquare) {
          this.battleMapService.selectSquare(null);
          this.battleMapService.updateTokens(tokens => {
            tokens
              .filter(token => token.id === selectedToken.id)
              .forEach(token => (token.square = selectedSquare));
          });
        }
      });
  }
}
