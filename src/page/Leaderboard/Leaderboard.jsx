import { useEffect, useState } from "react";
import PageContainer from "../PageContainer";
import style from "./Leaderboard.module.css";

import { db } from "../../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Navbar from "../../components/Navbar/Navbar";
import { BackButton, PlayButton, SettingsButton } from "../../components/Navbar/Buttons";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const renderLeaderbordTable = () => {
    return leaderboard
      .sort((a, b) => b.score - a.score)
      .map(({ id, name, score }) => {
        return <LeaderboardRow key={id} name={name} score={score} />;
      });
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "leaderboard"), (querySnapshot) => {
      const leaderboardRecords = [];
      querySnapshot.forEach((doc) => {
        leaderboardRecords.push(doc.data());
      });
      setLeaderboard(leaderboardRecords);
    });

    return () => unsubscribe();
  }, []);

  return (
    <PageContainer id="leaderboard">
      <Navbar>
        <BackButton />
        {/* <SettingsButton /> */}
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
            <tbody className={style["leaderboard__table-body"]}>{renderLeaderbordTable()}</tbody>
          </table>
          {/* {players
            .sort((a, b) => (parseInt(a.scores.score) < parseInt(b.scores.score) ? 1 : -1))
            .map((player) => {
              return (
                <article className={style["score-container"]} key={player._id}>
                  <div className={style["score-container-left-side"]}>
                    <div>
                      <img src={player.avatar} alt="" />
                    </div>
                    <h2>{player.username}</h2>
                  </div>
                  <h2>{player.scores.score}</h2>
                </article>
              );
            })} */}
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
