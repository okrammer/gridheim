import { Action } from "../Action";
import { SessionStorage } from "../../../services/SessionStorage";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { routing } from "../../../App";
import { texts } from "../../../data/Texts";

export const showSessionsAction = (
  sessionStorage: SessionStorage
): Observable<Action | null> => {
  return sessionStorage.count().pipe(
    map(count => {
      if (count === 0) {
        return null;
      }

      return {
        to: routing.sessions,
        descriptionText: texts.startPage.showSessions.description,
        actionText: texts.startPage.showSessions.button,
        section: "play"
      };
    })
  );
};
