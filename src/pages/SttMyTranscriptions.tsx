import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import SearchbarSearchParams from "../components/modules/MyClips/SearchbarSearchParams";
import SttTranscriptionsCollages from "../components/modules/LiveStt/TranscriptionTable/SttTranscriptionsCollages";
import SttUploadTranscriptionSwitch from "../components/modules/LiveStt/TranscriptionTable/sttUploadTranscriptionSwitch";
import { useSearchParams } from "react-router-dom";
import SttUploadsTranscriptionsCollages from "../components/modules/LiveStt/TranscriptionTable/SttUploadsTranscriptionsCollages";

const SttMyTranscriptions = () => {
  const [searchParams] = useSearchParams();

  const selectedContentType = searchParams.get("contentType") ?? "stt";

  const isSttSelected = selectedContentType === "stt";
  return (
    <OutletMainContainer>
      <div className="grid h-full w-full grid-cols-1 grid-rows-[auto_auto_auto_1fr] gap-5 overflow-hidden  pr-3">
        <h1 className="text-center text-xl font-bold tracking-wider text-lavender-500 underline ">
          My Transcriptions
        </h1>
        <div className="w-1/3">
          <SearchbarSearchParams />
        </div>
        <SttUploadTranscriptionSwitch />
        <div className="gap-2 overflow-y-auto">
          {isSttSelected && (
            <SttTranscriptionsCollages myTranscriptionsCollages={false} />
          )}
          {!isSttSelected && (
            <SttUploadsTranscriptionsCollages
              myTranscriptionsCollages={false}
            />
          )}
        </div>
      </div>
    </OutletMainContainer>
  );
};

export default SttMyTranscriptions;
