import { ServiceCardTypes } from "../../../utils/typeDefinations";
import { FaThumbsDown } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
type ServiceCardProps = {
  card: ServiceCardTypes;
};

const ServiceCard = ({ card }: ServiceCardProps) => {
  return (
    <div className="outer__container">
      <div className="inner__container h-full w-full">
        <div className="flex h-fit w-full flex-col gap-3 px-4 py-2">
          <p className="text-md font-semibold text-gray-400">
            {card.serviceName}
          </p>
          <div className="flex items-end justify-start gap-2">
            {card.isOnline ? (
              <p className="rounded-full border border-green-500 bg-green-500/20 px-4 py-1.5 text-sm text-green-500">
                <span className="flex items-start justify-center gap-2">
                  <p className="text-white">Up</p>
                  <FaThumbsUp fontSize={18} color="white" />
                </span>
              </p>
            ) : (
              <p className="rounded-full bg-red-600 px-4 py-1.5 text-sm">
                <span className="flex items-end justify-center gap-2">
                  <p className="text-white">Down</p>
                  <FaThumbsDown fontSize={18} color="white" />
                </span>
              </p>
            )}
          </div>
          {!card.isOnline && (
            <p className="text-sm text-gray-400">
              <span className="me-2 font-semibold text-blue-300">
                Last Online:
              </span>
              {card.lastOnline}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
