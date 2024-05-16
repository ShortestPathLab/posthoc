import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Stack,
  ThemeProvider,
} from "@mui/material";
import Root from "@theme/Root";
import { map } from "lodash";
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";
import { useContext, useEffect } from "react";
import { AppBar } from "../components/AppBar";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { Gallery } from "../components/Gallery";
import { GetStartedButton } from "../components/GetStartedButton";
import { Hero } from "../components/Hero";
import { ModeContext, useMode } from "../components/ModeContext";
import { SectionTitle } from "../components/SectionTitle";
import { grid } from "../components/grid";
import { makeTheme } from "../components/theme";
import l10n from "./en-au.json";
import "./index.module.css";
import { PlayArrowOutlined } from "@mui/icons-material";

const themes = {
  dark: makeTheme("dark"),
  light: makeTheme("light"),
};

function Content() {
  const [mode] = useMode();

  useEffect(() => {
    const sb = OverlayScrollbars(document.body, {
      overflow: { x: "hidden", y: "scroll" },
      scrollbars: {
        // theme: mode === "dark" ? "os-theme-light" : undefined,
      },
    });
    () => sb.destroy();
  }, [mode]);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          backgroundImage: `radial-gradient(46.56% 45.08% at 56.04% 55.33%,rgba(0,50,255,.075) 0,transparent 100%),radial-gradient(46.69% 41.74% at 69.64% 60.81%,rgba(192,59,196,.075) 0,transparent 100%),radial-gradient(59.78% 45.73% at 30.42% 58.68%,rgba(0,120,212,.075) 0,transparent 100%),radial-gradient(32.53% 31.57% at 50% 66.82%,rgba(70,54,104,.075) 0,transparent 100%)`,
          backgroundSize: "100vw 200vh",
          backgroundPosition: "50% 30vh",
          backgroundRepeat: "no-repeat",
          transition: (t) =>
            t.transitions.create("background-color", {
              duration: t.transitions.duration.complex,
            }),
        }}
      >
        <Box>
          <Box
            sx={{
              textAlign: "center",
              maxWidth: "100%",
              width: 1000 + 8 * 8,
              px: 4,
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
                  width: 1000,
                  mx: "auto",
                  maxWidth: "100%",
                  aspectRatio: "16 / 10",
                  overflow: "hidden",
                  borderRadius: 4,
                  backgroundImage: `url(${l10n.demoVideoThumbnail})`,
                  backgroundSize: "cover",
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

              <SectionTitle
                anchor="team"
                title={l10n.teamSectionTitle}
                subtitle={l10n.teamSectionSubtitle}
              />
              <Stack gap={4} sx={grid(260)}>
                {map(l10n.team, ({ avatar, name, title, github }) => (
                  <Button
                    sx={{ p: 0 }}
                    onClick={() => !!github && window.open(github)}
                  >
                    <Card
                      sx={{ py: 6, width: "100%", color: "text.primary" }}
                      image={<Avatar sx={{ mb: 4, width: 64, height: 64 }} />}
                      title={name}
                      subtitle={title}
                    />
                  </Button>
                ))}
              </Stack>
            </Box>
            <Box>
              <SectionTitle anchor="team" title={l10n.endCallToActionTitle} />
              <GetStartedButton />
            </Box>
          </Box>
          <Footer />
        </Box>
      </Box>
      <AppBar />
    </>
  );
}

function ContentWithTheme() {
  const [mode] = useContext(ModeContext);
  return (
    <ThemeProvider theme={themes[mode]}>
      <CssBaseline>
        <Content />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default function Home() {
  return (
    <Root>
      <ContentWithTheme />
    </Root>
  );
}
