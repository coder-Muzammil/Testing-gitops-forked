import { SingleSttCollageType } from "../../../../api/responseTypes/getSttCollagesApi.types";
import CopyOcrResultButton from "../../CollageViewModal/CopyOcrResultButton";
import DowloadCollageButton from "../../CollageViewModal/DowloadCollageButton";
import DownloadAsTextButton from "../../CollageViewModal/DownloadAsTextButton";
import ShareWithTeamsButton from "../../CollageViewModal/ShareWithTeamsButton";

// export const btnClass =
//   "rounded-sm border border-gray-700 px-1 py-0.5 text-sm hover:border-lavender-700 hover:bg-lavender-200 hover:text-lavender-700 2xl:text-base";

function SttHeaderCollageEditModal({
  transcriptionData,
}: {
  transcriptionData: SingleSttCollageType;
}) {
  const { transcriptionName, description, id, transcriptionImageName } =
    transcriptionData;

  const descriptionFilterData = description.flatMap((item) =>
    [
      item.summary_urdu,
      item.summary_english,
      item.topic_english,
      item.topic_urdu,
    ].filter(Boolean),
  );

  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <p className="font-bold text-lavender-600">{transcriptionName}</p>
      </div>
      <div className="flex items-center gap-2">
        <ShareWithTeamsButton
          itemId={id}
          entityType="myTranscriptionsCollages"
        />
        <DownloadAsTextButton tickerOcrResults={descriptionFilterData} />
        <CopyOcrResultButton tickerOcrResults={descriptionFilterData} />
        <DowloadCollageButton
          collageName={transcriptionName ?? ""}
          collageImageName={transcriptionImageName}
        />
      </div>
    </div>
  );
}
export default SttHeaderCollageEditModal;
