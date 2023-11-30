import Layout from "@theme/Layout";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => location.replace("./docs/overview"));

  return (
    <Layout title="Home" description="Pathfinding Visualiser Documentation" />
  );
}
