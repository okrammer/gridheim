import { ViewBox } from "../../../model/ViewBox";
import { Token } from "../../../model/Token";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { Square } from "../../../model/Square";
import produce, { Draft } from "immer";
import { TokenType } from "../../../model/TokenType";
import { uuid } from "../../../utils/uuid";
import { debounceTime, map, throttleTime } from "rxjs/operators";
import { AbstractService } from "../../../services/AbstractService";
import { SaveSessionService } from "./SaveSessionService";
import { range } from "../../../utils/range";

export class BattleMapService extends AbstractService {
  private static readonly EMPTY_READONLY_ARRAY: ReadonlyArray<
    any
  > = Object.freeze([]);

  private readonly tokensS$ = new BehaviorSubject<ReadonlyArray<Token>>([]);

  readonly tokens$ = this.tokensS$.asObservable();

  readonly gridMap$ = this.sessionStorageService.gridMap$;

  private selectedTokenS$ = new BehaviorSubject<Token | null>(null);
  readonly selectedToken$ = this.selectedTokenS$.asObservable();

  private readonly selectedSquareS$ = new BehaviorSubject<Square | null>(null);
  readonly selectedSquare$ = this.selectedSquareS$.asObservable();

  private readonly squareSelectableS$ = new BehaviorSubject<boolean>(false);
  readonly squareSelectable$ = this.squareSelectableS$.asObservable();

  private readonly tokenSelectableS$ = new BehaviorSubject<boolean>(false);
  readonly tokenSelectable$ = this.tokenSelectableS$.asObservable();

  private readonly tokenSizeS$ = new BehaviorSubject<number>(1);
  readonly tokenSize$ = this.tokenSizeS$.asObservable();

  private readonly hoveringSquareS$ = new BehaviorSubject<Square | null>(null);
  readonly hoveringSquare$ = this.hoveringSquareS$.asObservable();

  public readonly highlightedSquares$: Observable<
    ReadonlyArray<Square>
  > = combineLatest([
    this.squareSelectable$,
    this.tokenSize$,
    this.selectedToken$,
    this.hoveringSquare$
  ]).pipe(
    map(([squareSelectable, tokenSize, selectedToken, hoveringSquare]) => {
      if (!hoveringSquare || !squareSelectable) {
        return BattleMapService.EMPTY_READONLY_ARRAY;
      }

      const size = selectedToken ? selectedToken.size : tokenSize;
      const squares = range(size).map(dx =>
        range(size).map(
          dy => new Square(hoveringSquare.x + dx, hoveringSquare.y + dy)
        )
      );
      return Object.freeze(squares.flat());
    }),
    debounceTime(50)
  );

  readonly viewBox$ = this.gridMap$.pipe(
    map(map =>
      map
        ? new ViewBox(0, 0, map.getWidthInSquares(), map.getHeightInSquares())
        : new ViewBox(0, 0, 0, 0)
    )
  );

  private readonly scaleS$ = new BehaviorSubject(1);
  readonly scale$ = this.scaleS$.asObservable().pipe(throttleTime(200));

  private readonly positionS$ = new BehaviorSubject({ x: 0, y: 0 });
  readonly position$ = this.positionS$.asObservable().pipe(throttleTime(200));

  constructor(private readonly sessionStorageService: SaveSessionService) {
    super();
  }

  selectToken(token: Token | null): void {
    if (this.tokenSelectable) {
      this.selectedTokenS$.next(token);
    }
  }

  get selectedToken(): Token | null {
    return this.selectedTokenS$.value;
  }

  selectSquare(square: Square | null): void {
    this.selectedSquareS$.next(square);
  }

  updateTokens(
    transform: (tokens: Draft<Token>[]) => Draft<Token[]> | void
  ): void {
    const tokens = produce(this.tokensS$.value, transform);
    this.tokensS$.next(tokens);

    const oldSelectedToken = this.selectedTokenS$.value;
    if (oldSelectedToken) {
      const newToken = this.tokensS$.value.find(
        token => oldSelectedToken.id === token.id
      );
      this.selectedTokenS$.next(newToken || null);
    }
  }

  addToken(
    tokenType: TokenType,
    tokenLabel: string,
    tokenSize: number,
    square: Square
  ): void {
    this.updateTokens(tokens => {
      tokens.push(new Token(uuid(), tokenType, tokenLabel, square, tokenSize));
    });
    const tokens = this.tokensS$.value;
    this.selectToken(tokens[tokens.length - 1]);
  }

  setSquareSelectable(selectable: boolean): void {
    this.squareSelectableS$.next(selectable);
  }

  get squareSelectable(): boolean {
    return this.squareSelectableS$.value;
  }

  setTokenSelectable(selectable: boolean): void {
    this.tokenSelectableS$.next(selectable);
  }

  get tokenSelectable(): boolean {
    return this.tokenSelectableS$.value;
  }

  switchScale(factor: number): void {
    this.scaleS$.next(1 + factor * 0.1);
  }

  get scale(): number {
    return this.scaleS$.value;
  }

  get position(): { x: number; y: number } {
    return this.positionS$.value;
  }

  get tokenSize(): number {
    return this.tokenSizeS$.value;
  }

  movePosition(dx: number, dy: number): void {
    const { x, y } = this.position;
    this.positionS$.next({ x: x + dx, y: y + dy });
  }

  removeSelectedToken(): void {
    if (this.selectedToken !== null) {
      const tokenId = this.selectedToken.id;
      this.updateTokens(tokens => {
        return tokens.filter(token => token.id !== tokenId);
      });
    }
  }

  hoverOverSquare(s: Square | null): void {
    this.hoveringSquareS$.next(s);
  }

  setTokenSize(tokenSize: number): void {
    this.tokenSizeS$.next(tokenSize);
  }
}
