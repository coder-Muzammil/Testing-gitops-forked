import { getDateAsFileName } from "../utils/helpers";
import useDateTimeUtils from "./useDateTimeUtils";
function useCanvasUtils() {
  const { formatDate, formatTime } = useDateTimeUtils();
  const combineImages = (
    images: Array<HTMLImageElement>,
    logos: Array<HTMLImageElement>,
    dates: Array<string>,
    watermarkImg: HTMLImageElement,
    name: string,
  ) => {
    const mimeType = "image/jpeg";
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const fixedEachImgHeight = 130;
      const totalHeight = fixedEachImgHeight * images.length;
      const maxWidth = 1280;

      // Calculate new canvas width: 80% for the image and 20% for the logo
      const logoWidth = fixedEachImgHeight;
      const imgWidth = maxWidth - logoWidth;
      const canvasWidth = logoWidth + imgWidth;

      canvas.width = canvasWidth;
      canvas.height = totalHeight;
      // Fill the canvas with white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      let yOffset = 0;

      images.forEach((img, index) => {
        // Draw the white background rectangle below each image row
        ctx.fillStyle = "white";
        ctx.fillRect(0, yOffset, canvasWidth, fixedEachImgHeight);
        // Draw the logo
        ctx.drawImage(
          logos[index],
          logoWidth / 4,
          yOffset,
          logoWidth / 2,
          fixedEachImgHeight / 2,
        );

        // Draw the image next to the logo
        ctx.drawImage(img, logoWidth, yOffset, imgWidth, fixedEachImgHeight);

        // Draw the rectangle

        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        // here as date
        ctx.fillText(
          formatDate(dates[index]),
          logoWidth / 2,
          yOffset + fixedEachImgHeight * 0.75,
        ); // Adjust the yOffset for date position
        // here as time
        ctx.fillText(
          // new Date(dates[index]).toTimeString().slice(0, 8),
          formatTime(dates[index]),
          logoWidth / 2,
          yOffset + fixedEachImgHeight * 0.9,
        );
        yOffset += fixedEachImgHeight; // Adjust yOffset by fixedHeight
      });

      const waterMarkRepeat = Math.floor(totalHeight / canvasWidth);

      let WaterMarkYoffset = 0;
      if (totalHeight < 1280) {
        ctx.globalAlpha = 0.3; // Set transparency level (0.0 to 1.0)
        ctx.drawImage(
          watermarkImg,
          canvasWidth / 2 - totalHeight / 2,
          WaterMarkYoffset,
          totalHeight,
          totalHeight,
        );
        ctx.globalAlpha = 1.0; // Reset alpha to fully opaque for future drawings
      }

      if (totalHeight >= 1280) {
        ctx.globalAlpha = 0.3; // Set transparency level (0.0 to 1.0)
        for (let i = 0; i < waterMarkRepeat + 1; i++) {
          ctx.drawImage(
            watermarkImg,
            0,
            WaterMarkYoffset,
            canvasWidth,
            canvasWidth,
          );

          WaterMarkYoffset += canvasWidth;
        }
        ctx.globalAlpha = 1.0; // Reset alpha to fully opaque for future drawings
      }

      const dataUrl = canvas.toDataURL(mimeType);

      // Convert the data URL to a Blob
      const byteString = atob(dataUrl.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeType });

      const currentDate = new Date();
      const fileName = getDateAsFileName(currentDate);
      const newName = name.split(" ").join("");

      return new File([blob], `${newName}${fileName}.jpg`, { type: mimeType });
    }
  };

  const combinedFlasherImages = (
    images: Array<HTMLImageElement>,
    logos: Array<HTMLImageElement>,
    dates: Array<string>,
    watermarkImg: HTMLImageElement,
    name: string,
  ) => {
    const mimeType = "image/jpeg";

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const fixedEachImgHeight = 640;
      const fixedEachImgWidth = 640;

      const numRows = Math.ceil(images.length / 2);
      const headerHieght = fixedEachImgHeight / 4;
      const canvasHeight = numRows * (fixedEachImgHeight + headerHieght);
      const canvasWidth = fixedEachImgWidth * 2;
      const logoWidth = headerHieght * 0.8;
      const logoHeigth = headerHieght * 0.8;
      const dateWidth = fixedEachImgHeight * 0.3;
      const dateHeigth = fixedEachImgHeight * 0.2;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      let xOffset = 0;
      let yOffset = headerHieght;
      let yOffsetLogo = headerHieght * 0.1;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      images.forEach((img, index) => {
        if (index % 2 === 0) {
          xOffset = 0;
        } else {
          xOffset = fixedEachImgWidth;
        }

        ctx.drawImage(
          img,
          xOffset,
          yOffset,
          fixedEachImgWidth,
          fixedEachImgHeight,
        );
        ctx.drawImage(
          logos[index],
          xOffset + 10,
          yOffsetLogo,
          logoWidth,
          logoHeigth,
        );

        // Draw the date text within the white rectangle
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          formatDate(dates[index]),
          xOffset + fixedEachImgWidth - dateWidth / 2,
          yOffsetLogo + dateHeigth / 2,
        );
        // for time
        ctx.fillText(
          formatTime(dates[index]),
          xOffset + fixedEachImgWidth - dateWidth / 2,
          yOffsetLogo + dateHeigth / 2 + 23,
        );

        if (index % 2 === 1) {
          yOffset += fixedEachImgHeight + headerHieght;
          yOffsetLogo += fixedEachImgHeight + headerHieght;
        }
      });

      const waterMarkRepeat = Math.floor(canvasHeight / canvasWidth);

      let WaterMarkYoffset = 0;
      if (canvasHeight < 1280) {
        ctx.globalAlpha = 0.3; // Set transparency level (0.0 to 1.0)
        ctx.drawImage(
          watermarkImg,
          canvasWidth / 2 - canvasHeight / 2,
          WaterMarkYoffset,
          canvasHeight,
          canvasHeight,
        );
        ctx.globalAlpha = 1.0; // Reset alpha to fully opaque for future drawings
      }

      if (canvasHeight >= 1280) {
        ctx.globalAlpha = 0.3; // Set transparency level (0.0 to 1.0)
        for (let i = 0; i < waterMarkRepeat + 1; i++) {
          ctx.drawImage(
            watermarkImg,
            0,
            WaterMarkYoffset,
            canvasWidth,
            canvasWidth,
          );

          WaterMarkYoffset += canvasWidth;
        }
        ctx.globalAlpha = 1.0; // Reset alpha to fully opaque for future drawings
      }

      const dataUrl = canvas.toDataURL(mimeType);

      // Convert the data URL to a Blob
      const byteString = atob(dataUrl.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeType });

      const currentDate = new Date();
      const fileName = getDateAsFileName(currentDate);
      const newName = name.split(" ").join("");

      return new File([blob], `${newName}${fileName}.jpg`, { type: mimeType });
    }
  };

  return { combineImages, combinedFlasherImages };
}

export default useCanvasUtils;
