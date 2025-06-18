import useDateTimeUtils from "../../../../hooks/useDateTimeUtils";
import { verifyResourceUrlStt } from "../../../../utils/helpers";
import { useSttLiveContext } from "../useSttLiveContext";

function TopicsContentViewModal({
  setIsCreateSttModalOpen,
}: {
  setIsCreateSttModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { selectedTopics, setSelectedTopics } = useSttLiveContext();
  const { formatTime, formatDate } = useDateTimeUtils();
  const handleRemoveTopic = (id: number) => {
    const updatedTopics = selectedTopics.filter(
      (topic) => topic.topicRecordId !== id,
    );
    setSelectedTopics(updatedTopics);

    if (updatedTopics.length === 0) {
      setIsCreateSttModalOpen(false);
    }
  };
  return (
    <div className="overflow-auto">
      {selectedTopics.map((topic) => (
        <div
          className="mb-1 grid h-fit grid-cols-[auto_1fr] gap-1 bg-gray-200/40"
          key={topic.topicRecordId}
        >
          <div className="grid grid-rows-[1fr_auto] gap-1">
            {/* Container to ensure equal height for image and div */}
            <div className="h-[100px] w-[100px]">
              <img
                id="collage"
                src={verifyResourceUrlStt(topic.channelLogo, "")}
                alt="Channel Image"
                className="h-24 w-24 rounded-sm"
              />
            </div>
            <div className="flex w-full items-center justify-center">
              <div>
                <p className="text-center"> {formatDate(topic.createdAt)}</p>
                <p className="text-center">{formatTime(topic.createdAt)}</p>
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-5 p-1">
            <button
              className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xl text-white"
              onClick={() => {
                handleRemoveTopic(topic.topicRecordId);
              }}
            >
              &times;
            </button>
            <div className="flex flex-col gap-1">
              <h2 className="text-start font-bold text-gray-500">
                {topic.topicEnglish}
              </h2>
              <p
                dir="auto"
                className="text-justify leading-5 tracking-wider text-gray-600"
              >
                {topic.summaryEnglish}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2
                dir="auto"
                className="text-start text-lg font-semibold leading-5 tracking-wider text-gray-500"
              >
                {topic.topicUrdu}
              </h2>
              <p
                dir="auto"
                className="text-justify font-aslam text-sm font-semibold leading-5 tracking-wider text-gray-600"
              >
                {topic.summaryUrdu}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopicsContentViewModal;
