import { useRef, useState } from "react";
import { IoIosSave, IoMdClose } from "react-icons/io";
import UrduKeyPad, {
  Keyboardtype,
} from "../../uiComponents/keyboardTranslitrator/UrduKeyPad";

type UpdatePlayTimeRowDataPropsType = {
  text: string;
  id: number;
  updatePlayTimeData: (data: UpdatedPlayTimeDataMethodPropsType) => void;
  isPending: boolean;
  setEdittedRowId: React.Dispatch<React.SetStateAction<number | null>>;
};

export type UpdatedPlayTimeDataMethodPropsType = {
  id: number;
  text: string;
  updatedText: string;
};

const EditSinglePlayTimeRow = ({
  text,
  id,
  updatePlayTimeData,
  isPending,
  setEdittedRowId,
}: UpdatePlayTimeRowDataPropsType) => {
  const keyboardRef = useRef<Keyboardtype>(null);
  const inputRefOfEditedOcr = useRef<HTMLTextAreaElement>(null);
  const cursorPosition = useRef<number | null>(null);

  const [newText, setNewText] = useState(text);
  const isTextSame = text === newText;

  function adjustTextareaHeight(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight.toString()}px`;
    setNewText(textarea.value);
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isTextSame || !id) return;

    const data = {
      id,
      text,
      updatedText: newText,
    };

    updatePlayTimeData(data);
  };
  const updateOcrTextValue = (value: string) => {
    if (inputRefOfEditedOcr.current) {
      if (cursorPosition.current === null) {
        cursorPosition.current = inputRefOfEditedOcr.current.selectionStart;
      }

      const cursorIndex = cursorPosition.current;

      setNewText(
        newText.slice(0, cursorIndex) + value + newText.slice(cursorIndex),
      );

      cursorPosition.current = cursorIndex + value.length;
    }
  };

  const handleAcceptSuggestion = (suggestion: string) => {
    updateOcrTextValue(suggestion);
  };

  const onKeyboardManualChange = (value: string) => {
    updateOcrTextValue(value);
    keyboardRef.current?.clearInput();
  };
  return (
    <div className="">
      <form
        onSubmit={handleFormSubmit}
        className="grid grid-cols-[1fr_auto] space-x-2"
      >
        <textarea
          ref={inputRefOfEditedOcr}
          value={newText}
          rows={4}
          onChange={adjustTextareaHeight}
          onClick={() => {
            if (inputRefOfEditedOcr.current) {
              cursorPosition.current =
                inputRefOfEditedOcr.current.selectionStart;
            }
          }}
          className="urdu-text block resize-y overflow-auto p-1 text-justify leading-9 tracking-widest dark:bg-gray-700"
          dir="auto"
        />

        <div className="flex flex-col items-center justify-end space-y-1 dark:bg-gray-700">
          <IoMdClose
            title="Close"
            onClick={() => {
              setEdittedRowId(null);
            }}
            size={26}
            cursor="pointer"
            className="text-gray-700 dark:text-gray-400"
          />

          <button
            title="Save"
            type="submit"
            disabled={isTextSame || isPending}
            className="rounded-sm text-lavender-600 hover:text-lavender-500 disabled:cursor-not-allowed disabled:text-lavender-300"
          >
            <IoIosSave size={26} />
          </button>

          <UrduKeyPad
            keyboardRef={keyboardRef}
            acceptSuggestion={handleAcceptSuggestion}
            onKeyboardManualChange={onKeyboardManualChange}
          />
        </div>
      </form>
    </div>
  );
};

export default EditSinglePlayTimeRow;
