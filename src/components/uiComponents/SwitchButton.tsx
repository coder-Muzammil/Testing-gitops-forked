

type SwitchButtonProps = {
  isEnabled:boolean;
  setIsEnabled:(value:boolean) => void
}

const SwitchButton = ({isEnabled, setIsEnabled}:SwitchButtonProps) => {

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div
      className="flex h-6 w-40 cursor-pointer items-center justify-between rounded-full bg-fuchsia-700 p-1 text-sm font-semibold text-white 2xl:h-8"
      onClick={toggleSwitch}
    >
      <span
        className={`select-none px-2 ${
          isEnabled ? "rounded-full bg-white text-fuchsia-700" : ""
        }`}
      >
        Enabled
      </span>
      <span
        className={`select-none px-2 ${
          !isEnabled ? "rounded-full bg-white text-fuchsia-700" : ""
        }`}
      >
        Disabled
      </span>
    </div>
  );
};

export default SwitchButton;
