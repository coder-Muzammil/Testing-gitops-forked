import { useState } from "react";
import TopNotch from "../../primitives/TopNotch";
import ServiceCardsContainer from "../ServicesStatus/ServiceCardsContainer";
import useGetAllChannels from "../../../api/useGetAllChannels";

function OutletMainContainer({ children }: { children: React.ReactNode }) {
  const [showCards, setShowCards] = useState(false);
  useGetAllChannels();

  const toggleCards = () => {
    setShowCards((prev) => !prev);
  };

  return (
    <div className="grid grid-rows-[auto_1fr] overflow-hidden">
      <TopNotch onOpenCards={toggleCards} />
      <div className="grid h-full grid-rows-1 overflow-hidden p-3">
        {children}
      </div>

      {showCards && <ServiceCardsContainer onCloseCards={toggleCards} />}
    </div>
  );
}
export default OutletMainContainer;
