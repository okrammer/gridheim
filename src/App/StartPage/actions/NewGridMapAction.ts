import { Action } from "../Action";
import { Observable, of } from "rxjs";
import { routing } from "../../../App";
import { labels } from "../../../data/labels";

export const newGridMapAction = (): Observable<Action | null> => {
  return of({
    to: routing.newGridMap,
    descriptionText: labels.startPage.newGridMap.description,
    actionText: labels.startPage.newGridMap.button,
    section: "gridMaps"
  });
};
