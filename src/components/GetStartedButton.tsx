import { ArrowForward } from "@mui/icons-material";
import { Button, useTheme } from "@mui/material";
import { l10n } from "../l10n";

export function GetStartedButton() {
  const mode = useTheme().palette.mode;
  return (
    <Button
      color="secondary"
      sx={{
        mx: "auto",
        py: 2,
        px: 4,
        borderRadius: 32,
        // Light text rendering bias
        fontWeight: mode === "dark" ? 600 : 500,
        "&:hover": { color: "secondary.contrastText" },
      }}
      variant="contained"
      endIcon={<ArrowForward />}
      href={l10n.heroCallToActionUrl}
    >
      {l10n.heroCallToAction}
    </Button>
  );
}
