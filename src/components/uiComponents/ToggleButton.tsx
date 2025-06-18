import { twMerge } from "tailwind-merge";

export default function ToggleButton({
  isToggled,
  setIsToggled,
}: {
  setIsToggled: (value: boolean) => void;
  isToggled: boolean;
}) {
  return (
    <div
      onClick={() => {
        setIsToggled(!isToggled);
      }}
      className={twMerge(
        "relative cursor-pointer rounded-full border-2 border-gray-600 transition-all dark:border-gray-400",
        isToggled && "border-purple-800 bg-purple-400",
        "w-7 sm:w-8 md:w-9 lg:w-10 xl:w-11 2xl:w-11",
        "aspect-video",
      )}
    >
      <div
        className={twMerge(
          "absolute top-0 rounded-full transition-all duration-500",
          "aspect-square w-3 sm:w-4 md:w-4 lg:w-4 xl:w-5 2xl:w-5",
          !isToggled ? "left-0 bg-gray-600 dark:bg-white" : "right-0 bg-white",
        )}
      ></div>
    </div>
  );
}
