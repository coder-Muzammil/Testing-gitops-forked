import { FaWhatsapp } from "react-icons/fa";

const ShareWithWhatsAppButton = () => {
  return (
    <div>
      <button className="btnClass" title="Share with teams">
        <div className="flex items-center gap-2 text-xs">
          WhatsApp
          <div className="text-sm 2xl:text-base">
            <FaWhatsapp />
          </div>
        </div>
      </button>
    </div>
  );
};

export default ShareWithWhatsAppButton;
