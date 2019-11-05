import { StorageProvider } from "./StorageProvider";
import { range } from "../utils/range";
import { Observable, of } from "rxjs";

export class LocalStorageStorageProvider implements StorageProvider {
  get(key: string): Observable<string | null> {
    return of(localStorage.getItem(key));
  }

  listKeys(): Observable<ReadonlyArray<string>> {
    const itemCount = localStorage.length;
    return of(range(itemCount).map(i => localStorage.key(i)!));
  }

  set(key: string, value: string): Observable<void> {
    localStorage.setItem(key, value);
    return of(undefined);
  }

  remove(key: string): Observable<void> {
    localStorage.removeItem(key);
    return of(undefined);
  }
}
