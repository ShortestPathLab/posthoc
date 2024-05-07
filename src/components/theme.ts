import {
  alpha,
  colors,
  createTheme,
  SxProps,
  TextFieldProps,
  Theme,
} from "@mui/material";
import { constant, floor, times } from "lodash";

export type AccentColor = Exclude<keyof typeof colors, "common" | undefined>;

export type Shade = keyof (typeof colors)[AccentColor];

export const { common, ...accentColors } = colors;

const shadow = `
      0px 4px 9px -1px rgb(0 0 0 / 4%), 
      0px 5px 24px 0px rgb(0 0 0 / 4%), 
      0px 10px 48px 0px rgb(0 0 0 / 4%)
  `;

export const getShade = (
  color: AccentColor = "blue",
  mode: "light" | "dark" = "light",
  shade?: Shade
) => {
  return colors[color][shade ?? (mode === "dark" ? "A100" : "A700")];
};

const fontFamily = `"Inter", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
          "Droid Sans", "Helvetica Neue", "Arial", sans-serif`;

const defaultColor = "#248aff";

export const makeTheme = (mode: "light" | "dark", theme?: AccentColor) =>
  createTheme({
    palette: {
      primary: { main: theme ? getShade(theme, mode) : defaultColor },
      mode,
      background:
        mode === "dark"
          ? // ? { default: "#101418", paper: "#14191f" }
            { default: "#111317", paper: "#111317" }
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
        fontSize: "max(32px, min(46px, 6vw))",
        fontWeight: 600,
      },
      h2: {
        fontSize: "max(22px, min(32px, 4vw))",
        fontWeight: 500,
      },
      h3: {
        fontSize: "max(18px, min(22px, 2vw))",
        fontWeight: 500,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
        letterSpacing: 0,
        backgroundColor: "background.paper",
      },
      subtitle2: {
        marginTop: 6,
        fontWeight: 400,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
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
            fontWeight: 400,
            fontSize: "0.875rem",
          },
          overline: {
            fontWeight: 400,
            textTransform: "none",
            letterSpacing: 0,
            fontSize: "0.875rem",
          },
          h4: {
            marginBottom: 12,
          },
          h6: {
            fontWeight: 500,
            letterSpacing: -0.4,
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
    boxShadow: "inset 0px 0px 0px 1px rgba(255,255,255,0.02)",
    borderRadius: 8,
    backdropFilter: "blur(32px)",
    background: "url(img/noise.png)",
    backgroundSize: "32px 32px",
    backgroundColor: ({ palette }) =>
      alpha(palette.action.disabledBackground, elevation * 0.01),
  });
}

export const textFieldProps = {
  variant: "filled",
} satisfies TextFieldProps;
