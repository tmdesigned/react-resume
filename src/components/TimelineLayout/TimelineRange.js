import React, { useCallback, useContext, useEffect, useRef } from "react";
import cx from "classnames";
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

const TimelineRange = ({
  timelineItem,
  idx,
  dateToYOffset,
  selectRange,
  selected,
  addInfoBoxRef,
  overlapAdjustment
}) => {
  const displayOptions = useContext(DisplayOptionsContext);
  const classes = useTimelineStyles(displayOptions);
  const infoBoxRef = useRef(null);

  const color = materialColors[idx % materialColors.length];
  const offset = timelineItem.timelineOverlap
    ? timelineItem.timelineOverlap + 1
    : 1;
  const overlapXAdjustment = overlapAdjustment ? overlapAdjustment.x : 0;
  const overlapYAdjustment = overlapAdjustment ? overlapAdjustment.y : 0;
  const y1 = dateToYOffset(timelineItem.timelineStart);
  const y2 = dateToYOffset(timelineItem.timelineEnd);
  const adjustedY2 = y1 === y2 ? y1 + 5 : y2;
  const midY = (y1 + y2) / 2;

  const selectThisRange = useCallback(() => {
    selectRange(timelineItem.key);
  }, [selectRange, timelineItem.key]);

  useEffect(() => {
    addInfoBoxRef(infoBoxRef);
  }, [addInfoBoxRef, infoBoxRef]);

  return (
    <g
      key={timelineItem.key}
      className={cx({
        [classes.timelineRange]: true,
        [classes.selectedRange]: selected
      })}
      onMouseEnter={selectThisRange}
    >
      <line // timeline item span
        className={classes.timelineItem}
        stroke={color}
        x1={45 * offset}
        y1={y1}
        x2={45 * offset}
        y2={adjustedY2}
      />
      <line
        className={classes.connectingLine}
        stroke={color}
        x1={45 * offset + 25}
        y1={midY}
        x2={70 + 45 * offset + overlapXAdjustment}
        y2={midY - 15 + overlapYAdjustment}
      />
      <g ref={infoBoxRef} parentkey={timelineItem.key}>
        <text
          className={classes.timelineTitle}
          x={80 + 45 * offset + overlapXAdjustment}
          y={midY - 10 + overlapYAdjustment}
          fill={color}
          fontSize={16}
        >
          {timelineItem.timelineTitle}
        </text>
        <text
          className={classes.timelineSubtitle}
          x={80 + 45 * offset + overlapXAdjustment}
          y={midY + 10 + overlapYAdjustment}
          fontSize={12}
        >
          {timelineItem.timelineSubtitle}
        </text>
      </g>
    </g>
  );
};

export default TimelineRange;
