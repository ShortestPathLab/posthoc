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
  Fade,
  IconButton,
  Stack,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import PopupState, { bindTrigger } from "material-ui-popup-state";
import { createPortal } from "react-dom";
import l10n from "../pages/en-au.json";
import { space } from "./space";
import { Logo } from "./Logo";
import { useMode } from "./ModeContext";
import { usePaper } from "./theme";
import { useSm } from "./useSm";

export function AppBar() {
  const [mode, setMode] = useMode();
  const sm = useSm();
  const paper = usePaper();
  const top = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
    target: document.body,
  });
  const menu = l10n.sections.map(({ url, label }) => (
    <Button
      sx={{ py: 1.5, px: 2, borderRadius: 32 }}
      onClick={() => (location.href = url)}
    >
      <Typography color="text.primary" variant="button">
        {label}
      </Typography>
    </Button>
  ));
  const openPosthoc = (
    <Button
      startIcon={<OpenIcon sx={{ color: "primary.main" }} />}
      sx={{ py: 1.5, px: 2, borderRadius: 32 }}
      onClick={() => open(l10n.appUrl)}
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
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        px: sm ? 1 : 2,
        pt: sm ? 1 : 4,
        top: 0,
        left: 0,
        zIndex: (t) => t.zIndex.appBar,
      }}
    >
      <Fade in>
        <Stack
          gap={1}
          alignItems="center"
          direction="row"
          sx={{
            p: 2,
            px: 1.5,
            mx: "auto",
            ...(top ? paper(1) : {}),
            width: 1000 + 8 * 4,
            maxWidth: "100%",
            height: 64,
            borderRadius: 32,
          }}
        >
          <Box sx={{ pr: 2, pl: 0.5, height: 32, minWidth: 32 }}>
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
                            t.transitions.create([
                              "opacity",
                              "backdrop-filter",
                            ]),
                          position: "fixed",
                          zIndex: (t) => t.zIndex.modal,
                          top: 0,
                          left: 0,
                          width: "100dvw",
                          height: "100dvh",
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
      </Fade>
    </Box>
  );
}
