import { useSearchParams } from "react-router-dom";
import FullBrowserScreenButton from "../mosaic/FullBrowserScreenButton";
import FullScreenButton from "../mosaic/FullScreenButton";
import { wordcloudOptions } from "../../../utils/constants";

function Titlebar({
  isFullscreen,
  setIsFullscreen,
}: {
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchParams] = useSearchParams();

  const scope = searchParams.get("scope") ?? "all";

  const source = getSources();

  function getSources() {
    if (scope === "all") {
      return wordcloudOptions;
    }
    const scopes = scope.split(",");
    return wordcloudOptions.filter((option) => scopes.includes(option.value));
  }

  return (
    <div className="grid grid-cols-3 pt-6">
      <div />
      <div>
        <div className="flex w-full items-center justify-center gap-2">
          {source.map((option) => {
            return (
              <div
                key={option.label}
                className="rounded-md bg-lavender-500 px-3 py-1 text-white"
              >
                {option.label}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-start justify-end">
        <div className="flex items-center justify-end gap-2 px-3 py-2 ">
          {!isFullscreen && (
            <FullScreenButton elementName="wordcloudContainer" />
          )}

          <FullBrowserScreenButton
            setIsBrowserFullScreen={setIsFullscreen}
            isBrowserFullScreen={isFullscreen}
          />
        </div>
      </div>
    </div>
  );
}
export default Titlebar;
