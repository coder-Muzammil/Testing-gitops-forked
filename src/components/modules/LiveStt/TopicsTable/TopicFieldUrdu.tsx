import { highlightQueryInText } from "../../../../utils/helpers";
import { useSearchParams } from "react-router-dom";
function TopicFieldUrdu({
  topic,
  summary,
}: {
  topic: string;
  summary: string;
}) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query")?.toLowerCase() ?? "";
  return (
    <div
      className="urdu-text space-y-2 text-justify tracking-widest"
      dir="auto"
      // onContextMenu={(e) => {
      //   // TODO: temprary blockage of functionality
      //   return;
      //   e.preventDefault();
      //   setIsEditorOpen(true);
      // }}
    >
      <p
        className="font-bold  leading-9"
        dangerouslySetInnerHTML={{
          __html: highlightQueryInText({
            text: topic,
            query: searchQuery,
          }),
        }}
      />
      <p
        className="indent-8 leading-9 text-gray-600"
        dangerouslySetInnerHTML={{
          __html: highlightQueryInText({
            text: summary,
            query: searchQuery,
          }),
        }}
      />
    </div>
  );
}
export default TopicFieldUrdu;
