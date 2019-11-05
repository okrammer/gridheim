import { PropsOf, SomePropsOf } from "../utils/types";

export class Session {
  static readonly STORAGE_KEY_PREFIX = "session-";
  static readonly CURRENT_SESSION_STORAGE_KEY = "current-session";

  static storageKey(sessionName: string): string {
    return `${this.STORAGE_KEY_PREFIX}${sessionName}`;
  }

  static isStorageKey(key: string): boolean {
    return key.startsWith(this.STORAGE_KEY_PREFIX);
  }

  public static of(props: PropsOf<Session>): Session {
    return Object.freeze(
      new Session(props.name, props.date, props.gridMapName, props.content)
    );
  }

  private constructor(
    readonly name: string,
    readonly date: string,
    readonly gridMapName: string,
    readonly content: { [name: string]: any }
  ) {}

  with(props: SomePropsOf<Session>): Session {
    const copy = new Session(
      this.name,
      this.date,
      this.gridMapName,
      this.content
    );
    return Object.freeze(Object.assign(copy, props));
  }
}
