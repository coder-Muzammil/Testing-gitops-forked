import { useEffect, useState } from "react";

const MDEdittorTypeWritterEffect = ({
  text,
  onUpdate,
  chunkSize = 25,
}: {
  text: string;
  onUpdate: (value: string) => void;
  chunkSize?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setCharIndex(0);
  }, [text]);

  useEffect(() => {
    if (charIndex < text.length) {
      const timeout = setTimeout(() => {
        const nextChunk = text.slice(charIndex, charIndex + chunkSize);
        const newText = displayedText + nextChunk;
        setDisplayedText(newText);
        setCharIndex((prev) => prev + chunkSize);
        onUpdate(newText);
      }, 50);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [charIndex, text, displayedText, onUpdate, chunkSize]); // ✅

  return null;
};

export default MDEdittorTypeWritterEffect;
