import ViewDictionaryModal from "./ViewDictionaryModal";
// import useSttUploadContext from "./useSttUploadContext";
import useDictionaryContext from "./useDictionaryContext";
const ViewDictionaryButton = ({ source }: { source: string }) => {
  const { isViewDictionaryModalOpen, setIsViewDictionaryModalOpen } =
    useDictionaryContext();
  return (
    <div className="w-full sm:w-auto">
      <button
        className=" w-full cursor-pointer rounded-lg bg-lavender-600 px-3 py-1 text-center  text-sm text-white"
        onClick={() => {
          setIsViewDictionaryModalOpen(true);
        }}
      >
        <p className="text-center text-sm  text-white sm:text-left ">
          View Dictionary
        </p>
      </button>
      {isViewDictionaryModalOpen && <ViewDictionaryModal source={source} />}
    </div>
  );
};

export default ViewDictionaryButton;
