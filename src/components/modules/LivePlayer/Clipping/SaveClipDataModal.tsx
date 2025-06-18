import { useClickAway } from "@uidotdev/usehooks";
import { useLivePlayerContext } from "../../../../hooks/useLivePlayerContext";
import { MutableRefObject, useEffect, useState } from "react";
import InputWithLabel from "../../../primitives/InputWithLabel";
import { useGenerateClipFromLive } from "../../../../api/useGenerateClipFromLive";
import { useManageLiveTv } from "../../../../stores/useManageLiveTv";
import { usePostClipMetadata } from "../../../../api/usePostClipMetadata";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { FaDownload } from "react-icons/fa6";
import { liveServiceUrl } from "../../../../api/apiConstants";

function SaveClipDataModal() {
  const { setIsSaveModalOpen, setClipUrl, clipUrl } = useLivePlayerContext();
  const ref = useClickAway(() => {
    setClipUrl("");
    setIsSaveModalOpen(false);
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={twMerge(
          "grid w-fit grid-cols-2 gap-2 rounded-sm bg-white dark:bg-slate-700",
          clipUrl === "" && "grid-cols-1",
        )}
        ref={ref as MutableRefObject<HTMLDivElement>}
      >
        {!!clipUrl && (
          <div className="flex items-center justify-center">
            <ClipForm />
          </div>
        )}
        <div className="flex w-full items-center justify-center rounded-sm p-3">
          <ClipPlayer />
        </div>
      </div>
    </div>
  );
}
export default SaveClipDataModal;

function ClipPlayer() {
  const { selectedChannels } = useManageLiveTv();
  const { channel, playerRef, clipUrl, setClipUrl, setClipPoster } =
    useLivePlayerContext();
  const channelId = channel.id;
  const { mutate, status } = useGenerateClipFromLive(channelId);

  const thisChannel = selectedChannels.find((ch) => ch.id === channelId);

  const left = thisChannel?.clippingData.left ?? 0;
  const right = thisChannel?.clippingData.right ?? 0;

  const duration = playerRef?.current?.duration;

  const leftCurrentTime = (left / 100) * (duration ?? 0);
  const rightCurrentTime = ((100 - right) / 100) * (duration ?? 0);

  function getClipDate(): string {
    const playmode = thisChannel?.nowPlaying;

    if (playmode === "playback") {
      return thisChannel?.playbackDate ?? "";
    }

    return new Date().toISOString().split("T")[0];
  }

  useEffect(() => {
    const videoLink = channel.liveLink;
    const match = videoLink.match(/\/([^/]+)\.m3u8$/) ?? ["/live.m3u8", "live"];

    mutate(
      {
        channelId: channel.id,
        date: getClipDate(),
        startTime: leftCurrentTime,
        endTime: rightCurrentTime,
        fileName: match[1],
      },
      {
        onSuccess(data) {
          const { videoChunk, postersPath } = data.data;

          setClipPoster(postersPath[2]);
          setClipUrl(videoChunk);
        },
        onError() {
          toast.error("Server error");
        },
      },
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "pending") {
    return <div>Generating Clip...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div>
      {clipUrl !== "" && (
        <video
          src={`${liveServiceUrl}${clipUrl}`}
          className="aspect-video w-full max-w-[700px] object-contain"
          muted
          controls
        />
      )}
    </div>
  );
}

function ClipForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    message: "",
  });
  const {
    setIsSaveModalOpen,
    setClipUrl,
    setCurrentTime,
    channel,
    clipUrl,
    clipPoster,
  } = useLivePlayerContext();
  const { setClipExtractionActive, setLeft, setRight } = useManageLiveTv();
  const { mutate, status } = usePostClipMetadata();

  const isLoading = status === "pending";

  function handleDownloadClip() {
    const link = document.createElement("a");
    link.href = `${liveServiceUrl}${clipUrl}`;
    link.setAttribute("download", "clip.mp4");
    link.target = "_blank";
    link.download = "clip.mp4";
    link.click();
  }

  return (
    <div className="grid w-[500px] grid-cols-1 gap-4 rounded-sm bg-white p-3 shadow-md dark:bg-slate-600">
      <div className="flex justify-end">
        <button
          type="button"
          className="group/downloadBtn rounded-sm border-2 border-lavender-500 p-2 text-xl text-lavender-500 transition-all hover:scale-105 hover:bg-gray-600"
          onClick={handleDownloadClip}
        >
          <FaDownload className="group-hover/downloadBtn:animate-bounce" />
        </button>
      </div>
      <InputWithLabel
        inputProps={{
          placeholder: "Title",
          id: "title",
          name: "title",
          value: formData.title,
          onChange: (e) => {
            setFormData({
              ...formData,
              title: e.target.value,
            });
          },
        }}
        labelProps={{ htmlFor: "title", children: "Title" }}
      />
      <InputWithLabel
        inputProps={{
          placeholder: "Description",
          id: "description",
          name: "description",
          value: formData.description,
          onChange: (e) => {
            setFormData({
              ...formData,
              description: e.target.value,
            });
          },
        }}
        labelProps={{ htmlFor: "description", children: "Description" }}
      />
      <InputWithLabel
        inputProps={{
          placeholder: "Tags",
          id: "tags",
          name: "tags",
          value: formData.tags,
          onChange: (e) => {
            setFormData({
              ...formData,
              tags: e.target.value,
            });
          },
        }}
        labelProps={{ htmlFor: "tags", children: "Tags" }}
      />
      <InputWithLabel
        inputProps={{
          placeholder: "Message",
          id: "message",
          name: "message",
          value: formData.message,
          onChange: (e) => {
            setFormData({
              ...formData,
              message: e.target.value,
            });
          },
        }}
        labelProps={{ htmlFor: "message", children: "Message" }}
      />
      <div className="grid grid-cols-1 gap-2">
        <button
          type="button"
          className="h-6 rounded-sm bg-lavender-500 px-1 text-sm text-white hover:bg-lavender-600 active:bg-lavender-700 2xl:h-8"
          onClick={() => {
            if (!formData.title) {
              toast.error("Title is required");
              return;
            }

            mutate(
              {
                title: formData.title,
                description: formData.description,
                tags: formData.tags,
                comment: formData.message,
                clipFileUrl: `${liveServiceUrl}${clipUrl}`,
                channelId: channel.id,
                clipPosterUrl: `${liveServiceUrl}${clipPoster}`,
                channelName: channel.name,
              },
              {
                onSuccess() {
                  toast.success("Clip saved successfully to my clips");
                  setClipUrl("");
                  setCurrentTime(0);
                  setClipExtractionActive(channel.id, false);
                  setLeft(channel.id, 0);
                  setRight(channel.id, 0);
                  setIsSaveModalOpen(false);
                },
              },
            );
          }}
        >
          {!isLoading && "Save to my clips"}
          {isLoading && "Saving..."}
        </button>

        <button
          type="button"
          className="h-6 rounded-sm bg-gray-300 px-1 text-sm text-gray-700 hover:bg-gray-400 hover:text-white active:bg-gray-500 2xl:h-8"
          onClick={() => {
            setIsSaveModalOpen(false);
            setClipUrl("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
