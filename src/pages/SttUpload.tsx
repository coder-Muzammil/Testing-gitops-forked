import { useState } from "react";
import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";
import SelectFileScreen from "../components/modules/SttUploadNew/SelectFileScreen";
import ProcessTranscriptionPhase from "../components/modules/SttUploadNew/ProcessTranscriptionPhase";

const SttUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  function handleSetFile(file?: File) {
    if (file) {
      setFile(file);
      return;
    }

    setFile(null);
  }

  return (
    <OutletMainContainer>
      {!file && <SelectFileScreen setFile={handleSetFile} />}
      {file && (
        <ProcessTranscriptionPhase
          file={file}
          removeFile={() => {
            handleSetFile();
          }}
        />
      )}
    </OutletMainContainer>
  );
};

export default SttUpload;
