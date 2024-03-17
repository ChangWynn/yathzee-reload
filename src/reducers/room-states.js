const getInitialRoomState = (name, soundFx) => {
  return { name, isLocked: false, lockedScore: 0, soundFx };
};

export const initialRoomStates = {
  ones: getInitialRoomState("ones", 0),
  twos: getInitialRoomState("twos", 0),
  threes: getInitialRoomState("threes", 0),
  fours: getInitialRoomState("fours", 0),
  fives: getInitialRoomState("fives", 0),
  sixes: getInitialRoomState("sixes", 0),
  bonus: getInitialRoomState("bonus", 3),
  threeOfAKind: getInitialRoomState("threeOfAKind", 1),
  fourOfAKind: getInitialRoomState("fourOfAKind", 1),
  fullHouse: getInitialRoomState("fullHouse", 1),
  smallStraight: getInitialRoomState("smallStraight", 2),
  largeStraight: getInitialRoomState("largeStraight", 2),
  yahtzee: {
    ...getInitialRoomState("yahtzee", 2),
    isLocked: false,
    numberOfExtraYahtzee: 0,
    totalExtraScore: 0,
  },
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
      const newState = {
        ...state,
        yahtzee: {
          ...state.yahtzee,
          ...payload,
          totalExtraScore: payload.numberOfExtraYahtzee * 100,
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
