export class Vector {
  static fromCoords(like: { x: number; y: number }): Vector {
    return new Vector(like.x, like.y);
  }
  static fromClientCoords(like: { clientX: number; clientY: number }): Vector {
    return new Vector(like.clientX, like.clientY);
  }

  static fromDeltaCoords(like: { deltaX: number; deltaY: number }): Vector {
    return new Vector(like.deltaX, like.deltaY);
  }

  static fromNumber(n: number): Vector {
    return new Vector(n, n);
  }

  static readonly zero = Vector.fromNumber(0);

  constructor(readonly x: number, readonly y: number) {
    Object.freeze(this);
  }

  subtract(point: Vector): Vector {
    return new Vector(this.x - point.x, this.y - point.y);
  }

  add(point: Vector): Vector {
    return new Vector(this.x + point.x, this.y + point.y);
  }

  get abs(): Vector {
    return new Vector(Math.abs(this.x), Math.abs(this.y));
  }

  get length(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  get maxComponent(): number {
    return Math.max(this.x, this.y);
  }

  scale(multiplier: number): Vector {
    return new Vector(this.x * multiplier, this.y * multiplier);
  }

  withX(x: number): Vector {
    return new Vector(x, this.y);
  }

  withY(y: number): Vector {
    return new Vector(this.x, y);
  }

  addX(d: number): Vector {
    return this.withX(this.x + d);
  }

  get inverseX(): Vector {
    return this.withX(-this.x);
  }

  get inverseY(): Vector {
    return this.withY(-this.y);
  }

  addY(d: number): Vector {
    return this.withY(this.y + d);
  }

  equals(v: any): boolean {
    if (!v || !v.x || !v.y) {
      return false;
    }
    return this.x === v.x && this.y === v.y;
  }

  get ceil(): Vector {
    return new Vector(Math.ceil(this.x), Math.ceil(this.y));
  }

  get components(): [number, number] {
    return [this.x, this.y];
  }
}
