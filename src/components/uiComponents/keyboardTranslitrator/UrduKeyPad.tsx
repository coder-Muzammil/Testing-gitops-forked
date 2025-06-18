import { FaRegKeyboard } from "react-icons/fa";
import KeypadTranslitrator from "./KeypadTranslitrator";
import { useState } from "react";

export type Keyboardtype = { clearInput: () => void };

const UrduKeyPad = ({
  keyboardRef,
  onKeyboardManualChange,
  acceptSuggestion,
}: {
  onKeyboardManualChange: (value: string) => void;
  acceptSuggestion: (value: string) => void;
  keyboardRef: React.MutableRefObject<unknown>;
}) => {
  const [isOpenKeypad, setIsOpenKeypad] = useState(false);

  return (
    <div className="relative ">
      <FaRegKeyboard
        className="dark:text-white"
        title="Urdu Keyboard"
        cursor="pointer"
        onClick={() => {
          setIsOpenKeypad(!isOpenKeypad);
        }}
        size={25}
      />

      {isOpenKeypad && (
        <div className="dark-text-black absolute right-0 top-[calc(100%+1px)] z-10 w-[440px] rounded-sm bg-gray-200 shadow-md  shadow-gray-300">
          <KeypadTranslitrator
            keyboardRef={keyboardRef}
            onKeyboardManualChange={onKeyboardManualChange}
            acceptSuggestion={acceptSuggestion}
          />
        </div>
      )}
    </div>
  );
};

export default UrduKeyPad;
