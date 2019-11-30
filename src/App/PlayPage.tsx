import React, { FC, useEffect, useState } from "react";
import { Token } from "../model/Token";
import { Square } from "../model/Square";
import { DrawingPane } from "../model/DrawingPane";
import { map } from "rxjs/operators";
import { Services } from "./PlayPage/services/Services";
import { BattleMapService } from "./PlayPage/services/BattleMapService";
import { PlayModeService } from "./PlayPage/services/modebased/PlayModeService";
import { DrawingService } from "./PlayPage/services/modebased/DrawingService";
import { AssetService } from "./PlayPage/services/AssetService";
import { ManageTokenService } from "./PlayPage/services/modebased/ManageTokenService";
import { ModeService } from "./PlayPage/services/ModeService";
import { SaveSessionService } from "./PlayPage/services/SaveSessionService";
import { Layout } from "./PlayPage/Layout";
import { SessionRepository } from "../services/SessionRepository";
import { NoSessionsFound } from "./PlayPage/NoSessionsFound";
import { ZoomModeService } from "./PlayPage/services/modebased/ZoomModeService";
import { ViewportService } from "./PlayPage/services/ViewportService";
import { GridMapService } from "../services/GridMapService";

interface Props {
  gridMapService: GridMapService;
  sessionRepository: SessionRepository;
}

export const PlayPage: FC<Props> = ({
  gridMapService,
  sessionRepository
}: Props) => {
  const [services, setServices] = useState<Services | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState<
    "FAILED" | "LOADING" | "LOADED"
  >("LOADING");
  useEffect(() => {
    const saveSessionService = new SaveSessionService(
      gridMapService,
      sessionRepository
    );
    const battleMapService = new BattleMapService();

    const playModeService = new PlayModeService(battleMapService);
    const backgroundDrawingService = new DrawingService();
    const notesDrawingService = new DrawingService();
    const assetService = new AssetService();
    const manageTokenService = new ManageTokenService(
      battleMapService,
      assetService
    );
    const zoomModeService = new ZoomModeService(battleMapService);
    const modeService = new ModeService("play", {
      play: playModeService,
      "draw-background": backgroundDrawingService,
      "draw-notes": notesDrawingService,
      "manage-token": manageTokenService,
      zoom: zoomModeService
    });

    const viewportService = new ViewportService(
      modeService,
      saveSessionService
    );

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
      assetService,
      saveSessionService,
      viewportService
    });
    return () => {
      console.log("disposing PlayApp");
      saveSessionService.saveSession();
      battleMapService.dispose();
      playModeService.dispose();
      backgroundDrawingService.dispose();
      notesDrawingService.dispose();
      zoomModeService.dispose();
      modeService.dispose();
      manageTokenService.dispose();
      assetService.dispose();
    };
  }, [sessionStorage, gridMapService]);

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
