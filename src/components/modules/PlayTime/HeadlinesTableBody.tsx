import React from "react";
import { SingleHeadlineNewsDataType } from "../../../api/useGetHeadlinesNewsData";
import HeadlinesTableBodyRow from "./HeadlinesTableBodyRow";

const HeadlinesTableBody = ({
  headLines,
}: {
  headLines: Array<SingleHeadlineNewsDataType>;
}) => {
  return (
    <tbody className="">
      {headLines.map((items) => (
        <React.Fragment key={items.id}>
          <tr>
            <td colSpan={7} className="w-full ">
              <p
                dir="auto"
                className="my-1  bg-gray-300 px-3 py-3 text-lg font-semibold capitalize text-gray-800 dark:bg-gray-800 dark:text-white/80 "
              >
                {`${items.title} ${items.time}`}
              </p>
            </td>
          </tr>
          {items.data.length == 0 && <p>No data available for this time.</p>}
          {items.data.map((item) => (
            <HeadlinesTableBodyRow key={item.transcriptionId} item={item} />
          ))}
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default HeadlinesTableBody;
