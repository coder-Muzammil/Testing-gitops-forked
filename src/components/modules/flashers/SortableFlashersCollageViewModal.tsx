import { baseServiceUrl } from "../../../api/apiConstants";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import useFlashersContext from "./useFlasherContext";

function SortableFlashersCollageViewModal() {
  const { selectedFlashers } = useFlashersContext();
  const { formatDate, formatTime } = useDateTimeUtils();

  return (
    <>
      <div className="grid grid-cols-2 overflow-auto">
        {selectedFlashers.map((flasher) => (
          <div className="grid w-full grid-cols-1 " key={flasher.recordId}>
            <div className="flex w-full items-center justify-between bg-white p-2">
              <div className=" h-[70px] w-[70px] bg-green-400">
                <img
                  src={baseServiceUrl + (flasher.channel.channelLogo ?? "")}
                  alt=""
                  className="h-full w-full"
                />
              </div>
              <div className="  flex h-[70px] w-[130px] flex-col items-center justify-center bg-white">
                <p className="text-center">{formatDate(flasher.dateTime)}</p>
                <p className="text-center">
                  {formatTime(
                    selectedFlashers[selectedFlashers.length - 1].dateTime,
                  )}
                </p>
              </div>
            </div>
            <img
              src={baseServiceUrl + flasher.flasherImageUrl}
              className="h-full w-full bg-red-400 "
              alt="flasher Image"
            />
          </div>
        ))}
      </div>
    </>
  );
}
export default SortableFlashersCollageViewModal;
