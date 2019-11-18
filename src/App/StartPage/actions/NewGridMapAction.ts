import { Action } from "../Action";
import { Observable, of } from "rxjs";
import { routing } from "../../../App";
import { texts } from "../../../data/Texts";

export const newGridMapAction = (): Observable<Action | null> => {
  return of({
    to: routing.newGridMap,
    descriptionText: texts.startPage.newGridMap.description,
    actionText: texts.startPage.newGridMap.button,
    section: "gridMaps"
  });
};
