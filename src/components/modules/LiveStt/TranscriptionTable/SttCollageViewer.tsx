import { SingleSttCollageType } from "../../../../api/responseTypes/getSttCollagesApi.types";

function SttCollageViewer({
  transcriptionData,
}: {
  transcriptionData: SingleSttCollageType;
}) {
  const { transcriptionMedia } = transcriptionData;
  return (
    <div className="overflow-auto">
      <img src={transcriptionMedia} alt="" className="w-full" />
    </div>
  );
}
export default SttCollageViewer;
