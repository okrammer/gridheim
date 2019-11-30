import { Vector } from "./Vector";

export class Transform {
  static readonly identity = new Transform(Vector.zero, 1);
  constructor(readonly translate: Vector, readonly scale: number) {
    Object.freeze(this);
  }

  withTranslate(translation: Vector): Transform {
    return new Transform(translation, this.scale);
  }

  withScale(scale: number): Transform {
    return new Transform(this.translate, scale);
  }

  get translateScaleString(): string {
    return `${this.translateString} ${this.scaleString}`;
  }

  get scaleTranslateString(): string {
    return `${this.scaleString} ${this.translateString}`;
  }

  get translateString(): string {
    return `translate(${this.translate.x} ${this.translate.y})`;
  }

  get scaleString(): string {
    return `scale(${this.scale} ${this.scale})`;
  }

  get translateScaleAttribute(): { transform: string } {
    return { transform: this.translateScaleString };
  }

  get scaleTranslateAttribute(): { transform: string } {
    return { transform: this.scaleTranslateString };
  }
}
