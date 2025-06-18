import { ComponentPropsWithoutRef, Ref, forwardRef } from "react";

type InputProps = ComponentPropsWithoutRef<"input">;
const Input = forwardRef(function Input(
  { className, ...props }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      {...props}
      className={`h-6 w-full rounded-md border bg-white px-2 py-2 shadow-sm focus:outline-none dark:bg-gray-700 2xl:h-8 ${className ?? ""} placeholder:text-xs 2xl:placeholder:text-sm`}
    />
  );
});
export default Input;
