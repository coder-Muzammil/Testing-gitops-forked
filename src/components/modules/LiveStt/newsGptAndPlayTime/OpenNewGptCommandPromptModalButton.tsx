import { useSttLiveContext } from "../useSttLiveContext";

const OpenNewGptCommandPromptModalButton = ({
  setIsOpenCommandPromptModal,
}: {
  setIsOpenCommandPromptModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { selectedHeadlines } = useSttLiveContext();
  return (
    <button
      onClick={() => {
        setIsOpenCommandPromptModal(true);
      }}
      className="rounded-md bg-lavender-600 px-3 py-1 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-lavender-400"
      disabled={selectedHeadlines.length === 0}
    >
      News GPT
    </button>
  );
};

export default OpenNewGptCommandPromptModalButton;
