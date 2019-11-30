import React, { FC, useState } from "react";
import { HashRouter as Router, Switch } from "react-router-dom";
import { GridMapsPage } from "./App/GridMapsPage";
import { SessionsPage } from "./App/SessionsPage";
import { ManageTokenTypesPage } from "./App/ManageTokenTypesPage";
import { AboutPage } from "./App/AboutPage";
import { PlayPage } from "./App/PlayPage";
import { IndexedDbStorageProvider } from "./services/IndexedDbStorageProvider";
import { StartPage } from "./App/StartPage";
import { ImageGridMapRepository } from "./services/ImageGridMapRepository";
import { SessionRepository } from "./services/SessionRepository";
import { NewGridMapPage } from "./App/NewGridMapPage";
import { NewSessionPage } from "./App/NewSessionPage";
import { OpenSourcePage } from "./App/OpenSourcePage";
import { AppPage } from "./App/AppPage";
import { Route } from "react-router";
import { AssetsPage } from "./App/AssetsPage";
import { GridMapService } from "./services/GridMapService";

export const routing = {
  start: "/",
  play: "/play",
  sessions: "/sessions",
  newSessions: "/sessions/new",
  gridMaps: "/manage-maps",
  newGridMap: "/manage-maps/new",
  about: "/about",
  tokenTypes: "/token-types",
  openSource: "/open-source",
  assets: "/assets"
};

interface Props {}

export const App: FC<Props> = ({  }: Props) => {
  const [services] = useState(() => {
    const storageProvider = new IndexedDbStorageProvider();
    const imageGridMapRepository = new ImageGridMapRepository(storageProvider);
    const sessionRepository = new SessionRepository(storageProvider);
    const gridMapService = new GridMapService(imageGridMapRepository);
    return {
      storageProvider,
      imageGridMapRepository,
      sessionRepository,
      gridMapService
    };
  });

  return (
    <>
      <Router>
        <div className="h-100">
          <Switch>
            <Route path={routing.start} exact={true}>
              <AppPage noHomeButton={true}>
                <StartPage {...services} />
              </AppPage>
            </Route>
            <Route path={routing.play}>
              <AppPage noBackground={true}>
                <PlayPage {...services} />
              </AppPage>
            </Route>
            <Route path={routing.newSessions}>
              <AppPage>
                <NewSessionPage {...services} />
              </AppPage>
            </Route>
            <Route path={routing.sessions}>
              <AppPage>
                <SessionsPage {...services} />
              </AppPage>
            </Route>
            <Route path={routing.newGridMap}>
              <AppPage>
                <NewGridMapPage {...services} />
              </AppPage>
            </Route>
            <Route path={routing.gridMaps}>
              <AppPage>
                <GridMapsPage {...services} />
              </AppPage>
            </Route>
            <Route path={routing.tokenTypes}>
              <AppPage>
                <ManageTokenTypesPage />
              </AppPage>
            </Route>
            <Route path={routing.openSource}>
              <AppPage>
                <OpenSourcePage />
              </AppPage>
            </Route>
            <Route path={routing.assets}>
              <AppPage>
                <AssetsPage />
              </AppPage>
            </Route>
            <Route path={routing.about} noRedirectToAboutOnFirstVisit={true}>
              <AppPage>
                <AboutPage />
              </AppPage>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};
