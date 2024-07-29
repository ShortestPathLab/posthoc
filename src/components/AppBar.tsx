import BrowserOnly from "@docusaurus/BrowserOnly";
import {
  CloseOutlined as CloseIcon,
  DarkModeOutlined,
  LightModeOutlined,
  DragHandleOutlined as MenuIcon,
  LaunchOutlined as OpenIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import PopupState, { bindTrigger } from "material-ui-popup-state";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { l10n } from "../l10n";
import { Logo } from "./Logo";
import { useMode } from "./ModeContext";
import { space } from "./space";
import { usePaper } from "./theme";
import { useSm } from "./useSm";
import { PAGE_WIDTH } from "../config";

export function AppBar() {
  return (
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        left: 0,
        height: 72,
        zIndex: (t) => t.zIndex.appBar,
      }}
    >
      <BrowserOnly>{() => <AppBarBody />}</BrowserOnly>
    </Box>
  );
}

function AppBarBody() {
  const [mode, setMode] = useMode();
  const sm = useSm();
  const paper = usePaper();
  const [top, setTop] = useState(true);
  const scrolling = useScrollTrigger();
  useEffect(() => {
    let cancelled = false;
    const f = () => {
      const st = document.documentElement.scrollTop + document.body.scrollTop;
      setTop(st === 0);
      if (!cancelled) requestAnimationFrame(f);
    };
    f();
    return () => void (cancelled = true);
  }, [setTop]);
  const menu = l10n.sections.map(({ url, label }) => (
    <Button sx={{ py: 1.5, px: 2, borderRadius: 32 }} href={url}>
      <Typography color="text.primary" variant="button">
        {label}
      </Typography>
    </Button>
  ));
  const openPosthoc = (
    <Button
      startIcon={<OpenIcon sx={{ color: "primary.main" }} />}
      sx={{ py: 1.5, px: 2, borderRadius: 32 }}
      href={l10n.appUrl}
      target="_blank"
    >
      <Typography color="text.primary" variant="button">
        {l10n.openAppLabel}
      </Typography>
    </Button>
  );
  const darkToggle = (
    <IconButton
      sx={{ color: "text.primary" }}
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
    </IconButton>
  );
  return (
    <Stack
      sx={{
        width: "100%",
        transition: (t) =>
          t.transitions.create(["box-shadow", "padding-top", "transform"]),
        ...(top
          ? { paddingTop: sm ? 0 : 2 }
          : {
              ...paper(1),
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
              borderRadius: 0,
            }),
        ...(scrolling && {
          transform: `translateY(-100%)`,
        }),
      }}
    >
      <Stack
        gap={1}
        alignItems="center"
        direction="row"
        sx={{
          p: 2,
          px: 1.5,
          mx: "auto",
          width: PAGE_WIDTH + 8 * 4,
          maxWidth: "100%",
          height: 72,
        }}
      >
        <Box sx={{ pr: 2, pl: 0.5, height: 28, minWidth: 28 }}>
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
                    <Box
                      sx={{
                        ...(state.isOpen
                          ? { opacity: 1 }
                          : {
                              opacity: 0,
                              pointerEvents: "none",
                            }),
                        ...paper(0),
                        transition: (t) =>
                          t.transitions.create(["opacity", "backdrop-filter"]),
                        position: "fixed",
                        zIndex: (t) => t.zIndex.modal,
                        top: 0,
                        left: 0,
                        width: "100dvw",
                        height: "100vh",
                        borderRadius: 0,
                      }}
                    >
                      <Stack gap={4} p={2.5} alignItems="flex-end">
                        <IconButton onClick={state.close}>
                          <CloseIcon />
                        </IconButton>
                        {darkToggle}
                        {menu}
                        {openPosthoc}
                      </Stack>
                    </Box>,
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
            {darkToggle}
          </>
        )}
      </Stack>
    </Stack>
  );
}
