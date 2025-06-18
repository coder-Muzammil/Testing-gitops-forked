import { twMerge } from "tailwind-merge";

const CollageButton = ({
  anySelectedTicker,
  length,
  setIsCreateTickerModalOpen,
}: {
  anySelectedTicker: boolean;
  length: number;
  setIsCreateTickerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <button
        className={twMerge(
          "h-9 cursor-pointer rounded-md px-3 text-sm shadow-md",
          anySelectedTicker && "bg-white text-purple-500",
          !anySelectedTicker && "cursor-not-allowed bg-gray-300 text-black/50",
        )}
        onClick={() => {
          setIsCreateTickerModalOpen(true);
        }}
        disabled={length === 0}
      >
        Collage
        <span className="mx-2 rounded-sm bg-lavender-500 px-2 py-1 text-white">
          {length}
        </span>
      </button>
    </>
  );
};

export default CollageButton;
