import { useState, ChangeEvent, useRef } from "react";
import { frServiceUrl } from "../../../api/apiConstants";
import { FaPlusCircle } from "react-icons/fa";
import Button from "../../primitives/Button";
import useAddPerson from "../../../api/useAddPersons";
import { CgProfile } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import Modal from "../../uiComponents/Modal";
type Image = {
  id: number;
  image?: string; // Make image optional
  file?: File; // Add file property
};

type ImageContainerProps = {
  images?: Array<Image>;
  personId: number;
};

function ImageContainer({ images = [], personId }: ImageContainerProps) {
  const [imageList, setImageList] = useState<Array<Image>>(images);
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const [selectedId, setSelectedId] = useState<null | number>(null);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const { mutate, isPending, isError, error } = useAddPerson({
    onClose: closeModal,
  });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file, index) => ({
        id: imageList.length + index + 1, // generate a new id
        file: file, // save the file object
      }));
      setImageList((prevList) => [...prevList, ...newImages]);
      setIsSaveEnabled(true);
    }
  };
  function closeModal() {
    deleteModalRef.current?.close();
  }

  const triggerFileInput = () => {
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    fileInput.click();
  };

  function handleSave() {
    const formData = new FormData();
    formData.append("personId", String(personId));

    imageList.forEach((image) => {
      // Append the file object directly to FormData
      if (image.file) {
        formData.append(`personImages`, image.file);
      }
    });
    mutate({ formData, method: "PATCH" });
  }
  function handleDeleteImage() {
    const formData = new FormData();
    formData.append("imageId", String(selectedId));
    mutate({ formData, method: "DELETE" });
  }
  function handleDelete(personId: number) {
    setSelectedId(personId);

    if (!deleteModalRef.current) return;

    deleteModalRef.current.showModal();
  }
  function handleUpdateThumbnail(image: string | undefined) {
    const formData = new FormData();
    formData.append("personId", String(personId));
    if (image) formData.append("thumbnail", image);

    mutate({ formData, method: "PATCH" });
  }

  return (
    <>
      <Modal ref={deleteModalRef}>
        <h1 className="my-8 text-2xl">
          Are you sure, you want to delete this Image?
        </h1>

        <div className="mt-4 flex justify-end">
          {isPending && <p>Deleting...</p>}
          {!isPending && <Button onClick={handleDeleteImage}>Delete</Button>}
        </div>
        {isError && <p className="text-center">{error.message}</p>}
      </Modal>
      <section className="h-[88vh] w-full overflow-y-auto">
        {imageList.length === 0 && (
          <p className="text-center text-lg">There are no images available</p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
            gap: "1rem",
          }}
          className="my-8"
        >
          {imageList.map((img) => (
            <div
              key={img.id}
              className="relative overflow-hidden rounded-md border border-gray-300"
            >
              {img.image && (
                <>
                  <CgProfile
                    className="absolute left-0 top-0 m-1 cursor-pointer rounded-full bg-white text-xl"
                    onClick={() => {
                      handleUpdateThumbnail(img.image);
                    }}
                  />
                  <MdDelete
                    className="absolute right-0 top-0 m-1 cursor-pointer rounded-full bg-white text-xl"
                    onClick={() => {
                      handleDelete(img.id);
                    }}
                  />
                </>
              )}

              <img
                src={
                  img.file instanceof File // Check if it's a File object
                    ? URL.createObjectURL(img.file) // If it's a File, create a URL from it
                    : frServiceUrl + (img.image ?? "") // If it's not a File, use the provided URL
                }
                alt={`Image ${String(img.id)}`}
                className="h-full w-full"
              />
            </div>
          ))}
          {imageList.length > 0 && (
            <div className="flex items-center">
              <FaPlusCircle
                className="cursor-pointer text-4xl"
                onClick={triggerFileInput}
              />
              <input
                id="file-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          )}
        </div>
        {isSaveEnabled && (
          <div className="mt-4 flex justify-end">
            <Button onClick={handleSave} disabled={!isSaveEnabled}>
              Update
            </Button>
          </div>
        )}
      </section>
    </>
  );
}

export default ImageContainer;
