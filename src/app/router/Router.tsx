"use client";
import Home from "../pages/Home";
import MapPage from "../pages/MapPage";
import { useRoute } from "../providers/RouteProvider";

function Router() {
  const { page } = useRoute();

  switch (page) {
    case "MAP":
      return <MapPage />;

    default:
      return <Home />;
  }
}

export default Router;
