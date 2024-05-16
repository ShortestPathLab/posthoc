import { Stack, Typography } from "@mui/material";
import { ReactNode as RN } from "react";

export function SectionTitle({
  title,
  subtitle,
  anchor,
}: {
  title?: RN;
  subtitle?: RN;
  anchor?: string;
}) {
  return (
    <Stack
      id={anchor}
      alignItems="left"
      gap={2}
      sx={{
        pt: 16,
        pb: 8,
      }}
    >
      <Typography variant="h2">{title ?? "Title"}</Typography>
      {subtitle && <Typography variant="subtitle2">{subtitle}</Typography>}
    </Stack>
  );
}
