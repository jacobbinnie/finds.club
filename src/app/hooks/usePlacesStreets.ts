import { useState, useEffect, useCallback } from "react";
import { MapboxFeatures, isValidMapboxResponse } from "../interfaces";

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
const MAPBOX_ENDPOINT = process.env.NEXT_PUBLIC_MAPBOX_ENDPOINT || "";

const usePlacesStreets = (searchQuery: string | undefined) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<MapboxFeatures[]>([]);

  const suggestPlaceAndStreet = useCallback(async () => {
    setLoading(true);
    setError(null);

    const updatedEndpoint = `${MAPBOX_ENDPOINT}?q=${searchQuery}&country=nz&proximity=ip&types=street%2Cplace%2Clocality&access_token=${MAPBOX_ACCESS_TOKEN}`;

    if (searchQuery && searchQuery.length > 2) {
      try {
        const response = await fetch(updatedEndpoint);
        const data = await response.json();

        if (isValidMapboxResponse(data)) {
          setData(data.features);
        } else {
          setError("Received data is not in the expected format.");
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    suggestPlaceAndStreet();
  }, [suggestPlaceAndStreet]);

  return { error, loading, data, setData };
};

export default usePlacesStreets;
