import { ArrowDownwardOutlined, PlayArrowOutlined } from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Root from "@theme/Root";
import { map } from "lodash";
import "overlayscrollbars/overlayscrollbars.css";
import { useEffect } from "react";
import { AppBar } from "../components/AppBar";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { Gallery } from "../components/Gallery";
import { GetStartedButton } from "../components/GetStartedButton";
import { Hero } from "../components/Hero";
import { useMode } from "../components/ModeContext";
import { SectionTitle } from "../components/SectionTitle";
import { flex, grid } from "../components/grid";
import { useSm } from "../components/useSm";
import { useTitleBar } from "../components/useTitleBar";
import { l10n } from "../l10n";
import "./index.module.css";
import { PAGE_WIDTH } from "../config";
function Content() {
  const sm = useSm();
  const [mode] = useMode();

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        backgroundSize: "100vw 100vh",
        backgroundPosition: "50% 45vh",
        backgroundRepeat: "no-repeat",
        transition: (t) =>
          t.transitions.create("background-color", {
            duration: t.transitions.duration.complex,
          }),
      }}
    >
      <AppBar />
      <Box>
        <Box
          sx={{
            maxWidth: "100%",
            width: PAGE_WIDTH + 8 * 8,
            px: sm ? 3 : 4,
            m: "0 auto",
            pb: 12,
          }}
        >
          <Box sx={{ pb: 9 }}>
            <Hero />
            <Gallery />
            <Stack
              sx={
                sm
                  ? { pt: 8, pb: 8, gap: 4 }
                  : {
                      px: 4,
                      flexDirection: "row",
                      pt: 16,
                      pb: 16,
                      gap: 8,
                      justifyContent: "space-between",
                    }
              }
            >
              <Box sx={{ maxWidth: 420 }}>
                <SectionTitle
                  noPadding
                  title={l10n.demoSectionTitle}
                  subtitle={
                    <Box sx={{ whiteSpace: "pre-line", mt: 1 }}>
                      {l10n.demoSectionSubtitle}
                    </Box>
                  }
                />
                <Button
                  onClick={() => open(l10n.demoVideoUrl)}
                  color="primary"
                  sx={{
                    mt: 4,
                    mx: "auto",
                    py: 2,
                    px: 4,
                    borderRadius: 32,
                    // Light text rendering bias
                    fontWeight: mode === "dark" ? 600 : 500,
                    bgcolor: (t) => alpha(t.palette.primary.main, 0.075),
                    color: "primary.main",
                  }}
                  startIcon={<PlayArrowOutlined />}
                  variant="contained"
                >
                  {l10n.playVideo}
                </Button>
              </Box>
              <Button
                onClick={() => open(l10n.demoVideoUrl)}
                sx={{
                  p: 0,
                  width: sm ? PAGE_WIDTH : 640,
                  mx: sm ? "auto" : 0,
                  maxWidth: "100%",
                  aspectRatio: 16 / 10,
                  overflow: "hidden",
                  borderRadius: 4,
                  backgroundImage: `url(${l10n.demoVideoThumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </Stack>
          </Box>
          <Stack
            sx={{
              px: sm ? 0 : 4,
              flexDirection: sm ? "column" : "row",
              alignItems: sm ? "stretch" : "center",
              pb: 4,
              gap: 4,
              textAlign: sm ? "center" : "left",
              justifyContent: sm ? "center" : "space-between",
            }}
          >
            <Typography variant="h3" color="text.primary">
              {l10n.endCallToActionTitle}
            </Typography>
            {!sm && (
              <Divider
                sx={{
                  flex: 1,
                  opacity: (t) => (t.palette.mode === "dark" ? 0.5 : 1),
                }}
              />
            )}
            <GetStartedButton />
          </Stack>
          <Box sx={{ pb: sm ? 8 : 16, px: sm ? 0 : 4 }}>
            <Divider
              sx={{
                mx: "-100%",
                opacity: (t) => (t.palette.mode === "dark" ? 0.25 : 0.75),
                mt: 12,
              }}
            />
            <SectionTitle
              anchor="team"
              title={
                <Typography variant="h6" color="text.secondary">
                  {l10n.teamSectionSubtitle}
                </Typography>
              }
            />
            <Stack gap={4} sx={grid(260)}>
              {map(l10n.team, ({ avatar, name, title, github }) => (
                <Button sx={{ p: 0, mx: -2 }} href={github}>
                  <Card
                    sx={{
                      textAlign: "left",
                      width: "100%",
                      height: "100%",
                      color: "text.primary",
                      alignItems: "left",
                      p: 2,
                    }}
                    image={
                      <Avatar
                        src={avatar}
                        sx={{ mb: 4, width: 48, height: 48 }}
                      />
                    }
                    title={name}
                    subtitle={
                      <span style={{ whiteSpace: "pre" }}>{title}</span>
                    }
                  />
                </Button>
              ))}
            </Stack>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ pt: 8, pb: 4, mx: "auto" }}
            >
              {l10n.teamContributorTitle}
            </Typography>
            <Stack gap={4} sx={flex(140)}>
              {map(l10n.contributors, (s) => (
                <Typography
                  sx={{ minWidth: "max-content" }}
                  color="text.primary"
                  variant="subtitle2"
                >
                  {s}
                </Typography>
              ))}
            </Stack>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ pt: 8, pb: 4, mx: "auto" }}
            >
              {l10n.teamSupporterTitle}
            </Typography>
            <Stack gap={4} sx={flex(140)}>
              {map(l10n.supporters, (s) => (
                <Typography
                  sx={{ minWidth: "max-content" }}
                  color="text.primary"
                  variant="subtitle2"
                >
                  {s}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

function ContentWithTheme() {
  const { palette } = useTheme();
  useTitleBar();
  useEffect(() => {
    document.body.style.backgroundColor = palette.background.default;
    document.body.style.color = palette.text.primary;
  }, [palette.background.default, palette.text.primary]);
  return (
    <CssBaseline>
      <Content />
    </CssBaseline>
  );
}

export default function Home() {
  return (
    <Root>
      <ContentWithTheme />
    </Root>
  );
}
