import { useColorMode, useThemeConfig } from "@docusaurus/theme-common";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useContext, useEffect } from "react";
import { ModeContext } from "../../Root";

export default function NavbarColorModeToggle({ className }) {
  const [, setMode] = useContext(ModeContext) ?? [];
  const disabled = useThemeConfig().colorMode.disableSwitch;
  const { colorMode, setColorMode } = useColorMode();
  if (disabled) {
    return null;
  }
  useEffect(() => {
    if (setMode) {
      setMode(colorMode);
    }
  }, [colorMode, setMode]);
  return (
    <Box>
      <IconButton
        onClick={() => {
          setColorMode(colorMode === "light" ? "dark" : "light");
        }}
      >
        {colorMode === "dark" ? <DarkModeOutlined /> : <LightModeOutlined />}
      </IconButton>
    </Box>
  );
}
