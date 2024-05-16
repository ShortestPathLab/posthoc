import { useMediaQuery } from "@mui/material";

export function useSm() {
  return useMediaQuery("(max-width: 580px)");
}
