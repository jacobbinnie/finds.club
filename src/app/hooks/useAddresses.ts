import { useState, useEffect } from "react";
import { AddressableAddress, isAddressableAddressArray } from "../interfaces";

const useAddresses = (searchQuery: string | undefined) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AddressableAddress[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (searchQuery && searchQuery.length > 2) {
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
    } else {
      setLoading(false);
      setData([]);
    }
  }, [searchQuery]);

  return { error, loading, data, setData };
};

export default useAddresses;
