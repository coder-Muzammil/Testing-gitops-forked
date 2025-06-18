import { HiOutlineSave, HiOutlineSaveAs } from "react-icons/hi";
import ButtonGradientPrimary from "../../../primitives/ButtonGradientPrimary";

type PropsType = {
  isPending: boolean;
  isDownloadAndSave: boolean;
  handleDownloadReport: (isDownloadAndSave: boolean) => void;
};
const DownloadPdfReportOfData = ({
  isPending,
  isDownloadAndSave,
  handleDownloadReport,
}: PropsType) => {
  return (
    <div className="flex items-center gap-2">
      <ButtonGradientPrimary
        type="button"
        title="Download"
        onClick={() => {
          handleDownloadReport(false);
        }}
        isLoading={isPending && !isDownloadAndSave}
      >
        <HiOutlineSave size={18} />
      </ButtonGradientPrimary>
      {/*  */}
      <ButtonGradientPrimary
        type="button"
        title="Download & Save"
        onClick={() => {
          handleDownloadReport(true);
        }}
        isLoading={isPending && isDownloadAndSave}
      >
        <HiOutlineSaveAs size={18} />
      </ButtonGradientPrimary>
    </div>
  );
};

export default DownloadPdfReportOfData;
