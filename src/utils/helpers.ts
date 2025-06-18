import toast from "react-hot-toast";
import { baseServiceUrl, sttLiveServiceUrl } from "../api/apiConstants";
import { SafeParseReturnType } from "zod";
import { MosaicSizeType } from "../stores/useManageMosaic.types";
import { Word } from "react-d3-cloud";

export function verifyResourceUrl(url: string | null, fallback: string) {
  if (url) {
    return `${baseServiceUrl}${url}`;
  }

  return fallback;
}
export function verifyResourceUrlLive(url: string | null, fallback: string) {
  if (url) {
    return `${baseServiceUrl}media/${url}`;
  }

  return fallback;
}

// TODO: this is a temporary function. must be removed once the service is merged with the main service.
export function verifyResourceUrlStt(url: string, fallback: string) {
  if (url) {
    return `${sttLiveServiceUrl}media/logo/${url}`;
  }

  return fallback;
}

export function handleCopyToClipboard(textToCopy: string) {
  toast.success("Text Copied to Clipboard");
  const textarea = document.createElement("textarea");
  textarea.value = textToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export const formatTime = (seconds: number) => {
  if (seconds < 60) {
    return `${String(seconds)} seconds`;
  }

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const minutesString = mins === 1 ? "1 minute" : `${String(mins)} minutes`;
  const secondsString = secs === 1 ? "1 second" : `${String(secs)} seconds`;

  return `${minutesString} ${secs > 0 ? secondsString : ""}`;
};

// get the videoDuration in seconds.
export function getVideoDuration(file: File) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };
    video.onerror = function () {
      reject(new Error("Error loading video file."));
    };
    video.src = URL.createObjectURL(file);
  });
}

export function getSafeParsedDataAndLogIfError<T, E>(
  parsedResult: SafeParseReturnType<T, E>,
) {
  if (!parsedResult.success) {
    console.log(parsedResult.error);
    throw new Error("Error in parsing response");
  }
  return parsedResult.data;
}

export function download(media_file: string, name: string) {
  fetch(media_file)
    .then((response) => {
      response
        .blob()
        .then((blob) => {
          const fileURL = window.URL.createObjectURL(new Blob([blob]));
          const alink = document.createElement("a");
          alink.href = fileURL;
          alink.setAttribute("download", name);
          document.body.appendChild(alink);
          alink.click();
          alink.remove();
        })
        .catch((error: unknown) => {
          console.error("Error downloading file", error);
        });
    })
    .catch((error: unknown) => {
      console.error(error);
    });
}

/** To download text file  */
export function downloadTextFile(textToDownload: string, fileName: string) {
  const blob = new Blob([textToDownload], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = fileName;
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const testLine = `${line}${word} `;
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && line !== "") {
      lines.push(line.trim());
      line = `${word} `;
    } else {
      line = testLine;
    }
  });

  lines.push(line.trim());
  return lines;
}

// export async function downloadTextAsImage(
//   canvas: HTMLCanvasElement,
//   ctx: CanvasRenderingContext2D,
//   textToDownload: string,
//   fileName: string,
//   imageUrls: Array<string>,
//   isSttSelected: boolean,
// ) {
//   const canvasWidth = canvas.width;
//   const canvasHeight = isSttSelected
//     ? imageUrls.length * 150
//     : imageUrls.length * 180;
//   canvas.height = canvasHeight;
//   const lineHeight = 20;

//   ctx.fillStyle = "white";
//   ctx.fillRect(0, 0, canvasWidth, canvasHeight);

//   const lines = textToDownload.split("\n");

//   lines.forEach((line, index) => {
//     ctx.fillStyle = "black";
//     const maxWidth = canvasWidth - 110;
//     const x = 10;
//     const y = (index + 1) * lineHeight;

//     ctx.font = "14px Noto Sans Display";
//     ctx.fillText(line, x, y, maxWidth);
//   });

//   // TODO: implement reject in promise
//   const loadImages = imageUrls.map((imageUrl, indx) => {
//     return new Promise((resolve) => {
//       const img = new Image();
//       img.crossOrigin = "Anonymous";
//       img.onload = () => {
//         const xValue = canvasWidth - 55;
//         const yValue = 10 + (isSttSelected ? indx * 140 : indx * 170);
//         const logoWidth = 45;
//         const logoHeight = 50;
//         ctx.drawImage(img, xValue, yValue, logoWidth, logoHeight);
//         // // for urdu text image
//         // ctx.drawImage(img, 10, yValue, logoWidth, logoHeight);
//         resolve(img);
//       };
//       img.onerror = () => {
//         console.error(`Error loading image at URL: ${imageUrl}`);
//         resolve(img);
//       };
//       img.src = imageUrls[indx];
//     });
//   });

