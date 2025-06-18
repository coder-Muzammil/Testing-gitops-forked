import { SingleMosaicType } from "../../../api/responseTypes/getAllMosaicsApi.types";

function MosaicViewer({ mosaicData }: { mosaicData: SingleMosaicType }) {
  const { mosaicImageUrl } = mosaicData;

  return (
    <div className="overflow-auto">
      <img src={mosaicImageUrl} alt="" className="w-full" />
    </div>
  );
}
export default MosaicViewer;
