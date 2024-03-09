import ReactModal from "react-modal";

// import modalStyle from "./ReactModal.style.js";

const Modal = ({ isOpen, onClose, height, contentAriaLabel, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        overlay: { backgroundColor: "#000000ed" },
        content: {
          backgroundColor: "#111",
          border: "#e885e9 1px solid",
          color: "white",
          maxWidth: "500px",
          height,
          margin: "auto",
          padding: "5px 10px",
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
