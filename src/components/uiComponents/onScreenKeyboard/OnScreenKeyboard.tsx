import "react-simple-keyboard/build/css/index.css";
import { MutableRefObject, useEffect, useState } from "react";
import Keyboard from "react-simple-keyboard";
import { twMerge } from "tailwind-merge";
import useGetTransiltrateWord from "../../../api/useGetTransiltrateWord";
import useThemeContext from "../../../components/modules/Theme/useThemeContext";

const urduLayout = {
  default: [
    "1 2 3 4 5 6 7 8 9 0 - =",
    "ق و ع ر ت ے ئ ی ہ پ [ ] \\",
    "ا س د ف گ ھ ج ک ل ؛ ۔",
    "{shift} ز ش چ ط ب ن م ، ۔ ْ",
    "{space}",
  ],
  shift: [
    "! @ # $ % ^ & * ( ) _ +",
    " ْ ﷺ ؑ ڑ ٹ ؁ ٗ ٰ ۃ ُ ‘ ’ [ ] \\",
    " ٓ ص ڈ ٖ غ ح ض خ ل ؛ ۔",
    "{shift} ذ ژ ث ظ ؓ ں إ ِ َ ؟",
    "{space}",
  ],
};

type OnScreenKeyboardPropsType = {
  keyboardRef: React.MutableRefObject<unknown>;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isTransliterationActive: boolean;
  setIsTransliterationActive: React.Dispatch<React.SetStateAction<boolean>>;
  outerInputValue: string;
  onKeyboardManualChange: (value: string) => void;
  handleAcceptSuggestion: (value: string) => void;
};

const OnScreenKeyboard = ({
  keyboardRef,
  inputRef,
  inputValue,
  setInputValue,
  isTransliterationActive,
  setIsTransliterationActive,
  // outerInputValue,
  onKeyboardManualChange,
  handleAcceptSuggestion,
}: OnScreenKeyboardPropsType) => {
  const [layoutName, setLayoutName] = useState("default");
  const [suggestedWordSelectionIndex, setSuggestedWordSelectionIndex] =
    useState(0);
  const { data, isLoading, isError } = useGetTransiltrateWord(inputValue);
  const { theme } = useThemeContext();

  useEffect(() => {
    setSuggestedWordSelectionIndex(0);
  }, [inputValue]);

  const wordSuggestions = data ? data.data.transliterated : [];

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
  };

  function handleTransliteration() {
    setIsTransliterationActive(!isTransliterationActive);
  }

  function acceptSuggestion(suggestedWord: string) {
    handleAcceptSuggestion(suggestedWord);
    setSuggestedWordSelectionIndex(0);
    setInputValue("");
    inputRef.current?.focus();
  }

  return (
    <div className="space-y-2 dark:bg-gray-700 ">
      <div className="flex justify-end px-2 dark:bg-gray-700 ">
        <button
          title="Ctrl + Alt + t"
          type="button"
          onClick={handleTransliteration}
        >
          {isTransliterationActive ? (
            <p className="text-black dark:text-white">Off</p>
          ) : (
            <p className="text-black dark:text-white">On</p>
          )}
        </button>
      </div>
      {isTransliterationActive && (
        <div className=" grid grid-cols-[auto_1fr] gap-2 px-2">
          <input
            ref={inputRef as MutableRefObject<HTMLInputElement>}
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
                  setSuggestedWordSelectionIndex((prev) =>
                    prev === 0 ? 0 : prev - 1,
                  );
                } else {
                  setSuggestedWordSelectionIndex((prev) =>
                    prev === wordSuggestions.length - 1
                      ? wordSuggestions.length - 1
                      : prev + 1,
                  );
                }
              }

              if (e.key === "Enter") {
                acceptSuggestion(wordSuggestions[suggestedWordSelectionIndex]);
              }

              if (e.key === " ") {
                acceptSuggestion(inputValue);
              }
            }}
            className="bg-gray-100 px-1 focus:outline-none dark:bg-gray-600 dark:text-white"
          />
          <div
            className={twMerge(
              "flex flex-wrap gap-2 rounded-sm ",
              isLoading && "animate-pulse",
              isError && " ",
            )}
          >
            {Array.isArray(wordSuggestions) &&
              wordSuggestions.map((suggestion, index) => (
                <span
                  key={index}
                  className={twMerge(
                    "flex grow cursor-pointer items-center justify-center border border-black bg-gray-200 px-2 dark:bg-gray-600 dark:text-white",
                    index === suggestedWordSelectionIndex &&
                      "bg-gray-300 dark:bg-gray-500",
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
      )}
      <div
        className={twMerge(
          "custom-keyboard-wrapper ",
          theme === "dark" && "dark",
        )}
      >
        <Keyboard
          theme="hg-theme-default custom-keyboard"
          keyboardRef={(r) => {
            keyboardRef.current = r;
          }}
          key={theme}
          onChange={onKeyboardManualChange}
          layoutName={layoutName}
          onKeyPress={onKeyPress}
          layout={urduLayout}
        />
      </div>
    </div>
  );
};

export default OnScreenKeyboard;
