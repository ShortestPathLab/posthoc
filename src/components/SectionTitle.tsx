import { Stack, Typography } from "@mui/material";
import { ReactNode as RN } from "react";
import { useSm } from "./useSm";

export function SectionTitle({
  title,
  subtitle,
  anchor,
  noPadding,
}: {
  title?: RN;
  subtitle?: RN;
  anchor?: string;
  noPadding?: boolean;
}) {
  const sm = useSm();
  return (
    <Stack
      id={anchor}
      alignItems="left"
      gap={sm ? 1 : 2}
      sx={
        !noPadding && {
          pt: sm ? 8 : 16,
          pb: sm ? 4 : 8,
        }
      }
    >
      <Typography variant="h2" color="text.primary">
        {title ?? "Title"}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}
