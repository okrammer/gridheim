import { Drawing } from "./Drawing";

export class DrawingPane {
  static fromJson(json: any): DrawingPane {
    const drawings = json.drawings.map(
      (drawingJson: any) =>
        new Drawing(
          drawingJson.id,
          drawingJson.path,
          drawingJson.color,
          drawingJson.width
        )
    );
    return new DrawingPane(drawings);
  }

  constructor(readonly drawings: ReadonlyArray<Drawing>) {}

  withDrawingAdded(drawing: Drawing): DrawingPane {
    return new DrawingPane([...this.drawings, drawing]);
  }

  withCurrentDrawingRemoved(): DrawingPane {
    return this.withDrawingRemoved(Drawing.CURRENT_ID);
  }

  withDrawingRemoved(drawingId: string): DrawingPane {
    return new DrawingPane(this.drawings.filter(d => d.id !== drawingId));
  }
}
