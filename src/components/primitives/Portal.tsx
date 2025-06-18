import { createPortal } from "react-dom";

function Portal({ children }: { children: React.ReactNode }) {
  const portalRoot = document.getElementById("root-modal");

  if (!portalRoot) {
    return <div className="border-2 bg-white">error in portal</div>;
  }

  return createPortal(<div>{children}</div>, portalRoot);
}
export default Portal;
