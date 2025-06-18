import { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import toast from "react-hot-toast";
import useDeleteDictionaryText from "../../../api/useDeleteDictionaryText";
import useUpdateDictionary from "../../../api/useAddDictionary";
import { useParams } from "react-router-dom";

const SingleViewDictionaryText = ({
  originalWord,
  correctedWord,
  source,
}: {
  originalWord: string;
  correctedWord: string;
  source: string;
}) => {
  const { id } = useParams<{ id: string }>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [updatedText, setUpdatedText] = useState(correctedWord);
  const [isChanged, setIsChanged] = useState(false);
  const [textEntries, setTextEntries] = useState<
    Array<{
      originalText: string;
      editedText: string;
    }>
  >([]);
  const { mutate: deleteSingleWord } = useDeleteDictionaryText();
  const { mutate: updateDictionary } = useUpdateDictionary();

  // Handle the update logic
  const handleUpdateDictionaryWord = () => {
    if (!updatedText.trim()) {
      toast.error("Corrected word cannot be empty.");
      return;
    }

    const newEntry = {
      originalText: originalWord,
      editedText: updatedText,
    };

    setTextEntries((prevEntries) => [...prevEntries, newEntry]);

    updateDictionary(
      { textEntries: [...textEntries, newEntry], videoId: Number(id), source },
      {
        onSuccess: () => {
          toast.success("Word updated successfully!");
          setIsEditable(false);
          setIsChanged(false);
        },
        onError: () => {
          toast.error("Failed to update the word.");
        },
      },
    );
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [updatedText]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight.toString()}px`;
    }
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleUpdatedTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    setUpdatedText(newValue);
    setIsChanged(newValue !== correctedWord);
  };

  const handleDeleteSingleWord = (key: string) => {
    deleteSingleWord(key, {
      onSuccess: () => {
        toast.success("Word deleted successfully.");
      },
      onError: () => {
        toast.error("Failed to delete the word.");
      },
    });
  };

  return (
    <div className="mb-2 flex items-center gap-2">
      <div className="w-full rounded-lg bg-white p-2">
        <p>{originalWord}</p>
      </div>

      <textarea
        ref={textareaRef}
        placeholder="Corrected Word"
        className={`w-full resize-none rounded-lg p-2 ${
          isEditable ? "bg-white" : "cursor-not-allowed bg-gray-200"
        }`}
        value={updatedText}
        onChange={handleUpdatedTextChange}
        readOnly={!isEditable}
        rows={1}
        style={{ minHeight: "40px", maxHeight: "200px" }}
      />

      <button
        onClick={handleEditClick}
        className="flex items-center justify-center rounded-full p-0.5 text-xl"
      >
        <FaRegEdit />
      </button>

      <button
        className="flex items-center justify-center rounded-full p-0.5 text-xl"
        onClick={() => {
          handleDeleteSingleWord(originalWord);
        }}
      >
        <MdDeleteOutline />
      </button>

      {isChanged && (
        <button
          onClick={handleUpdateDictionaryWord}
          className="flex items-center justify-center rounded-full bg-green-500 p-1 text-xl text-white"
        >
          <AiOutlineSave />
        </button>
      )}
    </div>
  );
};

export default SingleViewDictionaryText;
