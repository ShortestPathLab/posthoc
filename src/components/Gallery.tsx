import { Box, Stack, Tab, Tabs } from "@mui/material";
import { map } from "lodash";
import { useState } from "react";
import { usePaper } from "./theme";
import l10n from "../pages/en-au.json";

export function Gallery() {
  const paper = usePaper();
  const [selected, setSelected] = useState(0);
  return (
    <Stack>
      <Box
        sx={{
          ...paper(0),
          overflow: "hidden",
          height: "fit-content",
          aspectRatio: 16 / 10,
          borderRadius: 4,
        }}
      >
        <img src={l10n.gallery[selected].url}></img>
      </Box>
      <Tabs
        variant="scrollable"
        allowScrollButtonsMobile
        scrollButtons={true}
        value={selected}
        onChange={(e, i) => setSelected(i)}
        sx={{
          ...paper(0),
          borderRadius: 32,
          mt: 4,
          mx: 2,
          " button.Mui-selected": { color: "text.primary" },
        }}
      >
        {map(l10n.gallery, ({ label, url }, i) => (
          <Tab key={url} label={label} value={i} />
        ))}
      </Tabs>
    </Stack>
  );
}
