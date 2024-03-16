import { getStyles } from "../../utils/functions/get-styles";

import style from "./Home.module.css";

const Home = () => {
  return (
    <div className={style["home"]}>
      <div className={style["home-background"]}>
        <VideoBackground />
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

const VideoBackground = () => {
  return (
    <video autoPlay loop muted>
      <source
        src="assets/background/desktop/video_background-1080p.mp4"
        type="video/mp4"
        media="(min-width: 769px)"
      />
      <source
        src="assets/background/mobile/video_background-720p.mp4"
        type="video/mp4"
        media="(min-width: 481px) and (max-width: 768px)"
      />
      <source
        src="assets/background/mobile/video_background-480p.mp4"
        type="video/mp4"
        media="(max-width: 480px)"
      />
    </video>
  );
};

const TitleLetter = ({ letter, cssEffect }) => {
  return (
    <div
      className={getStyles([style["home-title__letter-container"], cssEffect && style[cssEffect]])}
    >
      <img src={`assets/yahtzee-letters/${letter}.png`} alt={`Title letter ${letter}`} />
    </div>
  );
};
