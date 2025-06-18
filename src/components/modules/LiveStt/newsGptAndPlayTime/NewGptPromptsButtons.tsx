import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useClickAway } from "@uidotdev/usehooks";
import ButtonGradientPrimary from "../../../primitives/ButtonGradientPrimary";
import { useState } from "react";
import SendCustomPromptToNewsGpt from "./SendCustomPromptToNewsGpt";

const promptsText = [
  "Urdu Text Correction",
  "Summarization",
  "Sentiment Analysis",
  "Topic Generation",
  "Key Insight Generation",
  "Top Trend Analysis",
  "Channel Wise Summary",
  "Urdu to English Translation",
  "English to Urdu Translation",
  "PM Headlines Placement Report",
  // "Extract Relevant Topics",
];

const NewGptPromptsButtons = ({
  onPromptClick,
  isPending,
  isOpenDropdown,
  setIsOpenDropdown,
  selectedDataLength,
  setClickedPrompt,
}: {
  onPromptClick: (prompt: string) => void;
  isPending: boolean;
  isOpenDropdown: boolean;
  setIsOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDataLength?: number;
  setClickedPrompt: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [pendingButton, setPendingButton] = useState<string>("");

  const ref = useClickAway(() => {
    setIsOpenDropdown(false);
  });

  const handlePromptButtonClicked = (buttonName: string) => {
    setPendingButton(buttonName);
    setClickedPrompt(buttonName);
    onPromptClick(buttonName);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpenDropdown(!isOpenDropdown);
        }}
        disabled={selectedDataLength === 0}
        className="flex items-center gap-3  rounded-lg bg-lavender-600 px-3 py-1 text-center text-sm text-white disabled:cursor-not-allowed disabled:bg-lavender-500"
      >
        <span>News GPT</span>
        {isOpenDropdown ? (
          <FaChevronUp size={16} />
        ) : (
          <FaChevronDown size={16} />
        )}
      </button>

      {isOpenDropdown && (
        <div
          ref={ref as React.MutableRefObject<HTMLDivElement>}
          className="absolute right-0 top-[calc(100%+2px)] z-10 space-y-2 rounded-md bg-gray-300 p-1 px-2 py-2 dark:bg-gray-800"
        >
          {promptsText.map((text) => {
            const isDisabled = isPending && pendingButton === text;

            return (
              <div key={text} className="h-auto w-72">
                <ButtonGradientPrimary
                  type="button"
                  onClick={() => {
                    handlePromptButtonClicked(text);
                  }}
                  disabled={isDisabled}
                  isLoading={isDisabled}
                >
                  {text}
                </ButtonGradientPrimary>
              </div>
            );
          })}
          <SendCustomPromptToNewsGpt
            onPromptClick={onPromptClick}
            isPending={isPending}
          />
        </div>
      )}
    </div>
  );
};

export default NewGptPromptsButtons;
