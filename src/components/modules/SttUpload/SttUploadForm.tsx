import { type Dispatch, type SetStateAction } from "react";
import Input from "../../primitives/Input";
import SelectLanguageDropDown from "./SelectLanguageDropDown";

type SttUploadFormPropsType = {
  selectedEntry: "urdu" | "english";
  setSelectedEntry: Dispatch<SetStateAction<"urdu" | "english">>;
  isPending: boolean;
  onClick: () => void;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  filedError: string;
};
const SttUploadForm = ({
  value,
  setValue,
  selectedEntry,
  setSelectedEntry,
  isPending,
  onClick,
  filedError,
}: SttUploadFormPropsType) => {
  return (
    <div className="grid max-h-[450px] w-full grid-rows-[1fr_auto] gap-2">
      <div className="flex flex-col gap-2">
        <div>
          <Input
            type="text"
            placeholder="Enter Name..."
            value={value}
            onChange={(e) => {setValue(e.target.value)}}
          />
          {filedError && <p className="text-sm text-red-600">{filedError}</p>}
        </div>
        <SelectLanguageDropDown
          disabled={isPending}
          entries={["urdu", "english"]}
          selectedEntry={selectedEntry}
          setSelectedEntry={setSelectedEntry}
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onClick}
          disabled={isPending}
          className="border-lavander-800 h-6 w-36 rounded-md border bg-lavender-600 text-center text-xs text-white disabled:cursor-not-allowed disabled:text-gray-400 2xl:h-8 2xl:w-48 2xl:text-sm"
        >
          Transcribe
        </button>
      </div>
    </div>
  );
};

export default SttUploadForm;
