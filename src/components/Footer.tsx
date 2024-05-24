import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { grid } from "./grid";
import { l10n } from "../l10n";
import { Logo } from "./Logo";
import { useSm } from "./useSm";
import { space } from "./space";

export function Footer() {
  const sm = useSm();
  return (
    <>
      <Box p={3}>
        <Stack
          gap={4}
          sx={{
            maxWidth: "100%",
            width: 1000,
            px: sm ? 0 : 3,
            py: 4,
            m: "0 auto",
          }}
        >
          <Stack direction="row" gap={8}>
            <Logo width={32} height={32} />
            <Stack sx={grid(180)} gap={8} flex={1}>
              {l10n.footerLinks.map(({ title, links }) => (
                <Stack gap={1} sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ pb: 2 }}
                  >
                    {title}
                  </Typography>
                  {links.map(({ label, url }) => (
                    <Button
                      sx={{
                        width: "100%",
                        px: 2,
                        mx: -2,
                        py: 1,
                        justifyContent: "flex-start",
                        textAlign: "left",
                      }}
                      onClick={() => open(url)}
                    >
                      <Typography variant="subtitle2" color="text.primary">
                        {label}
                      </Typography>
                    </Button>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Stack>
          {space()}
          <Divider sx={{ opacity: 0.25 }} />
          <Typography
            textAlign="right"
            variant="subtitle2"
            color="text.secondary"
          >
            {l10n.footerCopyright}
          </Typography>
        </Stack>
      </Box>
    </>
  );
}
