import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, WIDTH, HEIGHT } from "../constants";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

// Black void with a slow-pulsing blood-red glow. No gradients-as-decoration beyond
// this single locked treatment — keeps every scene on the same brand floor.
export const Background: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame * 0.04), [-1, 1], [0.12, 0.28]) * intensity;

  return (
    <div
      style={{
        position: "absolute",
        width: WIDTH,
        height: HEIGHT,
        background: `radial-gradient(ellipse at 50% 40%, rgba(138,3,3,${pulse}) 0%, ${COLORS.bgVoid} 60%, ${COLORS.bgVoid} 100%)`,
      }}
    />
  );
};

// Thin distressed-look divider, drawn as an SVG line (no raster asset needed).
export const GrungeDivider: React.FC<{ progress: number; width?: number }> = ({
  progress,
  width = 500,
}) => {
  const drawPct = interpolate(progress, [0, 1], [0, 100], clamp);
  return (
    <svg width={width} height={12} viewBox={`0 0 ${width} 12`}>
      <polyline
        points={`0,6 ${width * 0.15},3 ${width * 0.3},9 ${width * 0.45},4 ${width * 0.6},8 ${width * 0.75},2 ${width * 0.9},7 ${width},5`}
        fill="none"
        stroke={COLORS.blood}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={`${drawPct} ${100 - drawPct}`}
        pathLength={100}
      />
    </svg>
  );
};

// Placeholder mascot mark — a flat, geometric skull silhouette standing in for the
// real Reaper Icon art. Swap for <Img src={staticFile("reaper-icon.png")} /> once the
// Higgsfield-generated canon asset lands in public/ (see HANDOFF.md).
export const SkullMark: React.FC<{ size?: number; glow?: number }> = ({ size = 120, glow = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: glow ? `drop-shadow(0 0 ${glow}px ${COLORS.blood})` : undefined }}>
    <path
      d="M50 6 C25 6 10 24 10 46 C10 62 18 72 24 78 L24 90 L38 90 L38 80 L44 80 L44 90 L56 90 L56 80 L62 80 L62 90 L76 90 L76 78 C82 72 90 62 90 46 C90 24 75 6 50 6 Z"
      fill={COLORS.bone}
      stroke={COLORS.driedBlood}
      strokeWidth={2}
    />
    <ellipse cx="34" cy="44" rx="9" ry="12" fill={COLORS.bgVoid} />
    <ellipse cx="66" cy="44" rx="9" ry="12" fill={COLORS.bgVoid} />
    <path d="M50 54 L44 66 L56 66 Z" fill={COLORS.bgVoid} />
    <path d="M36 74 L44 74 L44 78 L36 78 Z M56 74 L64 74 L64 78 L56 78 Z" fill={COLORS.bgVoid} />
  </svg>
);
