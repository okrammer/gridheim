import { Action } from "../Action";
import { Observable, of } from "rxjs";
import { routing } from "../../../App";
import { labels } from "../../../data/labels";

export const openSourceAction = (): Observable<Action | null> => {
  return of({
    to: routing.openSource,
    descriptionText: labels.startPage.openSource.description,
    actionText: labels.startPage.openSource.button,
    section: "info"
  });
};
