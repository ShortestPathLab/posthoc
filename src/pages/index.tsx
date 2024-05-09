import {
  ArrowBack,
  ArrowForward,
  CloseOutlined as CloseIcon,
  DragHandleOutlined as MenuIcon,
  LaunchOutlined as OpenIcon,
  FilterTiltShiftOutlined as ShowVideoIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  CssBaseline,
  Divider,
  Fade,
  IconButton,
  Stack,
  StackProps,
  SxProps,
  Tab,
  Tabs,
  Theme,
  ThemeProvider,
  Typography,
  alpha,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { Dictionary, find, first, keyBy, map, mapValues, times } from "lodash";
import PopupState, { bindTrigger } from "material-ui-popup-state";
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";
import {
  ComponentProps,
  ReactNode as RN,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { makeTheme, usePaper } from "../components/theme";
import l10n from "./en-au.json";

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
  const sm = useSm();
  const paper = usePaper();
  const top = useScrollTrigger({ threshold: 0, disableHysteresis: true });
  const menu = l10n.sections.map(({ url, label }) => (
    <ButtonBase
      sx={{ py: 1, px: 2, borderRadius: 4, justifyContent: "flex-start" }}
      onClick={() => (location.href = url)}
    >
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {label}
      </Typography>
    </ButtonBase>
  ));
  const openPosthoc = (
    <Button
      startIcon={<OpenIcon sx={{ color: "primary.main" }} />}
      sx={{ py: 1.5, px: 2, color: "text.primary", borderRadius: 32 }}
      onClick={() => window.open(l10n.appUrl)}
    >
      {l10n.openAppLabel}
    </Button>
  );
  return (
    <Box
      sx={{
        width: "100vw",
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
            ...(top
              ? {
                  ...paper(1),
                  // boxShadow: "inset 0px 1px 0px 1px rgba(255,255,255,0.05)",
                }
              : {}),
            width: 1000 + 8 * 4,
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
                      <MenuIcon />
                    </IconButton>
                    {createPortal(
                      <Fade in={state.isOpen}>
                        <Box
                          sx={{
                            ...paper(0),
                            position: "fixed",
                            zIndex: (t) => t.zIndex.modal,
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            borderRadius: 0,
                          }}
                        >
                          <Stack gap={4} p={3.5} alignItems="flex-end">
                            <IconButton onClick={state.close}>
                              <CloseIcon />
                            </IconButton>
                            {menu}
                          </Stack>
                        </Box>
                      </Fade>,
                      document.body
                    )}
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

function Gallery() {
  const paper = usePaper();
  const [selected, setSelected] = useState(0);
  return (
    <Stack gap={4}>
      <Box
        sx={{
          ...paper(0),
          overflow: "hidden",
          height: "fit-content",
          aspectRatio: 16 / 10,
        }}
      >
        <img src={l10n.gallery[selected].url}></img>
      </Box>
      <Tabs
        variant="scrollable"
        allowScrollButtonsMobile
        scrollButtons={true}
        value={selected}
        onChange={(e, i) => setSelected(i)}
        sx={{
          " button.Mui-selected": { color: "text.primary" },
        }}
      >
        {map(l10n.gallery, ({ label, url }, i) => (
          <Tab key={url} label={label} value={i} />
        ))}
      </Tabs>
    </Stack>
  );
}

type SV = {
  showVideo?: boolean;
  onShowVideo?: (b: boolean) => void;
};

function Hero({ showVideo, onShowVideo }: SV) {
  const sm = useSm();
  return (
    <Stack
      gap={4}
      justifyContent="center"
      alignItems={sm ? "stretch" : "flex-start"}
      sx={{
        maxWidth: "100vw",
        minHeight: 720,
        height: "90vh",
        textAlign: "left",
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
          pr: "8vw",
          fontWeight: 600,
          color: "primary.main",
          fontSize: "1rem",
        }}
        variant="overline"
      >
        {l10n.org} / {l10n.name}
      </Typography>
      <Typography sx={{ zIndex: 1, pr: "8vw" }} variant="h1">
        {l10n.heroTitle}
      </Typography>
      <Typography sx={{ zIndex: 1 }} variant="body2" color="text.secondary">
        {l10n.heroSubtitle}
      </Typography>
      {space()}
      <Stack direction={sm ? "column" : "row"} gap={2}>
        <Button
          sx={{ py: 2, px: 4 }}
          variant="contained"
          endIcon={<ArrowForward />}
          onClick={() => (location.href = l10n.heroCallToActionUrl)}
        >
          {l10n.heroCallToAction}
        </Button>
        <Button
          onClick={() => onShowVideo(true)}
          startIcon={<ShowVideoIcon />}
          sx={{
            color: "text.secondary",
            py: 2,
            px: 4,
          }}
        >
          {l10n.showVideo}
        </Button>
      </Stack>
      {space(4)}
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
      <Typography sx={{ textAlign: "center" }} variant="h2">
        {title ?? "Title"}
      </Typography>
      <Typography
        sx={{ textAlign: "center" }}
        variant="body2"
        color="text.secondary"
      >
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
  const theme = useTheme();
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
            background: theme.palette.background.paper,
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
              0.9
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
  const sm = useSm();
  return (
    <>
      <Box p={4}>
        <Stack
          gap={4}
          sx={{
            maxWidth: "100%",
            width: 1000,
            px: sm ? 0 : 3,
            py: 4,
            m: "0 auto",
          }}
        >
          <Stack direction="row" gap={8}>
            <Logo width={32} height={32} />
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
  useEffect(() => {
    OverlayScrollbars(document.body, {
      overflow: { x: "hidden", y: "scroll" },
      scrollbars: {
        theme: "os-theme-light",
      },
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Background showVideo={showVideo} onShowVideo={setShowVideo} />
        <Fade in={!showVideo}>
          <Box
            sx={{
              position: "absolute",
              zIndex: showVideo ? 1 : 0,
              height: "100vh",
              width: "100vw",
              top: "50vh",
              transition: (t) => t.transitions.create(["z-index", "opacity"]),
              backgroundSize: "cover",
              backgroundPosition: "center",
              background: `radial-gradient(46.56% 45.08% at 56.04% 55.33%,rgba(0,50,255,.2) 0,transparent 100%),radial-gradient(46.69% 41.74% at 69.64% 60.81%,rgba(192,59,196,.2) 0,transparent 100%),radial-gradient(59.78% 45.73% at 30.42% 58.68%,rgba(0,120,212,.2) 0,transparent 100%),radial-gradient(32.53% 31.57% at 50% 66.82%,rgba(70,54,104,.2) 0,transparent 100%)`,
            }}
          ></Box>
        </Fade>
        <Box
          sx={{
            ...getShowVideoOpacityStyle(showVideo),
            maxWidth: "100%",
            width: 1000 + 8 * 8,
            px: 4,
            m: "0 auto",
            pb: 9,
            zIndex: 3,
          }}
        >
          <Box sx={{ pb: 9 }}>
            <Hero showVideo={showVideo} onShowVideo={setShowVideo} />
            <Gallery />
            <SectionTitle
              title={l10n.demoSectionTitle}
              subtitle={l10n.demoSectionSubtitle}
            />
            <Box
              sx={{
                width: 1000,
                mx: "auto",
                maxWidth: "100%",
                aspectRatio: "16 / 10",
                overflow: "hidden",
                borderRadius: 8,
              }}
            >
              <iframe
                src="https://drive.google.com/file/d/1ve-GQbgj0MGcouCdE0gxQON-20rpxtW5/preview"
                width="100%"
                height="100%"
                allow="autoplay"
              ></iframe>
            </Box>
            {/* <SectionTitle
              anchor="features"
              title={l10n.featuresSectionTitle}
              subtitle={l10n.featuresSectionSubtitle}
            /> */}
            {/* <Stack gap={4} sx={grid(320)}>
              {times(6, () => (
                <Card p={6} image={<Box sx={{ height: 280 }}></Box>} />
              ))}
            </Stack> */}
            {/* <SectionTitle
              anchor="docs"
              title={l10n.docsSectionTitle}
              subtitle={l10n.docsSectionSubtitle}
            />
            <DocSelector /> */}
            {/* <SectionTitle
              anchor="team"
              title={l10n.teamSectionTitle}
              subtitle={l10n.teamSectionSubtitle}
            />
            <Stack gap={4} sx={grid(260)}>
              {times(3, () => (
                <Card p={2} />
              ))}
            </Stack> */}
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
