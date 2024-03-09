import Modal from "../ReactModal";
import useSettings from "../../../context/Settings";
import Toggle from "../../Toggle/Toggle";

const Settings = () => {
  const { modalIsOpen, setModalIsOpen, initFxOn, setInitFxOn } = useSettings();

  return (
    <Modal
      isOpen={modalIsOpen}
      onClose={() => {
        setModalIsOpen(false);
      }}
      contentAriaLabel={"Settings Modal Window"}
    >
      <Toggle width={4} isChecked={initFxOn} onToggle={() => setInitFxOn(!initFxOn)} />
    </Modal>
  );
};

export default Settings;
