import { FilterTiltShiftOutlined as ShowVideoIcon } from "@mui/icons-material";
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
      alignItems="center"
      sx={{
        maxWidth: "100dvw",
        height: "60svh",
        minHeight: 520,
        textAlign: "center",
        pt: 24,
        pb: 16,
        mx: "auto",
      }}
    >
      {space()}
      <Typography
        sx={{
          zIndex: 1,
          mb: -2,
          color: "primary.main",
          fontSize: "1rem",
          fontWeight: 500,
        }}
        variant="overline"
      >
        <Link href={l10n.orgUrl} sx={{ textDecorationStyle: "dotted" }}>
          {l10n.org}
        </Link>{" "}
        / {l10n.name}
      </Typography>
      <Typography
        sx={{ zIndex: 1, px: "4dvw" }}
        variant="h1"
        color="text.primary"
      >
        {l10n.heroTitle}
      </Typography>
      <Typography
        sx={{ zIndex: 1, px: "4dvw", maxWidth: 640 }}
        variant="subtitle1"
        color="text.primary"
      >
        {l10n.heroSubtitle}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={2} sx={{ pt: sm ? 0 : 4 }}>
        <GetStartedButton />
        <Button
          href={l10n.demoVideoUrl}
          startIcon={<ShowVideoIcon />}
          sx={{
            mx: "auto",
            color: "text.primary",
            py: 2,
            px: 4,
            borderRadius: 32,
          }}
        >
          {l10n.showVideo}
        </Button>
      </Stack>
      {space(4)}
    </Stack>
  );
}
