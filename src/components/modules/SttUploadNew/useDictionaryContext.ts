import { createContext, useContext } from "react";
import { DictionaryContextType } from "./DictionaryContextComponent.types";

export const DictionaryContext = createContext<
  DictionaryContextType | undefined
>(undefined);

function useDictionaryContext() {
  const context = useContext(DictionaryContext);

  if (!context) {
    throw new Error("Context must be used within a Provider");
  }

  return context;
}

export default useDictionaryContext;
