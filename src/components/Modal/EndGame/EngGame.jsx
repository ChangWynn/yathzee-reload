import useRoomsState from "../../../context/RoomsState.jsx";

import { db } from "../../../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./EndGame.module.css";
import Modal from "../ReactModal.jsx";
import TotalScore from "../../TotalScore/TotalScore.jsx";
import ModalButton from "../ModalButton.jsx";

const EngGame = () => {
  const navigate = useNavigate();
  const { totalScore, isEndGame } = useRoomsState();
  const [username, setUsername] = useState("");

  const [anonymousUserCredentials, setAnonymousUserCredentials] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then((credentials) => {
        setAnonymousUserCredentials(credentials);
      })
      .catch((error) => {
        setError(error);
      });

    // return () => signOut(auth);
  }, []);

  const saveScore = async () => {
    try {
      await addDoc(collection(db, "leaderboard"), {
        name: username,
        score: +totalScore,
        uid: anonymousUserCredentials.user.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const saveAndReplay = async () => {
    await saveScore();
    refreshPage();
  };

  const saveAndLeaderboard = async (e) => {
    e.preventDefault();
    await saveScore();
    navigate("/leaderboard");
  };

  return (
    <Modal
      isOpen={isEndGame}
      onClose={refreshPage}
      height={"325px"}
      contentAriaLabel={"End Game Modal Window"}
    >
      {/* <strong className={style["total-score"]}>{totalScore}</strong> */}
      <form onSubmit={(e) => saveAndLeaderboard(e)} className={style["end-game-modal"]}>
        <div className={style["end-game-modal--header-container"]}>
          <h1 className={style["header"]}>Save Score ?</h1>
          <TotalScore />
        </div>
        <div className={style["end-game-modal--form-container"]}>
          <div className={style["end-game-modal--input-container"]}>
            <p className={style["input-helper"]}>Make it special!</p>
            <input
              type="text"
              id="player-name"
              name="player-name"
              placeholder="Choose a username"
              maxLength={15}
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* <p className={style["error"]}>error</p> */}
            {/* <p className={getStyles([style["error"], style[!error && "hidden"]])}>{error}</p> */}
          </div>
          <div className={style["end-game-modal--button-container"]}>
            <ModalButton text="Replay" onClickFn={refreshPage} />
            <ModalButton
              text="Save"
              type="submit"
              isDisabled={!anonymousUserCredentials || !username}
              main
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EngGame;
