import { ReactNode, forwardRef } from "react";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";
type ModalProps = {
  children: ReactNode;
};

const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { children },
  ref,
) {
  const rootModal = document.getElementById("root-modal");

  if (!rootModal) return;

  return createPortal(
    <dialog
      className="min-w-[500px] animate-slideUpFadeIn rounded-md  p-4 shadow-md backdrop:bg-[rgba(0,0,0,0.75)] dark:bg-slate-500 "
      ref={ref}
    >
      <form method="dialog" className="mb-4 flex justify-end dark:bg-slate-500">
        <button className="rounded-full border-0 bg-gray-500 hover:bg-gray-600">
          <IoIosClose className="text-3xl text-white" />
        </button>
      </form>
      <main>{children}</main>
    </dialog>,
    rootModal,
  );
});

export default Modal;
