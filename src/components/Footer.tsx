import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { grid } from "./grid";
import { l10n } from "../l10n";
import { Logo } from "./Logo";
import { useSm } from "./useSm";
import { space } from "./space";
import { usePaper } from "./theme";
import { PAGE_WIDTH } from "../config";

const bg = "#0a0c10";
const fg = "#fff";
const fg2 = "#ffffff99";

export function Footer() {
  const sm = useSm();
  const paper = usePaper();
  return (
    <>
      <Box p={3} sx={{ ...paper(1), borderRadius: 0, bgcolor: bg }}>
        <Stack
          gap={4}
          sx={{
            maxWidth: "100%",
            width: PAGE_WIDTH,
            px: sm ? 0 : 3,
            py: 4,
            m: "0 auto",
          }}
        >
          <Stack direction="row" gap={8}>
            <Logo width={32} height={32} style={{ filter: "saturate(0%)" }} />
            <Stack sx={grid(180)} gap={8} flex={1}>
              {l10n.footerLinks.map(({ title, links }) => (
                <Stack gap={1} sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ pb: 2, color: fg2 }}
                  >
                    {title}
                  </Typography>
                  {links.map(({ label, url }) => (
                    <Button
                      href={url}
                      sx={{
                        width: "100%",
                        px: 2,
                        mx: -2,
                        py: 1,
                        justifyContent: "flex-start",
                        textAlign: "left",
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ color: fg }}>
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
          <Typography textAlign="right" variant="subtitle2" sx={{ color: fg }}>
            {l10n.footerCopyright}
          </Typography>
        </Stack>
      </Box>
    </>
  );
}
