import { Action } from "../Action";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { routing } from "../../../App";
import { GridMapStorage } from "../../../services/GridMapStorage";
import { labels } from "../../../data/labels";

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
        descriptionText: labels.startPage.showGridMaps.description,
        actionText: labels.startPage.showGridMaps.button,
        section: "gridMaps"
      };
    })
  );
};
