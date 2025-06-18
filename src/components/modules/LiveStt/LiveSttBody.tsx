import { useSearchParams } from "react-router-dom";
import SttContentTable from "./TranscriptionTable/SttContentTable";
import SttTopicDataTable from "./TopicsTable/SttTopicDataTable";
function LiveSttBody() {
  const [searchParams] = useSearchParams();

  const selectedContentType = searchParams.get("contentType") ?? "stt";

  const isSttSelected = selectedContentType === "stt";

  return (
    <div className="grid grid-cols-1 gap-4 overflow-hidden">
      {isSttSelected && <SttContentTable />}
      {!isSttSelected && <SttTopicDataTable />}
    </div>
  );
}
export default LiveSttBody;
