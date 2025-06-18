import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { transliterationUrl } from "./apiConstants";
import { useDebounce } from "@uidotdev/usehooks";

const useGetTransiltrateWord = (word: string) => {
  const debouncedWord = useDebounce(word, 300);

  return useQuery({
    queryKey: ["transliterate", debouncedWord],
    queryFn: ({ signal }) => {
      return axios.get<{
        orignal_text: string;
        transliterated: Array<string>;
      }>(transliterationUrl, {
        params: {
          text: debouncedWord.startsWith(" ")
            ? debouncedWord.slice(1)
            : debouncedWord,
        },
        signal,
      });
    },
    enabled: !!debouncedWord,
  });
};

export default useGetTransiltrateWord;
