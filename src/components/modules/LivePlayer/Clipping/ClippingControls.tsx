import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useLivePlayerContext } from "../../../../hooks/useLivePlayerContext";
import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import { useManageLiveTv } from "../../../../stores/useManageLiveTv";

function ClippingControls() {
  const {
    playerRef,
    channel: { id: channelId },
    setCurrentTime,
    currentTime,
  } = useLivePlayerContext();
  const [dragging, setDragging] = useState(false);
  const { selectedChannels, setLeft, setRight } = useManageLiveTv();
  const [editing, setEditing] = useState<"right" | "left" | null>(null);
  const [isAllDragging, setIsAllDragging] = useState(false);
  const { secondsToTimeString } = useDateTimeUtils();

  const thisChannel = selectedChannels.find((ch) => ch.id === channelId);

  const left = thisChannel?.clippingData.left ?? 0;
  const right = thisChannel?.clippingData.right ?? 0;
  const isClippingActive = thisChannel?.isClipExtractionActive;

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setEditing(null);
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    // debugger;

    if (!playerRef?.current?.paused) {
      playerRef?.current?.pause();
    }

    const clippingControls = document.getElementById(
      `clipping-controls-${String(channelId)}`,
    );
    const rect = clippingControls?.getBoundingClientRect();
    const width = rect?.width;

    if (editing === "left") {
      const x = e.clientX - (rect?.left ?? 0);

      const percentage = (x / (width ?? 1)) * 100;

      if (percentage < 0) return;

      setLeft(channelId, percentage);
      const duration = playerRef?.current?.duration;

      if (duration && playerRef.current) {
        playerRef.current.currentTime = (percentage / 100) * duration;
      }
    }

    if (editing === "right") {
      const x = (rect?.right ?? 0) - e.clientX;
      const percentage = (x / (width ?? 1)) * 100;

      if (percentage < 0) return;

      setRight(channelId, percentage);

      const duration = playerRef?.current?.duration;

      if (duration && playerRef.current) {
        playerRef.current.currentTime = ((100 - percentage) / 100) * duration;
      }
    }
  };

  const duration = playerRef?.current?.duration;

  const currentTimeString = secondsToTimeString(currentTime);

  const leftCurrentTime = (left / 100) * (duration ?? 0);
  const rightCurrentTime = ((100 - right) / 100) * (duration ?? 0);

  const leftTimeString = secondsToTimeString(leftCurrentTime);
  const rightTimeString = secondsToTimeString(rightCurrentTime);

  useEffect(() => {
    const player = playerRef?.current ?? null;

    function eventListener() {
      // if it is exceeding the right limit, pause the video

      if (player) {
        if (player.currentTime >= rightCurrentTime && isClippingActive) {
          player.pause();
        }
        setCurrentTime(player.currentTime);
      }
    }
    if (player) {
      player.currentTime = 5;
    }
    // setup a timeUpdate listener
    player?.addEventListener("timeupdate", eventListener);

    // cleanup
    return () => {
      player?.removeEventListener("timeupdate", eventListener);
    };
  }, [
    playerRef,
    rightCurrentTime,
    leftCurrentTime,
    setCurrentTime,
    isClippingActive,
  ]);

  return (
    <div className="bottom-6 mb-6 h-16 w-full bg-black/80 px-6">
      <div
        className="relative h-full w-full rounded-sm border border-blue-500"
        id={`clipping-controls-${String(channelId)}`}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsAllDragging(false);
          setEditing(null);
          setDragging(false);
        }}
      >
        {/* progress needle */}
        <div
          className="absolute inset-y-0 w-[3px] bg-white "
          style={{
            left: `${String((currentTime / (duration ?? 0)) * 100)}%`,
          }}
        />
        <div
          className="absolute bottom-0 -translate-x-1/2 translate-y-[calc(100%+0.25rem)] rounded-full border border-black bg-white px-0.5 text-[6px] dark:bg-gray-700 2xl:text-xs"
          style={{
            left: `${String((currentTime / (duration ?? 0)) * 100)}%`,
          }}
        >
          <p>{currentTimeString}</p>
        </div>
        <div className="grid h-full w-full grid-cols-12 overflow-hidden">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index}>
              <img
                className="aspect-square w-full overflow-hidden object-cover"
                src="https://picsum.photos/seed/abcdef/200/200"
              />
            </div>
          ))}
        </div>
        <div
          className="absolute inset-y-0 bg-black/50"
          style={{
            left: "0%",
            right: `${String(100 - left)}%`,
          }}
        />
        <div
          className="absolute inset-y-0 bg-black/50"
          style={{
            left: `${String(100 - right)}%`,
            right: "0%",
          }}
        />
        <div
          className={twMerge(
            "absolute inset-y-0 border border-green-500",
            isAllDragging && editing === null && "border-red-600",
          )}
          style={{
            left: `${String(left)}%`,
            right: `${String(right)}%`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            const clippingControls = document.getElementById(
              `clipping-controls-${String(channelId)}`,
            );
            const rect = clippingControls?.getBoundingClientRect();
            const width = rect?.width;

            const x = e.clientX - (rect?.left ?? 0);
            const percentage = (x / (width ?? 1)) * 100;

            if (
              percentage < left ||
              percentage > 100 - right ||
              !playerRef?.current
            )
              return;

            playerRef.current.currentTime =
              (percentage / 100) * (duration ?? 0);
          }}
          onMouseDown={() => {
            // setIsAllDragging(true);
          }}
          onMouseUp={() => {
            setIsAllDragging(false);
          }}
          onMouseLeave={() => {
            setIsAllDragging(false);
          }}
          onMouseMove={(e) => {
            if (!isAllDragging) return;
            if (editing) return;

            const rect = e.currentTarget.getBoundingClientRect();

            const oldLeft = left;

            const newLeft = Math.max(
              0,
              Math.min(
                100 - right,
                oldLeft + ((e.movementX * 0.4) / rect.width) * 100,
              ),
            );

            setLeft(channelId, newLeft);

            const oldRight = right;

            const newRight = Math.max(
              0,
              Math.min(
                100 - oldLeft,
                oldRight - ((e.movementX * 0.4) / rect.width) * 100,
              ),
            );

            setRight(channelId, newRight);
          }}
        >
          <div className="relative h-full w-full">
            <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-[calc(200%+0.25rem)] rounded-full border border-black bg-white px-0.5 text-[6px] dark:bg-gray-700 2xl:text-xs">
              <p>{leftTimeString}</p>
            </div>
            <div className="absolute right-0 top-0 -translate-y-[calc(100%+0.25rem)] translate-x-1/2 rounded-full border border-black bg-white px-0.5 text-[6px] dark:bg-gray-700 2xl:text-xs">
              <p>{rightTimeString}</p>
            </div>

            <button
              type="button"
              className={twMerge(
                "absolute inset-y-0 left-0 cursor-move",
                editing === "left" && "cursor-ew-resize",
              )}
              onMouseDown={() => {
                setEditing("left");
              }}
            >
              <div
                className={twMerge(
                  "h-full w-2 -translate-x-1 select-none rounded-l-sm bg-green-700",
                  editing === "left" && "border border-red-600 bg-green-500",
                )}
              />
            </button>
            <button
              type="button"
              className={twMerge(
                "absolute inset-y-0 right-0 cursor-move",
                editing === "right" && "cursor-ew-resize",
              )}
              onMouseDown={() => {
                setEditing("right");
              }}
            >
              <div
                className={twMerge(
                  "h-full w-2 translate-x-1 rounded-r-sm bg-green-700",
                  editing === "right" && "border border-red-600 bg-green-500",
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClippingControls;
