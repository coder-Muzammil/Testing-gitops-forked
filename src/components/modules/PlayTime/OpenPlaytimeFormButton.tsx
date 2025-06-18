import { IoMdTime } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
const OpenPlaytimeFormButton = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          if (searchParams.has("playTimeChannels")) {
            searchParams.delete("playTimeChannels");
            setSearchParams(searchParams);
          }
        }}
        className="flex items-center justify-center gap-2 rounded-sm bg-lavender-600 px-2 py-1 text-white"
      >
        <span className="text-xs font-semibold">Add New PlayTime</span>
        <IoMdTime size={20} cursor="pointer" title="Add Playtime Headlines" />
      </button>
    </>
  );
};

export default OpenPlaytimeFormButton;
