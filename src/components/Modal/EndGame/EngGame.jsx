import useRoomsState from "../../../context/RoomsState.jsx";

import { db } from "../../../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

import { useMutation } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../ReactModal.jsx";
import TotalScore from "../../TotalScore/TotalScore.jsx";
import ModalButton from "../ModalButton.jsx";
import { getStyles } from "../../../utils/functions/get-styles.js";

import style from "./EndGame.module.css";

const EngGame = () => {
  const navigate = useNavigate();

  const { totalScore, isEndGame } = useRoomsState();

  const [anonymousUserCredentials, setAnonymousUserCredentials] = useState(null);
  const [username, setUsername] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [error, setError] = useState(null);

  const { mutate: saveScore, isPending } = useMutation({
    mutationFn: async ({ name, score }) => {
      await addDoc(collection(db, "leaderboard"), { name, score });
    },
    onSuccess: () => navigate("/leaderboard"),
    onError: (error) => setError("Oops something went wrong. Please try again later."),
  });

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

  useEffect(() => {
    const isAlphaNumeric = /^[a-zA-Z0-9]+$/.test(username);
    if (username.length > 0 && !isAlphaNumeric) {
      setIsInvalid(true);
      setError("Special characters are not permitted");
    } else {
      setIsInvalid(false);
      setError(null);
    }
  }, [username]);

  const refreshPage = () => {
    window.location.reload();
  };

  const handleInputChange = (e) => {
    if (username >= 15) return;
    else setUsername(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (isInvalid) return;

    saveScore({
      name: username,
      score: +totalScore,
      uid: anonymousUserCredentials.user.uid,
    });
  };

  return (
    <Modal
      isOpen={isEndGame}
      onClose={refreshPage}
      height={"325px"}
      contentAriaLabel={"End Game Modal Window"}
    >
      <form onSubmit={(e) => submit(e)} className={style["end-game-modal"]}>
        <div className={style["end-game-modal--header-container"]}>
          <h1 className={style["header"]}>Save Score ?</h1>
          <TotalScore />
        </div>
        <div className={style["end-game-modal--form-container"]}>
          <div className={style["end-game-modal--input-container"]}>
            <p className={style["input-helper"]}>Max 15 characters. Must be alpha-numeric.</p>
            <input
              required
              type="text"
              id="player-name"
              name="player-name"
              placeholder="Choose a username"
              minLength={1}
              maxLength={15}
              spellCheck={false}
              onChange={handleInputChange}
            />
            <em className={getStyles([style["error"], style[!error && "hidden"]])}>{error}</em>
          </div>
          <div className={style["end-game-modal--button-container"]}>
            <ModalButton text="Back" onClickFn={() => navigate("/")} />
            <ModalButton
              text={isPending ? "Saving..." : "Save"}
              type="submit"
              isDisabled={!anonymousUserCredentials || isInvalid || error || !username}
              main
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EngGame;
