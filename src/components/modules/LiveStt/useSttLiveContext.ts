import { createContext, useContext } from "react";
import { SttLiveContextType } from "./SttLiveContextComponent.types";

export const SttLiveContext = createContext<SttLiveContextType | undefined>(
  undefined,
);

export function useSttLiveContext() {
  const context = useContext(SttLiveContext);

  if (!context) {
    throw new Error(
      "useSttLiveContext must be used within a SttLiveContextProvider",
    );
  }
  return context;
}
