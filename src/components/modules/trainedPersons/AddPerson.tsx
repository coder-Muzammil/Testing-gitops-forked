import Input from "../../primitives/Input";
import { MdAddAPhoto } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import { FormEvent, useState, useRef } from "react";
import Button from "../../primitives/Button";
import useAddPerson from "../../../api/useAddPersons";

type SelectedPersonType = {
  onClose: () => void;
};

export default function AddPerson({ onClose }: SelectedPersonType) {
  const [images, setImages] = useState<Array<File>>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [Error, setError] = useState(false);

  const [personName, setPersonName] = useState("");
  const { mutate, isError, error, isPending, isSuccess } = useAddPerson({
    onClose,
  });

  function clearStates() {
    setImages([]);
    setPersonName("");
  }

  const handleRemoveContainer = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (images.length < 5) {
      setError(true);
      return;
    }
    const formData = new FormData();
    formData.append("personName", personName);
    images.forEach((image) => {
      if (image.name) {
        formData.append(`personImages`, image);
      }
    });

    mutate({ formData, method: "POST" });
    if (isSuccess) {
      clearStates();
    }
  }

  function handleImageAdd() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError(false);
    const files = Array.from(event.target.files ?? []);
    setImages((prevImages) => [...prevImages, ...files]);
  }

  return (
    <div className="flex flex-col items-center justify-center dark:bg-slate-500">
      <h1 className="text-xl font-bold ">Add a person</h1>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="my-4 w-[300px]">
          <Input
            type="text"
            placeholder="Enter name"
            required
            value={personName}
            onChange={(e) => {
              setPersonName(e.target.value);
            }}
            className="dark:text-white"
          />
        </div>
        <p className="text-red-500 dark:text-red-300">
          Please provide the five images of the person from different angles.
        </p>
        <MdAddAPhoto
          className="my-4 cursor-pointer text-3xl"
          onClick={handleImageAdd}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))",
            gap: "1rem",
          }}
          className="w-[700px]"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg bg-gray-200"
            >
              <img
                src={URL.createObjectURL(image)}
                alt={`Selected Image ${String(index + 1)}`}
                className="h-full w-full object-cover"
              />
              <div
                className="absolute right-0 top-0 m-2 cursor-pointer"
                onClick={() => {
                  handleRemoveContainer(index);
                }}
              >
                <IoIosRemoveCircle className="text-xl text-red-600" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          {isPending && <p>Submitting...</p>}
          {!isPending && <Button>Save</Button>}
        </div>
        {Error && (
          <p className="text-red-500">Please select at least five images.</p>
        )}
        {isError && (
          <p className="mt-4 w-full border-2 border-red-500 text-center">
            {error.message}
          </p>
        )}
      </form>
    </div>
  );
}
