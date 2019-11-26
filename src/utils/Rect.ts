import { Vector } from "./Vector";

export class Rect {
  constructor(readonly topLeft: Vector, readonly sideLength: number) {
    Object.freeze(this);
  }

  move(vector: Vector): Rect {
    return new Rect(this.topLeft.add(vector), this.sideLength);
  }

  moveTopLeftTo(vector: Vector): Rect {
    const d = vector.subtract(this.topLeft).maxComponent;
    return new Rect(
      this.topLeft.add(Vector.fromNumber(d)),
      this.sideLength - d
    );
  }

  moveTopRightTo(vector: Vector): Rect {
    const d = vector.subtract(this.topLeft.addX(this.sideLength)).inverseX
      .maxComponent;
    return new Rect(this.topLeft.addY(d), this.sideLength - d);
  }

  moveBottomLeftTo(vector: Vector): Rect {
    const d = vector.subtract(this.topLeft.addY(this.sideLength)).inverseY
      .maxComponent;
    return new Rect(this.topLeft.addX(d), this.sideLength - d);
  }

  moveBottomRightTo(vector: Vector): Rect {
    const d = vector.subtract(
      this.topLeft.add(Vector.fromNumber(this.sideLength))
    ).maxComponent;
    return new Rect(this.topLeft, this.sideLength + d);
  }

  get normalized(): Rect {
    if (this.sideLength >= 0) {
      return this;
    }
    return new Rect(
      this.topLeft.add(Vector.fromNumber(this.sideLength)),
      -this.sideLength
    );
  }

  withSideLength(sideLength: number): Rect {
    return new Rect(this.topLeft, sideLength);
  }

  withTopLeft(topLeft: Vector): Rect {
    return new Rect(topLeft, this.sideLength);
  }
}
