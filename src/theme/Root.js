import { ThemeProvider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ModeContext } from "../components/ModeContext";
import { makeTheme } from "../components/theme";
import { get, set } from "../components/storage";

// Default implementation, that you can customize
export default function Root({ children }) {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => makeTheme(mode), [mode]);
  useEffect(() => {
    setMode(get("theme"));
  }, []);
  const state = useMemo(
    () => [
      mode,
      (m) => {
        setMode(m);
        set("theme", m);
      },
    ],
    [mode]
  );
  return (
    <ModeContext.Provider value={state}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ModeContext.Provider>
  );
}
