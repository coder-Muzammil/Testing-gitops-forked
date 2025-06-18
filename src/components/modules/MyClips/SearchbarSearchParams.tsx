import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Input from "../../primitives/Input";
import { FaRegKeyboard } from "react-icons/fa";
import { useClickAway } from "@uidotdev/usehooks";
import OnScreenKeyboard from "../../uiComponents/onScreenKeyboard/OnScreenKeyboard";

type Keyboardtype = { clearInput: () => void };

function SearchbarSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyboardRef = useRef<Keyboardtype>(null);
  const internalInputRef = useRef<HTMLInputElement>(null);
  const searchFieldRef = useRef<HTMLInputElement>(null);
  const [internalInputValue, setInternalInputValue] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isTransliterationActive, setIsTransliterationActive] = useState(true);
  const ref = useClickAway(() => {
    setIsKeyboardOpen(false);
  });

  function handleSearchChange(newValue: string) {
    setSearchParams((currentParams) => {
      if (newValue.trim() === "") {
        currentParams.delete("query");
      } else {
        currentParams.set("query", newValue);
      }
      return currentParams;
    });
  }

  function handleManualKeyboardChange(newValue: string) {
    const concatValue = queryValue.concat(newValue[newValue.length - 1]);

    handleSearchChange(concatValue);
    keyboardRef.current?.clearInput();
  }

  function handleAcceptSuggestion(value: string) {
    handleSearchChange(queryValue + " " + value);
  }

  useEffect(() => {
    if (isTransliterationActive) {
      internalInputRef.current?.focus();
    } else {
      searchFieldRef.current?.focus();
    }
  }, [isTransliterationActive]);

  useEffect(() => {
    // ctrl + alt + T to toggle transliteration
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "t" && e.ctrlKey && e.altKey) {
        setIsTransliterationActive((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const queryValue = searchParams.get("query") ?? "";

  return (
    <div className="relative" ref={ref as MutableRefObject<HTMLDivElement>}>
      <div className="flex items-center gap-2">
        <Input
          ref={searchFieldRef as MutableRefObject<HTMLInputElement>}
          name="query"
          placeholder="Search"
          dir="auto"
          type="search"
          value={queryValue}
          onChange={(e) => {
            handleSearchChange(e.target.value);
          }}
          autoComplete="off"
        />

        <div
          onClick={() => {
            setIsKeyboardOpen(!isKeyboardOpen);
          }}
          className="cursor-pointer"
        >
          <FaRegKeyboard size={25} />
        </div>
      </div>

      {isKeyboardOpen && (
        <div className=" absolute z-10 mt-2 grid w-full grid-rows-[auto_1fr] bg-gray-200 dark:bg-gray-800 dark:text-black  ">
          <div className="relative mt-1 w-full ">
            <OnScreenKeyboard
              keyboardRef={keyboardRef}
              inputRef={internalInputRef}
              inputValue={internalInputValue}
              setInputValue={setInternalInputValue}
              isTransliterationActive={isTransliterationActive}
              setIsTransliterationActive={setIsTransliterationActive}
              outerInputValue={queryValue}
              onKeyboardManualChange={handleManualKeyboardChange}
              handleAcceptSuggestion={handleAcceptSuggestion}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchbarSearchParams;
