import { createContext, useContext } from "react";

export const ModeContext = createContext<
  ["light" | "dark", (m: "light" | "dark") => void]
>([(localStorage.getItem("theme") as any) || "light", () => {}]);

export function useMode() {
  return useContext(ModeContext);
}
