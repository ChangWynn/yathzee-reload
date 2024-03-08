import style from "./NavbarButton.module.css";

const NavbarButton = ({ buttonLabel, onButtonClick }) => {
  return (
    <button onClick={onButtonClick} className={style["navbar-button"]}>
      {buttonLabel}
    </button>
  );
};

export default NavbarButton;
