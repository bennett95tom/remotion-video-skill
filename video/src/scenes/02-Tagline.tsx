import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, BRAND } from "../constants";
import { FONT_ACCENT, FONT_BODY } from "../fonts";
import { Background } from "../components/Background";

// "Slice by Slice." / "Soul by Soul." — the DDB strapline, word-slammed in two lines.
export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = BRAND.strapline.split(". ").map((l) => l.replace(/\.$/, ""));
  const cityS = spring({ frame: frame - 70, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Background intensity={1.3} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        {lines.map((line, li) => {
          const words = line.split(" ");
          return (
            <div key={line} style={{ display: "flex", gap: 18 }}>
              {words.map((word, wi) => {
                const idx = li * 3 + wi;
                const s = spring({ frame: frame - 6 - idx * 6, fps, config: { damping: 9, stiffness: 320 } });
                const scale = interpolate(s, [0, 1], [1.6, 1]);
                return (
                  <span
                    key={word + idx}
                    style={{
                      fontFamily: FONT_ACCENT,
                      fontSize: 46,
                      color: COLORS.bloodBright,
                      opacity: s,
                      transform: `scale(${scale})`,
                      textShadow: `0 0 24px ${COLORS.blood}`,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          );
        })}

        <div
          style={{
            marginTop: 24,
            opacity: cityS,
            fontFamily: FONT_BODY,
            fontSize: 26,
            letterSpacing: 8,
            color: COLORS.boneFaded,
          }}
        >
          {BRAND.city} STREET FOOD
        </div>
      </div>
    </AbsoluteFill>
  );
};
