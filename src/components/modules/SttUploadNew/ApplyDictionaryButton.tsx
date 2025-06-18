import toast from "react-hot-toast";
import useDictionary from "../../../api/useDictionary";
import { useSearchParams } from "react-router-dom";

const ApplyDictionaryButton = ({
  videoId,
  source,
  sttLiveIds,
}: {
  videoId?: number;
  sttLiveIds?: Array<number>;
  source: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const live = searchParams.get("isLive") ?? null;
  const isLive = live ? false : true;
  const { mutate: updateDictionary } = useDictionary();
  const handleDictionary = () => {
    if (isLive) {
      setSearchParams({ isLive: "false" });
    }
    updateDictionary(
      { videoId, source, sttLiveIds },
      {
        onSuccess() {
          toast.success("Dictionary updated successfully");
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    );
  };
  return (
    <div className="w-full sm:w-auto">
      <button
        className="w-full rounded-lg bg-lavender-600 px-3 py-1 text-center text-sm  text-white "
        onClick={handleDictionary}
      >
        <p className="text-center text-sm  text-white sm:text-left ">
          Apply Dictionary
        </p>
      </button>
    </div>
  );
};

export default ApplyDictionaryButton;
