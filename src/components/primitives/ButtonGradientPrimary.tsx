import { BiErrorAlt } from "react-icons/bi";

function ButtonGradientPrimary({
  children,
  isLoading,
  isInvalid,
  ...restProps
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  isInvalid?: boolean;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "style" | "className"
>) {
  return (
    <button
      // changing scale on hover may effect UI stability in some cases. so it's better to keep button in a container with fixed width and height and centeralize the button in it.
      className="h-6 w-full rounded-md border-2 border-lavender-600 bg-lavender-700 p-1 text-xs text-white transition-all hover:bg-lavender-600 active:scale-[0.99] active:bg-lavender-800 disabled:cursor-not-allowed disabled:bg-lavender-400 2xl:h-8 2xl:text-sm"
      // className="h-6 rounded-md bg-gradient-to-br from-[#6e4d8e] to-[#5b4175] text-xs text-white 2xl:h-8 2xl:text-sm"
      {...restProps}
    >
      {!isLoading && !isInvalid && children}
      {isLoading && (
        <div className="mx-auto aspect-square h-[70%] animate-spin rounded-full border-2 border-transparent border-b-gray-200" />
      )}
      {isInvalid && (
        <div className="mx-auto flex h-[70%] w-fit items-center justify-center text-white">
          <BiErrorAlt />
        </div>
      )}
    </button>
  );
}
export default ButtonGradientPrimary;
