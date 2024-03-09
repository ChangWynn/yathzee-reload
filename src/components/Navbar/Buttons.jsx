import NavbarButton from "./NavbarButton";
import useRedirect from "../../hooks/use-redirect";
import useSettings from "../../context/Settings";

export const BackButton = () => {
  const backHome = useRedirect("/");

  return <NavbarButton buttonLabel="Back" onButtonClick={backHome} />;
};

export const SettingsButton = () => {
  const { setModalIsOpen } = useSettings();

  return (
    <NavbarButton
      buttonLabel="Settings"
      onButtonClick={() => {
        setModalIsOpen(true);
      }}
    />
  );
};

export const LeaderboardButton = () => {
  const redirectLeaderboard = useRedirect("/leaderboard");

  return <NavbarButton buttonLabel="Leaderboard" onButtonClick={redirectLeaderboard} />;
};

export const PlayButton = () => {
  const redirectGame = useRedirect("/game");
  return <NavbarButton buttonLabel="Play" onButtonClick={redirectGame} />;
};

export const RestartButton = () => {
  return <NavbarButton buttonLabel="Restart" onButtonClick={() => {}} />;
};
