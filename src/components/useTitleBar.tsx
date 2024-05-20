import { useTheme } from "@mui/material";
import { useEffect } from "react";

export function useTitleBar() {
  const { palette } = useTheme();
  const color = palette.background.default;
  useEffect(() => {
    let node = document.querySelector('meta[name="theme-color"]');
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute("name", "theme-color");
      document.head.appendChild(node);
    }
    node.setAttribute("content", color);
  }, [color]);
}
