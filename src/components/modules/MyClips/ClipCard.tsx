import { useState } from "react";
import { SingleClipType } from "../../../api/responseTypes/getMyClipsApi.types";
import SelectTeamsModal from "../teamSelect/SelectTeamsModal";
import { FaPlay } from "react-icons/fa6";
import RequestSttDataInputModal from "./RequestSttDataInputModal";
import { MdDelete } from "react-icons/md";
import useDeleteMyClip from "../../../api/useDeleteClip";
import toast from "react-hot-toast";
function ClipCard({ clipData }: { clipData: SingleClipType }) {
  const {
    createdAt,
    description,
    title,
    channelName,
    clipFileUrl,
    clipPosterUrl,
    tags,
    comment,
    clipId,
  } = clipData;
  const [isTeamSharingModalOpen, setIsTeamSharingModalOpen] = useState(false);
  const [isRequestSttModalOpen, setIsRequestSttModalOpen] = useState(false);
  function handleMouseEnter(e: React.MouseEvent<HTMLVideoElement>) {
    e.currentTarget.controls = true;
    e.currentTarget.play().catch((err: unknown) => {
      console.log(err);
    });
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLVideoElement>) {
    e.currentTarget.currentTime = 0;
    e.currentTarget.pause();
    e.currentTarget.controls = false;
  }

  const tagsList = (
    <div className="flex flex-wrap items-center gap-2 py-1">
      {tags?.split(",").map((tag, index) => {
        return (
          <p
            className="rounded-md bg-lavender-400 px-1 py-1 text-sm"
            key={tag + String(index)}
          >
            {tag}
          </p>
        );
      })}
    </div>
  );

  function handleCloseTeamsModal() {
    setIsTeamSharingModalOpen(false);
  }
  const [isHovered, setIsHovered] = useState(false);

  const { mutate: deleteSingleClip } = useDeleteMyClip();
  const handleDeleteSingleClip = (id: number) => {
    deleteSingleClip(id, {
      onSuccess: () => {
        toast.success("Clip deleted successfully.");
      },
      onError: () => {
        toast.error("Failed to delete the Collage.");
      },
    });
  };

  return (
    <div className="space-y-4 rounded-xl  bg-white px-3 py-3 dark:bg-gray-700">
      <div
        className="relative aspect-video h-auto w-full overflow-hidden rounded-md "
        onMouseOver={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        {clipPosterUrl && !isHovered && (
          <>
            <div className="absolute left-[40%] top-[30%]  rounded-full bg-black/50 p-4">
              <FaPlay className="text-auto text-white " />
            </div>

            <img
              src={clipPosterUrl}
              alt=""
              className={`h-full w-full object-cover`}
              title={clipFileUrl}
            />
          </>
        )}
        {isHovered && (
          <>
            <div
              className="absolute "
              onClick={(e) => {
                e.stopPropagation();
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                type="button"
                className="absolute right-5 top-4 z-10 "
              ></button>
            </div>
            <video
              className="h-full w-full bg-black object-contain"
              src={clipFileUrl}
              autoPlay={false}
              poster={clipPosterUrl ?? ""}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              muted
              controls
            />
          </>
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <p>{channelName || ""}</p>
        <p>{createdAt}</p>
      </div>
      <div className="space-y-2">
        <h2 className="font-semibold">{title}</h2>
        <p className="line-clamp-2 text-justify text-sm">{description}</p>
        {!!comment && (
          <p className=" line-clamp-2 rounded-md  px-2 py-1 text-justify text-sm italic">
            {comment}
          </p>
        )}
        {tags && tagsList}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          title="Request STT"
          className="rounded-full px-3 py-1 text-lavender-500 underline hover:bg-lavender-500/60 hover:text-white"
          onClick={() => {
            setIsRequestSttModalOpen(true);
          }}
        >
          Request STT
        </button>
        <button
          type="button"
          title="Share in teams"
          className="rounded-full bg-lavender-500 px-3 py-1 text-white hover:bg-lavender-600 active:bg-lavender-300"
          onClick={() => {
            setIsTeamSharingModalOpen(true);
          }}
        >
          Share
        </button>
      </div>
      <div
        onClick={() => {
          handleDeleteSingleClip(clipId);
        }}
      >
        <MdDelete size={22} />
      </div>
      {isRequestSttModalOpen && (
        <RequestSttDataInputModal
          clipPath={clipFileUrl}
          transcriptionName={title}
          setIsRequestSttModalOpen={setIsRequestSttModalOpen}
        />
      )}
      {isTeamSharingModalOpen && (
        <SelectTeamsModal
          itemId={clipId}
          entityType="myClips"
          closerFn={handleCloseTeamsModal}
        />
      )}
    </div>
  );
}

export default ClipCard;
