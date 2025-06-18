import { useState } from "react";
import { highlightQueryInText } from "../../../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { SingleSttCollageType } from "../../../../api/responseTypes/getSttCollagesApi.types";
import SttCollageViewMoodal from "./SttCollageViewModal";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import useDeleteMyTranscription from "../../../../api/useDeleteMyTranscription";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
export default function MySingleSttCollageCard({
  singleSttCollage,
  myTranscriptionsCollages,
}: {
  singleSttCollage: SingleSttCollageType;
  myTranscriptionsCollages: boolean;
}) {
  const [isSttCollageModalOpen, setIsSttCollageModalOpen] = useState(false);
  const { formatDate, formatTime } = useDateTimeUtils();
  const {
    transcriptionMedia,
    transcriptionName,
    uploadedAt,
    description,
    id,
    count,
    username,
    source,
  } = singleSttCollage;
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query")?.toLowerCase() ?? "";
  const { mutate: deleteSingleCollage } = useDeleteMyTranscription({
    myTranscriptionsCollages,
  });
  const handleDeleteSingleTranscription = (id: number) => {
    deleteSingleCollage(id, {
      onSuccess: () => {
        toast.success("Collage deleted successfully.");
      },
      onError: () => {
        toast.error("Failed to delete the Collage.");
      },
    });
  };
  return (
    <>
      <div className="m-2 flex w-full cursor-pointer gap-5 rounded-3xl border bg-purple-50 p-5 shadow-lg dark:bg-gray-700">
        <div className="flex h-full w-full flex-col gap-3 overflow-y-auto p-4 ">
          <div className="flex gap-5">
            <p className="w-fit font-bold">Transcription Name:</p>
            <p
              dir="auto"
              dangerouslySetInnerHTML={{
                __html: highlightQueryInText({
                  text: transcriptionName ?? "",
                  query: searchQuery,
                }),
              }}
            />
          </div>
          <div className="flex gap-5">
            {" "}
            <p className="w-fit font-bold">Creator:</p>
            <p
              dir="auto"
              dangerouslySetInnerHTML={{
                __html: highlightQueryInText({
                  text: username,
                  query: searchQuery,
                }),
              }}
            />
          </div>
          <div className="flex gap-5 ">
            <p className="w-fit font-bold">Description:</p>
            <div className="flex flex-col gap-1" dir="auto">
              {description.map((desc, index) => {
                return (
                  <div key={index}>
                    <p className="font-bold">{desc.topic_english}</p>
                    <p>{desc.summary_english}</p>
                    <p className="font-bold" dir="auto">
                      {desc.topic_urdu}
                    </p>
                    <p dir="auto">{desc.summary_urdu}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-5">
            <p className="w-fit font-bold"> Total Stt Records : </p>
            <p className="">{count}</p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold">Created :</p>
            <p className="">
              {formatDate(uploadedAt)} at {formatTime(uploadedAt)}
            </p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold">Source:</p>
            <p className="">{source}</p>
          </div>
          <div
            onClick={() => {
              handleDeleteSingleTranscription(id);
            }}
          >
            <MdDelete size={22} />
          </div>
        </div>
        <div
          className="scroll-hidden flex w-1/2 flex-col overflow-hidden overflow-y-auto rounded-xl"
          onClick={() => {
            setIsSttCollageModalOpen(true);
          }}
        >
          <div className="flex ">
            <img src={transcriptionMedia} className="h-full " alt="No Image" />
          </div>
        </div>
      </div>

      {isSttCollageModalOpen && (
        <SttCollageViewMoodal
          setIsSttCollageModalOpen={setIsSttCollageModalOpen}
          collageId={id}
        />
      )}
    </>
  );
}
