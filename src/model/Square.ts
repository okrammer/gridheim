import { Immerable } from "../utils/Immerable";

@Immerable()
export class Square {
  constructor(readonly x: number, readonly y: number) {}

  toCoordinateString(): string {
    return `${this.x}/${this.y}`;
  }
}
