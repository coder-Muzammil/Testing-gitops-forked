import { LiaFileDownloadSolid } from "react-icons/lia";
// import { btnClass } from "./HeaderCollageEditModal";

function DownloadAsTextButton({
  tickerOcrResults,
}: {
  tickerOcrResults: Array<string | number | null>;
}) {
  function handleDownloadTextFile() {
    const textToDownload = tickerOcrResults.join("\n");
    const blob = new Blob([textToDownload], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ocr_text.txt";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  return (
    <button
      className="btnClass dark:bg-gray-500 dark:text-gray-200"
      title="Download OCR text as a file"
      onClick={handleDownloadTextFile}
    >
      <LiaFileDownloadSolid />
    </button>
  );
}
export default DownloadAsTextButton;
