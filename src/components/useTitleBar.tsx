import { useTheme } from "@mui/material";
import { useEffect } from "react";

export function useTitleBar() {
  const { palette } = useTheme();
  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')!
      .setAttribute("content", palette.background.default);
  }, [palette.background.default]);
}
