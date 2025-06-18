import { SingleSttCollageType } from "../../../../api/responseTypes/getSttCollagesApi.types";
import CopyOcrResultButton from "../../CollageViewModal/CopyOcrResultButton";
import DownloadAsTextButton from "../../CollageViewModal/DownloadAsTextButton";
import ShareWithTeamsButton from "../../CollageViewModal/ShareWithTeamsButton";

// export const btnClass =
//   "rounded-sm border border-gray-700 px-1 py-0.5 text-sm hover:border-lavender-700 hover:bg-lavender-200 hover:text-lavender-700 2xl:text-base";

function SttUploadModalHeader({
  transcriptionData,
}: {
  transcriptionData: SingleSttCollageType;
}) {
  const { transcriptionName, description, id } = transcriptionData;
  const descriptionFilterData = description.map(
    (item) => item.summary_urdu ?? item.summary_english,
  );
  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <p className="font-bold text-lavender-600">{transcriptionName}</p>
      </div>
      <div className="flex items-center gap-2">
        <ShareWithTeamsButton itemId={id} entityType="myTeamSttUploads" />
        <DownloadAsTextButton tickerOcrResults={descriptionFilterData} />
        <CopyOcrResultButton tickerOcrResults={descriptionFilterData} />
        {/* <DowloadCollageButton
          collageName={transcriptionName}
          collageImageUrl={transcriptionMedia}
        /> */}
      </div>
    </div>
  );
}
export default SttUploadModalHeader;
