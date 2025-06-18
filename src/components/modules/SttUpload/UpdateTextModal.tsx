import toast from "react-hot-toast";
import Portal from "../../primitives/Portal";
import { useClickAway } from "@uidotdev/usehooks";
import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import { MutableRefObject, useState } from "react";
import { useUpdatedSttTranscription } from "../../../api/useUpdateSttTranscription";

function UpdateTextModal({
  chunkId,
  closeModal,
  text,
}: {
  chunkId: number;
  closeModal: () => void;
  text: string;
}) {
  const [newText, setNewText] = useState(text);

  const {
    mutate: updateSingleTranscriptionChunk,
    isPending,
    isError,
  } = useUpdatedSttTranscription();

  const ref = useClickAway(() => {
    closeModal();
  });
  const isTextChanged = newText !== text;

  const noText = newText === "" || newText.trim() === "";

  function handleUpdateOcr(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (noText) {
      toast.error("Please enter some text");
      return;
    }

    updateSingleTranscriptionChunk(
      {
        id: chunkId,
        newSttText: newText,
      },
      {
        onSuccess: () => {
          // queryClient
          //   .invalidateQueries({
          //     queryKey: ["getTranscribeVideoData"],
          //   })
          //   .catch((err: unknown) => {
          //     console.error(err);
          //   });
          closeModal();
          toast.success("Saved successfully");
        },
      },
    );
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 p-10">
        <div
          className="grid w-[80%] grid-cols-1 items-center justify-center gap-4 rounded-md bg-white p-3"
          ref={ref as MutableRefObject<HTMLDivElement>}
        >
          <form
            className="flex h-auto flex-col items-center justify-center gap-4"
            onSubmit={handleUpdateOcr}
          >
            <input
              type="text"
              value={newText}
              onChange={(e) => {
                setNewText(e.target.value);
              }}
              autoFocus
              className="urdu-text flex h-full w-full items-center justify-end p-2 text-sm 2xl:text-xl "
            />
            {isTextChanged && (
              <ButtonGradientPrimary
                type="submit"
                isLoading={isPending}
                isInvalid={isError}
              >
                Save
              </ButtonGradientPrimary>
            )}
          </form>
        </div>
      </div>
    </Portal>
  );
}
export default UpdateTextModal;