//   Promise.all(loadImages)
//     .then(() => {
//       const image = canvas.toDataURL("image/jpeg");
//       const byteString = atob(image.split(",")[1]);
//       const ab = new ArrayBuffer(byteString.length);
//       const ia = new Uint8Array(ab);
//       for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//       }
//       const blob = new Blob([ab], { type: "image/jpeg" });
//       const myNewFile = new File([blob], `${fileName}.jpg`, {
//         type: "image/jpeg",
//       });
//       console.log({ myNewFile });

//       return myNewFile;
//     })
//     .catch((error: unknown) => {
//       console.error("Error during image processing", error);
//     });
// }

export async function downloadTextAsImage(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  textToDownload: string,
  fileName: string,
  imageUrls: Array<string>,
  isSttSelected: boolean,
): Promise<File> {
  const mimeType = "image/jpeg";

  // Change return type to Promise<File>
  const canvasWidth = canvas.width;
  const canvasHeight = isSttSelected
    ? imageUrls.length * 150
    : imageUrls.length * 240;
  canvas.height = canvasHeight;
  const lineHeight = 20;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const lines = textToDownload.split("\n");

  lines.forEach((line, index) => {
    ctx.fillStyle = "black";
    const maxWidth = canvasWidth - 110;
    const x = 10;
    const y = (index + 1) * lineHeight;

    ctx.font = "14px Noto Sans Display";
    ctx.fillText(line, x, y, maxWidth);
  });

  const loadImages = imageUrls.map((imageUrl, indx) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const xValue = canvasWidth - 55;
        const yValue = 10 + (isSttSelected ? indx * 140 : indx * 230);
        const logoWidth = 45;
        const logoHeight = 50;
        ctx.drawImage(img, xValue, yValue, logoWidth, logoHeight);
        resolve(img);
      };
      img.onerror = () => {
        console.error(`Error loading image at URL: ${imageUrl}`);
        resolve(img);
      };
      img.src = imageUrls[indx];
    });
  });

  await Promise.all(loadImages);

  const image = canvas.toDataURL(mimeType);
  const byteString = atob(image.split(",")[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeType });
  // const link = document.createElement("a");
  // link.download = fileName;
  // link.href = window.URL.createObjectURL(blob);
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);

  return new File([blob], `${fileName}.jpg`, {
    type: mimeType,
  });
}

export function highlightQueryInText({
  text,
  query,
}: {
  text: string;
  query: string;
}): string {
  if (!query) return text;

  const regex = new RegExp(query, "gi");
  return text.replace(
    regex,
    (match) => `<span class="bg-lavender-300">${match}</span>`,
  );
}

export function getMosaicSize(arrayLength: number): MosaicSizeType {
  const size = Math.ceil(Math.sqrt(arrayLength));
  return Math.min(Math.max(size, 3), 8) as MosaicSizeType;
}

export function checkLanguage(char: string | null) {
  const unicodeVal = char?.codePointAt(0) ?? 0; // Get the Unicode code point of the character

  // Check if the character is English (Latin alphabet)
  if (
    (unicodeVal >= 0x0041 && unicodeVal <= 0x005a) ||
    (unicodeVal >= 0x0061 && unicodeVal <= 0x007a)
  ) {
    return "english";
  }

  // Check if the character is Urdu (Arabic script)
  else if (
    (unicodeVal >= 0x0600 && unicodeVal <= 0x06ff) ||
    (unicodeVal >= 0x0750 && unicodeVal <= 0x077f)
  ) {
    return "urdu";
  }

  return "other"; // In case it's neither English nor Urdu
}

// =================================================================== START: STT Playtime Time Parser and Interval ===================================================================
export function parseTime(timeStr: string): Date {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes, seconds = "00"] = time.split(":");

  if (modifier === "PM" && hours !== "12") {
    hours = String(parseInt(hours, 10) + 12);
  }
  if (modifier === "AM" && hours === "12") {
    hours = "00";
  }

  minutes = minutes.padStart(2, "0");
  seconds = seconds.padStart(2, "0");

  return new Date(`1970-01-01T${hours}:${minutes}:${seconds}`);
}

export function isTimeInInterval(time: Date, interval: string): boolean {
  const [startStr, endStr] = interval.split(" to ");
  const startTime = parseTime(startStr);
  const endTime = parseTime(endStr);
  return time >= startTime && time <= endTime;
}
// =================================================================== END: STT Playtime Time Parser and Interval ===================================================================

//======================Function for geting Word Size for WC ======================
export function getRandomWordSize(word: Word): number {
  const minValue = 0; // Minimum possible value
  const maxValue = 260; // Maximum possible value

  const minSize = 30; // Minimum size to return
  const maxSize = 200; // Maximum size to return

  const value = word.value;
  const clampedValue = Math.max(minValue, Math.min(value, maxValue));

  // Scale linearly
  return (
    ((clampedValue - minValue) / (maxValue - minValue)) * (maxSize - minSize) +
    minSize
  );
}

// Make date as file name
export function getDateAsFileName(date: Date): string {
  const pad = (n: number): string => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Month is 0-indexed
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `file_${String(year)}_${month}_${day}_${hours}_${minutes}_${seconds}`;
}
