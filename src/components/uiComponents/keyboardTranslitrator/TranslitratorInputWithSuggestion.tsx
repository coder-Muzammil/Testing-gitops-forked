import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

type TranslitratorInputWithSuggestionPropsType = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  suggestionIndex: number;
  setSuggestionIndex: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  isError: boolean;
  wordSuggestions: Array<string>;
  acceptSuggestion: (value: string) => void;
  isOpenTranslitratorInput: boolean;
  error: Error | null;
};

const TranslitratorInputWithSuggestion = ({
  isOpenTranslitratorInput,
  inputValue,
  setInputValue,
  suggestionIndex,
  setSuggestionIndex,
  isLoading,
  isError,
  error,
  acceptSuggestion,
  wordSuggestions,
}: TranslitratorInputWithSuggestionPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpenTranslitratorInput) {
      inputRef.current?.focus();
    }
  }, [isOpenTranslitratorInput]);

  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 px-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="transliterator..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            if (e.key === "ArrowLeft") {
              setSuggestionIndex((prev) => (prev === 0 ? 0 : prev - 1));
            } else {
              setSuggestionIndex((prev) =>
                prev === wordSuggestions.length - 1
                  ? wordSuggestions.length - 1
                  : prev + 1,
              );
            }
          }

          if (e.key === "Enter") {
            acceptSuggestion(wordSuggestions[suggestionIndex]);
          }

          if (e.key === " ") {
            acceptSuggestion(inputValue);
          }
        }}
        className="bg-gray-100 px-1 focus:outline-none"
      />

      <div
        className={twMerge(
          "flex flex-wrap gap-2 rounded-sm",
          isLoading && "animate-pulse bg-gray-50",
          isError && "border border-red-300 items-center ps-1",
        )}
      >
        {isError && (
          <span className="text-xs text-red-400">{error?.message}</span>
        )}

        {Array.isArray(wordSuggestions) &&
          wordSuggestions.map((suggestion, index) => (
            <span
              key={index}
              className={twMerge(
                "flex grow cursor-pointer items-center justify-center border border-black bg-gray-200 px-2",
                index === suggestionIndex && "bg-gray-300",
              )}
              onClick={() => {
                acceptSuggestion(suggestion);
              }}
            >
              {suggestion}
            </span>
          ))}
      </div>
    </div>
  );
};

export default TranslitratorInputWithSuggestion;
