import { RiVideoUploadLine } from "react-icons/ri";
import Button from "../../primitives/Button";
import { ChangeEvent, useState } from "react";
import useMakeCluster from "../../../api/useMakeCluster";
import CircularLoader from "../../uiComponents/CircularLoader";

export default function UploadVideo() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const {
    mutate,
    isPending,
    isError,
    error: errorMakeCluster,
  } = useMakeCluster();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setError("");
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    mutate({ formData });

  
  };
  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor="dropzone-file"
        className="h-42 flex w-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-fuchsia-300  hover:bg-fuchsia-100"
      
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <RiVideoUploadLine className="mb-3 text-2xl text-gray-400" />

          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to select a video</span>
          </p>

          {file && (
            <p className="mt-1 text-sm text-gray-500">
              Selected file: {file.name}
            </p>
          )}
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

        <input
          id="dropzone-file"
          type="file"
          accept="video/*"
          className="hidden"
          required
          onChange={handleFileChange}
        />
      </label>
      <div className="flex flex-col items-center justify-center">
        {isPending && (
          <div className="w-10">
            <CircularLoader />
          </div>
        )}
        {!isPending && <Button onClick={handleUpload}>Upload video</Button>}
        {isError && (
          <p className="mt-4 text-red-500">{errorMakeCluster.message}</p>
        )}
      </div>
    </div>
  );
}
