import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import TimeIntervalModal from "./TimeIntervalModal";

const SetTimeInterval = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <button
        type="button"
        className="text-white"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <FaRegCalendarAlt />
      </button>

      {isOpen && <TimeIntervalModal onCloseModal={closeModal} />}
    </>
  );
};

export default SetTimeInterval;
