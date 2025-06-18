import useGetTickersHeadlinesNewsData from "../../../../api/useGetTickersHeadlinesNewsData";
import CircularLoader from "../../../uiComponents/CircularLoader";
import TickersHeadlinesTableHeader from "./TickersHeadlinesTabHeader";
import TickersHeadlinesTableBody from "./TickersHeadlinesTableBody";

const TickersNewsGptAndPlayTimeContent = () => {
  const { data, isLoading, isError, error } = useGetTickersHeadlinesNewsData();

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <div className="h-12 w-12">
          <CircularLoader />
        </div>
      </div>
    );
  if (isError)
    return <div className="text-sm text-red-500">{error.message}</div>;
  if (!data) return <div className="text-sm text-red-500">Data not found.</div>;
  const headlinesData = data.map((item) => item.data).flat();

  return (
    <div className="h-full overflow-auto bg-gray-50 px-1">
      <table className="w-full">
        <TickersHeadlinesTableHeader headlines={headlinesData} />
        <TickersHeadlinesTableBody headLines={data} />
      </table>
    </div>
  );
};

export default TickersNewsGptAndPlayTimeContent;
