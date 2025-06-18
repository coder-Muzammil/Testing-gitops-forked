import { createContext, useContext } from "react";
import { TickersContextType } from "./TickersContextComponent.types";

export const TickersContext = createContext<TickersContextType | undefined>(
  undefined,
);

function useTickersContext() {
  const context = useContext(TickersContext);

  if (!context) {
    throw new Error("useTickersContext must be used within a TickersProvider");
  }

  return context;
}

export default useTickersContext;
