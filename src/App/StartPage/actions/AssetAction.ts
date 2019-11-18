import { Action } from "../Action";
import { Observable, of } from "rxjs";
import { routing } from "../../../App";
import { labels } from "../../../data/labels";

export const assetAction = (): Observable<Action | null> => {
  return of({
    to: routing.assets,
    descriptionText: labels.startPage.assets.description,
    actionText: labels.startPage.assets.button,
    section: "info"
  });
};
