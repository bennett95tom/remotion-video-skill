import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import { SCENE_FRAMES, TRANSITION_FRAMES, COLORS } from "./constants";
import { Wordmark } from "./scenes/01-Wordmark";
import { Tagline } from "./scenes/02-Tagline";
import { MenuHeroes } from "./scenes/03-MenuHeroes";
import { CTA } from "./scenes/04-CTA";

// Instantiate transitions at module level — not inside the component.
const WORDMARK_TO_TAGLINE = fade();
const TAGLINE_TO_MENU = slide({ direction: "from-right" });
const MENU_TO_CTA = wipe({ direction: "from-bottom" });

export const DDBPromo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bgVoid }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.wordmark}>
        <Wordmark />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={WORDMARK_TO_TAGLINE}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES.wordmarkToTagline })}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.tagline}>
        <Tagline />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={TAGLINE_TO_MENU}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES.taglineToMenu })}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.menu}>
        <MenuHeroes />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={MENU_TO_CTA}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES.menuToCta })}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.cta}>
        <CTA />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
