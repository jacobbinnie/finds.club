"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import {
  AddressableAddress,
  BaseAddress,
  MapPosition,
  MapboxFeatures,
  SelectedProperty,
} from "@/interfaces";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import MapSearch from "../MapSearch";
import usePlacesStreets from "@/hooks/usePlacesStreets";
import useAddresses from "@/hooks/useAddresses";
import { useRouter } from "next/navigation";

const access_token = process.env.NEXT_PUBLIC_MAPBOX_MAP_TOKEN || "";
interface MapElementProps {
  selectedProperty: SelectedProperty | null;
  baseAddress: BaseAddress | null;
  mapPosition: MapPosition;
  setMapPosition: (mapPosition: MapPosition) => void;
  setSelectedProperty: (selectedProperty: SelectedProperty | null) => void;
  fullScreen?: boolean;
}

function MapElement({
  selectedProperty,
  mapPosition,
  fullScreen,
  setMapPosition,
  setSelectedProperty,
}: MapElementProps) {
  const [currentMap, setCurrentMap] = useState<mapboxgl.Map | null>(null);
  const { replace } = useRouter();

  const [isMapHidden, setIsMapHidden] = useState(false);
  const [isOffCenter, setIsOffCenter] = useState(false);

  const initialPosition = selectedProperty
    ? { lat: selectedProperty.lat, lng: selectedProperty.lon, zoom: 18 }
    : mapPosition;

  const [mapLoaded, setMapLoaded] = useState(false);

  const mapNode = useRef(null);

  const [placesStreetsQuery, setPlacesStreetsQuery] = useState<string>("");
  const [addressesQuery, setAddressesQuery] = useState<string>("");

  const [searchType, setSearchType] = useState<"places" | "addresses">(
    "places"
  );

  const [isSearching, setIsSearching] = useState(false);

  const handleUpdateIsSearching = (value: boolean) => {
    setIsSearching(value);
    resetQueries();
  };

  const handleUpdateQuery = (query: string) => {
    if (searchType === "places") {
      setPlacesStreetsQuery(query);
    } else {
      setAddressesQuery(query);
    }
  };

  useEffect(() => {
    currentMap?.flyTo({
      center: [mapPosition.lat, mapPosition.lng],
      zoom: mapPosition.zoom,
    });
  }, [mapPosition]);

  useEffect(() => {
    if (selectedProperty) {
      currentMap?.flyTo({
        center: [selectedProperty?.lon, selectedProperty?.lat],
        zoom: 18,
      });
    }
  }, [selectedProperty]);

  const reposition = () => {
    if (selectedProperty) {
      currentMap?.flyTo({
        center: [selectedProperty?.lon, selectedProperty?.lat],
        zoom: 18,
      });
    }
  };

  const handleSelect = (
    searchType: "places" | "addresses",
    suggestion: MapboxFeatures | AddressableAddress
  ) => {
    if (searchType === "places") {
      setSelectedProperty(null);
      replace("/map");
      setMapPosition({
        lat: (suggestion as MapboxFeatures).geometry.coordinates[0],
        lng: (suggestion as MapboxFeatures).geometry.coordinates[1],
        zoom: 15,
      });
    } else {
      const number = (suggestion as AddressableAddress).street_number;
      const street = (suggestion as AddressableAddress).street;
      const locality = (suggestion as AddressableAddress).locality;
      const region = (suggestion as AddressableAddress).region;
      setSelectedProperty(suggestion as AddressableAddress);
      replace(
        encodeURI(
          `/map?number=${number}&street=${street}&locality=${locality}&region=${region}`
        )
      );
    }
    resetQueries();
    setIsSearching(false);
  };

  const resetQueries = () => {
    setAddressesQuery("");
    setPlacesStreetsQuery("");
  };

  const {
    data: placesStreetsSuggestions,
    setData: setPlacesStreetsSuggestions,
    loading: placesStreetsLoading,
  } = usePlacesStreets(placesStreetsQuery);

  const {
    data: addressSuggestions,
    setData: setAddressSuggestions,
    loading: addressLoading,
  } = useAddresses(addressesQuery);

  useEffect(() => {
    (placesStreetsQuery && placesStreetsQuery.length < 3) ||
      (!placesStreetsQuery && setPlacesStreetsSuggestions([]));
  }, [placesStreetsQuery]);

  useEffect(() => {
    (addressesQuery && addressesQuery.length < 3) ||
      (!addressesQuery && setAddressSuggestions([]));
  }, [addressesQuery]);

  useEffect(() => {
    resetQueries();
  }, [searchType]);

  useEffect(() => {
    const node = mapNode.current;

    if (typeof window === "undefined" || node === null) return;

    if (mapNode.current !== null) {
      mapNode.current;
    }

    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: access_token,
      style: "mapbox://styles/jacobbinnie/clkt9g77a004w01pp11bb3hbd",
      center: [initialPosition.lng, initialPosition.lat],
      zoom: initialPosition.zoom,
      attributionControl: false,
    });

    setCurrentMap(mapboxMap);

    mapboxMap.on("load", () => setMapLoaded(true));

    mapboxMap.on("moveend", () => {
      setIsOffCenter(true);
    });

    return () => {
      mapboxMap.remove();
    };
  }, []);

  useEffect(() => {
    if (currentMap) {
      setTimeout(() => {
        currentMap.resize();
      }, 250);
    }
  }, [fullScreen]);

  window.addEventListener("resize", () => {
    if (currentMap) {
      setTimeout(() => {
        currentMap.resize();
      }, 250);
    }
  });

  return (
    <div
      className={clsx(
        mapLoaded ? "bg-transparent" : "bg-gray-400 animate-pulse",
        "w-full relative overflow-hidden h-100% flex"
      )}
    >
      <ArrowPathIcon
        className={clsx(
          mapLoaded && "hidden",
          "absolute top-[calc(50%-2%)] left-[calc(50vw-2vw)] w-6 animate-spin text-accent"
        )}
      />
      <div
        ref={mapNode}
        className={clsx(
          isMapHidden
            ? "h-[100px]"
            : fullScreen
            ? "supports-[height:100cqh]:h-[calc(100cqh-65px)] supports-[height:100svh]:h-[calc(100svh-65px)]"
            : "h-[calc(400px)]",
          "w-full transition-all"
        )}
      />
      <div
        onClick={() => setIsMapHidden(!isMapHidden)}
        className="px-3 z-20 cursor-pointer h-8 flex items-center absolute top-2 right-2 rounded-md bg-accent shadow-lg text-tertiary text-small font-regular tracking-tighter"
      >
        {isMapHidden ? "Expand map" : "Hide map"}
      </div>

      <div
        onClick={reposition}
        className={clsx(
          fullScreen
            ? "hidden"
            : isOffCenter
            ? !isMapHidden
              ? "block"
              : "hidden"
            : "hidden",
          "px-3 z-20 cursor-pointer h-8 flex items-center absolute bottom-2 right-2 rounded-md bg-accent shadow-lg text-tertiary text-small font-regular tracking-tighter"
        )}
      >
        Re-center
      </div>

      <div
        className={clsx(
          !isMapHidden ? "block" : "hidden",
          "gap-1 z-20 flex flex-col absolute bottom-2 left-2 text-tertiary text-small font-regular transition-all tracking-tighter"
        )}
      >
        <div className="flex gap-3 bg-white px-3 py-1 rounded-lg items-center w-min shadow-lg">
          <div className="w-4 h-4 bg-accent rounded-full border-[1px] border-secondary" />
          <p className="text-small text-primary tracking-tighter">Listed</p>
        </div>

        <div className="flex gap-3 bg-white px-3 py-1 rounded-lg items-center shadow-lg">
          <div className="w-4 h-4 bg-openToSelling rounded-full border-[1px] border-secondary" />
          <p className="text-small text-primary tracking-tighter">
            Open to selling
          </p>
        </div>
      </div>

      <MapSearch
        isMapHidden={isMapHidden}
        selectedProperty={selectedProperty ? true : false}
        suggestions={
          searchType === "places"
            ? placesStreetsSuggestions
            : addressSuggestions
        }
        searchType={searchType}
        setSearchType={setSearchType}
        queryLoading={
          searchType === "places" ? placesStreetsLoading : addressLoading
        }
        handleUpdateQuery={handleUpdateQuery}
        placesStreetsQuery={placesStreetsQuery}
        addressesQuery={addressesQuery}
        isSearching={isSearching}
        handleUpdateIsSearching={handleUpdateIsSearching}
        handleSelect={handleSelect}
      />
    </div>
  );
}

export default MapElement;
