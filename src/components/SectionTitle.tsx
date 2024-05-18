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
      <Typography variant="h2" color="text.primary">
        {title ?? "Title"}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle2" color="text.primary">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}
