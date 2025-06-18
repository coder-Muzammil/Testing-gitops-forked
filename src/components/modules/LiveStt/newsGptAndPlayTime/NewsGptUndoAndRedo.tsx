import { MdRedo, MdUndo } from "react-icons/md";
import IconButton from "./IconButton";

type NewsGptUndoAndRedoPropsType = {
  mkIndex: number;
  setMkIndex: React.Dispatch<React.SetStateAction<number>>;
  mkDataLength: number;
};

const NewsGptUndoAndRedo = ({
  mkDataLength,
  mkIndex,
  setMkIndex,
}: NewsGptUndoAndRedoPropsType) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <IconButton
        type="button"
        title="Undo"
        onClick={() => {
          setMkIndex((prev) => Math.max(prev - 1, 0));
        }}
        disabled={mkIndex === 0}
      >
        <MdUndo size={20} />
      </IconButton>

      <IconButton
        type="button"
        title="Redo"
        onClick={() => {
          setMkIndex((prev) => Math.min(prev + 1, mkDataLength - 1));
        }}
        disabled={mkIndex === mkDataLength - 1}
      >
        <MdRedo size={20} />
      </IconButton>
    </div>
  );
};

export default NewsGptUndoAndRedo;
