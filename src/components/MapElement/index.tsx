"use client";
import * as crypto from "crypto";
import "mapbox-gl/dist/mapbox-gl.css";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPosition, SearchType } from "@/interfaces";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import MapSearch from "../MapSearch";
import useSuggestPlaces from "@/hooks/useSuggestPlaces";
import {
  PlacesSuggestion,
  isPlacesFeatureFullResponse,
} from "@/interfaces/places";
import { useLocation } from "@/providers/LocationProvider";

const access_token = process.env.NEXT_PUBLIC_MAPBOX_MAP_TOKEN || "";
interface MapElementProps {
  mapPosition: MapPosition;
  setMapPosition: (mapPosition: MapPosition) => void;
  fullScreen?: boolean;
}

function MapElement({
  mapPosition,
  fullScreen,
  setMapPosition,
}: MapElementProps) {
  const [currentMap, setCurrentMap] = useState<mapboxgl.Map | null>(null);
  const [currentMarker, setCurrentMarker] = useState<mapboxgl.Marker | null>(
    null
  );
  const [searchType, setSearchType] = useState<SearchType>("PLACES");

  const [placesQuery, setPlacesQuery] = useState("");
  const [profilesQuery, setProfilesQuery] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  const { handleUpdateSelectedPoi, selectedPoi } = useLocation();

  const resetQueries = () => {
    setProfilesQuery("");
    setPlacesQuery("");
  };

  const handleUpdateIsSearching = (value: boolean) => {
    setIsSearching(value);
  };

  const handleUpdateQuery = (query: string) => {
    if (searchType === "PLACES") {
      setPlacesQuery(query);
    } else {
      setProfilesQuery(query);
    }
  };

  const handleSelect = async (
    searchType: SearchType,
    suggestion: PlacesSuggestion
  ) => {
    if (searchType === "PLACES") {
      fetch(`/api/get-place-details?q=${suggestion.mapbox_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (isPlacesFeatureFullResponse(data)) {
            setIsSearching(false);

            if (
              data.features[0].properties.full_address &&
              data.features[0].properties.mapbox_id
            ) {
              const placeDeconstructed = {
                hashed_mapbox_id: crypto
                  .createHash("md5")
                  .update(data.features[0].properties.mapbox_id)
                  .digest("hex"),
                name: data.features[0].properties.name,
                full_address: data.features[0].properties.full_address,
                lat: data.features[0].geometry.coordinates[0],
                lng: data.features[0].geometry.coordinates[1],
                locality:
                  data.features[0].properties.context.locality?.name ?? null,
                region:
                  data.features[0].properties.context.region?.name ?? null,
                country:
                  data.features[0].properties.context.country?.name ?? null,

                categories: data.features[0].properties.poi_category ?? null,
                postcode:
                  data.features[0].properties.context.postcode?.name ?? null,
              };
              handleUpdateSelectedPoi(placeDeconstructed);
            }
          } else {
            console.log("Something went wrong");
          }
        });
    }
  };

  const {
    data: placesSuggestions,
    setData: setPlacesSuggestions,
    loading: placesLoading,
  } = useSuggestPlaces(placesQuery);

  const [mapLoaded, setMapLoaded] = useState(false);

  const mapNode = useRef(null);

  useEffect(() => {
    currentMap?.flyTo({
      center: [mapPosition.lat, mapPosition.lng],
      zoom: mapPosition.zoom,
    });
  }, [mapPosition]);

  useEffect(() => {
    if (selectedPoi) {
      if (selectedPoi?.lat && selectedPoi?.lng) {
        currentMap?.flyTo({
          center: [selectedPoi.lat, selectedPoi.lng],
          zoom: 15,
        });
      }
      if (currentMarker) {
        currentMarker?.setLngLat([selectedPoi?.lat, selectedPoi?.lng]);
      } else {
        if (currentMap) {
          const marker = new mapboxgl.Marker({
            anchor: "bottom",
            color: "#00d688",
            scale: 0.75,
          })
            .setLngLat([selectedPoi?.lat, selectedPoi?.lng])
            .addTo(currentMap);

          setCurrentMarker(marker);
        }
      }
    } else {
      currentMarker?.remove();
      setCurrentMarker(null);
      currentMap?.flyTo({
        zoom: 4,
      });
    }
  }, [selectedPoi]);

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
      center: [mapPosition.lng, mapPosition.lat],
      zoom: mapPosition.zoom,
      attributionControl: false,
      logoPosition: "top-left",
      pitch: 40,
    });

    mapboxMap.on("load", () => setMapLoaded(true));

    const secondsPerRevolution = 360;
    const maxSpinZoom = 5;
    const slowSpinZoom = 5;

    let userInteracting = false;
    const spinEnabled = true;

    function spinGlobe() {
      const zoom = mapboxMap.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = mapboxMap.getCenter();
        center.lng -= distancePerSecond;

        mapboxMap.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    mapboxMap.on("mousedown", () => {
      userInteracting = true;
    });

    mapboxMap.on("drag", () => {
      userInteracting = true;
    });

    mapboxMap.on("moveend", () => {
      spinGlobe();
    });

    spinGlobe();
    setCurrentMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  useEffect(() => {
    resetQueries();
    setPlacesSuggestions([]);
  }, [searchType, isSearching]);

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
          "absolute top-[calc(50%-2%)] left-[calc(50%-2%)] w-6 animate-spin text-accent"
        )}
      />
      <div
        ref={mapNode}
        className="w-full transition-all h-[400px] sm:h-full"
      />

      <MapSearch
        suggestions={searchType === "PLACES" ? placesSuggestions : []}
        searchType={searchType}
        setSearchType={setSearchType}
        queryLoading={
          searchType === "PLACES" ? placesLoading : false // TODO: Add profile loading
        }
        handleUpdateQuery={handleUpdateQuery}
        handleSelect={handleSelect}
        placesQuery={placesQuery}
        profilesQuery={profilesQuery}
        isSearching={isSearching}
        handleUpdateIsSearching={handleUpdateIsSearching}
      />
    </div>
  );
}

export default MapElement;
