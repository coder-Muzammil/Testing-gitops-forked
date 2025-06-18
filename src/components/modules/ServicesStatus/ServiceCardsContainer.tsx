import { IoCloseCircleOutline } from "react-icons/io5";
import ServiceCard from "./ServiceCard";
import { serviceCardData } from "../../../utils/constants";

type ServiceCardsContainerProps = {
  onCloseCards: () => void;
};
const ServiceCardsContainer = ({
  onCloseCards,
}: ServiceCardsContainerProps) => {
  return (
    <div className="fixed inset-0 z-10 flex h-screen w-full flex-col items-center justify-center bg-black/70 px-3 py-3">
      <div className="relative h-full w-full animate-slideUpFadeIn rounded-md bg-[#171719] p-2">
        <div className="flex w-full items-center justify-end">
          <IoCloseCircleOutline
            onClick={onCloseCards}
            size={30}
            cursor="pointer"
            className="text-white"
          />
        </div>
        <div
          className={`grid h-full w-full grid-cols-3 place-content-start gap-4 overflow-y-auto rounded-md p-2 shadow-sm xl:grid-cols-4`}
        >
          {serviceCardData.map((card) => (
            <ServiceCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCardsContainer;
