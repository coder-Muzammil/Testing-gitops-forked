import { SingleSttCollageType } from "../../../../api/responseTypes/getSttCollagesApi.types";

function SttUploadViewer({
  transcriptionData,
}: {
  transcriptionData: SingleSttCollageType;
}) {
  const { transcriptionMedia } = transcriptionData;

  return (
    <div className="flex justify-center overflow-auto">
      <video src={transcriptionMedia} className="" controls />
    </div>
  );
}
export default SttUploadViewer;
