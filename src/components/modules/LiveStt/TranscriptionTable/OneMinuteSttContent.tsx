import { useRef, useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import toast from "react-hot-toast";

import { useUpdateSttText } from "../../../../api/useUpdateSttText";
import ButtonGradientPrimary from "../../../primitives/ButtonGradientPrimary";
import FixedInsetZeroDiv from "../../../primitives/FixedInsetZeroDiv";
import { useQueryClient } from "@tanstack/react-query";
import UrduKeyPad, {
  Keyboardtype,
} from "../../../uiComponents/keyboardTranslitrator/UrduKeyPad";

export function TextEditor({
  text,
  transcriptionId,
  setIsEditorOpen,
}: {
  text: string;
  transcriptionId: number;
  setIsEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const keyboardRef = useRef<Keyboardtype>(null);
  const [newText, setNewText] = useState(text);
  const inputRefOfEditedOcr = useRef<HTMLTextAreaElement>(null);
  const cursorPosition = useRef<number | null>(null);
  const { mutate, isPending, isError } = useUpdateSttText();

  const isTextSame = text === newText;

  const ref = useClickAway(() => {
    setIsEditorOpen(false);
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isTextSame || !transcriptionId) return;
    mutate(
      {
        transcriptionId,
        updatedText: newText,
      },
      {
        onSuccess: () => {
          toast.success("STT text updated successfully");
          setIsEditorOpen(false);
          queryClient
            .invalidateQueries({
              queryKey: ["liveTranscriptions"],
            })
            .catch((error: unknown) => {
              console.log(error);
            });
        },
        onError: () => {
          toast.error("Failed to update text");
        },
      },
    );
  }

  function adjustTextareaHeight(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight.toString()}px`;
    setNewText(textarea.value);
  }

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
    <FixedInsetZeroDiv>
      <form
        className="w-1/2 space-y-4 rounded-md bg-white px-6 py-3 dark:bg-gray-800"
        ref={ref as React.RefObject<HTMLFormElement>}
        onSubmit={handleFormSubmit}
      >
        <textarea
          ref={inputRefOfEditedOcr}
          rows={2}
          value={newText}
          onChange={adjustTextareaHeight}
          onClick={() => {
            if (inputRefOfEditedOcr.current) {
              cursorPosition.current =
                inputRefOfEditedOcr.current.selectionStart;
            }
          }}
          className="urdu-text block w-full resize-none overflow-auto py-3 leading-9 dark:bg-gray-600 dark:text-white"
          style={{ minHeight: "50px", maxHeight: "200px" }}
          dir="auto"
        />

        <div className="flex items-center justify-center gap-4">
          <UrduKeyPad
            keyboardRef={keyboardRef}
            acceptSuggestion={handleAcceptSuggestion}
            onKeyboardManualChange={onKeyboardManualChange}
          />
          {!isTextSame && (
            <div className="w-1/2">
              <ButtonGradientPrimary isLoading={isPending} isInvalid={isError}>
                <span className="px-6">Save</span>
              </ButtonGradientPrimary>
            </div>
          )}
        </div>
      </form>
    </FixedInsetZeroDiv>
  );
}
