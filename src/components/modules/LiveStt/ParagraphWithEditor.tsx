import { useState } from "react";
import Portal from "../../primitives/Portal";
function ParagraphWithEditor({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  function handleContextMenu(e: React.MouseEvent<HTMLParagraphElement>) {
    e.preventDefault();
    setIsEditorOpen(true);
  }

  return (
    <>
      <p className={className} dir="auto" onContextMenu={handleContextMenu}>
        {children}
      </p>
      <Portal>
        {isEditorOpen && <div className="fixed inset-0 bg-black/70"></div>}
      </Portal>
    </>
  );
}
export default ParagraphWithEditor;
