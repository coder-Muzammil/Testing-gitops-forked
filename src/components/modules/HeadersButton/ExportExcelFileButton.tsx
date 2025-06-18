import toast from "react-hot-toast";
import useGetExportData from "../../../api/useGetExportData";
import CircularLoader from "../../uiComponents/CircularLoader";

function ExportExcelFileButton({
  url,
  setIsExporting,
}: {
  url: string;
  setIsExporting: (val: boolean) => void;
}) {
  const { mutateAsync, isPending } = useGetExportData();

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const blob: Blob = await mutateAsync(url);

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "exported_data.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Error exporting:");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      disabled={isPending}
      className="h-9 cursor-pointer rounded-md border-2 border-lavender-600 px-3 text-sm text-lavender-600 shadow-md disabled:opacity-50 dark:bg-lavender-500 dark:text-white"
      onClick={() => void handleExport()}
    >
      {isPending ? (
        <div className="flex h-4 w-5 items-center justify-center">
          <CircularLoader />
        </div>
      ) : (
        "Export"
      )}
    </button>
  );
}

export default ExportExcelFileButton;
