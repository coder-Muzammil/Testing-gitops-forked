import { SingleCollageType } from "../../../api/responseTypes/getMyCollagesApi.types";
import DowloadCollageButton from "./DowloadCollageButton";
import CopyOcrResultButton from "./CopyOcrResultButton";
import DownloadAsTextButton from "./DownloadAsTextButton";
import ShareWithTeamsButton from "./ShareWithTeamsButton";

// export const btnClass =
//   "rounded-sm border border-gray-700 px-1 py-0.5 text-sm hover:border-lavender-700 hover:bg-lavender-200 hover:text-lavender-700 2xl:text-base";

function HeaderCollageEditModal({
  collageData,
}: {
  collageData: SingleCollageType;
}) {
  const { collageName, tickerOcrResults, collageId, collageImageName } =
    collageData;

  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <p className="font-bold text-lavender-600">{collageName}</p>
      </div>
      <div className="flex items-center gap-2">
        <ShareWithTeamsButton itemId={collageId} entityType="myCollages" />
        <DownloadAsTextButton tickerOcrResults={tickerOcrResults} />
        <CopyOcrResultButton tickerOcrResults={tickerOcrResults} />
        <DowloadCollageButton
          collageName={collageName}
          collageImageName={collageImageName ?? ""}
        />
      </div>
    </div>
  );
}
export default HeaderCollageEditModal;
