import React, { FC, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { GridMapsApp } from "./App/GridMapsApp";
import { GlobalMenu } from "./App/GlobalMenu";
import { SessionsApp } from "./App/SessionsApp";
import { ManageTokenTypesApp } from "./App/ManageTokenTypesApp";
import { AboutApp } from "./App/AboutApp";
import { RedirectToAboutOnFirstVisit } from "./App/RedirectToAboutOnFirstVisit";
import { PlayApp } from "./App/PlayApp";
import { IndexedDbStorageProvider } from "./services/IndexedDbStorageProvider";

export const routing = {
  play: "/",
  sessions: "/sessions",
  manageGridMaps: "/manage-maps",
  manageTokenTypes: "/manage-token-types",
  about: "/about"
};

interface Props {}

export const App: FC<Props> = ({  }: Props) => {
  // const [storageProvider] = useState(() => new LocalStorageStorageProvider());
  const [storageProvider] = useState(() => new IndexedDbStorageProvider());

  return (
    <>
      <Router>
        <div className="h-100">
          <GlobalMenu />
          <Switch>
            <Route path={routing.play} exact={true}>
              <RedirectToAboutOnFirstVisit>
                <PlayApp storageProvider={storageProvider} />
              </RedirectToAboutOnFirstVisit>
            </Route>
            <Route path={routing.sessions}>
              <RedirectToAboutOnFirstVisit>
                <SessionsApp storageProvider={storageProvider} />
              </RedirectToAboutOnFirstVisit>
            </Route>
            <Route path={routing.manageGridMaps}>
              <RedirectToAboutOnFirstVisit>
                <GridMapsApp storageProvider={storageProvider} />
              </RedirectToAboutOnFirstVisit>
            </Route>
            <Route path={routing.manageTokenTypes}>
              <RedirectToAboutOnFirstVisit>
                <ManageTokenTypesApp />
              </RedirectToAboutOnFirstVisit>
            </Route>
            <Route path={routing.about}>
              <AboutApp />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};
