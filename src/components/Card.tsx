import { Box, Stack, StackProps, Typography } from "@mui/material";
import { ReactNode as RN } from "react";
import { usePaper } from "./theme";

export function Card({
  image,
  title,
  subtitle,
  ...props
}: {
  image?: RN;
  title?: RN;
  subtitle?: RN;
} & Omit<StackProps, "title">) {
  const paper = usePaper();
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={1}
      {...props}
      sx={{ ...paper(1), p: 8, textAlign: "center", ...props.sx } as any}
    >
      {image ?? <Box height={64}></Box>}
      <Typography variant="h3">{title ?? "Title"}</Typography>
      <Typography variant="subtitle2">{subtitle ?? "Subtitle"}</Typography>
    </Stack>
  );
}
