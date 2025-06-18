const TranslitratorToggleButton = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={isOpen}
          onChange={() => {
            setIsOpen(!isOpen);
          }}
          className="peer sr-only"
        />
        <div className="peer relative h-5 w-9 rounded-full border border-lavender-900 bg-gray-200 after:absolute after:start-[2px] after:top-[1px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-lavender-600 peer-checked:after:translate-x-4 dark:bg-gray-700 rtl:peer-checked:after:-translate-x-4"></div>
      </label>
    </>
  );
};

export default TranslitratorToggleButton;
