import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetThumbnails from "../../../api/useGetThumbnails";
import CircularLoader from "../../uiComponents/CircularLoader";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import StarPlayModal from "./StarPlayModal";
import useDateTimeUtils from "../../../hooks/useDateTimeUtils";
import { frServiceUrl } from "../../../api/apiConstants";

type personDetailsType = {
  personId: number;
  channelName: string;
  personName: string;
  personThumbnail: string;
};
export default function FaceTrackTable() {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const identity = searchParams.get("identity");
  const persons = searchParams.get("persons");
  const channels = searchParams.get("channel");

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "0px",
    root: null,
  });
  const { formatDate, formatTime } = useDateTimeUtils();
  const {
    data,
    isError,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetThumbnails({
    startDate,
    endDate,
    startTime,
    endTime,
    identity,
    persons,
    channels,
  });
  const [isOpenStarPlayModal, setIsOpenStarPlayModal] = useState(false);
  const [personDetails, setPersonDetails] = useState<personDetailsType | null>(
    null,
  );
  function formatDuration(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString()}h ${minutes.toString()}m ${seconds.toString()}s`;
    } else if (minutes > 0) {
      return `${minutes.toString()}m ${seconds.toString()}s`;
    } else {
      return `${seconds.toString()}s`;
    }
  }
  const thumbnails = data?.pages.flatMap((page) => page.results);
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage().catch(() => {
        console.log("Something went wrong");
      });
    }
  }, [entry, fetchNextPage, hasNextPage, isFetchingNextPage, thumbnails]);

  if (isLoading) {
    return (
      <div className="mt-8 flex w-full items-center justify-center">
        <div className="w-10">
          <CircularLoader />
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex w-full items-center justify-center text-red-400">
        <p>{error.message}</p>
      </div>
    );
  }

  if (thumbnails?.length === 0) {
    return (
      <p className="mt-8 text-center text-2xl">There is no data available.</p>
    );
  }

  if (data) {
    return (
      <>
        <div className="h-full overflow-y-auto rounded-lg bg-white shadow-md dark:bg-slate-600">
          <table className="w-full table-auto">
            <thead className="sticky top-0 bg-gray-200 py-4 dark:bg-slate-700">
              <tr>
                <th className="px-4 py-4 text-left">Thumbnail</th>
                <th className="px-4 py-4 text-left">Channel</th>
                <th className="px-4 py-4 text-left">Person Name</th>
                <th className="px-4 py-4 text-left">First Apearance</th>
                <th className="px-4 py-4 text-left">Recent Apearance</th>
                <th className="px-4 py-4 text-left">Coverage Time</th>
              </tr>
            </thead>
            <tbody className="h-[100px] overflow-y-auto text-gray-700 dark:text-white/80">
              {thumbnails?.map((person, idx) => {
                return (
                  <tr
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-slate-500 dark:hover:bg-slate-500/50"
                    key={idx}
                    onClick={() => {
                      setIsOpenStarPlayModal(true);
                      setPersonDetails({
                        personId: person.person_id,
                        channelName: person.channel_name,
                        personName: person.person_name,
                        personThumbnail: person.person_thumbnail,
                      });
                    }}
                  >
                    <td className="px-4 py-2">
                      <img
                        src={`${frServiceUrl}${person.person_thumbnail}`}
                        alt="channel logo"
                        className="h-16 w-16 rounded-full object-contain"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <img
                        src={`${frServiceUrl}${person.channel_logo}`}
                        alt="channel logo"
                        className="h-16 w-16 rounded-full"
                      />
                    </td>

                    <td className="px-4 py-2">{person.person_name}</td>
                    <td className="px-4 py-2">
                      <p>{formatDate(person.start_time)}</p>
                      <p>{formatTime(person.start_time)}</p>
                    </td>
                    <td className="px-4 py-2">
                      <p>{formatDate(person.end_time)}</p>
                      <p>{formatTime(person.end_time)}</p>
                    </td>

                    <td className="px-4 py-2">
                      {formatDuration(person.total_seconds)}
                    </td>
                  </tr>
                );
              })}
              <tr ref={ref}>
                <td colSpan={6}>
                  {hasNextPage && isFetchingNextPage && (
                    <div className="flex w-full items-center justify-center">
                      <div className="w-12">
                        <CircularLoader />
                      </div>
                    </div>
                  )}
                  {!hasNextPage &&
                    thumbnails?.length !== 0 &&
                    !isFetchingNextPage && (
                      <p className="my-5 text-center">No more data found.</p>
                    )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* OPEN STAR PLAY MODAL */}
        {isOpenStarPlayModal && (
          <StarPlayModal
            setOpen={setIsOpenStarPlayModal}
            personId={personDetails?.personId ?? 0}
            channelName={personDetails?.channelName ?? ""}
            personName={personDetails?.personName ?? ""}
            personThumbnail={personDetails?.personThumbnail ?? ""}
          />
        )}
      </>
    );
  }
}
