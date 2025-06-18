import { RiFullscreenFill } from "react-icons/ri";

function FullScreenButton({ elementName }: { elementName: string }) {
  function handleFullScreen() {
    const element = document.getElementById(elementName);

    if (!element) {
      console.error(`${elementName} element not found`);
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((error: unknown) => {
        console.error("Error attempting to exit full-screen mode:", error);
      });
    } else {
      element.requestFullscreen().catch((error: unknown) => {
        console.error("Error attempting to enable full-screen mode:", error);
      });
    }
    // element.requestFullscreen().catch((error: unknown) => {
    //   console.error("Error attempting to enable full-screen mode:", error);
    // });
  }

  return (
    <button
      type="button"
      onClick={handleFullScreen}
      title="Switch to full screen"
      className=""
    >
      <RiFullscreenFill />
    </button>
  );
}

export default FullScreenButton;
