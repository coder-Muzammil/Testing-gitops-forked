import { toPng } from "html-to-image";
import { PiCamera } from "react-icons/pi";

const MastershotButton = () => {
  const handleClickMastershot = () => {
    const mosaicGrid = document.getElementById("mosaic-grid");
    if (mosaicGrid) {
      toPng(mosaicGrid, { skipFonts: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "mosaic.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err: unknown) => {
          console.error("oops, something went wrong!", err);
        });
    }
  };
  return (
    <button onClick={handleClickMastershot}>
      <PiCamera size={20} title="Screenshot" cursor="pointer" />
    </button>
  );
};

export default MastershotButton;
