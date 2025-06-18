import { IoMdArrowRoundBack } from "react-icons/io";
import Button from "../../primitives/Button";
import { FormEvent, useState } from "react";
import Input from "../../primitives/Input";
import toast from "react-hot-toast";
import useAddPerson from "../../../api/useAddPersons";
import { useNavigate } from "react-router-dom";
type ClusterDetailHeaderProps = {
  selectedImages: Array<string>;
};

export default function ClusterDetailHeader({
  selectedImages,
}: ClusterDetailHeaderProps) {
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending } = useAddPerson({
    onClose: navigateToTrainedPersons,
  });

  function navigateToTrainedPersons() {
    navigate("/fr/trainedPersons");
  }

  function handleSubmitTrainedPerson(event: FormEvent) {
    event.preventDefault();
    if (selectedImages.length < 5) {
      toast.error("Please select at least 5 images");

      return;
    }
    const formData = new FormData();
    formData.append("personName", newName);
    formData.append("mode", "path");
    selectedImages.forEach((image) => {
      formData.append(`personImages`, image);
    });

    mutate({ formData, method: "POST" });
  }
  return (
    <>
      <form
        className="flex items-center gap-x-4"
        onSubmit={handleSubmitTrainedPerson}
      >
        <IoMdArrowRoundBack
          className="cursor-pointer text-3xl"
          onClick={() => {
            history.back();
          }}
        />

        <div>
          <Input
            placeholder="Enter new name"
            required
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        </div>
        {isPending && <p>Submitting, please wait...</p>}
        {!isPending && <Button>Submit</Button>}
      </form>
    </>
  );
}
