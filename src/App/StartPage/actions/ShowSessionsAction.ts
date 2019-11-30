import { Action } from "../Action";
import { SessionRepository } from "../../../services/SessionRepository";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { routing } from "../../../App";
import { labels } from "../../../data/labels";

export const showSessionsAction = (
  sessionStorage: SessionRepository
): Observable<Action | null> => {
  return sessionStorage.count().pipe(
    map(count => {
      if (count === 0) {
        return null;
      }

      return {
        to: routing.sessions,
        descriptionText: labels.startPage.showSessions.description,
        actionText: labels.startPage.showSessions.button,
        section: "play"
      };
    })
  );
};
