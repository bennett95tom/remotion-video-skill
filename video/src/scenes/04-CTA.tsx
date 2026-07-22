import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, BRAND } from "../constants";
import { FONT_DISPLAY, FONT_ACCENT, FONT_BODY } from "../fonts";
import { Background, SkullMark, GrungeDivider } from "../components/Background";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const CULT_LINES = ["FIND THE STICKER.", "SCAN THE SKULL.", "JOIN THE CULT."];

// Ritual call-to-action, then logo lockup outro with handle + hashtags.
export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const linesOut = interpolate(frame, [70, 84], [1, 0], clamp);
  const lockupS = spring({ frame: frame - 82, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Background intensity={1.5} />

      <div style={{ position: "absolute", opacity: linesOut, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        {CULT_LINES.map((line, i) => {
          const s = spring({ frame: frame - i * 18, fps, config: { damping: 10, stiffness: 340 } });
          return (
            <div
              key={line}
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: 52,
                color: i === 1 ? COLORS.bloodBright : COLORS.bone,
                letterSpacing: 2,
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
                textShadow: i === 1 ? `0 0 26px ${COLORS.blood}` : undefined,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          opacity: lockupS,
          transform: `scale(${interpolate(lockupS, [0, 1], [0.85, 1])})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <SkullMark size={90} glow={22} />
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 50, color: COLORS.bone, letterSpacing: 3 }}>
          {BRAND.wordmark}
        </div>
        <GrungeDivider progress={1} width={320} />
        <div style={{ fontFamily: FONT_ACCENT, fontSize: 22, color: COLORS.bloodBright }}>{BRAND.strapline}</div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 20, color: COLORS.boneFaded, marginTop: 8 }}>
          {BRAND.handle}
        </div>
        <div style={{ fontFamily: FONT_BODY, fontSize: 18, color: COLORS.boneFaded }}>
          {BRAND.hashtags.join("  ")}
        </div>
      </div>
    </AbsoluteFill>
  );
};
