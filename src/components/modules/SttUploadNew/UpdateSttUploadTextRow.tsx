import { FaMinus } from "react-icons/fa";

const UpdateSttUploadTextRow = ({
  entry,
  index,
  lengthIs,
  handleInputChange,
  handleRemoveEntry,
}: {
  entry: {
    originalText: string;
    editedText: string;
  };
  index: number;
  lengthIs: number;
  handleInputChange: (
    index: number,
    field: "originalText" | "editedText",
    value: string,
  ) => void;
  handleRemoveEntry: (index: number) => void;
}) => {
  return (
    <div key={index} className="mb-2 flex flex-col items-center gap-2 ">
      <div className="flex w-full items-center gap-2">
        <input
          type="text"
          placeholder="Current Text"
          className="w-full rounded-lg bg-white p-2 text-gray-400 dark:bg-slate-400 dark:text-white"
          value={entry.originalText}
          onChange={(e) => {
            handleInputChange(index, "originalText", e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Updated Text"
          className="w-full rounded-lg bg-white p-2 text-gray-400 dark:bg-slate-400 dark:text-white"
          value={entry.editedText}
          onChange={(e) => {
            handleInputChange(index, "editedText", e.target.value);
          }}
        />

        {lengthIs > 1 && (
          <button
            className="flex items-center justify-center rounded-full bg-red-400 p-0.5 text-sm text-white"
            onClick={() => {
              handleRemoveEntry(index);
            }}
          >
            <FaMinus />
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdateSttUploadTextRow;
