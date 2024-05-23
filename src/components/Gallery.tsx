import { LaunchOutlined, WorkspacesOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
} from "@mui/material";
import { clamp, defer, delay, floor } from "lodash";
import { useEffect, useRef, useState } from "react";
import ReactVirtualizedAutoSizer from "react-virtualized-auto-sizer";
import l10n from "../pages/en-au.json";
import { usePaper } from "./theme";
import { useSm } from "./useSm";
import resolve from "resolve-url";

const center = (d: HTMLDivElement) => {
  const box = d.getBoundingClientRect();
  return box.left + box.width / 2;
};

const SCROLL_FAC_NEAR = 1 / 1000;

export function Gallery() {
  const paper = usePaper();
  const sm = useSm();
  const lg = useMediaQuery("(min-width: 1200px)");
  const [ref, setRef] = useState<HTMLDivElement>(null);
  useEffect(() => {
    if (ref) {
      let cancelled = false;
      let basis: number;
      let intersectionObserver: IntersectionObserver;
      const nodes = new Set<HTMLDivElement>();
      const positions = new Map<HTMLDivElement, number>();
      const init = () => {
        nodes.clear();
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.target instanceof HTMLDivElement) {
                if (entry.isIntersecting) {
                  entry.target.style.visibility = "visible";
                  nodes.add(entry.target);
                } else {
                  entry.target.style.visibility = "hidden";
                  nodes.delete(entry.target);
                }
              }
            }
          },
          { root: ref }
        );
        ref.childNodes.forEach((c) => {
          if (c instanceof HTMLDivElement) {
            observer.observe(c);
            positions.set(c, c.offsetLeft + c.clientWidth / 2);
          }
        });
        return observer;
      };
      const refresh = () => {
        intersectionObserver?.disconnect?.();
        intersectionObserver = init();
        basis = center(ref);
      };
      const f = () => {
        if (!cancelled) {
          nodes.forEach((c) => {
            const a = basis - positions.get(c) + ref.scrollLeft;
            c.style.setProperty(
              "--factor-near",
              `${clamp(-((a * SCROLL_FAC_NEAR) ** 2) + 1, 0, 1)}`
            );
            c.style.setProperty("--factor", `${a}`);
          });
          requestAnimationFrame(f);
        }
      };
      const mutationObserver = new MutationObserver(refresh);
      const resizeObserver = new ResizeObserver(refresh);
      window.addEventListener("resize", refresh);
      resizeObserver.observe(ref);
      mutationObserver.observe(ref, { childList: true });
      refresh();
      requestAnimationFrame(f);

      return () => {
        intersectionObserver.disconnect();
        mutationObserver.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("resize", refresh);
        cancelled = true;
      };
    }
  }, [ref]);
  useEffect(() => {
    if (ref) {
      ref.scrollLeft = (
        ref.childNodes.item(floor(ref.childNodes.length / 2)) as HTMLDivElement
      ).offsetLeft;
    }
  }, [ref]);
  const a = (width: number) => (
    <Box
      onClick={(e) => {
        (e.target as HTMLDivElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }}
      sx={{
        p: lg ? 0 : width * 0.001,
        minWidth: width + (lg ? 0 : width * 0.001) * 8 * 2,
        scrollSnapAlign: "center",
      }}
    >
      <Stack
        sx={{
          cursor: "pointer",
          ...paper(1),
          aspectRatio: sm ? 10 / 16 : 16 / 10,
          width: "100%",
          textAlign: "center",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          px: 4,
          borderRadius: 4,
          transform: lg
            ? `scale(calc(90% + calc(10% * var(--factor-near))))`
            : "none",
        }}
      >
        <Typography variant="h2" sx={{ color: "text.primary" }}>
          {l10n.galleryCallToAction}
        </Typography>
        <Button
          onClick={() => open(l10n.appUrl, "_blank")}
          color="secondary"
          sx={{
            py: 2,
            px: 4,
            borderRadius: 32,
            fontWeight: 500,
          }}
          variant="contained"
          startIcon={<LaunchOutlined />}
        >
          {l10n.openAppLabel}
        </Button>
      </Stack>
    </Box>
  );
  return (
    <ReactVirtualizedAutoSizer style={{ width: "100%", height: "fit-content" }}>
      {({ width }) => (
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
          {a(width)}
          {l10n.gallery.map(
            (
              { label, url, description, workspace, author, tagline, avatar },
              i
            ) => (
              <Box
                data-index={i}
                onClick={(e) => {
                  (e.target as HTMLDivElement).scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                  });
                }}
                sx={{
                  p: lg ? 0 : width * 0.001,
                  minWidth: width + (lg ? 0 : width * 0.001) * 8 * 2,
                  scrollSnapAlign: "center",
                }}
              >
                <ButtonBase
                  disableRipple
                  disableTouchRipple
                  sx={{
                    boxShadow: (t) =>
                      `0px 16px 32px ${alpha(
                        t.palette.background.default,
                        0.25
                      )}`,
                    aspectRatio: sm ? 10 / 16 : 16 / 10,
                    width: "100%",
                    borderRadius: 4,
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage: `url(${url})`,
                    backgroundSize: "cover",
                    backgroundPosition:
                      "calc(50% + calc(var(--factor) * -0.5px)) 50%",
                    transform: lg
                      ? `scale(calc(90% + calc(10% * var(--factor-near))))`
                      : "none",
                  }}
                >
                  {!lg ? (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        opacity: `var(--factor-near)`,
                        backgroundColor: "#0a0c1099",
                      }}
                    ></Box>
                  ) : (
                    <Box
                      sx={{
                        position: "absolute",
                        width: "100%",
                        aspectRatio: 16 / 10,
                        maxWidth: 720,
                        opacity: `var(--factor-near)`,
                        backgroundColor: "#0a0c10DD",
                        borderRadius: 4,
                        backdropFilter: "blur(8px)",
                        // filter:
                        //   "blur(calc(calc(1 - var(--factor-near)) * 64px))",
                      }}
                    ></Box>
                  )}
                  <Stack
                    sx={{
                      position: "absolute",
                      textAlign: "center",
                      gap: 2,
                      px: 2,
                      justifyContent: "center",
                      alignItems: "center",
                      maxWidth: 720,
                      opacity: "var(--factor-near)",
                      filter: !lg
                        ? "none"
                        : "blur(calc(calc(1 - var(--factor-near)) * 16px))",
                    }}
                  >
                    <Typography
                      sx={{
                        zIndex: 1,
                        mb: -2,
                        color: "primary.light",
                        fontSize: "1rem",
                        fontWeight: 500,
                      }}
                      variant="overline"
                    >
                      {tagline}
                    </Typography>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 400,
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
                      <Avatar sx={{ width: 24, height: 24 }} src={avatar} />
                      <Typography variant="subtitle2" sx={{ color: "white" }}>
                        {author ?? "Anonymous"}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body1"
                      sx={{
                        maxWidth: 420,
                        color: "white",
                      }}
                    >
                      {description}
                    </Typography>
                    <Button
                      onClick={() =>
                        open(
                          `${l10n.appUrl}?workspace=${encodeURIComponent(
                            resolve(location.href, workspace)
                          )}`,
                          "_blank"
                        )
                      }
                      color="primary"
                      sx={{
                        mt: 2,
                        mb: 2,
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
          {a(width)}
          <Box sx={{ minWidth: `calc(50vw - ${width / 2}px)` }} />
        </Stack>
      )}
    </ReactVirtualizedAutoSizer>
  );
}
