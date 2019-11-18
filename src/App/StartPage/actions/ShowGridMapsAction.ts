import { Action } from "../Action";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { routing } from "../../../App";
import { GridMapStorage } from "../../../services/GridMapStorage";
import { texts } from "../../../data/Texts";

export const showGridMapsAction = (
  gridMapStorage: GridMapStorage
): Observable<Action | null> => {
  return gridMapStorage.count().pipe(
    map(count => {
      if (count === 0) {
        return null;
      }

      return {
        to: routing.gridMaps,
        descriptionText: texts.startPage.showGridMaps.description,
        actionText: texts.startPage.showGridMaps.button,
        section: "gridMaps"
      };
    })
  );
};
