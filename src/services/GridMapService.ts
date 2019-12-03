import { ImageGridMapRepository } from "./ImageGridMapRepository";
import { GridMap } from "../model/GridMap";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Vector } from "../utils/Vector";

export class GridMapService {
  private static BLANK_GRID_MAP: GridMap = Object.freeze({
    name: "BLANK-MAP",
    isAsset: false,
    squares: new Vector(100, 100)
  });

  constructor(readonly imageGridMapRepository: ImageGridMapRepository) {}

  getGridMaps(): Observable<ReadonlyArray<GridMap>> {
    return this.imageGridMapRepository
      .findAll()
      .pipe(
        map(list => Object.freeze([...list, GridMapService.BLANK_GRID_MAP]))
      );
  }

  getGridMapByName(name: string): Observable<GridMap | null> {
    if (name === GridMapService.BLANK_GRID_MAP.name) {
      return of(GridMapService.BLANK_GRID_MAP);
    }
    return this.imageGridMapRepository.findBy(name);
  }
}
