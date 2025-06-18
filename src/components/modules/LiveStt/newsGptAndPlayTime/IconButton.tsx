const IconButton = ({
  disabled,
  children,
  ...restProps
}: {
  disabled: boolean;
  children: React.ReactNode;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "style" | "className"
>) => {
  return (
    <button
      disabled={disabled}
      {...restProps}
      className="flex items-center justify-center gap-1 rounded-sm bg-lavender-600 p-1 text-white disabled:cursor-not-allowed disabled:bg-lavender-400"
    >
      {children}
    </button>
  );
};

export default IconButton;
