import { StorageProvider } from "./StorageProvider";
import Dexie from "dexie";
import { Observable } from "rxjs";
import { fromPromise } from "rxjs/internal-compatibility";

export class IndexedDbStorageProvider implements StorageProvider {
  private static readonly TABLE_NAME = "blobs";

  private readonly db = new Dexie("GridHeimBlobStorage");
  private readonly blobs: Dexie.Table<
    { key: string; value: string },
    string
  > = (() => {
    this.db.version(1).stores({
      [IndexedDbStorageProvider.TABLE_NAME]: "key"
    });
    return this.db.table(IndexedDbStorageProvider.TABLE_NAME);
  })();

  get(key: string): Observable<string | null> {
    return fromPromise(
      this.blobs.get(key).then(entry => (entry ? entry.value : null))
    );
  }

  listKeys(): Observable<ReadonlyArray<string>> {
    return fromPromise(
      this.blobs
        .toArray()
        .then(result => Object.freeze(result.map(entry => entry.key)))
    );
  }

  set(key: string, value: string): Observable<void> {
    return fromPromise(this.blobs.put({ key, value }).then(() => undefined));
  }

  remove(key: string): Observable<void> {
    return fromPromise(this.blobs.delete(key).then(() => undefined));
  }
}
