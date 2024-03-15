import PageContainer from "../PageContainer";
import style from "./Leaderboard.module.css";

import Navbar from "../../components/Navbar/Navbar";
import { BackButton, PlayButton } from "../../components/Navbar/Buttons";
import useRealTimeQuery from "../../hooks/use-real-time-query";

const Leaderboard = () => {
  const { data } = useRealTimeQuery("leaderboard");

  const renderLeaderbordTable = () => {
    return data
      .sort((a, b) => b.score - a.score)
      .map(({ id, name, score }) => {
        return <LeaderboardRow key={id} name={name} score={score} />;
      });
  };

  return (
    <PageContainer id="leaderboard">
      <Navbar>
        <BackButton />
        <PlayButton />
      </Navbar>
      <div className={style["leaderboard__container"]}>
        <div className={style["leaderboard__inner-container"]}>
          <table className={style["leaderboard__table"]}>
            <thead className={style["leaderboard__table-header"]}>
              <tr className={style["leaderboard__table-row"]}>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody className={style["leaderboard__table-body"]}>
              {data ? (
                renderLeaderbordTable()
              ) : (
                <tr>
                  <td>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
};

export default Leaderboard;

const LeaderboardRow = ({ id, name, score }) => {
  return (
    <tr key={id} className={style["leaderboard__table-row"]}>
      <td>{name}</td>
      <td>{score}</td>
    </tr>
  );
};
