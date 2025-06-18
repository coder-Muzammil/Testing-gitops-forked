import useGetAllChannels from "../../../api/useGetAllChannels";
import CircularLoader from "../../uiComponents/CircularLoader";
import { BiErrorAlt } from "react-icons/bi";
import SingleChannelCard from "./SingleChannelCard";

function AllChannels({
  selectedEntry,
}: {
  selectedEntry: { label: string | number; value: string | number };
}) {
  const { data, isError, isLoading, error } = useGetAllChannels();

  if (isLoading) {
    return (
      <div className="flex justify-center pt-10">
        <div className="w-10">
          <CircularLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full flex-col items-center pt-10 text-4xl text-lavender-500">
        <BiErrorAlt />
        <p>{error.message}</p>
      </div>
    );
  }

  const filteredChannels = data?.filter(
    (channel) =>
      selectedEntry.value === "all" ||
      channel.channel_type === selectedEntry.value,
  );

  return (
    <div className="grid grid-cols-4 content-start gap-x-4 gap-y-8 rounded-lg 2xl:grid-cols-5">
      {filteredChannels?.map((channel) => {
        const { id } = channel;

        return <SingleChannelCard key={id} channel={channel} />;
      })}
    </div>
  );
}
export default AllChannels;
