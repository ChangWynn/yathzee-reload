import style from "./Toggle.module.css";

const Toggle = ({ width, isChecked, onToggle }) => {
  const toggleSize = {
    width: `${width}rem`,
    height: `${width / 2}rem`,
  };

  return (
    <div className={style["toggle"]}>
      <p>Off</p>
      <div className={style["toggle-container"]} style={toggleSize}>
        <input type="checkbox" name={""} id={"toggle"} onChange={onToggle} checked={isChecked} />
        <label htmlFor="toggle" style={toggleSize}>
          Toggle
        </label>
        <div className={style["toggle-background"]} style={toggleSize}></div>
        <div
          className={style["toggle-handle"]}
          style={{ height: toggleSize.height, width: toggleSize.height }}
        ></div>
      </div>
      <p>On</p>
    </div>
  );
};

export default Toggle;
