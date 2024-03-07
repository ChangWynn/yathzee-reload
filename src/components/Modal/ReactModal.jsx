import ReactModal from "react-modal";

// import modalStyle from "./ReactModal.style.js";

const Modal = ({ isOpen, onClose, contentAriaLabel, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        overlay: { backgroundColor: "#000000e6" },
        content: {
          backgroundColor: "#111",
          border: "#e885e9 1px solid",
          color: "white",
          maxWidth: "900px",
          maxHeight: "500px",
          margin: "auto",
        },
      }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={onClose}
      preventScroll={true}
      contentLabel={contentAriaLabel}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
