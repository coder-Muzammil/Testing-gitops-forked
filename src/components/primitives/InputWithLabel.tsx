import Input from "./Input";

type AllLabelPropsWithoutChildrenAndClassName = Omit<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  "className"
>;
type InputPropsWithoutClassName = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className"
>;

function InputWithLabel({
  inputProps,
  labelProps,
}: {
  inputProps: InputPropsWithoutClassName;
  labelProps: AllLabelPropsWithoutChildrenAndClassName;
}) {
  return (
    <div className="grid grid-cols-1 ">
      <label className="text-sm text-gray-600" {...labelProps}>
        {labelProps.children}
      </label>
      <Input {...inputProps} />
    </div>
  );
}
export default InputWithLabel;
