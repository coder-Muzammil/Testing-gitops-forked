import { createContext, useContext } from "react";
import { FlashersContextType } from "./FlasherConextComponent.types";

export const FlashersContext = createContext<FlashersContextType | undefined>(
  undefined,
);

function useFlasherContext() {
  const context = useContext(FlashersContext);

  if (!context) {
    throw new Error("useTickersContext must be used within a TickersProvider");
  }

  return context;
}

export default useFlasherContext;
