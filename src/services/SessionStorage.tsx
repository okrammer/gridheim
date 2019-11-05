import { AbstractStorage } from "./AbstractStorage";
import { Session } from "../model/Session";
import { Observable } from "rxjs";

export class SessionStorage extends AbstractStorage<Session, string> {
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
}
