import { NavLink } from "react-router-dom";
import style from "./Menu.module.css";
import useGameFX from "../../context/GameFX";
import { getStyles } from "../../utils/functions/get-styles";

const Menu = () => {
  return (
    <div className={style["game-header"]}>
      {/* <div className={getStyles([style["game-title"], style[titleOn && "on"]])}>
        <h1>YAHTZEE</h1>
      </div> */}
      <nav className={getStyles([style["menu"]])}>
        <Option href={"/"} OptionName={"Home"} />
        <Option href={"/game"} OptionName={"Arcade"} />
        <Option href={"/leaderboard"} OptionName={"Leaderboard"} />
        {/* <Option href={"/multiplayer"} OptionName={"(BETA) Multiplayer"} /> */}
      </nav>
    </div>
  );
};

export default Menu;

const Option = ({ href, OptionName }) => {
  const { navbarOn } = useGameFX();
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        getStyles([
          style["menu-option"],
          style[navbarOn && "enabled"],
          style[isActive && "current"],
        ])
      }
    >
      {OptionName}
    </NavLink>
  );
};
