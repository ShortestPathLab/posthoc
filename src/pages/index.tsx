import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import { useEffect } from "react";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => location.replace("./docs/overview"));

  return <Layout title={`${siteConfig.title}`} description="Visualiser" />;
}
