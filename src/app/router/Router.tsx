"use client";
import { useState } from "react";
import Home from "../pages/Home";
import MapPage from "../pages/MapPage";

function Router() {
  const [page, setPage] = useState<"HOME" | "MAP">("MAP");

  switch (page) {
    case "MAP":
      return <MapPage />;

    default:
      return <Home />;
  }
}

export default Router;
