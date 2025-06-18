import { IoCloseCircle } from "react-icons/io5";
import { useManageLiveTv } from "../../../stores/useManageLiveTv";

function CloseButton({ channelId }: { channelId: number }) {
  const { removeChannel } = useManageLiveTv();
  return (
    <button
      type="button"
      className="absolute left-2 top-2 rounded-full bg-black p-0.5 text-base text-white 2xl:p-1 2xl:text-2xl"
      onClick={() => {
        removeChannel(channelId);
      }}
    >
      <IoCloseCircle />
    </button>
  );
}
export default CloseButton;
