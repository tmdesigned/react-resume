export const defaultDisplayOptionsState = {
  showDetails: false,
  dark: false
};

export const displayOptionsReducer = (state, action) => {
  switch (action.type) {
    case "toggleShowDetails":
      return { ...state, showDetails: !state.showDetails };
    case "toggleDark":
      return { ...state, dark: !state.dark };
    default:
      throw new Error();
  }
};
