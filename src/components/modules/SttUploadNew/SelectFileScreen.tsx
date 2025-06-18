import { twMerge } from "tailwind-merge";
import { ChangeEvent, DragEvent, useState } from "react";

function SelectFileScreen({ setFile }: { setFile: (file: File) => void }) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };
  const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setIsDragOver(false);
  };

  const handleChangeUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
    }
  };

  return (
    <div
      className={twMerge(
        "flex h-full w-full items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700",
        isDragOver && "bg-gray-200",
      )}
    >
      <label
        htmlFor="stt-upload"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={twMerge(
          `flex min-h-40 min-w-96 cursor-pointer items-center justify-center border-2 border-dashed border-gray-400 hover:border-fuchsia-400`,
          isDragOver && "border-fuchsia-400",
        )}
      >
        <div className="flex flex-col items-center justify-center px-6 py-7">
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Supported formats: <span className="font-semibold">Video</span> and
            <span className="font-semibold"> Audio</span> files only
          </p>
        </div>
        <input
          type="file"
          accept="video/*"
          id="stt-upload"
          className="hidden"
          onChange={handleChangeUploadedFile}
        />
      </label>
    </div>
  );
}

export default SelectFileScreen;
