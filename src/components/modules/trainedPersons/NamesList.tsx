import { twMerge } from "tailwind-merge";
import {
  GetAllTrainedPersonsResponseType,
  SingleTrainedPersonType,
} from "../../../api/responseTypes/getAllTrainedPersons.types";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FormEvent, useRef, useState } from "react";
import Modal from "../../uiComponents/Modal";
import Input from "../../primitives/Input";
import Button from "../../primitives/Button";
import useAddPerson from "../../../api/useAddPersons";

type NamesProps = {
  data: GetAllTrainedPersonsResponseType;
  onSelectPerson: (data: SingleTrainedPersonType) => void;
  selectedPerson: SingleTrainedPersonType;
};
function NamesList({ data, onSelectPerson, selectedPerson }: NamesProps) {
  const [selectedName, setSelectedName] = useState("");
  const [selectedId, setSelectedId] = useState<null | number>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { mutate, isPending, isError, error } = useAddPerson({
    onClose: closeModal,
  });

  const modalRef = useRef<HTMLDialogElement>(null);
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  function closeModal() {
    deleteModalRef.current?.close();
    modalRef.current?.close();
  }
  function clearStates() {
    setSelectedId(null);
    setSelectedName("");
  }
  function handleUpdateName(name: string, id: number) {
    setSelectedName(name);
    setSelectedId(id);
    modalRef.current?.showModal();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("personName", selectedName);
    formData.append("personId", String(selectedId));
    mutate({ formData, method: "PATCH" });

    clearStates();
  }

  function handleDelete(personId: number) {
    setSelectedId(personId);
    deleteModalRef.current?.showModal();
  }
  function handleDeleteSubmit() {
    const formData = new FormData();
    formData.append("personId", String(selectedId));
    mutate({ formData, method: "DELETE" });
    deleteModalRef.current?.close();
    clearStates();
  }
  const filteredData = data.filter((person) =>
    person.personName.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <>
      <Modal ref={modalRef}>
        <form onSubmit={handleSubmit}>
          <Input
            value={selectedName}
            onChange={(e) => {
              setSelectedName(e.target.value);
            }}
            required
          />

          <div className="mt-4 flex justify-end">
            {isPending && <p>Adding...</p>}
            {!isPending && <Button>Update</Button>}
          </div>
          {isError && <p className="text-center">{error.message}</p>}
        </form>
      </Modal>
      <Modal ref={deleteModalRef}>
        <h1 className="my-8 text-2xl">
          Are you sure, you want to delete this person?
        </h1>

        <div className="mt-4 flex justify-end">
          {isPending && <p>Deleting...</p>}
          {!isPending && <Button onClick={handleDeleteSubmit}>Delete</Button>}
        </div>
        {isError && <p className="text-center">{error.message}</p>}
      </Modal>
      <div className="h-[88vh] w-full max-w-xs overflow-y-auto rounded-lg bg-white shadow-md dark:bg-gray-800">
        <div className="p-2">
          <Input
            placeholder="Search Person"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
        <ul>
          {filteredData.length === 0 && (
            <p className="text-center">There is no data available</p>
          )}
          {filteredData.map((item) => {
            const isSelected = item.id === selectedPerson.id;

            return (
              <li
                className={twMerge(
                  "flex  items-center p-3 ",
                  isSelected && "bg-gray-200 dark:bg-gray-700",
                )}
                key={item.id}
              >
                <div className="flex w-full items-center justify-between">
                  <div
                    className="grow cursor-pointer select-none hover:bg-gray-300 hover:dark:bg-gray-600"
                    onClick={() => {
                      onSelectPerson(item);
                    }}
                  >
                    {item.personName}
                  </div>

                  <div className="flex gap-2">
                    <MdEdit
                      className="cursor-pointer"
                      onClick={() => {
                        handleUpdateName(item.personName, item.id);
                      }}
                    />
                    <MdDelete
                      className="cursor-pointer "
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default NamesList;
