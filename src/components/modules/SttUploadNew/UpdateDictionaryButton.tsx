import UpdateDictionaryModal from "./UpdateDictionaryModal";
import useDictionaryContext from "./useDictionaryContext";

const UpdateDictionaryButton = ({
  filteredData,
  videoId,
  source,
}: {
  filteredData: Array<{
    srName: string | null;
    updatedText: string | null;
  }>;
  videoId?: number;
  source: string;
}) => {
  const { isUpdateDictionaryModalOpen, setIsUpdateDictionaryModalOpen } =
    useDictionaryContext();
  return (
    <div>
      <button
        className=" rounded-lg bg-lavender-600 px-2 py-0.5 text-white"
        onClick={() => {
          setIsUpdateDictionaryModalOpen(true);
        }}
      >
        Update Dictionary
      </button>
      {isUpdateDictionaryModalOpen && (
        <UpdateDictionaryModal
          filteredData={filteredData}
          videoId={videoId}
          source={source}
        />
      )}
    </div>
  );
};

export default UpdateDictionaryButton;
