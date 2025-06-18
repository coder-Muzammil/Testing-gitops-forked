import { CgRemove } from "react-icons/cg";
import useManageMosaic from "../../../stores/useManageMosaic";
// import { SingleChannelType } from "../../../api/responseTypes/getAllChannelsApi.types";

function CloseButtonMosaicTile({ channelId }: { channelId: number }) {
  const { removeChannel } = useManageMosaic();
  return (
    <button
      type="button"
      onClick={() => {
        removeChannel(channelId);
      }}
      className="invisible absolute left-2 top-2 z-10 rounded-full bg-white text-xl text-black group-hover:visible"
    >
      <CgRemove />
    </button>
  );
}
export default CloseButtonMosaicTile;
