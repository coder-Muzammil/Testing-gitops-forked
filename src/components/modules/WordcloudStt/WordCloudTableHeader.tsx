const WordCloudTableHeader = () => {
  return (
    <thead>
      <tr className="flex flex-row gap-2 overflow-hidden rounded-md bg-gray-100">
        <th className="w-36 text-start">Channel</th>
        <th className="w-20 text-start">Module</th>
        <th className="w-14 text-start">Count</th>
        <th className="flex-1 text-start"></th>
      </tr>
    </thead>
  );
};

export default WordCloudTableHeader;
