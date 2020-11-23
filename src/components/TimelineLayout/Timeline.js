import React, { useContext } from "react";
import { useTimelineStyles } from "./TimelineStyles";
import { TimelineConfigContext, DisplayOptionsContext } from "../../Contexts";
import TimelineAxis from "./TimelineAxis";
import TimelineItems from "./TimelineItems";

const Timeline = () => {
  const displayOptions = useContext(DisplayOptionsContext);
  const classes = useTimelineStyles(displayOptions);
  const timelineConfig = useContext(TimelineConfigContext);

  return (
    <div
      className={classes.svgContainer}
      style={{ height: timelineConfig.height }}
    >
      <svg
        className={classes.svg}
        viewBox={`-100 0 500 ${timelineConfig.height} `}
        preserveAspectRatio="xMidYMin meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <TimelineAxis />
          <TimelineItems />
        </g>
      </svg>
    </div>
  );
};

export default Timeline;
