import { createContext, useContext, useState } from "react";
import SettingsModal from "../components/Modal/Settings/Settings";

const SettingsCtx = createContext(null);

export const Settings = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [initFxOn, setInitFxOn] = useState(false);
  const [soundFxOn, setSoundFxOn] = useState(false);

  return (
    <SettingsCtx.Provider value={{ modalIsOpen, setModalIsOpen, initFxOn, setInitFxOn, soundFxOn }}>
      {children}
      <SettingsModal />
    </SettingsCtx.Provider>
  );
};

export default function useSettings() {
  return useContext(SettingsCtx);
}
