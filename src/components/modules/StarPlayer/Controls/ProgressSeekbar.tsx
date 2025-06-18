import { useStarPlayerContext } from "../../../../hooks/useStarPlayerContext";

const ProgressSeekbar = () => {
  const { progress } = useStarPlayerContext();
  return (
    <div className="h-3 w-full rounded-sm bg-gray-200">
      <div
        style={{ width: `${progress.toString()}%` }}
        className=" h-full rounded-sm bg-gray-700"
      ></div>
    </div>
  );
};

export default ProgressSeekbar;
