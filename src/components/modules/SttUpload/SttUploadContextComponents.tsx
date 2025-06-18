import { createContext, useState } from "react";

export type SttUploadContextType = {
    uploadedFile: File | null;
    setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
};

export const SttUploadContext = createContext<SttUploadContextType | undefined>(undefined);
function SttUploadContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  return (
    <SttUploadContext.Provider
      value={{
        uploadedFile,
        setUploadedFile,
      }}
    >
      {children}
    </SttUploadContext.Provider>
  );
}
export default SttUploadContextComponent;
