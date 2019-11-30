import { Action } from "../Action";
import { SessionRepository } from "../../../services/SessionRepository";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { routing } from "../../../App";
import { labels } from "../../../data/labels";

export const playAction = (
  sessionStorage: SessionRepository
): Observable<Action | null> => {
  return sessionStorage.findCurrentSession().pipe(
    map(([name, session]) => {
      if (!name || !session) {
        return null;
      }

      return {
        to: routing.play,
        descriptionText: labels.startPage.play.description,
        actionText: `${labels.startPage.play.button} '${name}'`,
        section: "play"
      };
    })
  );
};
