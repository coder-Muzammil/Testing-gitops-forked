import { useState } from "react";
import { SingleFlasherType } from "../../../api/responseTypes/getFlashersApi.types";
import { FlashersContext } from "./useFlasherContext";

function FlashersContextComponent({ children }: { children: React.ReactNode }) {
  const [selectedFlashers, setSelectedFlashers] = useState<
    Array<SingleFlasherType>
  >([]);
  const [isViewAndEditModalOpen, setIsViewAndEditModalOpen] = useState(false);
  const [isfullframe, setIsfullframe] = useState(false);
  const [clickedFlasher, setClickedFlasher] = useState<number | null>(null);
  const [selectedFlashersHeadlines, setSelectedFlashersHeadlines] = useState<
    Array<SingleFlasherType>
  >([]);
  const [isStarPlayModalOpen, setIsStarPlayModalOpen] = useState(false);
  const [starPlayData, setStarPlayData] = useState({
    channelName: "",
    time: "",
    date: "",
  });
  return (
    <FlashersContext.Provider
      value={{
        selectedFlashers,
        setSelectedFlashers,
        isViewAndEditModalOpen,
        setIsViewAndEditModalOpen,
        isfullframe,
        setIsfullframe,
        clickedFlasher,
        setClickedFlasher,
        selectedFlashersHeadlines,
        setSelectedFlashersHeadlines,
        isStarPlayModalOpen,
        setIsStarPlayModalOpen,
        starPlayData,
        setStarPlayData,
      }}
    >
      {children}
    </FlashersContext.Provider>
  );
}
export default FlashersContextComponent;
