"use client";
import { useState } from "react";
import Home from "../pages/Home";
import Map from "../pages/Map";

function Router() {
  const [page, setPage] = useState<"HOME" | "MAP">("MAP");

  switch (page) {
    case "MAP":
      return <Map />;

    default:
      return <Home />;
  }
}

export default Router;
