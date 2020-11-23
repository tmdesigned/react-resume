import React, { useReducer } from "react";
import {
  TimelineConfigContext,
  DispatchTimelineConfigContext
} from "../../Contexts";
import {
  timelineConfigReducer,
  defaultTimelineConfig
} from "./TimelineConfigStore";

const WithTimelineProviders = ({
  initialTimelineConfig = defaultTimelineConfig,
  children
}) => {
  const [timelineConfig, dispatchTimelineConfigAction] = useReducer(
    timelineConfigReducer,
    initialTimelineConfig
  );

  timelineConfig.dateToYOffset = (date) => {
    if (timelineConfig.duration < 1) {
      return 0;
    }
    const percentOfDuration =
      (timelineConfig.end - date) / timelineConfig.duration;
    return (
      timelineConfig.topAndBottomOffset +
      percentOfDuration *
        (timelineConfig.height - 2 * timelineConfig.topAndBottomOffset)
    );
  };

  return (
    <TimelineConfigContext.Provider value={timelineConfig}>
      <DispatchTimelineConfigContext.Provider
        value={dispatchTimelineConfigAction}
      >
        {children}
      </DispatchTimelineConfigContext.Provider>
    </TimelineConfigContext.Provider>
  );
};

export default WithTimelineProviders;
