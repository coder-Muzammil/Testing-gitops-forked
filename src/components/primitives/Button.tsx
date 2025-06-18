import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type IconButtonProps = {
  icon?: ElementType;
  className?: string;
  iconColor?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;

export default function Button({
  icon: Icon,
  className,
  iconColor,
  children,
  ...otherProps
}: IconButtonProps) {
  return (
    <button
      {...otherProps}
      className={twMerge(
        "flex h-6 items-center justify-center rounded bg-fuchsia-800 px-4 py-2 text-sm text-white hover:bg-fuchsia-900 disabled:bg-gray-500 2xl:h-8",
        className,
      )}
    >
      <span>{children}</span>
      {Icon && (
        <span className="ml-2">
          <Icon className={twMerge("text-lg", iconColor)} />
        </span>
      )}
    </button>
  );
}
