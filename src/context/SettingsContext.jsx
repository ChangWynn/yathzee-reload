// import { createContext, useContext, useEffect, useState } from "react";

// const SettingsCtx = createContext(null);

// export const GameContextProvider = ({ children }) => {
//   const [gameOn, setGameOn] = useState(false);
//   const [dashboardLightsOn, setDashboardLightsOn] = useState(false);
//   const [titleLightsOn, setTitleLightsOn] = useState(false);

//   useEffect(() => {
//     setGameOn(true);
//     return () => stopEffect(setGameOn);
//   }, []);

//   useEffect(() => {
//     startEffect(gameOn, setDashboardLightsOn);
//     return () => stopEffect(setDashboardLightsOn);
//   }, [gameOn]);

//   useEffect(() => {
//     startEffect(dashboardLightsOn, setTitleLightsOn);
//     return () => stopEffect(setTitleLightsOn);
//   }, [dashboardLightsOn]);

//   return (
//     <GameContext.Provider value={{ dashboardLightsOn, titleLightsOn }}>
//       {children}
//     </GameContext.Provider>
//   );
// };

// const useGameFX = () => {
//   return useContext(SettingsCtx);
// };

// export default useGameFX;

// function startEffect(condition, startUpFunction) {
//   if (condition) {
//     setTimeout(() => {
//       startUpFunction(true);
//     }, 1200);
//   }
// }
// function stopEffect(cleanUpFunction) {
//   return cleanUpFunction(false);
// }
