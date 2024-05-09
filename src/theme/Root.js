import { CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { makeTheme } from "../components/theme";

export const ModeContext = createContext(["dark", () => {}]);

// Default implementation, that you can customize
export default function Root({ children }) {
  const state = useState("dark");
  const [mode] = state;
  const theme = useMemo(() => makeTheme(mode), [mode]);

  return (
    <ModeContext.Provider value={state}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ModeContext.Provider>
  );
}
