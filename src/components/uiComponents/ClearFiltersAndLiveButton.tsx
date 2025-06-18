import { useState } from "react";
import { MdOutlineFilterAltOff } from "react-icons/md";
import ToggleButton from "./ToggleButton";
import { useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ExportExcelFileButton from "../modules/HeadersButton/ExportExcelFileButton";

const ClearFiltersAndLiveButton = ({
  source,
  url,
}: {
  source?: string;
  url?: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExporting, setIsExporting] = useState(false);

  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;
  const channels = searchParams.get("channel");
  const selectedChannel = channels?.split(",");
  const date = searchParams.get("startDate") && searchParams.get("endDate");
  const time = searchParams.get("startTime") && searchParams.get("endTime");
  const isPageWithChannel = searchParams.has("channel");
  const isPageWithScopeAndHours =
    searchParams.has("scope") || searchParams.has("hours");
  const isReverseSorting = searchParams.has("revSort");
  const noSearchParams =
    !searchParams.has("startDate") &&
    !searchParams.has("endDate") &&
    !searchParams.has("startTime") &&
    !searchParams.has("endTime") &&
    !searchParams.has("query") &&
    !isPageWithChannel &&
    !isPageWithScopeAndHours;

  const isButtonDisabled = noSearchParams;

  const clearFilters = () => {
    setSearchParams((currentParams) => {
      if (selectedChannel) {
        currentParams.delete("channel");
      }
      if (!selectedChannel) {
        currentParams.delete("scope");
        currentParams.delete("hours");
      }
      currentParams.delete("startTime");
      currentParams.delete("endTime");
      currentParams.delete("search");
      currentParams.delete("startDate");
      currentParams.delete("endDate");
      currentParams.delete("query");
      currentParams.delete("isLive");
      currentParams.delete("revSort");
      currentParams.delete("highlight");
      return currentParams;
    });
  };

  return (
    <div className="flex cursor-pointer items-center gap-3">
      {(date ?? time) && (
        <ExportExcelFileButton
          url={url ?? ""}
          setIsExporting={setIsExporting}
        />
      )}
      {source !== "wordCloud" && (
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <p className="text-sm font-semibold text-lavender-600 sm:text-base md:text-lg">
            Sort:
          </p>
          <div
            onClick={() => {
              if (isExporting) return; // prevent toggle during export
              setSearchParams((currentParams) => {
                if (isReverseSorting) {
                  currentParams.delete("revSort");
                } else {
                  currentParams.set("revSort", "true");
                }
                return currentParams;
              });
            }}
            className={twMerge(
              "relative cursor-pointer rounded-full border-2 border-gray-600 transition-all dark:border-white/50",
              isReverseSorting && "border-purple-800 bg-purple-400",
              "w-6 sm:w-8 md:w-10 xl:w-11",
              "aspect-video",
              isExporting && "cursor-not-allowed opacity-50", // visual feedback
            )}
          >
            <div
              className={twMerge(
                "absolute top-0 rounded-full transition-all duration-500",
                "aspect-square w-3 sm:w-4 md:w-5",
                !isReverseSorting
                  ? "left-0 bg-gray-600 dark:bg-white"
                  : "right-0 bg-white",
              )}
            ></div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center gap-2 p-2 sm:gap-3 sm:p-3 md:gap-4 md:p-4">
        <p className="text-sm font-semibold text-lavender-600 sm:text-base md:text-lg">
          Live:
        </p>
        <ToggleButton
          setIsToggled={() => {
            setSearchParams((currentParams) => {
              if (isLive) {
                currentParams.set("isLive", "false");
              } else {
                currentParams.delete("isLive");
                currentParams.delete("startTime");
                currentParams.delete("endTime");
                currentParams.delete("startDate");
                currentParams.delete("endDate");
                currentParams.delete("hours");
                currentParams.delete("channel");
                currentParams.delete("highlight");
              }

              return currentParams;
            });
          }}
          isToggled={isLive}
        />
      </div>

      <button
        title="Clear Filters"
        onClick={clearFilters}
        disabled={isButtonDisabled}
        className="cursor-pointer rounded-full bg-lavender-500 p-[6px] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400"
      >
        <MdOutlineFilterAltOff size={24} />
      </button>
    </div>
  );
};

export default ClearFiltersAndLiveButton;
