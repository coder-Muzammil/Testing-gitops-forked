import { useState } from "react";
// import { baseServiceUrl } from "../../../api/apiConstants";
import { SingleMosaicType } from "../../../api/responseTypes/getAllMosaicsApi.types";
import MosaicViewModal from "./MosaicViewModal";
import { highlightQueryInText } from "../../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import useDeleteMosaic from "../../../api/useDeleteMosaic";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
export default function SingleMosaicCard({
  singleMosaic,
  myTeamMosaics,
}: {
  singleMosaic: SingleMosaicType;
  myTeamMosaics: boolean;
}) {
  const [isMosaicViewModalOpen, setIsMosaicModalOpen] = useState(false);
  const {
    mosaicId,
    mosaicName,
    mosaicImageUrl,
    createdAt,
    channelDetails,
    mosaicOcrResults,
    creator: { creatorName },
    teamDetails,
  } = singleMosaic;
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") ?? "";
  const { mutate: deleteSingleMosaic } = useDeleteMosaic({ myTeamMosaics });
  const handleDeleteSingleMosaic = (id: number) => {
    deleteSingleMosaic(id, {
      onSuccess: () => {
        toast.success("Mosaic deleted successfully.");
      },
      onError: () => {
        toast.error("Failed to delete the Mosaic.");
      },
    });
  };
  return (
    <>
      <div className="my-2 flex w-full cursor-pointer gap-5 rounded-3xl border bg-purple-50 p-5 shadow-lg dark:bg-gray-800">
        <div className="flex h-full w-full flex-col gap-3 overflow-y-auto p-4 ">
          <div className="flex gap-5">
            {" "}
            <p className="w-fit font-bold">Mosaic Name:</p>
            <p
              dir="auto"
              dangerouslySetInnerHTML={{
                __html: highlightQueryInText({
                  text: mosaicName,
                  query: searchQuery,
                }),
              }}
            />
          </div>
          <div className="flex gap-5">
            {" "}
            <p className="w-fit font-bold">Creator:</p>
            <p
              dir="auto"
              dangerouslySetInnerHTML={{
                __html: highlightQueryInText({
                  text: creatorName,
                  query: searchQuery,
                }),
              }}
            />
          </div>
          <div className="flex gap-5 ">
            {" "}
            <p className="w-fit font-bold">Description:</p>
            <p
              className="urdu-text text-justify leading-9 tracking-widest"
              dir="auto"
            >
              {mosaicOcrResults}
            </p>
          </div>
          <div className="flex gap-5">
            <p className="w-fit font-bold">Mosaic Count : </p>
            <p className="">{mosaicOcrResults.length}</p>
          </div>
          <div className="flex gap-5">
            <p className="w-fit font-bold">Channel Count : </p>
            <p className="">{channelDetails.length}</p>
          </div>
          <div className="flex gap-5 ">
            <p className="w-fit font-bold ">Shared With:</p>
            <div className="flex gap-2 text-white">
              {teamDetails.map((team) => {
                const { teamId, teamName } = team;
                return (
                  <div
                    key={"team" + String(teamId)}
                    className="rounded-md bg-lavender-500 p-2 text-sm"
                  >
                    {teamName}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-5">
            <p className="font-bold">Created at:</p>
            <p className="">{createdAt}</p>
          </div>
          <div
            onClick={() => {
              handleDeleteSingleMosaic(mosaicId);
            }}
          >
            <MdDelete size={22} />
          </div>
        </div>
        <div
          className="scroll-hidden flex w-1/2 flex-col overflow-hidden overflow-y-auto rounded-xl"
          onClick={() => {
            setIsMosaicModalOpen(true);
          }}
        >
          <div className="flex ">
            <img
              // src={`${baseServiceUrl}${mosaicImageUrl}`}
              src={mosaicImageUrl}
              className="h-full "
              alt="flasher Image"
            />
          </div>
        </div>
      </div>

      {isMosaicViewModalOpen && (
        <MosaicViewModal
          setIsMosaicModalOpen={setIsMosaicModalOpen}
          mosaicId={mosaicId}
        />
      )}
    </>
  );
}
