import { getStyles } from "../../utils/functions/get-styles";
import style from "./ModalButton.module.css";

const ModalButton = ({ onClickFn, type = "button", isDisabled = false, text, main = false }) => {
  return (
    <button
      type={type}
      onClick={onClickFn}
      disabled={isDisabled}
      className={getStyles([style["modal-button"], style[main && "main"]])}
    >
      {text}
    </button>
  );
};

export default ModalButton;
