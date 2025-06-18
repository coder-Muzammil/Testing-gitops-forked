import { useEffect, useRef, useState } from "react";
import useGetAllTrainedPersons from "../api/useGetAllTrainedPersons";
import ImageContainer from "../components/modules/trainedPersons/ImageContainer";
import NamesList from "../components/modules/trainedPersons/NamesList";
import { SingleTrainedPersonType } from "../api/responseTypes/getAllTrainedPersons.types";
import Button from "../components/primitives/Button";
import Modal from "../components/uiComponents/Modal";
import AddPerson from "../components/modules/trainedPersons/AddPerson";
import OutletMainContainer from "../components/modules/Auth/OutletMainContainer";

export type SelectedPersonType = Array<{
  id: number;
  image: string;
}>;
export default function TrainedPersons() {
  const [selectedPerson, setSelectedPerson] = useState<SingleTrainedPersonType>(
    { id: 0, personName: "", thumbnail: "", images: [] },
  );
  const { data, isLoading, isError } = useGetAllTrainedPersons();
  const modalRef = useRef<HTMLDialogElement>(null);
  function closeAddModal() {
    modalRef.current?.close();
  }

  function handleAddPerson() {
    modalRef.current?.showModal();
  }

  function handleSelectedPerson(data: SingleTrainedPersonType) {
    setSelectedPerson(data);
  }
  useEffect(() => {
    if (!data) return;
    const idIsZero = selectedPerson.id === 0;
    if (data.length > 0 && idIsZero) {
      setSelectedPerson(data[0]);
    } else if (data.length > 0) {
      setSelectedPerson((prevState) => {
        const prevId = prevState.id;
        const prevData = data.find((item) => item.id === prevId);
        if (prevData) {
          return { ...prevData };
        }
        return { ...data[0] };
      });
    }
  }, [data, selectedPerson.id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }

  if (data) {
    return (
      <OutletMainContainer>
        <main className="px-[2%]">
          <Modal ref={modalRef}>
            <AddPerson onClose={closeAddModal} key="addPerson" />
          </Modal>

          <div className="flex items-center justify-between">
            <h1 className="my-4 text-2xl font-bold ">Trained Persons</h1>
            <div className="flex gap-4">
              <Button onClick={handleAddPerson}>Add Person</Button>
            </div>
          </div>

          <div className="flex gap-8">
            <NamesList
              data={data}
              onSelectPerson={handleSelectedPerson}
              selectedPerson={selectedPerson}
            />
            <ImageContainer
              images={selectedPerson.images}
              personId={selectedPerson.id}
              key={`${String(selectedPerson.id)}-${String(Date.now())}`}
            />
          </div>
        </main>
      </OutletMainContainer>
    );
  }
}
