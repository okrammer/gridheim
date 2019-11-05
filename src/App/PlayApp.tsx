import React, { FC, useEffect, useState } from "react";
import { Token } from "../model/Token";
import { Square } from "../model/Square";
import { DrawingPane } from "../model/DrawingPane";
import { map } from "rxjs/operators";
import { Services } from "./PlayApp/services/Services";
import { BattleMapService } from "./PlayApp/services/BattleMapService";
import { PlayModeService } from "./PlayApp/services/modebased/PlayModeService";
import { DrawingService } from "./PlayApp/services/modebased/DrawingService";
import { AssetService } from "./PlayApp/services/AssetService";
import { ManageTokenService } from "./PlayApp/services/modebased/ManageTokenService";
import { ModeService } from "./PlayApp/services/ModeService";
import { SaveSessionService } from "./PlayApp/services/SaveSessionService";
import { Layout } from "./PlayApp/Layout";
import { SessionStorage } from "../services/SessionStorage";
import { GridMapStorage } from "../services/GridMapStorage";
import { NoSessionsFound } from "./PlayApp/NoSessionsFound";
import { StorageProvider } from "../services/StorageProvider";

interface Props {
  storageProvider: StorageProvider;
}

export const PlayApp: FC<Props> = ({ storageProvider }: Props) => {
  const [services, setServices] = useState<Services | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState<
    "FAILED" | "LOADING" | "LOADED"
  >("LOADING");
  useEffect(() => {
    const saveSessionService = new SaveSessionService(
      new GridMapStorage(storageProvider),
      new SessionStorage(storageProvider)
    );
    const battleMapService = new BattleMapService(saveSessionService);
    const playModeService = new PlayModeService(battleMapService);
    const backgroundDrawingService = new DrawingService();
    const notesDrawingService = new DrawingService();
    const assetService = new AssetService();
    const manageTokenService = new ManageTokenService(
      battleMapService,
      assetService
    );
    const modeService = new ModeService("play", {
      play: playModeService,
      "draw-background": backgroundDrawingService,
      "draw-notes": notesDrawingService,
      "manage-token": manageTokenService,
      zoom: null
    });

    saveSessionService
      .add("tokens", battleMapService.tokens$)
      .subscribe(tokensJson => {
        const mappedTokens = tokensJson.flatMap(tokenJson => {
          const tokenType = assetService.tokenTypeForName(
            tokenJson.tokenType.name
          );
          if (!tokenType) {
            return [];
          }
          return [
            new Token(
              tokenJson.id,
              tokenType,
              tokenJson.label,
              new Square(tokenJson.square.x, tokenJson.square.y),
              tokenJson.size
            )
          ];
        });

        battleMapService.updateTokens(() => mappedTokens);
      });

    saveSessionService
      .add(
        "background-pane",
        backgroundDrawingService.pane$.pipe(
          map(p => p.withCurrentDrawingRemoved())
        )
      )
      .subscribe(paneJson => {
        backgroundDrawingService.setPane(DrawingPane.fromJson(paneJson));
      });

    saveSessionService
      .add(
        "notes-pane",
        notesDrawingService.pane$.pipe(map(p => p.withCurrentDrawingRemoved()))
      )
      .subscribe(paneJson => {
        notesDrawingService.setPane(DrawingPane.fromJson(paneJson));
      });

    saveSessionService
      .loadAndStart()
      .toPromise()
      .then(result => setSessionLoaded(result ? "LOADED" : "FAILED"));

    setServices({
      battleMapService,
      playModeService,
      backgroundDrawingService,
      notesDrawingService,
      modeService,
      manageTokenService,
      assetService
    });
    return () => {
      console.log("disposing PlayApp");
      saveSessionService.saveSession();
      battleMapService.dispose();
      playModeService.dispose();
      backgroundDrawingService.dispose();
      notesDrawingService.dispose();
      modeService.dispose();
      manageTokenService.dispose();
      assetService.dispose();
    };
  }, []);

  return (
    <>
      {(!services || sessionLoaded === "LOADING") && (
        <div className="App h-100">
          <span>loading ...</span>
        </div>
      )}
      {sessionLoaded === "FAILED" && !!services && <NoSessionsFound />}
      {sessionLoaded === "LOADED" && !!services && <Layout {...services} />}
    </>
  );
};
