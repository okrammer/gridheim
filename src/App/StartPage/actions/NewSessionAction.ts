import { Action } from "../Action";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { routing } from "../../../App";
import { GridMapStorage } from "../../../services/GridMapStorage";
import { texts } from "../../../data/Texts";

export const newSessionAction = (
  gridMapStorage: GridMapStorage
): Observable<Action | null> => {
  return gridMapStorage.count().pipe(
    map(count => {
      if (count === 0) {
        return null;
      }

      return {
        to: routing.newSessions,
        descriptionText: texts.startPage.newSession.description,
        actionText: texts.startPage.newSession.button,
        section: "play"
      };
    })
  );
};
