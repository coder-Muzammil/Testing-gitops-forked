import { SingeWordDetailType } from "../../../api/responseTypes/getWordDetailApi.types";

const SingleWordCloudRow = ({ item }: { item: Array<SingeWordDetailType> }) => {
  //   const top = 5;
  //   const sortableData = item.sort((a, b) => b.count - a.count).slice(0, top);
  //   console.log({ item, sortableData });

  if (item.length === 0) {
    return (
      <tr>
        <td className="text-xs text-blue-300">
          No data available for this module!
        </td>
      </tr>
    );
  }

  return (
    <>
      {item.map((row) => (
        <tr
          key={row.channelName}
          className="my-3 flex flex-row items-end gap-2 border-b"
        >
          <td className="flex w-36 items-end gap-2 text-start text-sm">
            <img
              src={row.channelLogo}
              className="h-8 w-8 rounded-full object-center"
            />
            <span className="font-semibold">{row.channelName}</span>
          </td>
          <td className="w-20 text-start">{row.module}</td>
          <td className="w-14 text-start">{row.count}</td>
          <td className="flex-1 text-start"></td>
        </tr>
      ))}
    </>
  );
};

export default SingleWordCloudRow;
