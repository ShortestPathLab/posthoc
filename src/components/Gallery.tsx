import { WorkspacesOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReactVirtualizedAutoSizer from "react-virtualized-auto-sizer";
import l10n from "../pages/en-au.json";
import { useMode } from "./ModeContext";
import { useSm } from "./useSm";
import { clamp } from "lodash";
import { usePaper } from "./theme";

const isVisible = (d: HTMLDivElement) => {
  var rect = d.getBoundingClientRect();
  var viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

const center = (d: HTMLDivElement) => {
  const box = d.getBoundingClientRect();
  return box.left + box.width / 2;
};

const SCROLL_FAC_NEAR = 1 / 500;

export function Gallery() {
  const [mode] = useMode();
  const paper = usePaper();
  const sm = useSm();
  const [ref, setRef] = useState<HTMLDivElement>(null);
  useEffect(() => {
    if (ref) {
      const nodes = new Set<HTMLDivElement>();
      let cancelled = false;
      const f = () => {
        const basis = center(ref);
        nodes.forEach((c) => {
          const a = center(c);
          c.style.setProperty(
            "--factor-near",
            `${clamp(-(((a - basis) * SCROLL_FAC_NEAR) ** 2) + 1, 0, 1)}`
          );
          c.style.setProperty("--factor", `${a - basis}`);
        });
        if (!cancelled) {
          requestAnimationFrame(f);
        }
      };
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              nodes.add(entry.target as HTMLDivElement);
            } else {
              nodes.delete(entry.target as HTMLDivElement);
            }
          }
        },
        { root: ref }
      );
      ref.childNodes.forEach((c) => {
        observer.observe(c as HTMLDivElement);
      });

      requestAnimationFrame(f);
      return () => {
        observer.disconnect();
        cancelled = true;
      };
    }
  }, [ref]);
  return (
    <ReactVirtualizedAutoSizer style={{ width: "100%", height: "fit-content" }}>
      {({ width }) => (
        <Stack>
          <Stack
            ref={setRef}
            direction="row"
            sx={{
              width: "100vw",
              marginLeft: `calc(50% - 50vw)`,
              overflowX: "scroll",
              scrollSnapType: "x mandatory",
            }}
          >
            <Box sx={{ minWidth: `calc(50vw - ${width / 2}px)` }} />
            {l10n.gallery.map(
              ({ label, url, description, workspace, author }) => (
                <Box
                  onClick={(e) => {
                    (e.target as HTMLDivElement).scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                    });
                  }}
                  sx={{
                    p: sm ? 1 : 4,
                    minWidth: width + (sm ? 1 : 4) * 8 * 2,
                    scrollSnapAlign: "center",
                  }}
                >
                  <ButtonBase
                    disableRipple
                    disableTouchRipple
                    sx={{
                      aspectRatio: sm ? 10 / 16 : 16 / 10,
                      width: "100%",
                      borderRadius: 4,
                      position: "relative",
                      overflow: "hidden",
                      backgroundImage: `url(${url})`,
                      backgroundSize: "cover",
                      backgroundPosition:
                        "calc(50% + calc(var(--factor) * -0.5px)) 50%",
                    }}
                  >
                    {sm ? (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          opacity: `var(--factor-near)`,
                          backgroundColor: "#0a0c10AA",
                          mixBlendMode: "darken",
                        }}
                      ></Box>
                    ) : (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 64,
                          left: 64,
                          bottom: 64,
                          right: 64,
                          opacity: `var(--factor-near)`,
                          backgroundColor: "#0a0c10AA",
                          mixBlendMode: "darken",
                          filter: "blur(64px)",
                          borderRadius: "100%",
                        }}
                      ></Box>
                    )}
                    <Stack
                      sx={{
                        cursor: "pointer",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        textAlign: "center",
                        gap: 2,
                        justifyContent: "center",
                        alignItems: "center",
                        px: 4,
                        opacity: "var(--factor-near)",
                        filter: sm
                          ? "none"
                          : "blur(calc(calc(1 - var(--factor-near)) * 16px))",
                      }}
                    >
                      <Typography
                        variant={sm ? "h3" : "h2"}
                        sx={{
                          color: "white",
                        }}
                      >
                        {label}
                      </Typography>
                      <Stack
                        direction="row"
                        sx={{
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        <Avatar sx={{ width: 24, height: 24 }} />
                        <Typography variant="subtitle2" sx={{ color: "white" }}>
                          {author ?? "Anonymous"}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="body1"
                        sx={{
                          mt: 1,
                          maxWidth: 420,
                          color: "white",
                        }}
                      >
                        {description}
                      </Typography>
                      <Button
                        onClick={() =>
                          open(
                            `http://localhost:5173?workspace=${encodeURIComponent(
                              location.href + workspace
                            )}`,
                            "_blank"
                          )
                        }
                        color="primary"
                        sx={{
                          mt: 2,
                          py: 2,
                          px: 4,
                          borderRadius: 32,
                          fontWeight: 500,
                        }}
                        variant="contained"
                        startIcon={<WorkspacesOutlined />}
                      >
                        Open in Posthoc
                      </Button>
                    </Stack>
                  </ButtonBase>
                </Box>
              )
            )}
            <Box
              onClick={(e) => {
                (e.target as HTMLDivElement).scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
              }}
              sx={{
                p: sm ? 1 : 4,
                minWidth: width + (sm ? 1 : 4) * 8 * 2,
                scrollSnapAlign: "center",
              }}
            >
              <Stack
                sx={{
                  ...paper(1),
                  aspectRatio: sm ? 10 / 16 : 16 / 10,
                  width: "100%",
                  textAlign: "center",
                  gap: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  px: 4,
                  borderRadius: 4,
                }}
              >
                <Typography
                  variant={sm ? "h3" : "h2"}
                  sx={{ color: "text.primary" }}
                >
                  See more examples
                </Typography>
                <Button
                  onClick={() => open(`http://localhost:5173`, "_blank")}
                  color="secondary"
                  sx={{
                    py: 2,
                    px: 4,
                    borderRadius: 32,
                    fontWeight: 500,
                  }}
                  variant="contained"
                  startIcon={<WorkspacesOutlined />}
                >
                  Explore Posthoc
                </Button>
              </Stack>
            </Box>
            <Box sx={{ minWidth: `calc(50vw - ${width / 2}px)` }} />
          </Stack>
        </Stack>
      )}
    </ReactVirtualizedAutoSizer>
  );
}
