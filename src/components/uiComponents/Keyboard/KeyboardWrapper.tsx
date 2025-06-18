import { useState, MutableRefObject } from "react";
import { useSearchParams } from "react-router-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

type IProps = {
  input: string;
  keyboardRef: MutableRefObject<unknown>;
  setkeyboardInputValue: React.Dispatch<React.SetStateAction<string>>;
  keyboardInputValue: string;
};
type Keyboardtype = {
  clearInput: () => void;
};
const KeyboardWrapper = ({
  keyboardRef,
  setkeyboardInputValue,
  keyboardInputValue,
}: IProps) => {
  const [layoutName, setLayoutName] = useState("default");
  const [searchParams, setSearchParams] = useSearchParams();

  const onKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }

    if (button === "{enter}") {
      const query = searchParams.get("query") ?? "";
      const updatedQuery = `${query} ${keyboardInputValue}`;
      setSearchParams({ query: updatedQuery });
      setkeyboardInputValue("");
      if (
        keyboardRef.current &&
        typeof (keyboardRef.current as Keyboardtype).clearInput === "function"
      ) {
        (keyboardRef.current as Keyboardtype).clearInput();
      }
    }
  };
  const onChange = (input: string) => {
    setkeyboardInputValue(input);
  };
  const urduLayout = {
    default: [
      "1 2 3 4 5 6 7 8 9 0",
      "{tab} ض ص ث ق ف غ ع ه خ ح ج چ [ ] {bksp}",
      "ش س ی ب ل ا ت ن م ک گ {enter}",
      "{shift} ط ز ر ڈ د پ و ء . {shift}",
      ".com @ {space}",
    ],
    shift: [
      "1 2 3 4 5 6 7 8 9 0",
      "ً ٌ ٍ َ ِ ُ ْ ء آ ؤ ئ ۓ {bksp}",
      "ژ ڑ ں ۃ ہ ء ء ّ ٔ ٰ ۖ ۗ {enter}",
      "{shift} ں ۄ ۅ ۆ ۈ ۈ ۉ ۊ ی ێ {shift}",
      ".com @ {space}",
    ],
  };

  return (
    <Keyboard
      keyboardRef={(r) => {
        keyboardRef.current = r;
      }}
      layoutName={layoutName}
      onChange={onChange}
      onKeyPress={onKeyPress}
      layout={urduLayout}
      onRender={() => {
        console.log("Rendered");
      }}
    />
  );
};

export default KeyboardWrapper;
