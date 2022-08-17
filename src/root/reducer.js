const initialState = {
  backgroundColor: "red",
  user: {},
  mode: "start",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_BACKGROUND_COLOR":
      return {
        ...state,
        backgroundColor: action.payload,
      };
    case "user":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
