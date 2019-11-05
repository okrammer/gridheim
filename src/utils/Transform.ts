export class Transform {
  static transformScreenCoordinates(
    domMatrix: DOMMatrix,
    x: number,
    y: number
  ): [number, number] {
    const matrix = domMatrix.inverse();
    return [
      x * matrix.a + y * matrix.c + matrix.e,
      y * matrix.b + x * matrix.d + matrix.f
    ];
  }
}
