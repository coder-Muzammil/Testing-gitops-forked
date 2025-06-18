import { SetStateAction, Dispatch } from "react";

export type SttUploadContextType = {
  uploadedFiles: Array<File>;
  setUploadedFiles: Dispatch<SetStateAction<File>>;
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
};
