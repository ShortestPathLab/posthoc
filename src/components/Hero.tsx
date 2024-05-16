import { FilterTiltShiftOutlined as ShowVideoIcon } from "@mui/icons-material";
import { Button, Link, Stack, Typography } from "@mui/material";
import l10n from "../pages/en-au.json";
import { space } from "../pages/space";
import { GetStartedButton } from "./GetStartedButton";

export function Hero() {
  return (
    <Stack
      gap={4}
      justifyContent="center"
      alignItems={"center"}
      sx={{
        maxWidth: "100vw",
        minHeight: 720,
        height: "90vh",
        textAlign: "center",
        pt: 36,
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
      <Typography sx={{ zIndex: 1, px: "4vw" }} variant="h1">
        {l10n.heroTitle}
      </Typography>
      <Typography sx={{ zIndex: 1, px: "16vw" }} variant="subtitle1">
        {l10n.heroSubtitle}
      </Typography>
      {space()}
      <Stack direction="row" flexWrap="wrap" gap={1}>
        <GetStartedButton />
        <Button
          onClick={() => open(l10n.demoVideoUrl)}
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
