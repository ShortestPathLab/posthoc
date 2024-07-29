import { ArrowDownwardOutlined, PlayArrowOutlined } from "@mui/icons-material";
import {
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
        backgroundImage: `radial-gradient(46.56% 45.08% at 56.04% 55.33%, rgb(138 161 255 / 8%) 0, transparent 100%), radial-gradient(46.69% 41.74% at 69.64% 60.81%, rgb(223 127 226 / 8%) 0, transparent 100%), radial-gradient(59.78% 45.73% at 30.42% 58.68%, rgb(115 182 234 / 8%) 0, transparent 100%), radial-gradient(32.53% 31.57% at 50% 66.82%, rgb(102 63 115 / 8%) 0, transparent 100%)`,
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
            textAlign: "center",
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
            <SectionTitle
              title={l10n.demoSectionTitle}
              subtitle={l10n.demoSectionSubtitle}
            />
            <Button
              onClick={() => open(l10n.demoVideoUrl)}
              sx={{
                p: 0,
                width: PAGE_WIDTH,
                mx: "auto",
                maxWidth: "100%",
                aspectRatio: sm ? 10 / 16 : 16 / 10,
                overflow: "hidden",
                borderRadius: 4,
                backgroundImage: `url(${l10n.demoVideoThumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Button
                color="primary"
                sx={{
                  mx: "auto",
                  py: 2,
                  px: 4,
                  borderRadius: 32,
                  // Light text rendering bias
                  fontWeight: mode === "dark" ? 600 : 500,
                  pointerEvents: "none",
                }}
                startIcon={<PlayArrowOutlined />}
                variant="contained"
              >
                {l10n.playVideo}
              </Button>
            </Button>
          </Box>
          <Box sx={{ pb: 4 }}>
            <SectionTitle title={l10n.endCallToActionTitle} />
            <GetStartedButton />
          </Box>
          <Box sx={{ pb: 16 }}>
            <SectionTitle
              anchor="team"
              title={<ArrowDownwardOutlined />}
              subtitle={l10n.teamSectionSubtitle}
            />
            <Stack gap={4} sx={grid(260)}>
              {map(l10n.team, ({ avatar, name, title, github }) => (
                <Button sx={{ p: 0 }} href={github}>
                  <Card
                    sx={{
                      py: 6,
                      width: "100%",
                      height: "100%",
                      color: "text.primary",
                    }}
                    image={
                      <Avatar
                        src={avatar}
                        sx={{ mb: 4, width: 64, height: 64 }}
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
              sx={{ py: 8, maxWidth: 720, mx: "auto" }}
            >
              {l10n.teamContributorTitle}
            </Typography>
            <Stack gap={4} sx={flex(150)}>
              {map(l10n.contributors, (s) => (
                <Typography color="text.primary" variant="subtitle2">
                  {s}
                </Typography>
              ))}
            </Stack>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ py: 8, maxWidth: 720, mx: "auto" }}
            >
              {l10n.teamSupporterTitle}
            </Typography>
            <Stack gap={4} sx={flex(150)}>
              {map(l10n.supporters, (s) => (
                <Typography color="text.primary" variant="subtitle2">
                  {s}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Box>
        <Footer />
      </Box>
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
