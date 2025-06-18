import { SingleFlasherType } from "../../../api/responseTypes/getFlashersApi.types";
import SingleFlasherRecord from "./SingleFlasherRecord";
import placeholderImage from "../../../assets/placeholder-loading-fr-dashboard.png";

function FlasherTableBody({
  isLoading,
  isError,
  flashers,
  error,
  onScrollToFlasher,
  flashersPositionOnStarPlayOpen,
}: {
  isLoading: boolean;
  isError: boolean;
  flashers: Array<SingleFlasherType> | undefined;
  error: Error | null;
  onScrollToFlasher: (recordId: number) => void;
  flashersPositionOnStarPlayOpen: (recordId: number) => void;
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

  if (flashers?.length === 0) {
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
      {flashers?.map((flasher) => {
        const { recordId } = flasher;
        return (
          <SingleFlasherRecord
            key={recordId}
            flasher={flasher}
            onScrollToFlasher={onScrollToFlasher}
            flashersPositionOnStarPlayOpen={flashersPositionOnStarPlayOpen}
          />
        );
      })}
    </tbody>
  );
}
export default FlasherTableBody;
