import { SingleTranscriptionType } from "../../../../api/responseTypes/liveTranscriptionsApi.types";
import SingleSttRecord from "./SingleSttRecord";
const SttDataViewContentTable = ({
  sttData,
  // isLoading,
  // isSort,
  // hasNextPage,
  // onLoadMoreClick,
}: {
  sttData: Array<SingleTranscriptionType>;
  isLoading: boolean;
  isSort: boolean;
  hasNextPage: boolean;
  onLoadMoreClick: () => void;
}) => {
  return (
    <tbody>
      {/* {isSort && sttData.length > 0 && (
        <tr>
          <td colSpan={9} className="w-full">
            {hasNextPage ? (
              <div className="flex items-center justify-center bg-gray-50 py-2">
                <button
                  type="button"
                  className="rounded-md bg-lavender-600 px-2 py-1 text-white disabled:cursor-not-allowed disabled:bg-lavender-400"
                  onClick={onLoadMoreClick}
                  disabled={isLoading}
                >
                  Load More . . .
                </button>
              </div>
            ) : (
              <p className="py-2 text-center text-gray-500">
                No more data found.
              </p>
            )}
          </td>
        </tr>
      )} */}
      {sttData.map((singleTranscription) => {
        const { transcriptionId } = singleTranscription;
        return (
          <SingleSttRecord
            key={transcriptionId}
            singleTranscription={singleTranscription}
          />
        );
      })}
    </tbody>
  );
};

export default SttDataViewContentTable;
