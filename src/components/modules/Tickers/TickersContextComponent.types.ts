import { SingleTickerType } from "../../../api/responseTypes/getAllTickersApi.types";

export type TickersContextType = {
  selectedTickers: Array<SingleTickerType>;
  setSelectedTickers: React.Dispatch<
    React.SetStateAction<Array<SingleTickerType>>
  >;
  isViewAndEditModalOpen: boolean;
  setIsViewAndEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  selectedTickersHeadlines: Array<SingleTickerType>;
  setSelectedTickersHeadlines: React.Dispatch<
    React.SetStateAction<Array<SingleTickerType>>
  >;
  tickersIdsForTranslation: Array<number>;
  setTickersIdsForTranslation: React.Dispatch<
    React.SetStateAction<Array<number>>
  >;
  starPlayData: {
    channelName: string;
    time: string;
    date: string;
  };
  setStarPlayData: React.Dispatch<
    React.SetStateAction<{
      channelName: string;
      time: string;
      date: string;
    }>
  >;
  isStarPlayModalOpen: boolean;
  setIsStarPlayModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
