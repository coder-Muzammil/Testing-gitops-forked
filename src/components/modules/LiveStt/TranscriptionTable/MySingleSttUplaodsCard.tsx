import { useState } from "react";
import { highlightQueryInText } from "../../../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { SingleSttCollageType } from "../../../../api/responseTypes/getSttCollagesApi.types";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import SttUploadViewMoodal from "./SttUploadViewModal";
import { FaRegCirclePlay } from "react-icons/fa6";
import useDeleteMySttUpload from "../../../../api/useDeleteMySttUpload";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

export default function MySingleSttUploadsCard({
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
    username,
    description,
    poster,
    source,
    id,
  } = singleSttCollage;
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query")?.toLowerCase() ?? "";
  const [isVideoTagDisplay, setIsVideoTagDisplay] = useState(false);

  const { mutate: deleteSingleCollage } = useDeleteMySttUpload({
    myTranscriptionsCollages,
  });
  const handleDeleteSingleSttUpload = (id: number) => {
    deleteSingleCollage(id, {
      onSuccess: () => {
        toast.success("Deleted successfully.");
      },
      onError: () => {
        toast.error("Failed to delete the STT.");
      },
    });
  };

  return (
    <>
      <div className="m-2  grid  w-full cursor-pointer grid-cols-[70%_30%] gap-3 rounded-3xl border bg-purple-50 p-2 shadow-lg dark:bg-gray-700">
        <div className="flex h-full w-full flex-col gap-3 overflow-y-auto  p-4">
          <div className="flex gap-5">
            <p className="w-fit font-bold">Transcription Name:</p>
            <p
              dir="auto"
              dangerouslySetInnerHTML={{
                __html: transcriptionName
                  ? highlightQueryInText({
                      text: transcriptionName,
                      query: searchQuery,
                    })
                  : "",
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
            {description.map((desc, index) => {
              return (
                <div key={index}>
                  <p>{desc.summary_english}</p>
                  <p dir="auto">{desc.summary_urdu}</p>
                </div>
              );
            })}

            <p
              className="urdu-text text-justify leading-9 tracking-widest"
              dir="auto"
            />
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
              handleDeleteSingleSttUpload(id);
            }}
          >
            <MdDelete size={22} />
          </div>
        </div>
        <div className="flex h-[400px] items-center justify-center ">
          {!isVideoTagDisplay && poster && (
            <div className="scroll-hidden relative flex h-full w-full  flex-col items-center justify-center overflow-hidden overflow-y-auto rounded-xl  ">
              <div
                className=" absolute top-1/3  translate-y-1/3  rounded-full bg-black/50 p-4"
                onClick={(e) => {
                  setIsVideoTagDisplay(true);
                  e.stopPropagation();
                }}
              >
                <FaPlay className="text-3xl text-white " />
              </div>

              <img
                src={poster ? poster : ""}
                alt=""
                className="h-full w-full"
              />
            </div>
          )}
          {!isVideoTagDisplay && !poster && (
            <div className="scroll-hidden flex h-full w-full  flex-col items-center justify-center overflow-hidden overflow-y-auto rounded-xl bg-lavender-300">
              <div
                className="flex "
                onClick={(e) => {
                  setIsVideoTagDisplay(true);
                  e.stopPropagation();
                }}
              >
                <FaRegCirclePlay size={60} />
              </div>
            </div>
          )}
          {isVideoTagDisplay && (
            <div
              className="scroll-hidden flex h-full w-full  flex-col items-center justify-center overflow-hidden overflow-y-auto rounded-xl "
              onClick={() => {
                setIsSttCollageModalOpen(true);
              }}
            >
              <div className="flex ">
                <video
                  src={transcriptionMedia ? transcriptionMedia : ""}
                  // src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  className="h-full rounded-xl "
                  muted
                  controls
                  autoPlay
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {isSttCollageModalOpen && (
        <SttUploadViewMoodal
          setIsSttCollageModalOpen={setIsSttCollageModalOpen}
          id={id}
        />
      )}
    </>
  );
}
