import { useState } from "react";
import { SingleTickerType } from "../../../api/responseTypes/getAllTickersApi.types";
import { TickersContext } from "./useTickersContext";

function TickersContextComponent({ children }: { children: React.ReactNode }) {
  const [selectedTickers, setSelectedTickers] = useState<
    Array<SingleTickerType>
  >([]);
  const [isViewAndEditModalOpen, setIsViewAndEditModalOpen] = useState(false);
  const [selectedTickersHeadlines, setSelectedTickersHeadlines] = useState<
    Array<SingleTickerType>
  >([]);
  const [tickersIdsForTranslation, setTickersIdsForTranslation] = useState<
    Array<number>
  >([]);
  const [isStarPlayModalOpen, setIsStarPlayModalOpen] = useState(false);
  const [starPlayData, setStarPlayData] = useState({
    channelName: "",
    time: "",
    date: "",
  });
  return (
    <TickersContext.Provider
      value={{
        selectedTickers,
        setSelectedTickers,
        isViewAndEditModalOpen,
        setIsViewAndEditModalOpen,
        selectedTickersHeadlines,
        setSelectedTickersHeadlines,
        tickersIdsForTranslation,
        setTickersIdsForTranslation,
        isStarPlayModalOpen,
        setIsStarPlayModalOpen,
        starPlayData,
        setStarPlayData,
      }}
    >
      {children}
    </TickersContext.Provider>
  );
}
export default TickersContextComponent;
