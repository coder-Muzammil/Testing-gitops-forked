import React, { useEffect, useState } from "react";
import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import Input from "../../primitives/Input";
import useCanvasUtils from "../../../hooks/useCanvasUtils";
import useTickersContext from "../Tickers/useTickersContext";
import { baseServiceUrlFileAccess } from "../../../api/apiConstants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import watermarkSrc from "../../../assets/demp.png"; // Import watermark image
import useDownloadS3Images from "../../../api/useDownloadS3Images";
import usePostCollage from "../../../api/useSaveCollage";
import { UseDownloadS3ImagesType } from "../../../api/useDownloadS3Images.types";
import NewGptPromptsButtons from "../LiveStt/newsGptAndPlayTime/NewGptPromptsButtons";
import useSendNewsGptCommands, {
  NewsGptPromptresponseType,
} from "../../../api/useSendNewsGptCommands";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import NewsGptEditableDataModal from "../LiveStt/newsGptAndPlayTime/NewsGptEditableDataModal";
// import useTranslateTickersOcr from "../../../api/useTranslateTickersOcr";

function HeaderCollageCreateModal({
  setIsCreateTickerModalOpen,
}: {
  setIsCreateTickerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [collageName, setCollageName] = useState("");
  const [isOpenPromptsDropdown, setIsOpenPromptsDropdown] = useState(false);
  const [isOpenNewsGptDataModal, setIsOpenNewsGptDataModal] = useState(false);
  const [mkData, setMkData] = useState<Array<NewsGptPromptresponseType>>([]);
  const [clickedPrompt, setClickedPrompt] = useState("");
  const {
    mutate: downloadImagesUrl,
    isPending,
    isError,
  } = useDownloadS3Images();
  const { mutate: postCollage } = usePostCollage();

  const { combineImages } = useCanvasUtils();
  const { formatTime, formatDate } = useDateTimeUtils();

  const {
    selectedTickers,
    setSelectedTickers,
    tickersIdsForTranslation,
    setTickersIdsForTranslation,
  } = useTickersContext();
  // const {
  //   data: translatedData,
  // } = useTranslateTickersOcr();
  const navigate = useNavigate();
  const { data: gptData, mutate } = useSendNewsGptCommands();
  useEffect(() => {
    if (gptData) {
      setMkData([gptData]);
    }
  }, [gptData]);
  async function saveTickerCollage(
    downloadedS3ImagesData: UseDownloadS3ImagesType,
  ) {
    // Load the watermark image
    const loadWatermark = new Promise<HTMLImageElement>((resolve, reject) => {
      const wm = new Image();
      wm.src = watermarkSrc;
      wm.crossOrigin = "Anonymous";
      wm.onload = () => {
        resolve(wm);
      };
      wm.onerror = () => {
        reject(new Error("Error loading watermark"));
      };
    });

    const imgElementsPromise: Array<
      Promise<{ img: HTMLImageElement; logo: HTMLImageElement; date: string }>
    > = [];

    for (let i = 0; i < downloadedS3ImagesData.image_urls.length; i++) {
      const imageData = downloadedS3ImagesData.image_urls[i];
      const ticker = selectedTickers[i];

      const imgPromise = new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.src = baseServiceUrlFileAccess + imageData.imageUrl;
        image.crossOrigin = "Anonymous";
        image.onload = () => {
          resolve(image);
        };
        image.onerror = () => {
          reject(new Error(`Error loading image at ${imageData.imageUrl}`));
        };
      });

      const logoPromise = new Promise<HTMLImageElement>((resolve, reject) => {
        const logo = new Image();
        logo.src = baseServiceUrlFileAccess + imageData.channelLogoUrl;
        logo.crossOrigin = "Anonymous";
        logo.onload = () => {
          resolve(logo);
        };
        logo.onerror = () => {
          reject(
            new Error(`Error loading logo at ${imageData.channelLogoUrl}`),
          );
        };
      });

      imgElementsPromise.push(
        Promise.all([imgPromise, logoPromise]).then(([img, logo]) => ({
          img,
          logo,
          date: ticker.dateTime,
        })),
      );
    }

    try {
      const imageLogoDateLoader = await Promise.all(imgElementsPromise);

      const images = imageLogoDateLoader.map(({ img }) => img);
      const logos = imageLogoDateLoader.map(({ logo }) => logo);
      const dates = imageLogoDateLoader.map(({ date }) => date);
      const watermarkImg = await loadWatermark;

      // Combine images, logos, watermarks, and dates into a collage
      const tickersCombinedImage = combineImages(
        images,
        logos,
        dates,
        watermarkImg,
        collageName,
      );

      if (!tickersCombinedImage) {
        toast.error("Error generating collage image");
        return;
      }

      if (!collageName) {
        toast.error("Please enter a collage name");
        return;
      }

      // Prepare data for collage submission
      const tickerIds = selectedTickers.map((ticker) => ticker.recordId);

      const collageData = {
        tickerIds,
        collageName,
        collageImage: tickersCombinedImage,
      };

      // Post collage data
      postCollage(collageData, {
        onSuccess() {
          toast.success("Collage Saved Successfully");
          setIsCreateTickerModalOpen(false);
          navigate("/myCollages");
          setSelectedTickers([]);
        },
        onError(err: unknown) {
          console.log({ err });
          toast.error("Error saving collage");
        },
      });
    } catch (error) {
      console.error("Error loading images, logos, and dates:", error);
      toast.error("Error loading images, logos, and dates");
    }
  }
  const handleSubmitPromptData = (prompt: string) => {
    const selectedData = selectedTickers
      .filter((item) => tickersIdsForTranslation.includes(item.recordId))
      .map((item) => ({
        text: item.ocrResult,
        time: formatTime(item.dateTime),
        date: formatDate(item.dateTime),
        channel_name: item.channel.channelName,
      }));

    mutate(
      {
        prompt,
        data: selectedData,
      },
      {
        onSuccess: () => {
          setIsOpenNewsGptDataModal(true);
          setIsOpenPromptsDropdown(false);
        },
      },
    );
  };

  const handleSelectAll = () => {
    setTickersIdsForTranslation(
      selectedTickers.map((ticker) => ticker.recordId),
    );
  };
  function handleSubmit() {
    const selectedImagesName = selectedTickers.map((ticker) => {
      return {
        imageName: ticker.tickerImageName,
        logoName: ticker.channel.channelLogoName,
      };
    });

    downloadImagesUrl(
      { selectedImagesName },
      {
        onSuccess: (data) => {
          void saveTickerCollage(data);
        },
      },
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <form
          className="flex items-center justify-between gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="w-[300px] 2xl:w-[500px]">
            <Input
              className="dark:text-white"
              name="collageName"
              id="collageName"
              type="text"
              placeholder="Collage Name"
              value={collageName}
              onChange={(e) => {
                setCollageName(e.target.value);
              }}
            />
          </div>
          <div className="w-16">
            <ButtonGradientPrimary
              type="submit"
              isLoading={isPending}
              isInvalid={isError}
            >
              Save
            </ButtonGradientPrimary>
          </div>
        </form>
        <div className="mt-4 flex  items-center gap-2">
          <div className=" cursor-not-allowed opacity-0">
            <NewGptPromptsButtons
              onPromptClick={handleSubmitPromptData}
              isPending={isPending}
              isOpenDropdown={isOpenPromptsDropdown}
              setIsOpenDropdown={setIsOpenPromptsDropdown}
              selectedDataLength={selectedTickers.length}
              setClickedPrompt={setClickedPrompt}
            />
          </div>
          <p
            onClick={handleSelectAll}
            className="cursor-pointer text-sm text-lavender-600 hover:underline dark:text-lavender-400 2xl:text-base"
          >
            Select All
          </p>
        </div>
      </div>
      {isOpenNewsGptDataModal && (
        <NewsGptEditableDataModal
          setIsOpenEditableModal={setIsOpenNewsGptDataModal}
          mkData={mkData.length > 0 ? mkData : [{ isUrdu: false, result: "" }]}
          setMkData={setMkData}
          clickedPrompt={clickedPrompt}
          setClickedPrompt={setClickedPrompt}
        />
      )}
    </>
  );
}

export default HeaderCollageCreateModal;
