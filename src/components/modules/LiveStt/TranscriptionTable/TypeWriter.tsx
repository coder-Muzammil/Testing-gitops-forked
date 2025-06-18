import { useEffect, useState } from "react";
import { highlightQueryInText } from "../../../../utils/helpers";
import { useSearchParams } from "react-router-dom";

const TypeWriter = ({ text }: { text: string }) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query")?.toLowerCase() ?? "";

  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(displayedText + text[charIndex]);
        setCharIndex(charIndex + 1);
      }, 5);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [charIndex, text, displayedText]);

  return (
    <p
      className="urdu-text text-justify leading-9 tracking-widest"
      dir="auto"
      dangerouslySetInnerHTML={{
        __html: highlightQueryInText({
          text: displayedText,
          query: searchQuery,
        }),
      }}
    />
  );
};

export default TypeWriter;
