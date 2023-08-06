import { useState, useEffect } from "react";
import { AddressableAddress, isAddressableAddressArray } from "../interfaces";

const useAddresses = (searchQuery: string | undefined) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AddressableAddress[]>([]);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (searchQuery && searchQuery.length > 2) {
      // Clear the existing timer, if any
      if (timerId) {
        clearTimeout(timerId);
      }

      // Set a new timer
      const newTimer = setTimeout(() => {
        fetch(`/api/suggest-address?q=${searchQuery}`)
          .then((response) => response.json())
          .then((data) => {
            if (isAddressableAddressArray(data)) {
              setData(data);
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
      }, 1000); // 1 second delay

      setTimerId(newTimer);
    } else {
      setLoading(false);
      setData([]);
    }

    // Clear the timer when the component unmounts or when searchQuery changes
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [searchQuery]);

  return { error, loading, data, setData };
};

export default useAddresses;
