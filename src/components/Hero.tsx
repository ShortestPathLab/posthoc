import {
  PlayArrowOutlined,
  FilterTiltShiftOutlined as ShowVideoIcon,
} from "@mui/icons-material";
import { Button, Link, Stack, Typography } from "@mui/material";
import { l10n } from "../l10n";
import { space } from "./space";
import { GetStartedButton } from "./GetStartedButton";
import { useSm } from "./useSm";

export function Hero() {
  const sm = useSm();
  return (
    <Stack
      gap={4}
      justifyContent="center"
      alignItems="flex-start"
      sx={{
        textAlign: "left",
        maxWidth: "100dvw",
        height: "60svh",
        minHeight: 520,
        pt: 24,
        pb: 16,
      }}
    >
      {space()}
      <Typography
        sx={{
          zIndex: 1,
          mb: -2,
          color: "text.secondary",
          fontSize: "1rem",
          fontWeight: 500,
        }}
        variant="overline"
      >
        <Link
          href={l10n.orgUrl}
          sx={{ textDecorationStyle: "dotted", color: "text.primary" }}
        >
          {l10n.org}
        </Link>{" "}
        / {l10n.name}
      </Typography>
      <Typography
        sx={{ zIndex: 1, maxWidth: 720 }}
        variant="h1"
        color="text.primary"
      >
        {l10n.heroTitle}
      </Typography>
      <Typography
        sx={{ zIndex: 1, maxWidth: 480 }}
        variant={sm ? "body1" : "subtitle1"}
        color="text.primary"
      >
        {l10n.heroSubtitle}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={4} sx={{ pt: sm ? 0 : 4 }}>
        <GetStartedButton />
        <Button
          href={l10n.demoVideoUrl}
          startIcon={<PlayArrowOutlined />}
          sx={{
            color: "text.primary",
            py: 1.5,
            px: 3,
            borderRadius: 32,
            ml: -2.5,
          }}
        >
          {l10n.showVideo}
        </Button>
      </Stack>
      {space(4)}
    </Stack>
  );
}
