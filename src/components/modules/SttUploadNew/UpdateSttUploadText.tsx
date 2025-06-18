import { useRef, useState } from "react";
import useUpdateDictionary from "../../../api/useAddDictionary";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
//  import { GetTranscribedVideoDataApiResponseType } from "../../../api/useGetTranscribedVideoData.types";
import UpdateSttUploadTextRow from "./UpdateSttUploadTextRow";
import useDictionaryContext from "./useDictionaryContext";
import UrduKeyPad, {
  Keyboardtype,
} from "../../uiComponents/keyboardTranslitrator/UrduKeyPad";

const UpdateSttUploadText = ({
  videoId,
  source,
}: {
  videoId?: number;
  source: string;
}) => {
  const [textEntries, setTextEntries] = useState([
    { originalText: "", editedText: "" },
  ]);
  const { setIsUpdateDictionaryModalOpen } = useDictionaryContext();
  const keyboardRef = useRef<Keyboardtype>(null);

  const handleInputChange = (
    index: number,
    field: "originalText" | "editedText",
    value: string,
  ) => {
    setTextEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index][field] = value;
      return updatedEntries;
    });
  };
  const handleAddEntry = () => {
    setTextEntries((prevEntries) => [
      { originalText: "", editedText: "" },
      ...prevEntries,
    ]);
  };
  const handleRemoveEntry = (index: number) => {
    setTextEntries((prevEntries) => {
      if (prevEntries.length > 1) {
        const updatedEntries = [...prevEntries];
        updatedEntries.splice(index, 1);
        return updatedEntries;
      }
      return prevEntries;
    });
  };

  const isFirstEntryFilled = () => {
    const firstEntry = textEntries[0];
    return (
      firstEntry.originalText.trim() !== "" &&
      firstEntry.editedText.trim() !== ""
    );
  };
  const { mutate: updateDictionary } = useUpdateDictionary();

  const handleAddDictionary = () => {
    updateDictionary(
      { textEntries, videoId, source },
      {
        onSuccess() {
          toast.success("Dictionary Added");
          setTextEntries([{ originalText: "", editedText: "" }]);
          setIsUpdateDictionaryModalOpen(false);
        },
        onError(error) {
          toast.error(error.message);
        },
      },
    );
  };

  const handleAcceptSuggestion = (value: string) => {
    setTextEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[0].editedText = value;
      return updatedEntries;
    });
  };

  const onKeyboardManualChange = (value: string) => {
    setTextEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[0].editedText += value;
      return updatedEntries;
    });
    keyboardRef.current?.clearInput();
  };
  return (
    <div className="grid w-auto transform grid-rows-[auto_1fr_auto] gap-6 rounded-lg bg-gray-300 p-4 dark:bg-slate-600">
      <div className="flex flex-row items-center justify-center gap-2">
        <button
          className={twMerge(
            "w-[50px] rounded-lg bg-green-500 text-white",
            !isFirstEntryFilled() && "bg-gray-500",
          )}
          onClick={handleAddEntry}
          disabled={!isFirstEntryFilled()}
        >
          +
        </button>
      </div>
      <div className="flex h-full flex-col overflow-y-auto pr-2 ">
        {textEntries.map((entry, index) => (
          <UpdateSttUploadTextRow
            lengthIs={textEntries.length}
            key={index}
            entry={entry}
            index={index}
            handleInputChange={handleInputChange}
            handleRemoveEntry={handleRemoveEntry}
          />
        ))}
        <div className="flex items-center justify-end gap-4">
          <UrduKeyPad
            keyboardRef={keyboardRef}
            acceptSuggestion={handleAcceptSuggestion}
            onKeyboardManualChange={onKeyboardManualChange}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <button
          className="w-[200px] rounded-lg bg-lavender-600 py-1 text-white"
          onClick={handleAddDictionary}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateSttUploadText;
