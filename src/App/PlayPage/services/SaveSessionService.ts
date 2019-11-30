import { BehaviorSubject, Observable, of, Subject, throwError } from "rxjs";
import { auditTime, catchError, flatMap, map } from "rxjs/operators";
import { Session } from "../../../model/Session";
import { ImageGridMap } from "../../../model/ImageGridMap";
import { SessionRepository } from "../../../services/SessionRepository";
import { AbstractService } from "../../../services/AbstractService";
import { GridMapService } from "../../../services/GridMapService";
import { GridMap } from "../../../model/GridMap";

export class SaveSessionService extends AbstractService {
  private onLoad: { [name: string]: Subject<any> } = {};
  private toStore: { [name: string]: Observable<any> } = {};
  private readonly sessionS$ = new BehaviorSubject<Session | null>(null);
  readonly session$ = this.untilDisposed(this.sessionS$.asObservable());
  private readonly gridMapS$ = new BehaviorSubject<GridMap | null>(null);
  readonly gridMap$ = this.untilDisposed(this.gridMapS$.asObservable());

  constructor(
    private readonly gridMapService: GridMapService,
    private readonly sessionRepository: SessionRepository
  ) {
    super();
    this.session$.pipe(auditTime(10000)).subscribe({
      next: () => {
        console.log("saving session", this.session);
        this.saveSession();
      }
    });
  }

  saveSession(): void {
    this.session && this.sessionRepository.store(this.session);
  }

  add<T>(name: string, valuesToStore: Observable<T>): Observable<T> {
    const onLoadSubject = new Subject<T>();
    this.onLoad = { ...this.onLoad, [name]: onLoadSubject };
    this.toStore = { ...this.toStore, [name]: valuesToStore };
    return onLoadSubject.asObservable();
  }

  loadAndStart(): Observable<boolean> {
    return this.sessionRepository.findCurrentSessionName().pipe(
      flatMap(sessionName =>
        sessionName
          ? of(sessionName!)
          : throwError("No current session name found in local storage")
      ),
      flatMap(sessionName => this.sessionRepository.findBy(sessionName)),
      flatMap(session =>
        session ? of(session) : throwError("Failed Loading Session")
      ),
      flatMap(session =>
        this.gridMapService
          .getGridMapByName(session.gridMapName)
          .pipe(map(gridMap => [session, gridMap] as const))
      ),
      flatMap(([session, gridMap]) =>
        gridMap
          ? of([session, gridMap] as const)
          : throwError("Session with no gridMapName")
      ),
      map(([loadedSession, gridMap]) => {
        Object.keys(this.onLoad).forEach(name => {
          const loadedData = loadedSession.content[name];
          if (loadedData) {
            const subject = this.onLoad[name];
            subject.next(loadedData);
            subject.complete();
          }
        });

        Object.keys(this.toStore).forEach(name => {
          const observable = this.toStore[name];
          this.untilDisposed(observable).subscribe(data => {
            if (this.session) {
              this.sessionS$.next(
                this.session.with({
                  date: new Date().toLocaleString(),
                  content: { ...this.session.content, [name]: data }
                })
              );
            }
          });
        });

        this.sessionS$.next(loadedSession);
        this.gridMapS$.next(gridMap);
        return true;
      }),
      catchError(error => {
        console.log(`Failed loading session: ${error}`);
        return of(false);
      })
    );
  }

  get session(): Session | null {
    return this.sessionS$.value;
  }
}
