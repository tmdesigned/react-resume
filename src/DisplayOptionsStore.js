export const defaultDisplayOptionsState = {
  timeline: false,
  showDetails: false,
  dark: false
};

export const displayOptionsReducer = (state, action) => {
  switch (action.type) {
    case "toggleTimeline":
      return { ...state, timeline: !state.timeline };
    case "toggleShowDetails":
      return { ...state, showDetails: !state.showDetails };
    case "toggleDark":
      return { ...state, dark: !state.dark };
    default:
      throw new Error();
  }
};
