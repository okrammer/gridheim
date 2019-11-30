import React, { FC } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import { Icon, Milestone } from "@primer/octicons-react";
import { PageHeader } from "../common/PageHeader";
import { SessionRepository } from "../services/SessionRepository";
import { useObservable } from "../utils/useObservable";
import { map, take } from "rxjs/operators";
import { playAction } from "./StartPage/actions/PlayAction";
import { newSessionAction } from "./StartPage/actions/NewSessionAction";
import { showSessionsAction } from "./StartPage/actions/ShowSessionsAction";
import { newGridMapAction } from "./StartPage/actions/NewGridMapAction";
import { showGridMapsAction } from "./StartPage/actions/ShowGridMapsAction";
import { Action } from "./StartPage/Action";
import { combineLatest } from "rxjs";
import { Dict } from "../utils/types";
import { StartSection } from "./StartPage/StartSection";
import { StartSectionItem } from "./StartPage/StartSectionItem";
import { labels } from "../data/labels";
import { aboutAction } from "./StartPage/actions/AboutAction";
import { openSourceAction } from "./StartPage/actions/OpenSourceAction";
import { assetAction } from "./StartPage/actions/AssetAction";
import { ImageGridMapRepository } from "../services/ImageGridMapRepository";

interface Props {
  imageGridMapRepository: ImageGridMapRepository;
  sessionRepository: SessionRepository;
}

const sections: Dict<{ icon: Icon; headline: string }> =
  labels.startPage.sections;

export const StartPage: FC<Props> = ({
  imageGridMapRepository,
  sessionRepository
}: Props) => {
  const actions: Dict<Array<Action>> = useObservable(
    combineLatest([
      playAction(sessionRepository),
      newSessionAction(),
      showSessionsAction(sessionRepository),
      newGridMapAction(),
      showGridMapsAction(imageGridMapRepository),
      aboutAction(),
      openSourceAction(),
      assetAction()
    ]).pipe(
      map(actions =>
        actions.reduce(
          (result, action) => {
            if (!action) {
              return result;
            }
            const section = action.section;
            return {
              ...result,
              [section]: [...(result[section] || []), action]
            };
          },
          {} as Dict<Array<Action>>
        )
      ),
      take(1)
    ),
    {},
    [sessionRepository]
  );

  return (
    <FullPageWithHeading
      heading={
        <PageHeader icon={Milestone} headline={labels.startPage.headline} />
      }
    >
      <div className="container">
        {Object.entries(actions).map(([sectionName, actions], sectionIndex) => (
          <StartSection
            key={sectionName}
            headline={sections[sectionName].headline}
            icon={sections[sectionName].icon}
            hero={true}
          >
            {actions.map((action, actionIndex) => (
              <StartSectionItem
                key={actionIndex}
                description={action.descriptionText}
                hero={actionIndex === 0 && sectionIndex === 0}
                actionText={action.actionText}
                to={action.to}
              />
            ))}
          </StartSection>
        ))}
      </div>
    </FullPageWithHeading>
  );
};
