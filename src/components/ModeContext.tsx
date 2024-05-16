import { createContext, useContext } from "react";
import { get } from "./storage";

export const ModeContext = createContext<
  ["light" | "dark", (m: "light" | "dark") => void]
>([(get("theme") as any) || "light", () => {}]);

export function useMode() {
  return useContext(ModeContext);
}
