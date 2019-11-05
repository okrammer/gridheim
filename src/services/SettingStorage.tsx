export class SettingToggle {
  constructor(
    private readonly name: string,
    private readonly defaultValue: boolean
  ) {}

  get(): boolean {
    const key = this.key;
    const loadedValue = localStorage.getItem(key);
    switch (loadedValue) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        return this.defaultValue;
    }
  }

  private get key(): string {
    return `toggle-${this.name}`;
  }

  set(value: boolean): void {
    localStorage.setItem(this.key, `${value}`);
  }
}

export const settingStorage = Object.freeze({
  redirectToAbout: new SettingToggle("redirect-to-about", true)
});
