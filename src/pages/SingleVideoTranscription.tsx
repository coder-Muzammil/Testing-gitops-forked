import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import useGetTranscribedVideoData from "../api/useGetTranscribedVideoData";
import { useNavigate, useParams } from "react-router-dom";
import CircularLoader from "../components/uiComponents/CircularLoader";
import axios from "axios";
import Transcription from "../components/modules/SttUploadNew/SingleTranscriptionData/Transcription";
import TranscriptionControlButtonsBar from "../components/modules/SttUploadNew/TranscriptionControlButtonsBar";
import SttUploadContextComponent from "../components/modules/SttUploadNew/SttUploadContextComponent";
import VideoPlayer from "../components/primitives/VideoPlayer";
import DictionaryContextComponent from "../components/modules/SttUploadNew/DictionaryContextComponent";

const SingleVideoTranscription = () => {
  const navigate = useNavigate();

  const params = useParams();
  const id = Number(params.id ?? 0);

  const { data, isLoading, isError, error } = useGetTranscribedVideoData(id);

  function goBack() {
    navigate("/stt/upload");
  }

  if (isLoading) {
    return (
      <OutletMainContainer>
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-10">
            <CircularLoader />
          </div>
        </div>
      </OutletMainContainer>
    );
  }

  let errMessage = "";

  if (isError && axios.isAxiosError<{ detail: string }>(error)) {
    errMessage = error.response?.data.detail ?? error.message;
  }

  if (isError) {
    return (
      <OutletMainContainer>
        <div className="flex h-full w-full items-center justify-center">
          <div className="space-y-4 text-center">
            <p className="text-2xl text-red-500">{errMessage}</p>
            <button
              type="button"
              onClick={goBack}
              className="rounded-md bg-lavender-500 px-2 py-1 text-sm text-white
              "
            >
              back to upload page
            </button>
          </div>
        </div>
      </OutletMainContainer>
    );
  }

  if (!data) {
    return <div />;
  }

  return (
    <OutletMainContainer>
      <SttUploadContextComponent>
        <DictionaryContextComponent>
          <div className="grid h-full w-full grid-cols-2 gap-4">
            <div className="grid grid-rows-[auto_1fr]">
              <VideoPlayer url={data.video.file} muted />
              <div className="relative  ">
                <p className=" absolute left-4 top-5 text-2xl font-bold text-lavender-500">
                  {data.video.Name}
                </p>
              </div>
            </div>

            <div className="grid  w-full grid-rows-[auto_1fr]  gap-2">
              <TranscriptionControlButtonsBar goBack={goBack} data={data} />
              <Transcription transcription={data.chunks} />
            </div>
          </div>
        </DictionaryContextComponent>
      </SttUploadContextComponent>
    </OutletMainContainer>
  );
};

export default SingleVideoTranscription;
