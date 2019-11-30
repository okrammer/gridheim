import { Action } from "../Action";
import { Observable, of } from "rxjs";
import { routing } from "../../../App";
import { labels } from "../../../data/labels";

export const newSessionAction = (): Observable<Action | null> => {
  return of({
    to: routing.newSessions,
    descriptionText: labels.startPage.newSession.description,
    actionText: labels.startPage.newSession.button,
    section: "play"
  });
};
