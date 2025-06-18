import { BsSortNumericUp, BsSortNumericUpAlt } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SortHeadlinesData = () => {
  const [, setSearchParams] = useSearchParams();
  const [isSortDesc, setIsSortDesc] = useState(true);

  useEffect(() => {
    if (isSortDesc) {
      setSearchParams((currentParams) => {
        currentParams.delete("sort");
        return currentParams;
      });
    } else {
      setSearchParams((currentParams) => {
        currentParams.set("sort", "asc");
        return currentParams;
      });
    }
  }, [isSortDesc, setSearchParams]);

  return isSortDesc ? (
    <BsSortNumericUpAlt
      size={26}
      className="h-full cursor-pointer rounded-md p-1 text-gray-700 hover:bg-gray-200 dark:bg-gray-400 dark:hover:bg-gray-500"
      onClick={() => {
        setIsSortDesc(false);
      }}
    />
  ) : (
    <BsSortNumericUp
      size={26}
      className="h-full cursor-pointer rounded-md p-1 text-gray-700 hover:bg-gray-200 dark:bg-gray-400"
      onClick={() => {
        setIsSortDesc(true);
      }}
    />
  );
};

export default SortHeadlinesData;
