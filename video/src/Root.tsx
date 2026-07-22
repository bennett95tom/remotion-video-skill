import React from "react";
import { Composition } from "remotion";
import { DDBPromo } from "./MyVideo";
import { WIDTH, HEIGHT, FPS, DURATION_FRAMES } from "./constants";

export const Root: React.FC = () => (
  <>
    <Composition
      id="DDBPromo"
      component={DDBPromo}
      durationInFrames={DURATION_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
);
