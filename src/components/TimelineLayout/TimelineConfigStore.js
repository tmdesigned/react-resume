export const defaultTimelineConfig = {
  durationHeightFactor: 200000000, // ms to pixels
  topAndBottomOffset: 50,
  overlapPadding: 10,
  x: -100,
  y: 0,
  width: 600,
  height: 500,
  duration: 0,
  start: new Date(),
  end: new Date()
};

export const timelineConfigReducer = (state, action) => {
  if (state.hasOwnProperty(action.type)) {
    return {
      ...state,
      [action.type]: action.value
    };
  }
};
