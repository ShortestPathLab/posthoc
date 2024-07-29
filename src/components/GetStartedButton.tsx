import { ArrowForward } from "@mui/icons-material";
import { Button } from "@mui/material";
import { l10n } from "../l10n";

export function GetStartedButton() {
  return (
    <Button
      sx={{ py: 1.5, px: 3, borderRadius: 32 }}
      variant="contained"
      endIcon={<ArrowForward />}
      href={l10n.heroCallToActionUrl}
    >
      {l10n.heroCallToAction}
    </Button>
  );
}
