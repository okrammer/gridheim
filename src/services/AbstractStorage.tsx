import { StorageProvider } from "./StorageProvider";
import { forkJoin, Observable, of } from "rxjs";
import { flatMap, map } from "rxjs/operators";

export abstract class AbstractStorage<T, K> {
  protected abstract readonly isStorageKey: (key: string) => boolean;
  protected abstract readonly toStorageKey: (o: T) => string;
  protected abstract readonly parseJson: (json: any) => T | null;
  protected abstract readonly keyToStorageKey: (k: K) => string;

  constructor(protected readonly storageProvider: StorageProvider) {}

  findAll(): Observable<ReadonlyArray<T>> {
    return this.storageProvider.listKeys().pipe(
      flatMap(list => {
        const observables: Array<Observable<T | null>> = list.flatMap(key => {
          const keyResult: Observable<T | null>[] =
            key && this.isStorageKey(key) ? [this.loadObject(key)] : [];
          return keyResult;
        });

        if (observables.length === 0) {
          return of([]);
        }

        return forkJoin(observables).pipe(
          map(array => array.flatMap(a => (!!a ? [a] : []))),
          map(array => Object.freeze(array))
        );
      })
    );
  }

  count(): Observable<number> {
    return this.storageProvider.listKeys().pipe(map(keys => keys.length));
  }

  findBy(objectKey: K): Observable<T | null> {
    return this.loadObject(this.keyToStorageKey(objectKey));
  }

  store(o: T): Observable<void> {
    const jsonString = JSON.stringify(o);
    return this.storageProvider.set(this.toStorageKey(o), jsonString);
  }

  private loadObject(name: string): Observable<T | null> {
    return this.storageProvider.get(name).pipe(
      map(content => {
        if (content === null) {
          return null;
        }
        const json: any = JSON.parse(content);
        try {
          return this.parseJson(json);
        } catch (e) {
          console.log(`Failed loading ${name} from local storage`, { name, e });
          return null;
        }
      })
    );
  }

  delete(objectKey: K | null): Observable<void> {
    if (!objectKey) {
      return of(undefined);
    }
    return this.storageProvider.remove(this.keyToStorageKey(objectKey));
  }
}
