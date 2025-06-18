import { IoCopyOutline } from "react-icons/io5";
import { handleCopyToClipboard } from "../../../utils/helpers";

function CopyOcrResultButton({
  tickerOcrResults,
}: {
  tickerOcrResults: Array<string | number | null>;
}) {
  const textToCopy = tickerOcrResults.join(",");

  return (
    <button
      className="btnClass dark:bg-gray-500 dark:text-gray-200"
      title="Copy OCR text to clipboard"
      onClick={() => {
        handleCopyToClipboard(textToCopy);
      }}
    >
      <IoCopyOutline />
    </button>
  );
}
export default CopyOcrResultButton;
