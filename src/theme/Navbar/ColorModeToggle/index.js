import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode, useThemeConfig } from "@docusaurus/theme-common";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useMode } from "../../../components/ModeContext";

export default function NavbarColorModeToggle({ className }) {
  const [mode, setMode] = useMode();
  const { setColorMode } = useColorMode();
  const disabled = useThemeConfig().colorMode.disableSwitch;
  if (disabled) {
    return null;
  }
  return (
    <BrowserOnly>
      {() => (
        <Box>
          <IconButton
            sx={{ color: "text.primary" }}
            onClick={() => {
              setColorMode(mode === "light" ? "dark" : "light");
              setMode(mode === "light" ? "dark" : "light");
            }}
          >
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
        </Box>
      )}
    </BrowserOnly>
  );
}
