import { useClickAway } from "@uidotdev/usehooks";
import ButtonGradientPrimary from "../../../primitives/ButtonGradientPrimary";
import Input from "../../../primitives/Input";
import { type OneMinuteEditorTopicDataType } from "../../../../utils/typeDefinations";
import { useUpdateTopicsText } from "../../../../api/useUpdateTopicsText";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function OneMinuteTopicEditor({
  oneMinuteTopicData,
  setIsEditorOpen,
  onChange,
}: {
  oneMinuteTopicData: OneMinuteEditorTopicDataType;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setIsEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useUpdateTopicsText();
  const { summaryEnglish, summaryUrdu, topicEnglish, topicUrdu } =
    oneMinuteTopicData;

  const ref = useClickAway(() => {
    setIsEditorOpen(false);
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutate(oneMinuteTopicData, {
      onSuccess() {
        toast.success("Topics data updated successfully");
        setIsEditorOpen(false);
        queryClient
          .invalidateQueries({
            queryKey: ["liveSttTopics"],
          })
          .catch((error: unknown) => {
            console.log(error);
          });
      },
      onError: () => {
        toast.error("Failed to update topics data");
      },
    });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <form
        className="grid max-h-[80vh] w-9/12 grid-rows-[auto_1fr] gap-4 overflow-hidden rounded-md bg-white px-4 py-4"
        ref={ref as React.RefObject<HTMLFormElement>}
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <p className="font-semibold text-lavender-500">Update Topic Data</p>
          <div className="w-36">
            <ButtonGradientPrimary
              type="submit"
              isLoading={isPending}
              isInvalid={isError}
            >
              <span className="px-4">Update</span>
            </ButtonGradientPrimary>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 overflow-auto">
          <div className="space-y-4">
            <div className="space-y-4">
              <Input
                name="topicEnglish"
                type="text"
                defaultValue={topicEnglish}
                onChange={onChange}
              />
              <textarea
                name="summaryEnglish"
                defaultValue={summaryEnglish}
                className="w-full rounded-md border bg-white px-2 py-2 shadow-sm placeholder:text-xs focus:border-fuchsia-700 focus:outline-none 2xl:placeholder:text-sm"
                rows={4}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-4">
              <input
                name="topicUrdu"
                type="text"
                defaultValue={topicUrdu}
                onChange={onChange}
                className="urdu-text w-full rounded-md border border-gray-200 leading-9 tracking-widest focus:border-fuchsia-700 focus:outline-none"
                dir="auto"
              />
              <textarea
                name="summaryUrdu"
                defaultValue={summaryUrdu}
                className="urdu-text w-full rounded-md border bg-white px-2 py-2 leading-10 tracking-widest shadow-sm placeholder:text-xs focus:border-fuchsia-700 focus:outline-none 2xl:placeholder:text-sm"
                rows={4}
                onChange={onChange}
                dir="auto"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default OneMinuteTopicEditor;
