import { useEffect, useState } from "react";
import PageContainer from "../PageContainer";
import style from "./Leaderboard.module.css";

import { db } from "../../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Menu from "../../components/Menu/Menu";

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
      querySnapshot.forEach((doc) => {
        const { name, score } = doc.data();
        setLeaderboard((prevState) => {
          return [...prevState, { id: doc.id, name, score }];
        });
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <PageContainer id="leaderboard">
      <div className={style["leaderboard__page-title"]}>
        <Menu />
        <h1>LEADERBOARD</h1>
        {/*
        <ul className={style["navbar-container"]}>
          <li>
            <a onClick={homeRedirect} className={style["navbar-link"]}>
              Home
            </a>
          </li>
          <li>
            <a onClick={playRedirect} className={style["navbar-link"]}>
              Play
            </a>
          </li>
          <li>
            <a className={style["navbar-link"]} href="/multiplayer">
              Multiplayer(BETA)
            </a>
          </li>
        </ul> */}
      </div>
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
      {/* <div className={style["save-popup"]}>
        {props.showSavePopUp && (
          <FirstPopUp
            markAsSaved={markAsSaved}
            endScore={props.endScore}
            saveScore={saveScore}
            savingData={props.savingData}
          />
        )}
      </div> */}
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
