import { Observable } from "rxjs";

export interface StorageProvider {
  set(key: string, value: string): Observable<void>;

  get(key: string): Observable<string | null>;

  listKeys(): Observable<ReadonlyArray<string>>;

  remove(key: string): Observable<void>;
}
