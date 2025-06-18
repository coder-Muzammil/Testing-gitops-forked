import DowloadCollageButton from "../CollageViewModal/DowloadCollageButton";
import CopyOcrResultButton from "../CollageViewModal/CopyOcrResultButton";
import DownloadAsTextButton from "../CollageViewModal/DownloadAsTextButton";
import ShareWithTeamsButton from "../CollageViewModal/ShareWithTeamsButton";
import { SingleMosaicType } from "../../../api/responseTypes/getAllMosaicsApi.types";

// export const btnClass =
//   "rounded-sm border border-gray-700 px-1 py-0.5 text-sm hover:border-lavender-700 hover:bg-lavender-200 hover:text-lavender-700 2xl:text-base";

function HeaderCollageEditModal({
  mosaicData,
}: {
  mosaicData: SingleMosaicType;
}) {
  const { mosaicName, mosaicOcrResults, mosaicId, mosaicImageName } =
    mosaicData;

  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <p className="font-bold text-lavender-600">{mosaicName}</p>
      </div>
      <div className="flex items-center gap-2">
        <ShareWithTeamsButton itemId={mosaicId} entityType="myMosaics" />
        <DownloadAsTextButton tickerOcrResults={mosaicOcrResults} />
        <CopyOcrResultButton tickerOcrResults={mosaicOcrResults} />
        <DowloadCollageButton
          collageName={mosaicName}
          collageImageName={mosaicImageName}
        />
      </div>
    </div>
  );
}
export default HeaderCollageEditModal;
