import placeholderImage from "../../../assets/placeholder-loading-fr-dashboard.png";
import { SingleTickerType } from "../../../api/responseTypes/getAllTickersApi.types";
import SingleTickerRecord from "./SingleTickerRecord";
function TickersTableBody({
  isLoading,
  isError,
  tickers,
  error,
}: {
  isLoading: boolean;
  isError: boolean;
  tickers: Array<SingleTickerType> | undefined;
  error: Error | null;
}) {
  if (isLoading) {
    return (
      <tbody className="space-y-4 opacity-40">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <tr key={index} className="">
              <td colSpan={6} className="pt-4">
                <img
                  src={placeholderImage}
                  alt="placeholder"
                  className="w-full animate-pulse"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  if (isError && error) {
    return (
      <tbody className="">
        <tr className="">
          <td colSpan={6} className="pt-10">
            <div className="mx-auto">{error.message}</div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (tickers?.length === 0) {
    return (
      <tbody className="">
        <tr className="">
          <td colSpan={6} className="pt-20 text-center">
            <p className="mx-auto">No flashers</p>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {tickers?.map((ticker) => {
        const { recordId } = ticker;

        return <SingleTickerRecord key={recordId} ticker={ticker} />;
      })}
    </tbody>
  );
}
export default TickersTableBody;
