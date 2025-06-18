import { FormEvent, useState } from "react";
import ButtonGradientPrimary from "../../../primitives/ButtonGradientPrimary";
import Input from "../../../primitives/Input";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  downloadTextAsImage,
  verifyResourceUrlStt,
  wrapText,
} from "../../../../utils/helpers";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import { useSttLiveContext } from "../useSttLiveContext";
import toast from "react-hot-toast";
import useSaveSttTranscriptionsCollage from "../../../../api/useSaveSttTranscriptionsCollage";

const CreateSttModalHeader = ({
  setIsCreateSttModalOpen,
}: {
  setIsCreateSttModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    mutate: saveSttTranscriptions,
    isPending,
    isError,
  } = useSaveSttTranscriptionsCollage();
  const { selectedTranscriptions, selectedTopics } = useSttLiveContext();
  const { formatDate, formatTime, secondsTo12HourTimeString } =
    useDateTimeUtils();
  const [sttCollageName, setSttCollageName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const contentType = searchParams.get("contentType") ?? "stt";
  const isSttSelected = contentType === "stt";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sttCollageName.length === 0) {
      setErrorMessage("Collage name cannot be empty.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return;
    }
    let textToDownload = "";
    const imageUrls: Array<string> = [];
    const sttIds: Array<number> = [];
    const canvas = document.getElementById(
      "canvasImageForStt",
    ) as HTMLCanvasElement;

    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const maxTextWidth = canvasWidth - 20;
    if (ctx) {
      if (isSttSelected) {
        for (const oneMinuteChunk of selectedTranscriptions) {
          sttIds.push(oneMinuteChunk.transcriptionId);
          imageUrls.push(verifyResourceUrlStt(oneMinuteChunk.channelLogo, ""));
          textToDownload += `Date: ${formatDate(oneMinuteChunk.createdAt)}\n`;
          textToDownload += `Time: ${formatTime(oneMinuteChunk.createdAt)}\n`;
          const wrappedTranscription = wrapText(
            ctx,
            `Text: ${oneMinuteChunk.transcription}`,
            maxTextWidth,
          );
          textToDownload += wrappedTranscription.join("\n") + "\n";
          textToDownload += "\n";
          textToDownload +=
            "-------------------------------------------------------------------------\n\n\n";
        }
        await downloadTextAsImage(
          canvas,
          ctx,
          textToDownload,
          "sttTranscriptionsImage",
          imageUrls,
          isSttSelected,
        ).then((sttTranscriptionImage) => {
          saveSttTranscriptions(
            {
              collageName: sttCollageName,
              collageImage: sttTranscriptionImage,
              sttIds: sttIds,
              count: selectedTranscriptions.length,
              source: "stt",
            },
            {
              onSuccess() {
                toast.success("Collage Saved Successfully");
                setIsCreateSttModalOpen(false);
                navigate("/stt/myTranscriptions");
              },
            },
          );
        });
      } else {
        for (const singleTopicRecord of selectedTopics) {
          imageUrls.push(
            verifyResourceUrlStt(singleTopicRecord.channelLogo, ""),
          );
          sttIds.push(singleTopicRecord.topicRecordId);
          textToDownload += `Date: ${formatDate(singleTopicRecord.createdAt)}\n`;
          textToDownload += `Time: ${secondsTo12HourTimeString(singleTopicRecord.startSeconds)} }\n\n`;
          const wrappedTranscriptionEnglish = wrapText(
            ctx,
            `Summary (English): ${singleTopicRecord.summaryEnglish}`,
            maxTextWidth,
          );
          const wrappedTranscriptionUrdu = wrapText(
            ctx,
            `Summary (Urdu): ${singleTopicRecord.summaryUrdu}`,
            maxTextWidth,
          );
          textToDownload += `Topic (English):${singleTopicRecord.topicEnglish}\n`;
          textToDownload += wrappedTranscriptionEnglish.join("\n") + "\n";
          textToDownload += "\n";
          textToDownload += `Topic (Urdu):${singleTopicRecord.topicUrdu}\n`;
          textToDownload += wrappedTranscriptionUrdu.join("\n") + "\n";
          textToDownload += "\n";
          textToDownload +=
            "-----------------------------------------------------------------------\n\n";
        }
        await downloadTextAsImage(
          canvas,
          ctx,
          textToDownload,
          "sttTopicsImage",
          imageUrls,
          isSttSelected,
        ).then((sttTopicsImage) => {
          saveSttTranscriptions(
            {
              collageName: sttCollageName,
              collageImage: sttTopicsImage,
              sttIds: sttIds,
              count: selectedTopics.length,
              source: "topics",
            },
            {
              onSuccess() {
                toast.success("Collage Saved Successfully");
                setIsCreateSttModalOpen(false);
                navigate("/stt/myTranscriptions");
              },
            },
          );
        });
      }
    }
  };

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
          name="sttName"
          className="dark:text-white"
          id="sttName"
          type="text"
          placeholder="Name"
          value={sttCollageName}
          onChange={(e) => {
            setSttCollageName(e.target.value);
          }}
        />
        {errorMessage && (
          <p className="text-xs text-red-500 ">{errorMessage}</p>
        )}
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
      <canvas
        id="canvasImageForStt"
        width={1000}
        style={{ display: "none" }}
      ></canvas>
    </form>
  );
};

export default CreateSttModalHeader;
