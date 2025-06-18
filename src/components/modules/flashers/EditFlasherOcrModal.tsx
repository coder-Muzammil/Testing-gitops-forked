import toast from "react-hot-toast";
import Portal from "../../primitives/Portal";
import { MutableRefObject, useRef, useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import useUpdateFlasherOCR from "../../../api/useUpdateFlasherOCR";
import { useQueryClient } from "@tanstack/react-query";
import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import { useSearchParams } from "react-router-dom";
import UrduKeyPad, {
  Keyboardtype,
} from "../../uiComponents/keyboardTranslitrator/UrduKeyPad";

function EditFlasherOcrModal({
  flasherId,
  flasherImageUrl,
  ocrResult,
  setIsViewAndEditModalOpen,
}: {
  flasherId: number;
  flasherImageUrl: string;
  ocrResult: string;
  setIsViewAndEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const keyboardRef = useRef<Keyboardtype>(null);
  const [newOcrText, setNewOcrText] = useState(ocrResult);
  const inputRefOfEditedOcr = useRef<HTMLTextAreaElement>(null);
  const cursorPosition = useRef<number | null>(null);

  const { mutate: updateOcr, isPending, isError } = useUpdateFlasherOCR();
  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();
  const ref = useClickAway(() => {
    setIsViewAndEditModalOpen(false);
  });

  const isTextChanged = newOcrText !== ocrResult;

  function handleUpdateOcr(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (newOcrText === "" || newOcrText.trim() === "") {
      toast.error("Please enter some text");
      return;
    }

    updateOcr(
      {
        id: flasherId,
        editedOcrResult: newOcrText,
      },
      {
        onSuccess: () => {
          queryClient
            .invalidateQueries({
              queryKey: ["getAllFlashers"],
            })
            .catch((err: unknown) => {
              console.error(err);
            });
          setIsViewAndEditModalOpen(false);
          setSearchParams((currentParams) => {
            currentParams.delete("isLive");
            return currentParams;
          });
          toast.success("Saved successfully");
        },
      },
    );
  }

  const updateOcrTextValue = (value: string) => {
    if (inputRefOfEditedOcr.current) {
      if (cursorPosition.current === null) {
        cursorPosition.current = inputRefOfEditedOcr.current.selectionStart;
      }

      const cursorIndex = cursorPosition.current;

      setNewOcrText(
        newOcrText.slice(0, cursorIndex) +
          value +
          newOcrText.slice(cursorIndex),
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
    <Portal>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70">
        <div
          className="grid w-[80%] grid-cols-2 gap-4 rounded-md bg-white p-3 dark:bg-gray-700"
          ref={ref as MutableRefObject<HTMLDivElement>}
        >
          <img src={flasherImageUrl} alt="flasher" className="w-full" />
          <form
            className="flex h-auto flex-col items-center justify-start gap-4"
            onSubmit={handleUpdateOcr}
          >
            <textarea
              ref={inputRefOfEditedOcr}
              value={newOcrText}
              onChange={(e) => {
                setNewOcrText(e.target.value);
              }}
              onClick={() => {
                if (inputRefOfEditedOcr.current) {
                  cursorPosition.current =
                    inputRefOfEditedOcr.current.selectionStart;
                }
              }}
              autoFocus
              dir="auto"
              className="urdu-text h-full max-h-[280px] w-full flex-1 p-1 text-justify leading-9 tracking-widest dark:bg-gray-600 dark:text-white"
            />
            <div className="flex w-full flex-col items-end justify-center gap-4">
              {isTextChanged && (
                <ButtonGradientPrimary
                  type="submit"
                  isLoading={isPending}
                  isInvalid={isError}
                >
                  Save
                </ButtonGradientPrimary>
              )}
              <UrduKeyPad
                keyboardRef={keyboardRef}
                acceptSuggestion={handleAcceptSuggestion}
                onKeyboardManualChange={onKeyboardManualChange}
              />
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}
export default EditFlasherOcrModal;
