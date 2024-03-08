import { createContext, useContext, useState } from "react";

const SettingsCtx = createContext(null);

export const Settings = ({ children }) => {
  const [initFxOn, setFxSettingOn] = useState(false);
  const [soundFx, setSoundFx] = useState(false);

  return <SettingsCtx.Provider value={{ initFxOn, soundFx }}>{children}</SettingsCtx.Provider>;
};

export default function useSettings() {
  return useContext(SettingsCtx);
}
