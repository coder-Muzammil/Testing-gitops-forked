import { highlightQueryInText } from "../../../../utils/helpers";
import { useSearchParams } from "react-router-dom";
function TopicFieldEnglish({
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
      className=""
      // onContextMenu={(e) => {
      //   // TODO: temprary blockage of functionality
      //   return;
      //   e.preventDefault();
      //   setIsEditorOpen(true);
      // }}
    >
      <p
        className="font-bold leading-6"
        dangerouslySetInnerHTML={{
          __html: highlightQueryInText({
            text: topic,
            query: searchQuery,
          }),
        }}
      />
      <p
        className="indent-8 leading-6 text-gray-600"
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
export default TopicFieldEnglish;
