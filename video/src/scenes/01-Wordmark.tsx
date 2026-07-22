import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, BRAND } from "../constants";
import { FONT_DISPLAY } from "../fonts";
import { Background, GrungeDivider, SkullMark } from "../components/Background";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

// Cold open: skull mark burns in, wordmark slams word-by-word, blood divider draws under it.
export const Wordmark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const markS = spring({ frame: frame - 4, fps, config: { damping: 9, stiffness: 260 } });
  const markGlow = interpolate(frame, [0, 20, 40], [0, 40, 18], clamp);

  const words = BRAND.wordmark.split(" "); // ["DARK", "D'OH", "BROS"]
  const dividerS = spring({ frame: frame - 55, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Background />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <div style={{ opacity: markS, transform: `scale(${interpolate(markS, [0, 1], [0.6, 1])})` }}>
          <SkullMark size={140} glow={markGlow} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {words.map((word, i) => {
            const s = spring({ frame: frame - 22 - i * 8, fps, config: { damping: 8, stiffness: 380 } });
            const y = interpolate(s, [0, 1], [46, 0]);
            const rot = interpolate(s, [0, 1], [i % 2 === 0 ? -6 : 6, 0]);
            return (
              <span
                key={word}
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 96,
                  color: COLORS.bone,
                  letterSpacing: 4,
                  lineHeight: 1.02,
                  opacity: s,
                  transform: `translateY(${y}px) rotate(${rot}deg)`,
                  textShadow: `0 0 30px ${COLORS.blood}`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        <div style={{ opacity: dividerS }}>
          <GrungeDivider progress={dividerS} width={440} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
