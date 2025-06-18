import { IoMdAdd } from "react-icons/io";

function AddButtonMosaicTile({
  setIsChannelSelectionModalOpen,
}: {
  setIsChannelSelectionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        setIsChannelSelectionModalOpen(true);
      }}
      className="invisible absolute left-2 top-2 text-xl text-black group-hover:visible dark:text-white"
    >
      <IoMdAdd />
    </button>
  );
}
export default AddButtonMosaicTile;
