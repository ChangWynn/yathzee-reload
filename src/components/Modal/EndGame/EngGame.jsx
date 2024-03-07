import useRoomsState from "../../../context/RoomsState.jsx";

import { app, db } from "../../../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInAnonymously, signOut } from "firebase/auth";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from "./EndGame.module.css";
import Modal from "../ReactModal.jsx";

const EngGame = () => {
  const navigate = useNavigate();
  const { totalScore, isEndGame } = useRoomsState();
  const [userName, setUserName] = useState("");

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
        name: userName,
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
    <Modal isOpen={isEndGame} onClose={refreshPage} contentAriaLabel={"End Game Modal Window"}>
      <strong className={style["total-score"]}>{totalScore}</strong>
      <form onSubmit={(e) => saveAndLeaderboard(e)}>
        <label htmlFor="">Name</label>
        <input type="text" maxLength={10} onChange={(e) => setUserName(e.target.value)} />
        <button type="button" onClick={() => navigate("/")}>
          Back to home page
        </button>
        <button type="button" onClick={refreshPage}>
          Replay without saving
        </button>
        <button type="button" onClick={saveAndReplay} disabled={!anonymousUserCredentials}>
          Save and replay
        </button>
        <button type="submit" disabled={!anonymousUserCredentials}>
          Save and see leaderboard
        </button>
      </form>
    </Modal>
  );
};

export default EngGame;
