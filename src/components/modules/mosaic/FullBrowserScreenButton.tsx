import { VscScreenFull } from "react-icons/vsc";

function FullBrowserScreenButton({
  setIsBrowserFullScreen,
  isBrowserFullScreen,
}: {
  setIsBrowserFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  isBrowserFullScreen: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        setIsBrowserFullScreen(!isBrowserFullScreen);
      }}
      title="Full browser screen"
    >
      <VscScreenFull />
    </button>
  );
}
export default FullBrowserScreenButton;
