import { LaunchOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Fade,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
} from "@mui/material";
import { clamp, find } from "lodash";
import { useEffect, useState } from "react";
import AutoSize from "react-virtualized-auto-sizer";
import resolve from "resolve-url";
import { l10n } from "../l10n";
import { usePaper } from "./theme";
import { useSm } from "./useSm";

const center = (d: HTMLDivElement) => {
  const box = d.getBoundingClientRect();
  return box.left + box.width / 2;
};

const SCROLL_FAC_NEAR = 3;

/*
 *
 * Promised based scrollIntoView( { behavior: 'smooth' } )
 * @param { Element } elem
 **  ::An Element on which we'll call scrollIntoView
 * @param { object } [options]
 **  ::An optional scrollIntoViewOptions dictionary
 * @return { Promise } (void)
 **  ::Resolves when the scrolling ends
 *
 */
function smoothScroll(elem: HTMLElement, options: ScrollIntoViewOptions) {
  return new Promise<void>((res) => {
    if (!(elem instanceof Element)) {
      throw new TypeError("Argument 1 must be an Element");
    }
    let same = 0; // a counter
    let lastPos = null; // last known Y position
    // pass the user defined options along with our default
    const scrollOptions = Object.assign({ behavior: "smooth" }, options);

    // let's begin
    elem.scrollIntoView(scrollOptions);
    requestAnimationFrame(check);

    // this function will be called every painting frame
    // for the duration of the smooth scroll operation
    function check() {
      // check our current position
      const newPos = elem.getBoundingClientRect().left;

      if (newPos === lastPos) {
        // same as previous
        if (same++ > 2) {
          // if it's more than two frames
          /* @todo: verify it succeeded
           * if(isAtCorrectPosition(elem, options) {
           *   resolve();
           * } else {
           *   reject();
           * }
           * return;
           */
          return res(); // we've come to an halt
        }
      } else {
        same = 0; // reset our counter
        lastPos = newPos; // remember our current position
      }
      // check again next painting frame
      requestAnimationFrame(check);
    }
  });
}

export function Gallery() {
  const paper = usePaper();
  const sm = useSm();
  const lg = useMediaQuery("(min-width: 1200px)");
  const [ref, setRef] = useState<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
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
              `${clamp(-(((a * SCROLL_FAC_NEAR) / innerWidth) ** 2) + 1, 0, 1)}`
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
      f();
      setReady(true);

      return () => {
        intersectionObserver.disconnect();
        mutationObserver.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("resize", refresh);
        cancelled = true;
      };
    }
  }, [ref, setReady]);

  useEffect(() => {
    if (ref) {
      let initial = null;
      let initialScroll = 0;
      const controller = new AbortController();
      ref.addEventListener(
        "mousedown",
        (e) => {
          initial = e.clientX;
          initialScroll = ref.scrollLeft;
          ref.style.scrollSnapType = "none";
        },
        { signal: controller.signal }
      );
      ref.addEventListener(
        "mousemove",
        (e) => {
          if (initial !== null) {
            ref.scrollLeft = initialScroll - (e.clientX - initial);
          }
        },
        { signal: controller.signal }
      );
      ref.addEventListener(
        "mouseup",
        async () => {
          initial = null;
          const firstLeft = find(ref.children, (n) => {
            const rect = (n as HTMLElement).getBoundingClientRect();
            return (
              (rect.left > 0 && rect.left < innerWidth / 2) ||
              (rect.right < innerWidth && rect.right > innerWidth / 2)
            );
          }) as HTMLElement | undefined;
          if (firstLeft) {
            await smoothScroll(firstLeft, {
              block: "center",
              inline: "center",
            });
            ref.style.scrollSnapType = "x mandatory";
          }
        },
        { signal: controller.signal }
      );
      return () => controller.abort();
    }
  }, [ref]);

  const a = (width: number) => (
    <Box
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
          // transform: lg
          //   ? `scale(calc(90% + calc(10% * var(--factor-near))))`
          //   : "none",
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
    <AutoSize
      style={{
        width: "100%",
        // 20vw is obtained from `(10 / 16) * (100vw / 3)` to get low-ball estimate of element height.
        minHeight: "20vw",
        height: "fit-content",
      }}
    >
      {({ width }) => (
        <Fade in={ready}>
          <Stack
            ref={setRef}
            direction="row"
            sx={{
              width: "100vw",
              marginLeft: `calc(50% - 50vw)`,
              overflowX: "scroll",
              scrollSnapType: "x mandatory",
              pb: 2,
              gap: 2,
            }}
          >
            <Box sx={{ minWidth: `calc(50vw - ${width / 2}px)` }} />
            {l10n.gallery.map(
              (
                { label, url, description, workspace, author, tagline, avatar },
                i
              ) => (
                <Box
                  data-index={i}
                  sx={{
                    minWidth: width + (lg ? 0 : width * 0.001) * 8 * 2,
                    scrollSnapAlign: "center",
                  }}
                >
                  <Button
                    disableRipple
                    sx={{
                      cursor: "grab",
                      "&:active": { cursor: "grabbing" },
                      boxShadow: (t) =>
                        `0px 16px 32px ${alpha(
                          t.palette.background.default,
                          0.25
                        )}`,
                      aspectRatio: sm ? 10 / 16 : 16 / 10,
                      width: "100%",
                      border: (t) =>
                        `1px solid color-mix(in srgb, ${t.palette.background.default} 85%, ${t.palette.text.primary})`,
                      borderRadius: 4,
                      position: "relative",
                      overflow: "hidden",
                      backgroundColor: "#0a0c10",
                      backgroundImage: `url(${url})`,
                      backgroundSize: "cover",
                      backgroundPosition:
                        "calc(50% + calc(var(--factor) * +0.25px)) 50%",
                      // transform: lg
                      //   ? `scale(calc(90% + calc(10% * var(--factor-near))))`
                      //   : "none",
                    }}
                  >
                    {lg ? (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "80%",
                          pointerEvents: "none",
                          width: "100%",
                          opacity: `var(--factor-near)`,
                          backgroundImage:
                            "linear-gradient(to bottom,rgba(10, 12, 16, 0.8), transparent)",
                          borderRadius: 4,
                          zIndex: 1,
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          position: "absolute",
                          zIndex: 1,
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          opacity: `var(--factor-near)`,
                          backgroundColor: "#0a0c10BB",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                    <Stack
                      sx={{
                        zIndex: 2,
                        position: "absolute",
                        textAlign: "left",
                        gap: 2,
                        p: 4,
                        top: 0,
                        left: 0,
                        right: 0,
                        justifyContent: lg ? "space-between" : "flex-start",
                        alignItems: lg ? "flex-start" : "flex-start",
                        opacity: "var(--factor-near)",
                        flexDirection: lg ? "row" : "column",
                      }}
                    >
                      <Stack sx={{ gap: 2 }}>
                        <Typography
                          sx={{
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
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "white" }}
                          >
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
                      </Stack>
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
                          py: 1.5,
                          px: 3,
                          borderRadius: 32,
                          fontWeight: 500,
                        }}
                        variant="contained"
                      >
                        Open in Posthoc
                      </Button>
                    </Stack>
                  </Button>
                </Box>
              )
            )}
            {a(width)}
            <Box sx={{ minWidth: `calc(50vw - ${width / 2}px)` }} />
          </Stack>
        </Fade>
      )}
    </AutoSize>
  );
}
