import { AbstractStorage } from "./AbstractStorage";
import { Session } from "../model/Session";
import { Observable, of } from "rxjs";
import { flatMap, map } from "rxjs/operators";

export class SessionRepository extends AbstractStorage<Session, string> {
  protected readonly isStorageKey = (key: string): boolean =>
    Session.isStorageKey(key);

  protected readonly parseJson = (json: any): Session => {
    return Session.of({
      name: json.name,
      date: json.date,
      gridMapName: json.gridMapName,
      content: json.content
    });
  };

  protected readonly toStorageKey = (session: Session): string =>
    Session.storageKey(session.name);

  storeCurrentSessionName(name: string): Observable<void> {
    return this.storageProvider.set(Session.CURRENT_SESSION_STORAGE_KEY, name);
  }

  findCurrentSessionName(): Observable<string | null> {
    return this.storageProvider.get(Session.CURRENT_SESSION_STORAGE_KEY);
  }

  protected readonly keyToStorageKey = (name: string): string =>
    Session.storageKey(name);

  findCurrentSession(): Observable<readonly [string | null, Session | null]> {
    return this.findCurrentSessionName().pipe(
      flatMap(name => {
        if (!name) {
          return of([null, null] as const);
        }
        return this.findBy(name).pipe(map(session => [name, session] as const));
      })
    );
  }
}
