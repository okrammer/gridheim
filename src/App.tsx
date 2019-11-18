import React, { FC, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { GridMapsPage } from "./App/GridMapsPage";
import { GlobalMenu } from "./App/GlobalMenu";
import { SessionsPage } from "./App/SessionsPage";
import { ManageTokenTypesPage } from "./App/ManageTokenTypesPage";
import { AboutPage } from "./App/AboutPage";
import { RedirectToAboutOnFirstVisit } from "./App/RedirectToAboutOnFirstVisit";
import { PlayPage } from "./App/PlayPage";
import { IndexedDbStorageProvider } from "./services/IndexedDbStorageProvider";
import { StartPage } from "./App/StartPage";
import { GridMapStorage } from "./services/GridMapStorage";
import { SessionStorage } from "./services/SessionStorage";
import { NewGridMapPage } from "./App/NewGridMapPage";
import { NewSessionPage } from "./App/NewSessionPage";
import { OpenSourcePage } from "./App/OpenSourcePage";

export const routing = {
  start: "/",
  play: "/play",
  sessions: "/sessions",
  newSessions: "/sessions/new",
  gridMaps: "/manage-maps",
  newGridMap: "/manage-maps/new",
  about: "/about",
  tokenTypes: "/token-types",
  openSource: "/open-source"
};

interface Props {}

export const App: FC<Props> = ({  }: Props) => {
  const [services] = useState(() => {
    const storageProvider = new IndexedDbStorageProvider();
    const gridMapStorage = new GridMapStorage(storageProvider);
    const sessionStorage = new SessionStorage(storageProvider);
    return { storageProvider, gridMapStorage, sessionStorage };
  });

  return (
    <>
      <Router>
        <div className="h-100">
          <GlobalMenu />
          <Switch>
            <Route path={routing.start} exact={true}>
              <RedirectToAboutOnFirstVisit>
                <StartPage {...services} />
              </RedirectToAboutOnFirstVisit>
            </Route>
            <Route path={routing.play}>
              <RedirectToAboutOnFirstVisit>
                <PlayPage {...services} />
              </RedirectToAboutOnFirstVisit>
            </Route>
            <Route path={routing.newSessions}>
              <RedirectToAboutOnFirstVisit>
                <NewSessionPage {...services} />
              </RedirectToAboutOnFirstVisit>
            </Route>

            <Route path={routing.sessions}>
              <RedirectToAboutOnFirstVisit>
                <SessionsPage {...services} />
              </RedirectToAboutOnFirstVisit>
            </Route>
            <Route path={routing.newGridMap}>
              <RedirectToAboutOnFirstVisit>
                <NewGridMapPage {...services} />
              </RedirectToAboutOnFirstVisit>
            </Route>
            <Route path={routing.gridMaps}>
              <RedirectToAboutOnFirstVisit>
                <GridMapsPage {...services} />
              </RedirectToAboutOnFirstVisit>
            </Route>
            <Route path={routing.tokenTypes}>
              <RedirectToAboutOnFirstVisit>
                <ManageTokenTypesPage />
              </RedirectToAboutOnFirstVisit>
            </Route>
            <Route path={routing.openSource}>
              <RedirectToAboutOnFirstVisit>
                <OpenSourcePage />
              </RedirectToAboutOnFirstVisit>
            </Route>
            <Route path={routing.about}>
              <AboutPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};
