import { LocationProvider } from "./providers/LocationProvider";
import { RouteProvider } from "./providers/RouteProvider";
import Router from "./router/Router";

export default function Home() {
  return (
    <RouteProvider>
      <LocationProvider>
        <Router />
      </LocationProvider>
    </RouteProvider>
  );
}
