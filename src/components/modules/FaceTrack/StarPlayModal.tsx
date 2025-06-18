import Portal from "../../primitives/Portal";
import StarPlayerContextComponent from "../StarPlayer/StarPlayerContextComponent";
import StarCoveragePlayer from "../StarPlayer/StarCoveragePlayer";
import { IoCloseOutline } from "react-icons/io5";
import useGetThumbnail from "../../../api/useGetThumbnail";
import { frServiceUrl } from "../../../api/apiConstants";

const StarPlayModal = ({
  setOpen,
  personId,
  channelName,
  personName,
  personThumbnail,
}: {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  personId: number;
  channelName: string;
  personName: string;
  personThumbnail: string;
}) => {
  const {
    data: thumbnail,
    isLoading,
    isError,
    error,
  } = useGetThumbnail({
    personId,
    channelName,
  });

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <StarPlayerContextComponent>
      <Portal>
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
          <div className="flex h-full max-h-[80vh] w-9/12 flex-col items-center justify-center  rounded-md bg-white px-3 py-8 text-black dark:bg-gray-700 dark:text-white">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={`${frServiceUrl}${personThumbnail}`}
                  alt="person image"
                  className="h-10 w-10 rounded-full object-contain"
                />
                <p>{personName}</p>
              </div>
              <button className="cursor-pointer" onClick={handleCloseModal}>
                <IoCloseOutline size={26} />
              </button>
            </div>

            {isError || isLoading ? (
              <>
                {isLoading && (
                  <div className="w-full text-center text-xl font-semibold text-blue-300">
                    Loading...
                  </div>
                )}
                {isError && (
                  <div className="mt-5 w-full text-center font-semibold text-red-500">
                    {error.message}
                  </div>
                )}
              </>
            ) : (
              <>
                <StarCoveragePlayer
                  streamInterval={thumbnail?.intervals ?? []}
                  liveLink={thumbnail?.liveLink ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </Portal>
    </StarPlayerContextComponent>
  );
};

export default StarPlayModal;
