import { getStyles } from "../../utils/functions/get-styles";

import style from "./Home.module.css";

const Home = () => {
  return (
    <div className={style["home"]}>
      <div className={style["home-background"]}>
        <video
          src={require("../../assets/background/videoBackground.mp4")}
          autoPlay
          loop
          muted
        ></video>
      </div>
      <div className={style["home-title"]}>
        <TitleLetter letter="Y" cssEffect="flickering" />
        <TitleLetter letter="A" />
        <TitleLetter letter="H" />
        <TitleLetter letter="T" />
        <TitleLetter letter="Z" cssEffect="hanging" />
        <TitleLetter letter="E" />
        <TitleLetter letter="E" />
      </div>
      <ul className={style["home-menu"]}>
        <li>
          <a href="/game">Play</a>
        </li>
        <li>
          <a href="/leaderboard">Leaderboard</a>
        </li>
      </ul>
    </div>
  );
};

export default Home;

const TitleLetter = ({ letter, cssEffect }) => {
  return (
    <div
      className={getStyles([style["home-title__letter-container"], cssEffect && style[cssEffect]])}
    >
      <img
        src={require(`../../assets/yahtzee-letters/${letter}.png`)}
        alt={`Title letter ${letter}`}
      />
    </div>
  );
};
