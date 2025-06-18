import Datepicker from "react-tailwindcss-datepicker";
import SelectConfigurationChannels from "./SelectConfigurationChannels";
import { ConfiguratorFromDataType } from "./AddConfiguratorModal";

const ConfiguratorForm = ({
  label,
  formData,
  isPending,
  setFormData,
  onSubmitForm,
}: {
  formData: ConfiguratorFromDataType;
  isPending: boolean;
  label: string;
  setFormData: React.Dispatch<React.SetStateAction<ConfiguratorFromDataType>>;
  onSubmitForm: () => void;
}) => {
  const beforeCurrentDates = new Date();

  beforeCurrentDates.setDate(beforeCurrentDates.getDate() - 1);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitForm();
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col space-y-1">
        <label htmlFor="date" className="text-sm font-medium text-black">
          Select Channels
        </label>
        <SelectConfigurationChannels />
      </div>

      <div className="flex flex-col space-y-1">
        <label htmlFor="date" className="text-sm font-medium text-black">
          Select Date
        </label>
        <Datepicker
          disabledDates={[
            {
              startDate: new Date("0001-01-01"),
              endDate: beforeCurrentDates,
            },
          ]}
          value={formData.date}
          onChange={(newValue) => {
            setFormData({
              ...formData,
              date: newValue,
            });
          }}
          inputClassName="w-full rounded-md px-2 py-1 text-sm shadow-[0_2px_10px_rgb(0,0,0,0.2)] focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <TimeSelectionFieldWithLabel
          label="Start Time"
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={(e) => {
            setFormData({
              ...formData,
              startTime: e.target.value,
            });
          }}
          required
        />

        <TimeSelectionFieldWithLabel
          label="End Time"
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={(e) => {
            setFormData({
              ...formData,
              endTime: e.target.value,
            });
          }}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-lavender-600 px-2 py-1 text-center text-sm font-medium text-white hover:bg-lavender-500"
      >
        {label}
      </button>
    </form>
  );
};

export default ConfiguratorForm;

type InputFieldWithLabelPropsTypeExceptClassName = { label: string } & Omit<
  React.PropsWithoutRef<JSX.IntrinsicElements["input"]>,
  "className"
>;

function TimeSelectionFieldWithLabel({
  label,
  ...props
}: InputFieldWithLabelPropsTypeExceptClassName) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor="date" className="text-sm font-medium text-black">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-md px-2 py-1 text-sm shadow-[0_2px_10px_rgb(0,0,0,0.2)] focus:outline-none focus:ring-1 focus:ring-gray-300"
      />
    </div>
  );
}
