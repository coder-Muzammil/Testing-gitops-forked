import { SingleFlasherType } from "../../../api/responseTypes/getFlashersApi.types";

export type FlashersContextType = {
  selectedFlashers: Array<SingleFlasherType>;
  setSelectedFlashers: React.Dispatch<
    React.SetStateAction<Array<SingleFlasherType>>
  >;
  isViewAndEditModalOpen: boolean;
  setIsViewAndEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isfullframe: boolean;
  setIsfullframe: React.Dispatch<React.SetStateAction<boolean>>;
  clickedFlasher: number | null;
  setClickedFlasher: React.Dispatch<React.SetStateAction<number | null>>;
  selectedFlashersHeadlines: Array<SingleFlasherType>;
  setSelectedFlashersHeadlines: React.Dispatch<
    React.SetStateAction<Array<SingleFlasherType>>
  >;
  isStarPlayModalOpen: boolean;
  setIsStarPlayModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
};
