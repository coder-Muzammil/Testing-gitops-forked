import { useState } from "react";
import ButtonGradientPrimary from "../../primitives/ButtonGradientPrimary";
import AddConfiguratorModal from "./AddConfiguratorModal";

const CreateConfigurationButton = () => {
  const [isOpenConfigModal, setIsOpenConfigModal] = useState(false);
  return (
    <>
      <ButtonGradientPrimary
        onClick={() => {
          setIsOpenConfigModal(true);
        }}
      >
        Create Configurator
      </ButtonGradientPrimary>

      {isOpenConfigModal && (
        <AddConfiguratorModal
          closeModal={() => {
            setIsOpenConfigModal(false);
          }}
        />
      )}
    </>
  );
};

export default CreateConfigurationButton;
