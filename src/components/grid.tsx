export const grid = (size: number) => ({
  display: "grid",
  gridAutoFlow: "row",
  gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${size}px), 1fr))`,
});
export const flex = (size: number) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  // justifyContent: "center",
  "> *": { width: size },
});
