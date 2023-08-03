"use client";
import React, { createContext, useContext, useState } from "react";

interface RouteContextValues {
  page: "HOME" | "MAP";
  setPage: (page: "HOME" | "MAP") => void;
}

const RouteContext = createContext<RouteContextValues>({
  page: "HOME",
  setPage: () => {},
});

interface RouteProviderOptions {
  children?: React.ReactNode;
}

export const RouteProvider = ({ children }: RouteProviderOptions) => {
  const [page, setPage] = useState<"HOME" | "MAP">("HOME");

  const value = {
    page,
    setPage,
  };

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
};

export const useRoute = () => {
  return useContext(RouteContext);
};
