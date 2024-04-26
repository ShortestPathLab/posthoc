import {
  ArrowBack,
  ArrowForward,
  FilterTiltShiftOutlined,
  Menu,
} from "@mui/icons-material";
import {
  Fade,
  Box,
  Button,
  ButtonBase,
  CssBaseline,
  Divider,
  IconButton,
  Popover,
  Stack,
  StackProps,
  SxProps,
  Theme,
  ThemeProvider,
  Typography,
  alpha,
  useMediaQuery,
  useScrollTrigger,
} from "@mui/material";
import { Dictionary, find, first, keyBy, mapValues, times } from "lodash";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import {
  ComponentProps,
  ReactNode as RN,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import l10n from "./en-au.json";
import { makeTheme, usePaper } from "../components/theme";

const theme = makeTheme("dark");

const grid = (size: number) => ({
  display: "grid",
  gridAutoFlow: "row",
  gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${size}px), 1fr))`,
});

const getShowVideoOpacityStyle = (showVideo?: boolean): SxProps<Theme> => ({
  opacity: +!showVideo,
  transition: (t) => t.transitions.create("opacity"),
  pointerEvents: showVideo ? "none" : "all",
});

const space = (n = 1) => times(n, () => <Box flex={1}></Box>);

function useSm() {
  return useMediaQuery("(max-width: 580px)");
}

function useScrollListener(setShowVideo: (b: boolean) => void) {
  useEffect(() => {
    let prevScrollTop = document.documentElement.scrollTop;
    const f = () => {
      const nextScrollTop = document.documentElement.scrollTop;
      if (nextScrollTop > prevScrollTop) {
        setShowVideo(false);
      }
      prevScrollTop = nextScrollTop;
    };
    addEventListener("scroll", f);
    return () => removeEventListener("scroll", f);
  }, [setShowVideo]);
}

function AppBar({ showVideo }: SV) {
  const paper = usePaper();
  const sm = useSm();
  const top = useScrollTrigger({ threshold: 0, disableHysteresis: true });
  const menu = l10n.sections.map(({ url, label }) => (
    <ButtonBase
      sx={{ py: 1, px: 2, borderRadius: 4, justifyContent: "flex-start" }}
      onClick={() => location.replace(url)}
    >
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
    </ButtonBase>
  ));
  const openPosthoc = (
    <Button
      variant="contained"
      sx={{ ...paper(1), py: 1.5, px: 4 }}
      onClick={() => window.open(l10n.appUrl)}
    >
      Open Posthoc
    </Button>
  );
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        px: 2,
        zIndex: (t) => t.zIndex.appBar,
        ...getShowVideoOpacityStyle(showVideo),
      }}
    >
      <Fade in>
        <Stack
          gap={1}
          alignItems="center"
          direction="row"
          sx={{
            p: 1,
            mx: "auto",
            mt: sm ? 2 : 4,
            transition: (t) =>
              t.transitions.create(["background-color", "backdrop-filter"]),
            ...(top
              ? {
                  ...paper(1),
                }
              : {}),
            width: 1000,
            maxWidth: "100%",
            height: 64,
            borderRadius: 9,
          }}
        >
          <Box sx={{ ml: 1, mr: 2, height: 32, minWidth: 32 }}>
            <Logo />
          </Box>
          {sm ? (
            <>
              <Box sx={{ flex: 1 }}></Box>
              {openPosthoc}
              <PopupState variant="popover">
                {(state) => (
                  <>
                    <IconButton {...bindTrigger(state)}>
                      <Menu />
                    </IconButton>
                    <Popover
                      onClick={state.close}
                      {...bindPopover(state)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      slotProps={{
                        paper: {
                          sx: {
                            ...paper(1),
                            mt: 4,
                            borderRadius: 8,
                          },
                        },
                      }}
                    >
                      <Stack gap={2} p={2}>
                        {menu}
                      </Stack>
                    </Popover>
                  </>
                )}
              </PopupState>
            </>
          ) : (
            <>
              {menu}
              {space()}
              {openPosthoc}
            </>
          )}
        </Stack>
      </Fade>
    </Box>
  );
}

function Logo(props: ComponentProps<"img">) {
  return <img src={l10n.logoUrl} width={32} height={32} {...props} />;
}

type SV = {
  showVideo?: boolean;
  onShowVideo?: (b: boolean) => void;
};

function Hero({ showVideo, onShowVideo }: SV) {
  return (
    <Stack
      gap={4}
      alignItems="center"
      justifyContent="center"
      sx={{
        maxWidth: 740,
        height: "80vh",
        textAlign: "center",
        pt: 48,
        pb: 16,
        mx: "auto",
      }}
    >
      {space()}
      <Typography sx={{ zIndex: 1 }} variant="h1">
        {l10n.heroTitle}
      </Typography>
      <Typography sx={{ zIndex: 1 }} variant="body2" color="text.secondary">
        {l10n.heroSubtitle}
      </Typography>
      <Button
        sx={{ py: 2, px: 6 }}
        variant="contained"
        endIcon={<ArrowForward />}
      >
        {l10n.heroCallToAction}
      </Button>
      {space()}
      <Button
        onClick={() => onShowVideo(true)}
        startIcon={<FilterTiltShiftOutlined />}
        sx={{
          color: "text.secondary",
          py: 2,
          px: 6,
        }}
      >
        {l10n.showVideo}
      </Button>
      {space(2)}
    </Stack>
  );
}

function SectionTitle({
  title,
  subtitle,
  anchor,
}: {
  title?: RN;
  subtitle?: RN;
  anchor?: string;
}) {
  return (
    <Stack
      id={anchor}
      alignItems="center"
      gap={2}
      sx={{
        pt: 16,
        pb: 8,
      }}
    >
      <Typography variant="h2">{title ?? "Title"}</Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle ?? "Subtitle"}
      </Typography>
    </Stack>
  );
}

function Card({
  image,
  title,
  subtitle,
  ...props
}: {
  image?: RN;
  title?: RN;
  subtitle?: RN;
} & StackProps) {
  const paper = usePaper();
  return (
    <Stack
      alignItems="center"
      gap={1}
      {...props}
      ///@ts-ignore
      sx={{ ...paper(1), p: 8, ...props.sx }}
    >
      {image ?? <Box height={64}></Box>}
      <Typography variant="h3">{title ?? "Title"}</Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle ?? "Subtitle"}
      </Typography>
    </Stack>
  );
}

function DocSelector() {
  const [selection, reduce] = useReducer(
    (a: Dictionary<string>, b: Dictionary<string>) => ({ ...a, ...b }),
    mapValues(keyBy(l10n.docs, "key"), (v) => first(v.options).key)
  );
  const paper = usePaper();
  const label = (k1: string, k2: string) =>
    find(find(l10n.docs, { key: k1 }).options, { key: k2 }).label;
  return (
    <>
      <Stack alignItems="center" gap={6}>
        {l10n.docs.map(({ label, options, key }) => (
          <Stack gap={4} width="100%" alignItems="center">
            <Typography variant="h3">{label}</Typography>
            <Stack gap={2} sx={grid(180)} width="90%">
              {options.map((option) => (
                <Button
                  onClick={() => reduce({ [key]: option.key })}
                  variant="contained"
                  sx={{
                    py: 4,
                    borderRadius: 8,
                    ...(selection[key] === option.key ? {} : paper(1)),
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </Stack>
          </Stack>
        ))}
        <Button
          sx={{ py: 2, px: 6, mt: 4, borderRadius: 8 }}
          variant="contained"
          onClick={() => open(l10n.docsUrlGeneric)}
        >
          {selection.lang === "other" || selection.os === "other"
            ? l10n.docsCallToActionGeneric
            : l10n.docsCallToAction
                .replace("%os", label("os", selection.os))
                .replace("%lang", label("lang", selection.lang))}
        </Button>
      </Stack>
    </>
  );
}

function Background({ showVideo, onShowVideo }: SV) {
  const paper = usePaper();
  const ref = useRef<HTMLDivElement>();
  let cancelled = false;
  useEffect(() => {
    const f = () => {
      if (ref.current && !cancelled) {
        ref.current.style.transform = `translateY(${
          document.documentElement.scrollTop * -0.75
        }px)`;
        requestAnimationFrame(f);
      }
    };
    requestAnimationFrame(f);
    f();
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <>
      <Box
        ref={ref}
        sx={{
          position: "fixed",
          zIndex: showVideo ? 1 : 0,
          height: "100vh",
          width: "100vw",
          transition: (t) => t.transitions.create("z-index"),
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <video
          muted={!showVideo}
          autoPlay
          controls={showVideo}
          width="100%"
          height="100%"
          loop
          style={{
            objectFit: showVideo ? "contain" : "cover",
          }}
        >
          <source src={l10n.backdropVideoUrl} type={l10n.backdropVideoMime} />
        </video>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "calc(100% + 1px)",
            top: 0,
            left: 0,
            zIndex: 1,
            transition: (t) => t.transitions.create("background"),
            ...getShowVideoOpacityStyle(showVideo),
            background: (t) => `
            linear-gradient(to bottom, ${alpha(
              t.palette.background.default,
              0.6
            )} 60%, ${t.palette.background.default})
            `,
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            p: 4,
            zIndex: 3,
            ...getShowVideoOpacityStyle(!showVideo),
          }}
        >
          <Button
            variant="contained"
            sx={{ ...paper(1), py: 1.5, px: 4 }}
            startIcon={<ArrowBack />}
            onClick={() => onShowVideo(false)}
          >
            {l10n.closeVideo}
          </Button>
        </Box>
      </Box>
    </>
  );
}

function Footer() {
  const paper = usePaper();
  return (
    <>
      <Box sx={{ ...paper(1), borderRadius: 0 }} p={4}>
        <Stack
          gap={4}
          sx={{
            maxWidth: "100%",
            width: 1000,
            px: 3,
            py: 4,
            m: "0 auto",
          }}
        >
          <Stack direction="row" gap={8}>
            <Logo width={48} height={48} />
            <Stack sx={grid(180)} gap={8} flex={1}>
              {l10n.footerLinks.map(({ title, links }) => (
                <Stack gap={1} sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ pb: 2 }}>
                    {title}
                  </Typography>
                  {links.map(({ label, url }) => (
                    <ButtonBase
                      sx={{
                        width: "100%",
                        px: 2,
                        mx: -2,
                        py: 1,
                        justifyContent: "flex-start",
                        borderRadius: 8,
                        textAlign: "left",
                      }}
                      onClick={() => open(url)}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {label}
                      </Typography>
                    </ButtonBase>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Stack>
          {space()}
          <Divider sx={{ opacity: 0.25 }} />
          <Typography textAlign="right" color="text.secondary">
            {l10n.footerCopyright}
          </Typography>
        </Stack>
      </Box>
    </>
  );
}

export default function Home() {
  const paper = usePaper();
  const [showVideo, setShowVideo] = useState(false);
  useScrollListener(setShowVideo);
  useVideoStartController(showVideo);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Background showVideo={showVideo} onShowVideo={setShowVideo} />
        <Box
          sx={{
            ...getShowVideoOpacityStyle(showVideo),
            maxWidth: "100%",
            width: 1000,
            px: 3,
            m: "0 auto",
            pb: 9,
            zIndex: 3,
          }}
        >
          <Box sx={{ pb: 9 }}>
            <Hero showVideo={showVideo} onShowVideo={setShowVideo} />
            <SectionTitle
              title={l10n.demoSectionTitle}
              subtitle={l10n.demoSectionSubtitle}
            />
            <Box
              sx={{
                width: 960,
                mx: "auto",
                maxWidth: "95%",
                aspectRatio: "16 / 10",
                overflow: "hidden",
                borderRadius: 8,
              }}
            >
              <video
                controls
                width="100%"
                height="100%"
                style={{ borderRadius: 8, objectFit: "cover" }}
              >
                <source src={l10n.demoVideoUrl} type={l10n.demoVideoMime} />
              </video>
            </Box>
            <SectionTitle
              anchor="features"
              title={l10n.featuresSectionTitle}
              subtitle={l10n.featuresSectionSubtitle}
            />
            <Stack gap={4} sx={grid(320)}>
              {times(6, () => (
                <Card p={6} image={<Box sx={{ height: 280 }}></Box>} />
              ))}
            </Stack>
            <SectionTitle
              anchor="docs"
              title={l10n.docsSectionTitle}
              subtitle={l10n.docsSectionSubtitle}
            />
            <DocSelector />
            <SectionTitle
              anchor="team"
              title={l10n.teamSectionTitle}
              subtitle={l10n.teamSectionSubtitle}
            />
            <Stack gap={4} sx={grid(260)}>
              {times(3, () => (
                <Card p={2} />
              ))}
            </Stack>
          </Box>
        </Box>
        <Footer />
        <AppBar showVideo={showVideo} />
      </CssBaseline>
    </ThemeProvider>
  );
}
function useVideoStartController(showVideo: boolean) {
  useEffect(() => {
    if (showVideo) {
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [showVideo]);
}
