import { MutableRefObject, TouchEvent as RTouchEvent, useRef } from "react";
import { useStateRef } from "./useStateRef";
import { Vector } from "./Vector";
import { toVectorInSvg } from "./toVectorInSvg";

export interface TouchResult {
  eventHandlers: {
    onTouchStart: (e: RTouchEvent<any>) => void;
  };
}

export interface MultiTouchEvent {
  last: State;
  current: State;
  delta: State;
}

export interface Config {
  onStart?: () => void;

  onMove: (e: MultiTouchEvent) => void;

  onEnd?: () => void;
  svgTargetRef: MutableRefObject<SVGGraphicsElement | null>;
}

interface State {
  touchCount: number;
  position: Vector;
  distance: number | null;
}

const position = (touchPoints: Vector[]): Vector => {
  if (touchPoints.length === 1) {
    return touchPoints[0];
  }
  return touchPoints[0].add(touchPoints[1].subtract(touchPoints[0]).scale(0.5));
};

const distance = (touchPoints: Vector[]): number | null => {
  if (touchPoints.length === 1) {
    return null;
  }
  return touchPoints[1].subtract(touchPoints[0]).length;
};

const stateFromTouches = (
  e: TouchEvent,
  targetSvg: SVGGraphicsElement
): State => {
  const touchPoints = [...e.touches].map(t =>
    toVectorInSvg(Vector.fromClientCoords(t), targetSvg)
  );
  return {
    distance: distance(touchPoints),
    position: position(touchPoints),
    touchCount: touchPoints.length
  };
};

const eventFromStates = (lastState: State, state: State): MultiTouchEvent => {
  return {
    last:
      // only provide the real last state if the touch count hasn't changed
      // otherwise the position jumps
      !!lastState.touchCount !== !!state.touchCount ? state : lastState,
    current: state,
    delta: {
      position:
        state.position &&
        lastState.position &&
        state.position.subtract(lastState.position),
      distance:
        state.distance &&
        lastState.distance &&
        state.distance - lastState.distance,
      touchCount: state.touchCount - lastState.touchCount
    }
  };
};

export const useTouch = (config: Config): TouchResult => {
  const lastStateRef = useRef<State>({
    position: Vector.zero,
    distance: null,
    touchCount: 0
  });
  const configRef = useRef<Config>(config);
  configRef.current = config;

  const [getStart, setStart] = useStateRef(false);

  const onTouchStart = (e: RTouchEvent<any>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (getStart()) {
      return;
    }

    const onMove = (e: TouchEvent): void => {
      if (!getStart()) {
        return;
      }

      console.log(
        "touches: " + e.touches.length
        // [...e.touches].map(t => `${t.clientX}/${t.clientY} `).join()
      );

      const state = stateFromTouches(
        e,
        configRef.current.svgTargetRef.current!
      );
      const multiTouchEvent = eventFromStates(lastStateRef.current, state);

      configRef.current.onMove(multiTouchEvent);
      lastStateRef.current = state;
    };

    const onEnd = (e: TouchEvent): void => {
      if (!getStart()) {
        return;
      }
      setStart(false);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      configRef.current.onEnd && configRef.current.onEnd();
    };

    setStart(true);
    lastStateRef.current = stateFromTouches(
      e.nativeEvent,
      configRef.current.svgTargetRef.current!
    );
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", onEnd);
    configRef.current.onStart && configRef.current.onStart();
  };

  return {
    eventHandlers: {
      onTouchStart
    }
  };
};
