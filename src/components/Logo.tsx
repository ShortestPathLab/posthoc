import { ComponentProps } from "react";
import { l10n } from "../l10n";

export function Logo(props: ComponentProps<"img">) {
  return <img src={l10n.logoUrl} width={28} height={28} {...props} />;
}
