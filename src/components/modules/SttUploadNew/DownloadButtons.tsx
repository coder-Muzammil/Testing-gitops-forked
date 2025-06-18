import { MutableRefObject, useRef, useState } from "react";
import { GetTranscribedVideoDataApiResponseType } from "../../../api/useGetTranscribedVideoData.types";
import { IoMdDownload } from "react-icons/io";
import { useClickAway } from "@uidotdev/usehooks";
import toast from "react-hot-toast";
import usePostDownloadTextDocxFile, {
  Chunk,
} from "../../../api/usePostDownloadTextDocxFile";
import { twMerge } from "tailwind-merge";
import useSttUploadContext from "./useSttUploadContext";

const DownloadButtons = ({
  data,
}: {
  data: GetTranscribedVideoDataApiResponseType;
}) => {
  const { mutate: downloadtextAsDocs, isPending } =
    usePostDownloadTextDocxFile();
  const { selectedChunksForTranslation } = useSttUploadContext();

  const [isDownloadButtonsDropdownOpen, setIsDownloadButtonsDropdownOpen] =
    useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isSelected = selectedChunksForTranslation.length > 0;

  const ref = useClickAway(() => {
    setIsDownloadButtonsDropdownOpen(false);
  });

  const downloadReportInPdfFile = (title: string, chunks: Array<Chunk>) => {
    downloadtextAsDocs(
      { title, chunks, fileName: "transcription.pdf" },
      {
        onSuccess: () => {
          toast.success("Docx file downloaded successfully.");
        },
        onError: (error: Error) => {
          toast.error("ERROR: " + error.message);
        },
      },
    );
  };

  const downloadAllTextAsImage = () => {
    const chunks = data.chunks.map((chunk) => {
      return {
        text: chunk.editedText,
        srName: "",
      };
    });
    downloadReportInPdfFile(data.video.Name, chunks);
  };

  const downloadAllTextWithSrAsImage = () => {
    const chunks = data.chunks.map((chunk) => {
      return {
        text: chunk.editedText,
        srName: chunk.speakerName,
      };
    });

    downloadReportInPdfFile(data.video.Name, chunks);
  };

  const downloadSelectedTextAsImage = () => {
    const chunks = data.chunks
      .filter((chunk) => selectedChunksForTranslation.includes(chunk.id))
      .map((chunk) => {
        return {
          text: chunk.editedText,
          srName: "",
        };
      })
      .filter(Boolean);

    downloadReportInPdfFile(data.video.Name, chunks);
  };
  const downloadSelectedTextWithSpeakerAsImage = () => {
    const chunks = data.chunks
      .filter((chunk) => selectedChunksForTranslation.includes(chunk.id))
      .map((chunk) => {
        return {
          text: chunk.editedText,
          srName: chunk.speakerName,
        };
      })
      .filter(Boolean);

    downloadReportInPdfFile(data.video.Name, chunks);
  };

  return (
    <div
      className="relative flex items-center gap-2"
      ref={ref as MutableRefObject<HTMLDivElement>}
    >
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button
        onClick={() => {
          setIsDownloadButtonsDropdownOpen(!isDownloadButtonsDropdownOpen);
        }}
        className="flex items-center justify-center gap-2 rounded-md bg-lavender-600 px-2 py-1 text-white"
      >
        <p>Download</p>
        <IoMdDownload />
      </button>
      {isDownloadButtonsDropdownOpen && (
        <div className=" absolute -mb-[170px] flex w-[220px]  flex-col items-center justify-center gap-2 rounded-md bg-lavender-300 p-2  ">
          <button
            className={twMerge(
              "w-full cursor-pointer border-b-[1px] border-gray-300  text-left",
              isPending && "disabled:cursor-not-allowed disabled:bg-gray-200",
            )}
            onClick={downloadAllTextAsImage}
            disabled={isPending}
          >
            All Text With Out SR
          </button>
          <button
            className=" w-full cursor-pointer border-b-[1px] border-gray-300 text-left hover:bg-gray-300"
            onClick={downloadAllTextWithSrAsImage}
          >
            All Text With SR
          </button>
          <button
            className=" w-full cursor-pointer border-b-[1px] border-gray-300 text-left hover:bg-gray-300 disabled:cursor-not-allowed"
            onClick={downloadSelectedTextAsImage}
            disabled={!isSelected}
          >
            Selected Text Without SR
          </button>

          <button
            className=" w-full cursor-pointer border-b-[1px] border-gray-300 text-left hover:bg-gray-300 disabled:cursor-not-allowed"
            onClick={downloadSelectedTextWithSpeakerAsImage}
            disabled={!isSelected}
          >
            Selected Text With SR
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadButtons;
