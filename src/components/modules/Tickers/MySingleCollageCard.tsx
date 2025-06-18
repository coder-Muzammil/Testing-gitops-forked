import React, { useState } from "react";
// import { baseServiceUrl } from "../../../api/apiConstants";
import { SingleCollageType } from "../../../api/responseTypes/getMyCollagesApi.types";
import CollageViewModal from "../CollageViewModal/CollageViewModal";
import { highlightQueryInText } from "../../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useDeleteCollage from "../../../api/useDeleteCollage";
import toast from "react-hot-toast";
export default function MySingleCollageCard({
  singleCollage,
  myTeamCollages,
}: {
  singleCollage: SingleCollageType;
  myTeamCollages: boolean;
}) {
  const [isMyCollageModalOpen, setIsMyCollageModalOpen] = useState(false);
  const {
    collageId,
    collageImageUrl,
    createdAt,
    channelDetails,
    tickerOcrResults,
    temaDetails,
    creator: { creatorName },
  } = singleCollage;
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query")?.toLowerCase() ?? "";
  const { mutate: deleteSingleCollage } = useDeleteCollage({ myTeamCollages });
  const handleDeleteSingleCollage = (id: number) => {
    deleteSingleCollage(id, {
      onSuccess: () => {
        toast.success("Collage deleted successfully.");
      },
      onError: () => {
        toast.error("Failed to delete the Collage.");
      },
    });
  };
  return (
    <>
      <div className="my-2 flex h-fit w-full cursor-pointer gap-5 rounded-3xl border bg-purple-50 p-5 shadow-lg dark:bg-gray-700">
        <div className="flex h-full w-full flex-col gap-3 overflow-y-auto p-4 ">
          <div className=" flex items-center gap-5">
            <p className="w-fit font-bold">Collage Name:</p>
            <p>{singleCollage.collageName}</p>
          </div>
          <div className="flex gap-5">
            <p className="w-fit font-bold">Creator:</p>

            <p
              className="dark:text-white"
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
              className="urdu-text w-full text-justify leading-9  tracking-widest"
              dir="auto"
            >
              {tickerOcrResults.map((ocrResult, index) => (
                <React.Fragment key={index}>
                  {ocrResult}
                  {index !== tickerOcrResults.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className="flex gap-5">
            <p className="w-fit font-bold">Tickers Count : </p>
            <p className="">{tickerOcrResults.length}</p>
          </div>
          <div className="flex gap-5">
            <p className="w-fit font-bold">Channel Count : </p>
            <p className="">{channelDetails.length}</p>
          </div>
          <div className="flex gap-5 ">
            <p className="w-fit font-bold ">Shared With:</p>
            <div className="flex gap-2 text-white">
              {temaDetails.map((team) => {
                const { teamId, teamName } = team;
                return (
                  <button
                    key={"team" + String(teamId)}
                    className="rounded-md bg-lavender-500 p-2 text-sm"
                  >
                    {teamName}
                  </button>
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
              handleDeleteSingleCollage(collageId);
            }}
          >
            <MdDelete size={22} />
          </div>
        </div>
        <div
          className="scroll-hidden flex w-1/2 flex-col overflow-hidden overflow-y-auto rounded-xl"
          onClick={() => {
            setIsMyCollageModalOpen(true);
          }}
        >
          <div className="flex ">
            <img
              // src={
              //   collageImageUrl
              //     ? `${baseServiceUrl}${collageImageUrl}/`
              //     : undefined
              // }
              src={collageImageUrl ?? undefined}
              className="h-full "
              alt="Ticker Image"
            />
          </div>
        </div>
      </div>

      {isMyCollageModalOpen && (
        <CollageViewModal
          setIsCollageModalOpen={setIsMyCollageModalOpen}
          collageId={collageId}
        />
      )}
    </>
  );
}
