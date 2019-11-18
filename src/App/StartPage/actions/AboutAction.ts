import { Action } from "../Action";
import { Observable, of } from "rxjs";
import { routing } from "../../../App";
import { labels } from "../../../data/labels";

export const aboutAction = (): Observable<Action | null> => {
  return of({
    to: routing.about,
    descriptionText: labels.startPage.about.description,
    actionText: labels.startPage.about.button,
    section: "info"
  });
};
