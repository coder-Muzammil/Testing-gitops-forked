import { IoArrowUndoOutline } from "react-icons/io5";

const UndoButton = () => {
  return (
    <div>
      <button className=" flex w-[40px] items-center justify-center gap-2 rounded-md  py-2 text-lavender-500 hover:text-lavender-800">
        <IoArrowUndoOutline size={24} />
      </button>
    </div>
  );
};

export default UndoButton;
