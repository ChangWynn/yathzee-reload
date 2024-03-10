const getInitialRoomState = (name, soundFx) => {
  return { name, isLocked: false, lockedScore: 0, soundFx };
};

export const initialRoomStates = {
  ones: getInitialRoomState("ones", 1),
  twos: getInitialRoomState("twos", 1),
  threes: getInitialRoomState("threes", 1),
  fours: getInitialRoomState("fours", 1),
  fives: getInitialRoomState("fives", 1),
  sixes: getInitialRoomState("sixes", 1),
  bonus: getInitialRoomState("bonus", 3),
  threeOfAKind: getInitialRoomState("threeOfAKind", 2),
  fourOfAKind: getInitialRoomState("fourOfAKind", 2),
  fullHouse: getInitialRoomState("fullHouse", 2),
  smallStraight: getInitialRoomState("smallStraight", 3),
  largeStraight: getInitialRoomState("largeStraight", 3),
  yahtzee: getInitialRoomState("yahtzee", 3),
  chance: getInitialRoomState("chance", 1),
};

export const ACTION = {
  LOCK_ROOM: "LOCK_ROOM",
  ADD_YAHTZEE_BONUS: "ADD_YAHTZEE_BONUS",
  RESET_GAME: "RESET_GAME",
};

export const roomStatesReducer = (state, { action, payload }) => {
  switch (action) {
    case ACTION.LOCK_ROOM: {
      const newRoomState = {
        ...state[payload.roomName],
        isLocked: true,
        lockedScore: payload.roomScore,
      };

      state[payload.roomName] = newRoomState;
      return { ...state };
    }
    case ACTION.ADD_YAHTZEE_BONUS: {
      const score = state.yahtzee.isLocked ? 50 : 0;
      const newLockedScore = score + payload.extraScore;

      const newState = {
        ...state,
        yahtzee: {
          ...state.yahtzee,
          lockedScore: newLockedScore,
        },
      };
      return newState;
    }
    case ACTION.RESET_GAME: {
      return { ...initialRoomStates };
    }
    default: {
      return state;
    }
  }
};
