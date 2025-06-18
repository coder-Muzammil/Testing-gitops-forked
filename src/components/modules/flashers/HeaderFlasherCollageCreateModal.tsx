import React, { useState } from "react";
import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import Input from "../../primitives/Input";
import usePostFlasherCollage from "../../../api/useSaveFlasherCollage";
import useCanvasUtils from "../../../hooks/useCanvasUtils";
import { baseServiceUrlFileAccess } from "../../../api/apiConstants";
import { useNavigate } from "react-router-dom";
import useFlasherContext from "./useFlasherContext";
import toast from "react-hot-toast";
import watermarkSrc from "../../../assets/demp.png"; // Import watermark image

const HeaderFlasherCollageCreateModal = ({
  setIsCreateFlasherModalOpen,
}: {
  setIsCreateFlasherModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [mosaicName, setMosaicName] = useState("");
  const { combinedFlasherImages } = useCanvasUtils();
  const { selectedFlashers, setSelectedFlashers } = useFlasherContext();
  const {
    mutate: saveFlasherCollage,
    isPending,
    isError,
  } = usePostFlasherCollage();
  const navigate = useNavigate();

  async function imgLogoDateLoader() {
    const imgElementsPromise: Array<
      Promise<{ img: HTMLImageElement; logo: HTMLImageElement; date: string }>
    > = [];

    for (const flasher of selectedFlashers) {
      const imgPromise = new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = baseServiceUrlFileAccess + flasher.flasherImageUrl;
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          resolve(img);
        };
        img.onerror = () => {
          reject(new Error());
        };
      });

      const logoPromise = new Promise<HTMLImageElement>((resolve, reject) => {
        const logo = new Image();
        logo.src =
          baseServiceUrlFileAccess + (flasher.channel.channelLogo ?? "");
        logo.crossOrigin = "Anonymous";
        logo.onload = () => {
          resolve(logo);
        };
        logo.onerror = () => {
          reject(new Error());
        };
      });

      imgElementsPromise.push(
        Promise.all([imgPromise, logoPromise]).then(([img, logo]) => ({
          img,
          logo,
          date: flasher.dateTime,
        })),
      );
    }

    return Promise.all(imgElementsPromise);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    try {
      const imageLogoDateLoader = await imgLogoDateLoader();

      const images = imageLogoDateLoader.map(({ img }) => img);
      const logos = imageLogoDateLoader.map(({ logo }) => logo);
      const dates = imageLogoDateLoader.map(({ date }) => date);
      const watermarkImg = await loadWatermark;
      const flashersCombinedImage = combinedFlasherImages(
        images,
        logos,
        dates,
        watermarkImg,
        mosaicName,
      );

      if (!flashersCombinedImage) {
        toast.error("Error generating collage image");
        return;
      }

      if (!mosaicName) {
        toast.error("Please enter a collage name");
        return;
      }

      const flasherIds = selectedFlashers.map((flasher) => flasher.recordId);

      saveFlasherCollage(
        {
          flasherIds,
          mosaicName,
          mosaicImage: flashersCombinedImage,
        },
        {
          onSuccess() {
            toast.success("Collage Saved Successfully");
            setIsCreateFlasherModalOpen(false);
            navigate("/myMosaics");
            setSelectedFlashers([]);
          },
          onError(err: unknown) {
            console.log({ err });
            toast.error("Error saving collage");
          },
        },
      );
    } catch (error) {
      console.error("Error loading images, logos, and dates:", error);
      toast.error("Error loading images, logos, and dates");
    }
  }

  return (
    <form
      className="flex items-center justify-between"
      onSubmit={(e) => {
        handleSubmit(e).catch(() => {
          console.log(e);
        });
      }}
    >
      <div className="w-[300px] 2xl:w-[500px]">
        <Input
          name="flasherName"
          id="flasherName"
          type="text"
          placeholder="Flasher Name"
          value={mosaicName}
          onChange={(e) => {
            setMosaicName(e.target.value);
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
  );
};

export default HeaderFlasherCollageCreateModal;
