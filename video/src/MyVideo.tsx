import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const MyVideo = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: "#fff",
          fontSize: 80,
          fontWeight: "bold",
          opacity,
        }}
      >
        My Video
      </div>
    </AbsoluteFill>
  );
};
