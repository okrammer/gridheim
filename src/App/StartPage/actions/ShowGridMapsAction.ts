import { Action } from "../Action";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { routing } from "../../../App";
import { labels } from "../../../data/labels";
import { ImageGridMapRepository } from "../../../services/ImageGridMapRepository";

export const showGridMapsAction = (
  imageGridMapRepository: ImageGridMapRepository
): Observable<Action | null> => {
  return imageGridMapRepository.count().pipe(
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
