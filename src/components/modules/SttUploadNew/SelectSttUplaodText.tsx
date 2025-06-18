import { twMerge } from "tailwind-merge";
import { checkLanguage } from "../../../utils/helpers";

const SelectSttUplaodText = ({
  filteredData,
}: {
  filteredData: Array<{
    srName: string | null;
    updatedText: string | null;
  }>;
}) => {
  return (
    <div className=" overflow-auto rounded-lg px-2 ">
      {filteredData.map((chunk, index) => {
        const { srName, updatedText } = chunk;
        const language = checkLanguage(updatedText);
        return (
          <div
            key={index}
            className="my-2  grid w-full grid-cols-[auto_auto_1fr] items-center gap-4 rounded-lg bg-white p-2 dark:bg-slate-500 "
          >
            <div className="grid grid-cols-[auto_1fr] items-center justify-center gap-4 ">
              <p
                dir="auto"
                className={twMerge(
                  " text-base text-lavender-500 dark:text-lavender-500",
                )}
              >
                {srName}
              </p>
              <p
                dir="auto"
                className={twMerge(
                  "text-base text-gray-500 dark:text-white/70",
                  language === "urdu" && "text-xl tracking-wider",
                )}
              >
                {updatedText}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectSttUplaodText;
