import { useState, useEffect } from "react";
import { MapboxFeatures, isValidMapboxResponse } from "../interfaces";

const usePlacesStreets = (searchQuery: string | undefined) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<MapboxFeatures[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (searchQuery && searchQuery.length > 2) {
      fetch(`/api/suggest-places-streets?q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          if (isValidMapboxResponse(data)) {
            setData(data.features);
          } else {
            setError("Received data is not in the expected format.");
          }
        })
        .catch(() => {
          setError("An error occurred while fetching data.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setData([]);
    }
  }, [searchQuery]);

  return { error, loading, data, setData };
};

export default usePlacesStreets;
