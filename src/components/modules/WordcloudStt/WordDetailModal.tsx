import { useClickAway } from "@uidotdev/usehooks";
import Portal from "../../primitives/Portal";
import SelectableFilters from "./SelectableFilters";
import { useState } from "react";
import WordCloudDataTable from "./WordCloudDataTable";

const items = [
  {
    channelName: "AryNews",
    channelLogo: "https://randomuser.me/api/portraits/men/1.jpg",
    channelFequency: 300,
    data: [
      {
        module: "Tickers",
        count: 10,
      },
      {
        module: "Flasher",
        count: 20,
      },
      {
        module: "Topic_english",
        count: 30,
      },
      {
        module: "Topic_urdu",
        count: 40,
      },
    ],
  },
  {
    channelName: "ExpressNews",
    channelLogo: "https://randomuser.me/api/portraits/men/2.jpg",
    channelFequency: 300,
    data: [
      {
        module: "Tickers",
        count: 10,
      },
      {
        module: "Flasher",
        count: 20,
      },
      {
        module: "Topic_english",
        count: 30,
      },
      {
        module: "Topic_urdu",
        count: 40,
      },
    ],
  },
];

const WordDetailModal = ({
  word,
  setOpenWordModal,
}: {
  word: string;
  setOpenWordModal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // const { data, isLoading, isError, error, isSuccess } = useGetWordDetail({
  //   word,
  // });
  const [selectedEntry, setSelectedEntry] = useState<{
    label: string | number;
    value: string | number;
  } | null>(null);

  // const entry = selectedEntry && selectedEntry?.value;

  const ref = useClickAway(() => {
    setOpenWordModal("");
  });

  return (
    <Portal>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div
          ref={ref as React.MutableRefObject<HTMLDivElement>}
          className="w-11/12 rounded-lg bg-white p-4 sm:w-9/12 lg:w-1/2"
        >
          {/* {isLoading && (
            <p className="pb-3 text-center font-semibold text-[#333970]">
              Loading...
            </p>
          )}
          {isError && (
            <p className="pb-3 text-center text-red-500">{error.message}</p>
          )} */}

          {
            <>
              <p className="pb-3 text-center text-2xl font-semibold text-[#333970]">{`Word Cloud Report for the word "${word}"`}</p>
              <SelectableFilters
                selectedEntry={selectedEntry}
                setSelectedEntry={setSelectedEntry}
              />
              <WordCloudDataTable wordData={items} />
              {/* Show frequency of channels */}
              {/* <div className="mt-6 w-full space-y-1 rounded-md bg-gray-50">
                {data.overall_count.map((item) => (
                  <p
                    key={item.channelName}
                    className="flex items-center justify-start gap-4 text-sm"
                  >
                    <span className="text-gray-800">
                      Total {item.channelName} frequency:{" "}
                    </span>
                    <span className="font-semibold text-gray-600">
                      {item.count}
                    </span>
                  </p>
                ))}
              </div> */}
            </>
          }
        </div>
      </div>
    </Portal>
  );
};

export default WordDetailModal;
