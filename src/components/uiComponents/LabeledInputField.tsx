function LabeledInputField({
  type,
  label,
  value,
  onChange,
  placeholder,
}: {
  type: string;
  label: string | number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] shadow-md">
      <Label label={label} />
      <InputFieldEmbedded
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? `Search`}
      />
    </div>
  );
}
export default LabeledInputField;

function Label({ label }: { label: string | number }) {
  return (
    <div className="flex h-6 items-center justify-center rounded-l-md bg-lavender-600 px-3 text-xs text-lavender-50 2xl:h-8 2xl:text-sm">
      {label}
    </div>
  );
}

type InputFieldPrimaryPropsExceptClassName = Omit<
  React.PropsWithoutRef<JSX.IntrinsicElements["input"]>,
  "className"
>;

function InputFieldEmbedded({
  ...props
}: InputFieldPrimaryPropsExceptClassName) {
  return (
    <input
      className="block h-6 rounded-r-md border border-l-0 border-lavender-300 bg-lavender-100 px-3 text-xs text-lavender-700 placeholder:text-xs focus-within:outline-none dark:bg-gray-700 dark:text-red-400 2xl:h-8 2xl:text-sm"
      {...props}
    />
  );
}
