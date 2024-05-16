import { Box } from "@mui/material";
import { times } from "lodash";

export const space = (n = 1) => times(n, () => <Box flex={1}></Box>);
