import { useContext } from "react";
import { SttUploadContext } from "./SttUploadContextComponents";

function useSttUploadContext() {
  const context = useContext(SttUploadContext);

  if (!context) {
    throw new Error("useTickersContext must be used within a TickersProvider");
  }

  return context;
}

export default useSttUploadContext;
