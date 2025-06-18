import { useSearchParams } from "react-router-dom";
import useFlasherContext from "../flashers/useFlasherContext";

const ShowFullFrameButtons = () => {
  const [, setSearchParams] = useSearchParams();
  const { isfullframe, setIsfullframe } = useFlasherContext();
  const handleFlasherFullFrame = () => {
    setSearchParams((currentParams) => {
      if (isfullframe) {
        currentParams.delete("isfullframe");
      } else {
        currentParams.set("isfullframe", "true");
      }
      return currentParams;
    });
  };
  return (
    <>
      <button className="flex items-center gap-1 rounded-md bg-gray-200 px-2 py-2 text-xs font-semibold text-lavender-600">
        <input
          type="checkbox"
          checked={isfullframe}
          onChange={() => {
            setIsfullframe(!isfullframe);
            handleFlasherFullFrame();
          }}
          className="accent-lavender-600"
        />
        <span className="mt-[2px]">Show Fullframe</span>
      </button>
    </>
  );
};

export default ShowFullFrameButtons;
