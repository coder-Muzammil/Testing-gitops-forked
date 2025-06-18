import { twMerge } from "tailwind-merge";
import useDownloadS3Images from "../../../api/useDownloadS3Images";
import { useNavigate } from "react-router-dom";
import useFlasherContext from "../flashers/useFlasherContext";
import { baseServiceUrlFileAccess } from "../../../api/apiConstants";

const FlashersCollageButton = () => {
  const { selectedFlashers } = useFlasherContext();
  const navigate = useNavigate();
  const { mutate: downloadS3ImagesUrl } = useDownloadS3Images();
  const anySelectedTicker = selectedFlashers.length > 0;

  const selectedImagesName = selectedFlashers.map((flasher) => {
    return {
      imageName: flasher.fullFrameFlasherImageName,
      logoName: flasher.channel.channelLogoName,
    };
  });

  const sortedFlashers = [...selectedFlashers].sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
  );
  function handleSubmit() {
    downloadS3ImagesUrl(
      {
        selectedImagesName,
      },

      {
        onSuccess: (data) => {
          const downloadedS3ImagesData = data;
          const updatedImageUrls = downloadedS3ImagesData.image_urls
            .map(({ imageUrl }: { imageUrl: string }) => [
              `${baseServiceUrlFileAccess}${imageUrl}`,
            ])
            .flat();
          navigate("/flashersCanvas", {
            state: {
              flashers: updatedImageUrls,
              flasherIds: sortedFlashers.map((flasher) => flasher.recordId),
            },
          });
        },
      },
    );
  }
  return (
    <>
      <button
        className={twMerge(
          "h-9 cursor-pointer rounded-md px-3 text-sm shadow-md",
          anySelectedTicker && "bg-white text-purple-500",
          !anySelectedTicker && "cursor-not-allowed bg-gray-300 text-black/50",
        )}
        onClick={() => {
          handleSubmit();
        }}
        disabled={selectedFlashers.length === 0}
      >
        Collage
        <span className="mx-2 rounded-sm bg-lavender-500 px-2 py-1 text-white">
          {selectedFlashers.length}
        </span>
      </button>
    </>
  );
};

export default FlashersCollageButton;
