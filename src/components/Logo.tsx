import { ComponentProps } from "react";
import l10n from "../pages/en-au.json";

export function Logo(props: ComponentProps<"img">) {
  return <img src={l10n.logoUrl} width={32} height={32} {...props} />;
}
