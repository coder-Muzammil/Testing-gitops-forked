import { useState } from "react";
import ButtonGradientPrimary from "../../../primitives/ButtonGradientPrimary";
import Input from "../../../primitives/Input";

const SendCustomPromptToNewsGpt = ({
  onPromptClick,
  isPending,
}: {
  onPromptClick: (prompt: string) => void;
  isPending: boolean;
}) => {
  const [customedPrompt, setCustomedPrompt] = useState<string>("");

  const handleSubmitCustomedPromptData = () => {
    onPromptClick(customedPrompt);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitCustomedPromptData();
      }}
      className="flex flex-col items-center justify-center gap-2"
    >
      <Input
        type="text"
        value={customedPrompt}
        onChange={(e) => {
          setCustomedPrompt(e.target.value);
        }}
        name="customedPrompt"
      />
      <ButtonGradientPrimary
        type="submit"
        disabled={customedPrompt === "" || isPending}
        // isLoading={isDisabled}
      >
        Submit
      </ButtonGradientPrimary>
    </form>
  );
};

export default SendCustomPromptToNewsGpt;
