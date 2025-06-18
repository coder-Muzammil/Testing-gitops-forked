import { useState } from "react";
import { DictionaryContext } from "./useDictionaryContext";

function DictionaryContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isUpdateDictionaryModalOpen, setIsUpdateDictionaryModalOpen] =
    useState(false);
  const [isViewDictionaryModalOpen, setIsViewDictionaryModalOpen] =
    useState(false);

  return (
    <DictionaryContext.Provider
      value={{
        isUpdateDictionaryModalOpen,
        setIsUpdateDictionaryModalOpen,
        isViewDictionaryModalOpen,
        setIsViewDictionaryModalOpen,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
}
export default DictionaryContextComponent;
