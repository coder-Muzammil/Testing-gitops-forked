import { useState } from "react";
import useGetTransiltrateWord from "../../../api/useGetTransiltrateWord";
import TranslitratorToggleButton from "./TranslitratorToggleButton";
import TranslitratorInputWithSuggestion from "./TranslitratorInputWithSuggestion";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

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

const KeypadTranslitrator = ({
  keyboardRef,
  onKeyboardManualChange,
  acceptSuggestion,
}: {
  keyboardRef: React.MutableRefObject<unknown>;
  onKeyboardManualChange: (value: string) => void;
  acceptSuggestion: (value: string) => void;
}) => {
  const [layoutName, setLayoutName] = useState("default");

  const [isOpenTranslitratorInput, setIsOpenTranslitratorInput] =
    useState(true);

  const [translitratorInput, setTranslitratorInput] = useState("");

  const { data, isLoading, isError, error } =
    useGetTransiltrateWord(translitratorInput);

  const [suggestedWordSelectionIndex, setSuggestedWordSelectionIndex] =
    useState(0);

  const wordSuggestions = data ? data.data.transliterated : [];

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
  };

  const handleAcceptSuggestion = (value: string) => {
    acceptSuggestion(value);
    setTranslitratorInput("");
  };

  return (
    <div className="space-y-1 p-1">
      <div className="flex justify-end px-1 pt-2">
        <TranslitratorToggleButton
          isOpen={isOpenTranslitratorInput}
          setIsOpen={setIsOpenTranslitratorInput}
        />
      </div>

      {isOpenTranslitratorInput && (
        <TranslitratorInputWithSuggestion
          isOpenTranslitratorInput={isOpenTranslitratorInput}
          inputValue={translitratorInput}
          setInputValue={setTranslitratorInput}
          suggestionIndex={suggestedWordSelectionIndex}
          setSuggestionIndex={setSuggestedWordSelectionIndex}
          isLoading={isLoading}
          isError={isError}
          wordSuggestions={wordSuggestions}
          acceptSuggestion={handleAcceptSuggestion}
          error={error}
        />
      )}

      <Keyboard
        keyboardRef={(r) => {
          keyboardRef.current = r;
        }}
        onChange={onKeyboardManualChange}
        layoutName={layoutName}
        onKeyPress={onKeyPress}
        layout={urduLayout}
        onRender={() => {
          console.log("Rendered");
        }}
      />
    </div>
  );
};

export default KeypadTranslitrator;
