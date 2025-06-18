import axios from "axios";
import CircularLoader from "../../uiComponents/CircularLoader";
import { useState } from "react";

const SuggestionBox = ({
  wordsCollection,
  setSearchParams,
  getTransiltrateWord,
  // setkeyboardInputValue,
  // keyboardInputValue,
  isPending,
  isError,
  error,
}: {
  wordsCollection: Array<string>;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  getTransiltrateWord: (data: { inputValue: string }) => void;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  // setkeyboardInputValue: React.Dispatch<React.SetStateAction<string>>;
  // keyboardInputValue: string;
}) => {
  const [inputValue, setInputValue] = useState("");
  function handleWordSelect(word: string) {
    setSearchParams((currentParams) => {
      const currentQuery = currentParams.get("query") ?? "";
      const updatedQuery = currentQuery ? `${currentQuery} ${word}` : word;
      currentParams.set("query", updatedQuery);
      return currentParams;
    });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInputValue(value);

    if (value.endsWith(" ")) {
      const trimmedValue = value.trim();
      setSearchParams((currentParams) => {
        const currentQuery = currentParams.get("query") ?? "";
        const updatedQuery = currentQuery
          ? `${currentQuery} ${trimmedValue}`
          : trimmedValue;
        currentParams.set("query", updatedQuery);
        return currentParams;
      });
      setInputValue("");
    } else {
      {
        value.length > 0 && getTransiltrateWord({ inputValue: value });
      }
    }
  }

  let errMessage = "";
  if (isError && axios.isAxiosError<{ error: string }>(error)) {
    errMessage = error.response?.data.error ?? error.message;
  }

  return (
    <div className=" flex flex-col gap-2 border-2 p-2">
      {/* Input field for typing suggestions */}
      <input
        type="text"
        placeholder="Type to get suggestions"
        value={inputValue}
        onChange={handleInputChange}
        className="rounded p-1 outline-none focus:ring-0"
        autoFocus
      />

      {/* Display suggestion words or loader */}
      <div className="relative flex flex-wrap gap-2">
        {isError && (
          <div className="mt-2 flex h-11 items-center justify-center">
            <p className="text-red-600">{errMessage}</p>
          </div>
        )}
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-75">
            <div className="mt-3 h-4 w-4">
              <CircularLoader />
            </div>
          </div>
        )}
        {inputValue
          ? wordsCollection.map((word: string) => (
              <p
                key={word}
                onClick={() => {
                  handleWordSelect(word);
                  setInputValue("");
                }}
                className="my-2 cursor-pointer rounded-lg border bg-white px-2 py-1 shadow-lg hover:bg-slate-400"
              >
                {word}
              </p>
            ))
          : null}
      </div>
    </div>
  );
};

export default SuggestionBox;
