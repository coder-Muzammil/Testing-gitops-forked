import Portal from "../../../primitives/Portal";

// const buttonsText = [
//   "Urdu Text Correction",
//   "Summarization",
//   "Sentiment Analysis",
//   "Topic Generation",
//   "Key Insight Generation",
//   "Top Trend Analysis",
//   "Channel Wise Summary",
//   "Urdu to English Translation",
//   "English to Urdu Translation",
// ];

const NewGptPromptModal = ({
  setIsOpenPromptModal,
}: {
  setIsOpenPromptModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const { mutate, isPending, data } = useSendNewsGptCommands();
  // const { selectedHeadlines } = useSttLiveContext();
  // const { formatDate, secondsTo12HourTimeString } = useDateTimeUtils();
  // const [isOpenNewsGptDataModal, setIsOpenNewsGptDataModal] = useState(false);

  // const handleSendCommandsForNewsGpt = (prompt: string) => {
  //   const data = selectedHeadlines.map((item) => {
  //     return {
  //       text: item.transcription,
  //       time: secondsTo12HourTimeString(item.startTime),
  //       date: formatDate(item.createdAt),
  //     };
  //   });

  //   mutate(
  //     {
  //       prompt,
  //       data,
  //     },
  //     {
  //       onSuccess: () => {
  //         setIsOpenNewsGptDataModal(true);
  //       },
  //     },
  //   );
  // };

  return (
    <>
      <Portal>
        <div
          onClick={() => {
            setIsOpenPromptModal(false);
          }}
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/70"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="h-auto w-auto rounded-md bg-white p-3"
          >
            <p className="mb-3 mt-1 w-full text-start text-lg font-semibold text-lavender-600">
              New GPT Commands
            </p>
            {/* Commands buttons */}
            {/* <div className="flex flex-col items-center justify-center gap-2">
              {buttonsText.map((buttonText) => (
                <button
                  type="button"
                  className="w-72 rounded-md bg-lavender-600 py-1 text-sm capitalize text-white disabled:cursor-not-allowed disabled:bg-lavender-400"
                  key={buttonText}
                  onClick={() => {
                    handleSendCommandsForNewsGpt(buttonText);
                  }}
                  disabled={isPending}
                >
                  {buttonText}
                </button>
              ))}
            </div> */}
          </div>
        </div>
      </Portal>

      {/* {isOpenNewsGptDataModal && (
        <NewsGptEditableDataModal
          setIsOpenEditableModal={setIsOpenNewsGptDataModal}
          data={data ? data : { source: "", result: "" }}
        />
      )} */}
    </>
  );
};

export default NewGptPromptModal;
