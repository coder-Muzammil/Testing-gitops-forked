// TODO: change props type after api is ready for formedia word cloud
const WordCloudDataTable = ({
  wordData,
}: {
  wordData: Array<{
    channelName: string;
    channelLogo: string;
    channelFequency: number;
    data: Array<{
      module: string;
      count: number;
    }>;
  }>;
}) => {
  console.log({ wordData });

  return (
    <div className="flex max-h-[45vh] gap-4 overflow-auto rounded-md bg-gray-50 p-2">
      <div className="flex flex-1">
        <table className="">
          <thead>
            <tr className="grid grid-cols-3 space-x-4 bg-gray-200 py-2 text-sm font-semibold">
              <th className="text-start">ChannelName</th>
              <th className="text-start">Module</th>
              <th className="text-start">Count</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((item) => (
              <tr
                key={item}
                className="grid grid-cols-3 space-x-4 py-1 text-sm"
              >
                <td></td>
                <td>Wordcloud</td>
                <td>30</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex-1 flex-col bg-gray-200">
          <h2 className="py-2 text-sm font-semibold">Summary</h2>
          <p className="flex-1">This is summary of the word in all modules</p>
        </div>
      </div>
    </div>
  );
};

export default WordCloudDataTable;
