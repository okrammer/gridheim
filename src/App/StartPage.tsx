import React, { FC } from "react";
import { FullPageWithHeading } from "../common/FullPageWithHeading";
import Octicon, {
  FileMedia,
  Icon,
  Info,
  Key,
  Law,
  Milestone,
  Play
} from "@primer/octicons-react";
import { routing } from "../App";
import { PageHeader } from "../common/PageHeader";
import { GridMapStorage } from "../services/GridMapStorage";
import { SessionStorage } from "../services/SessionStorage";
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
import { links } from "../data/links";

interface Props {
  gridMapStorage: GridMapStorage;
  sessionStorage: SessionStorage;
}
const sections: Dict<{ icon: Icon; headline: string }> = {
  play: {
    icon: Play,
    headline: "Play"
  },
  gridMaps: {
    icon: FileMedia,
    headline: "Maps"
  }
};

export const StartPage: FC<Props> = ({
  gridMapStorage,
  sessionStorage
}: Props) => {
  const actions: Dict<Array<Action>> = useObservable(
    combineLatest([
      playAction(sessionStorage),
      newSessionAction(gridMapStorage),
      showSessionsAction(sessionStorage),
      newGridMapAction(),
      showGridMapsAction(gridMapStorage)
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
    [sessionStorage, gridMapStorage]
  );

  return (
    <FullPageWithHeading
      heading={
        <PageHeader icon={Milestone} headline={labels.startPage.headline}>
          <small>
            <a href={links.impressum} className="ml-2 mr-2">
              <Octicon icon={Law} /> Impressum
            </a>
            <a href={links.dataProtection}>
              <Octicon icon={Key} /> Data Protection
            </a>
          </small>
        </PageHeader>
      }
    >
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
      <StartSection headline="Infos" icon={Info}>
        <StartSectionItem
          description={labels.startPage.about.description}
          actionText={labels.startPage.about.button}
          to={routing.about}
        />
        <StartSectionItem
          description={labels.startPage.openSource.description}
          actionText={labels.startPage.openSource.button}
          to={routing.openSource}
        />
      </StartSection>
    </FullPageWithHeading>
  );
};
