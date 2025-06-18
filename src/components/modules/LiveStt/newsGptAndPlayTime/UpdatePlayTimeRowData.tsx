import { useRef, useState } from "react";
import ButtonGradientPrimary from "../../../primitives/ButtonGradientPrimary";
import FixedInsetZeroDiv from "../../../primitives/FixedInsetZeroDiv";
import { useClickAway } from "@uidotdev/usehooks";
import UrduKeyPad, {
  Keyboardtype,
} from "../../../uiComponents/keyboardTranslitrator/UrduKeyPad";

type UpdatePlayTimeRowDataPropsType = {
  text: string;
  id: number;
  setIsOpenEditorModal: React.Dispatch<React.SetStateAction<boolean>>;
  updatePlayTimeData: (data: UpdatedPlayTimeDataMethodPropsType) => void;
  isPending: boolean;
};

export type UpdatedPlayTimeDataMethodPropsType = {
  id: number;
  text: string;
  updatedText: string;
};

const UpdatePlayTimeRowData = ({
  setIsOpenEditorModal,
  text,
  id,
  updatePlayTimeData,
  isPending,
}: UpdatePlayTimeRowDataPropsType) => {
  
  const keyboardRef = useRef<Keyboardtype>(null);
  const inputRefOfEditedOcr = useRef<HTMLTextAreaElement>(null);
  const cursorPosition = useRef<number | null>(null);

  const [newText, setNewText] = useState(text);
  const isTextSame = text === newText;

  const ref = useClickAway(() => {
    setIsOpenEditorModal(false);
  });

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
    <>
    <FixedInsetZeroDiv>
      <form
        className="w-1/2 space-y-4 rounded-md bg-white px-6 py-3"
        ref={ref as React.RefObject<HTMLFormElement>}
        onSubmit={handleFormSubmit}
      >
        <textarea
          ref={inputRefOfEditedOcr}
          rows={4}
          value={newText}
          onChange={adjustTextareaHeight}
          onClick={() => {
            if (inputRefOfEditedOcr.current) {
              cursorPosition.current =
                inputRefOfEditedOcr.current.selectionStart;
            }
          }}
          className="urdu-text block h-full w-full resize-none overflow-auto p-1 text-justify leading-9 tracking-widest"
          dir="auto"
        />
        <div className="flex justify-center gap-4">
          <UrduKeyPad
            keyboardRef={keyboardRef}
            acceptSuggestion={handleAcceptSuggestion}
            onKeyboardManualChange={onKeyboardManualChange}
          />
          {!isTextSame && (
            <div className="w-1/2">
              <ButtonGradientPrimary isLoading={isPending}>
                <span className="px-6">Save</span>
              </ButtonGradientPrimary>
            </div>
          )}
        </div>
      </form>
    </FixedInsetZeroDiv>
    </>
  );
};

export default UpdatePlayTimeRowData;
