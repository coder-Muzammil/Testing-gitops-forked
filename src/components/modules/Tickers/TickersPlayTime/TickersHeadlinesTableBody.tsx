import React from "react";
import TickersHeadlinesTableBodyRow from "./TickersHeadlinesTableBodyRow";
import { SingleTickersHeadlineNewsDataType } from "../../../../api/useGetTickersHeadlinesNewsData";

const TickersHeadlinesTableBody = ({
  headLines,
}: {
  headLines: Array<SingleTickersHeadlineNewsDataType>;
}) => {
  return (
    <tbody>
      {headLines.map((items) => (
        <React.Fragment key={items.id}>
          <tr className="">
            <td colSpan={4} className="">
              <p
                dir="auto"
                className="my-1 w-full bg-gray-300 px-3 py-3 text-lg font-semibold capitalize text-gray-800"
              >
                {items.time}
              </p>
            </td>
          </tr>
          {items.data.length == 0 && <p>No data available for this time.</p>}
          {items.data.map((item) => (
            <TickersHeadlinesTableBodyRow key={item.recordId} item={item} />
          ))}
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default TickersHeadlinesTableBody;
