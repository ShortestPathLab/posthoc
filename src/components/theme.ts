import {
  alpha,
  colors,
  createTheme,
  SxProps,
  TextFieldProps,
  Theme,
} from "@mui/material";
import { constant, times } from "lodash";

export type AccentColor = Exclude<keyof typeof colors, "common" | undefined>;

export type Shade = keyof (typeof colors)[AccentColor];

export const { common, ...accentColors } = colors;

// const shadow = `
//       0px 4px 3px -2px rgb(0 0 0 / 4%),
//       0px 5px 24px 0px rgb(0 0 0 / 4%),
//       0px 10px 48px 0px rgb(0 0 0 / 2%)
//   `;

const shadow = ``;

export const getShade = (
  color: AccentColor = "blue",
  mode: "light" | "dark" = "light",
  shade?: Shade
) => {
  return colors[color][shade ?? (mode === "dark" ? "A100" : "A700")];
};

const fontFamily = `"Inter", sans-serif`;

const headingFamily = `"Inter Tight", sans-serif`;

const accent = "#4f51ff";
const accentDark = "#7C7EFF";

export const makeTheme = (mode: "light" | "dark", theme?: AccentColor) =>
  createTheme({
    palette: {
      primary: {
        main: theme
          ? getShade(theme, mode)
          : mode === "dark"
          ? accentDark
          : accent,
      },
      secondary: {
        main: theme
          ? getShade(theme, mode)
          : mode === "light"
          ? "#000000"
          : "#ffffff",
      },
      mode,
      background:
        mode === "dark"
          ? // ? { default: "#101418", paper: "#14191f" }
            { default: "#0a0c10", paper: "#0a0c10" }
          : { default: "#ebecef", paper: "#ffffff" },
    },
    typography: {
      allVariants: {
        fontFamily,
      },
      body1: {
        fontSize: 16,
      },
      body2: {
        fontSize: 15,
      },
      h1: {
        fontSize: "max(36px, min(58px, min(6vw, 6vh)))",
        fontWeight: mode === "dark" ? 400 : 500,
        fontFamily: headingFamily,
      },
      h2: {
        fontSize: "max(26px, min(32px, 4vw))",
        fontWeight: mode === "dark" ? 400 : 420,
        fontFamily: headingFamily,
      },
      h3: {
        fontSize: "20px",
        fontWeight: mode === "dark" ? 400 : 500,
        fontFamily: headingFamily,
      },
      h4: {
        fontFamily: headingFamily,
      },
      h5: {
        fontFamily: headingFamily,
      },
      h6: {
        fontFamily: headingFamily,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
        letterSpacing: 0,
        backgroundColor: "background.paper",
        fontFamily: headingFamily,
      },
      overline: {
        fontFamily: headingFamily,
        letterSpacing: 0,
      },
      subtitle1: {
        fontFamily: headingFamily,
      },
      subtitle2: {
        fontWeight: mode === "dark" ? 400 : 500,
        fontFamily: headingFamily,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            fontWeight: 500,
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06))",
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundImage: "linear-gradient(#1c2128, #1c2128)",
            fontFamily,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          body1: {
            fontWeight: mode === "dark" ? 400 : 500,
            fontSize: "0.875rem",
          },
          overline: {
            fontWeight: mode === "dark" ? 400 : 500,
            textTransform: "none",
            fontSize: "0.875rem",
          },
          h4: {
            marginBottom: 12,
          },
          h6: {
            fontWeight: 500,
          },
        },
      },
    },
    shadows: ["", ...times(24, constant(shadow))] as any,
  });

export function useAcrylic(color?: string): SxProps<Theme> {
  return {
    backdropFilter: "blur(32px)",
    background: ({ palette }) => alpha(color ?? palette.background.paper, 0.75),
  };
}

export function usePaper(): (e?: number) => SxProps<Theme> {
  return (elevation: number = 1) => ({
    borderRadius: 4,
    backdropFilter: "blur(32px)",
    background: ({ palette }) =>
      `url(/img/noise.png), ${alpha(palette.background.paper, 0.8)}`,
    backgroundSize: "32px 32px",
  });
}

export const textFieldProps = {
  variant: "filled",
} satisfies TextFieldProps;
