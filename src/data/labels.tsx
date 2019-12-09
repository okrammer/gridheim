import React from "react";
import { FileMedia, Info, Play } from "@primer/octicons-react";

export const labels = Object.freeze({
  playPage: {
    controlBar: {
      drawBackgroundButton:
        "Draw something that should be shown on the gridMap like spell effects, environment hazards etc.",
      drawNotesButton:
        "Open the notes pane where you can write some notes with a pen.",
      playButton: "Enter play mode, so you can move tokens.",
      addTokensButton: "Add a new token to the game board.",
      zoomButton: "Zoom in or out and change orientation of the map."
    }
  },
  newSessionPage: {
    headline: "Start New Session",
    explanation: (
      <>
        <strong>Sessions</strong> are the place where all token positions on the
        map and all drawings are stored.
        <br />
        You can switch between sessions on this screen so you can come back to a
        game later ...
      </>
    )
  },
  assetPage: {
    headline: "Included 3rd Party Assets"
  },
  openSourcePage: {
    headline: "Included Open Source Components"
  },
  aboutPage: {
    headline: "Let me tell you about Gridheim, Friend ...",
    startLink: "Enough talk just start ..."
  },
  startPage: {
    headline: "Welcome to Gridheim, Friend!",
    sections: {
      play: {
        headline: "Play",
        icon: Play
      },
      gridMaps: {
        headline: "Maps",
        icon: FileMedia
      },
      info: {
        headline: "Info",
        icon: Info
      }
    },
    about: {
      description:
        "Here you find some bits of knowledge about this tool and it's maker.",
      button: "About"
    },
    openSource: {
      description:
        "This project were not possible without the opensource ecosystem it is build appon, thanks opensource community :)",
      button: "Open Source"
    },
    assets: {
      description:
        "This project wouldn't look this nice without the use of 'free' assets, that are provided to the community, big thanks to them!",
      button: "3rd Party Assets"
    },
    newGridMap: {
      description:
        "Here you could create a map by specifing a image from your device as background and put a grid on it.",
      button: "Add Map"
    },
    newSession: {
      description:
        "Here you can start a new session on a map. A session will store the position of each token and all drawings.",
      button: "Start New Session"
    },
    play: {
      description:
        "Continue a previous session. Sessions are continuously saved in the background, so you can easily start where you left off.",
      button: "Continue Session"
    },
    showGridMaps: {
      description:
        "Here you can see all created maps and remove those that are no longer needed.",
      button: "Manage Maps"
    },
    showSessions: {
      description:
        "Here you can see all stored sessions and continue them or remove those that are out dated",
      button: "Manage Sessions"
    }
  }
});
