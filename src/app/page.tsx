import { LocationProvider } from "./providers/location";
import Router from "./router/Router";

export default function Home() {
  return (
    <LocationProvider>
      <Router />
    </LocationProvider>
  );
}
