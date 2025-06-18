import { createContext, useContext } from "react";
import { SttUploadContextType } from "./SttUploadContextComponent.type";

export const SttUploadContext = createContext<SttUploadContextType | undefined>(
  undefined,
);

function useSttUploadContext() {
  const context = useContext(SttUploadContext);

  if (!context) {
    throw new Error("Context must be used within a Provider");
  }

  return context;
}

export default useSttUploadContext;
