import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, MENU_HEROES, SCENE_FRAMES } from "../constants";
import { FONT_DISPLAY, FONT_ACCENT, FONT_BODY } from "../fonts";
import { Background, SkullMark } from "../components/Background";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const ITEM_FRAMES = SCENE_FRAMES.menu / MENU_HEROES.length; // 82.5 -> 4 even beats

const MenuCard: React.FC<{ item: (typeof MENU_HEROES)[number]; localFrame: number; fps: number }> = ({
  item,
  localFrame,
  fps,
}) => {
  const enter = spring({ frame: localFrame, fps, config: { damping: 12, stiffness: 300 } });
  const exit = interpolate(localFrame, [ITEM_FRAMES - 14, ITEM_FRAMES], [1, 0], clamp);
  const opacity = Math.min(enter, exit);
  const x = interpolate(enter, [0, 1], [90, 0]);

  return (
    <div
      style={{
        position: "absolute",
        opacity,
        transform: `translateX(${x}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        width: 820,
        padding: "40px 48px",
        border: `3px solid ${COLORS.driedBlood}`,
        background: "rgba(20,0,0,0.35)",
      }}
    >
      <SkullMark size={64} />
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: 58, color: COLORS.bone, letterSpacing: 1, textAlign: "center" }}>
        {item.name}
      </div>
      <div style={{ fontFamily: FONT_ACCENT, fontSize: 26, color: COLORS.bloodBright, textAlign: "center" }}>
        {item.tag}
      </div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 22, color: COLORS.boneFaded, textAlign: "center", maxWidth: 640 }}>
        {item.desc}
      </div>
      <div style={{ fontFamily: FONT_BODY, fontSize: 24, color: COLORS.bone, fontWeight: 700 }}>{item.price}</div>
    </div>
  );
};

// Quick-cut poster carousel through the four hero items. One card visible at a time.
export const MenuHeroes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeIdx = Math.min(Math.floor(frame / ITEM_FRAMES), MENU_HEROES.length - 1);
  const localFrame = frame - activeIdx * ITEM_FRAMES;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Background intensity={0.8} />
      <MenuCard item={MENU_HEROES[activeIdx]} localFrame={localFrame} fps={fps} />
    </AbsoluteFill>
  );
};
