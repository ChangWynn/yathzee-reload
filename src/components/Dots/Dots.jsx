import useDiceState from "../../context/DiceState";
import { getStyles } from "../../utils/functions/get-styles";
import style from "./Dots.module.css";

const Dots = () => {
  return (
    <div className={style["dots-container"]}>
      {[1, 2, 3].map((dotNumber) => (
        <Dot key={dotNumber} dotNumber={dotNumber} />
      ))}
    </div>
  );
};

export default Dots;

const Dot = ({ dotNumber }) => {
  const { rollCount } = useDiceState();
  return (
    <div
      id={`dot-${dotNumber}`}
      className={getStyles([style["dot"], style[dotNumber <= rollCount && "on"]])}
    />
  );
};
