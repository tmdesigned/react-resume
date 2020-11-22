import React, { useContext } from "react";
import { DisplayOptionsContext } from "../../Contexts";

import { useTimelineStyles } from "./TimelineStyles";

const materialColors = [
  "#F44336",
  "#2196F3",
  "#4CAF50",
  "#FFC107",
  "#FF9800",
  "#9C27B0"
];

const TimelineRange = ({ timelineItem, idx, dateToYOffset }) => {
  const displayOptions = useContext(DisplayOptionsContext);
  const classes = useTimelineStyles(displayOptions);

  const color = materialColors[idx % materialColors.length];
  const offset = timelineItem.timelineOverlap
    ? timelineItem.timelineOverlap + 1
    : 1;
  const y1 = dateToYOffset(timelineItem.timelineStart);
  const y2 = dateToYOffset(timelineItem.timelineEnd);
  const adjustedY2 = y1 === y2 ? y1 + 5 : y2;
  const midY = (y1 + y2) / 2;
  return (
    <g key={timelineItem.key} className={classes.timelineRange}>
      <line // timeline item span
        className={classes.timelineItem}
        stroke={color}
        x1={40 * offset}
        y1={y1}
        x2={40 * offset}
        y2={adjustedY2}
      />
      <text
        className={classes.timelineTitle}
        x={70 + 40 * offset}
        y={midY - 10}
        fill={color}
        fontSize={16}
      >
        {timelineItem.timelineTitle}
      </text>
      <text
        className={classes.timelineSubtitle}
        x={70 + 40 * offset}
        y={midY + 10}
        fontSize={12}
      >
        {timelineItem.timelineSubtitle}
      </text>
    </g>
  );
};

export default TimelineRange;
