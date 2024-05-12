import { ArrowForwardOutlined } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Card,
  CardProps,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

type Props = {
  primary?: ReactNode;
  secondary?: ReactNode;
  image?: string;
};

export default function ActionCard({
  primary,
  secondary,
  image,
  ...props
}: Props & CardProps) {
  return (
    <ButtonBase
      sx={{
        borderRadius: (t) => t.shape.borderRadius,
        p: 0,
      }}
    >
      <Card
        {...props}
        sx={{
          height: "100%",
          width: "100%",
          textAlign: "left",
          borderRadius: (t) => t.shape.borderRadius,
          border: (t) => `1px solid ${t.palette.divider}`,
          ...props.sx,
        }}
      >
        <Box
          sx={{
            aspectRatio: 16 / 9,
            width: "100%",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Box sx={{ position: "relative" }}>
          <ArrowForwardOutlined
            sx={{ m: 3, position: "absolute", right: 0, top: 0 }}
          />
          <Stack sx={{ p: 3, gap: 1 }}>
            <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600 }}>
              {primary}
            </Typography>
            <Typography>{secondary}</Typography>
          </Stack>
        </Box>
      </Card>
    </ButtonBase>
  );
}
