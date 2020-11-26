import React, { useContext, useEffect, useRef } from "react";
import cx from "classnames";
import { DisplayOptionsContext } from "../../Contexts";
import { useTimelineStyles } from "./TimelineStyles";

const TimelineRange = ({
  timelineItem,
  dateToYOffset,
  selectRange,
  selected,
  addInfoBoxRef,
  overlapAdjustment,
  type
}) => {
  const displayOptions = useContext(DisplayOptionsContext);
  const classes = useTimelineStyles({ ...displayOptions, type });
  const infoBoxRef = useRef(null);

  const selectThisRange = () => {
    selectRange(timelineItem.key);
  };

  useEffect(() => {
    if (addInfoBoxRef) {
      addInfoBoxRef(infoBoxRef);
    }
  }, [addInfoBoxRef, infoBoxRef]);

  if (!timelineItem) {
    return null;
  }
  const offset = timelineItem.timelineOverlap
    ? timelineItem.timelineOverlap + 1
    : 1;
  const overlapXAdjustment = overlapAdjustment ? overlapAdjustment.x : 0;
  const overlapYAdjustment = overlapAdjustment ? overlapAdjustment.y : 0;
  const y1 = dateToYOffset(timelineItem.timelineStart);
  const y2 = dateToYOffset(timelineItem.timelineEnd);
  const adjustedY2 = y1 === y2 ? y1 + 5 : y2;
  const midY = (y1 + y2) / 2;
  const initialTextY = midY - 30;

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
        x1={45 * offset}
        y1={y1}
        x2={45 * offset}
        y2={adjustedY2}
      />
      <line
        className={classes.connectingLine}
        x1={45 * offset + 25}
        y1={midY}
        x2={70 + 45 * offset + overlapXAdjustment}
        y2={initialTextY - 15 + overlapYAdjustment}
      />
      <g ref={infoBoxRef} parentkey={timelineItem.key}>
        <text
          className={classes.timelineTitle}
          x={80 + 45 * offset + overlapXAdjustment}
          y={initialTextY - 10 + overlapYAdjustment}
          fontSize={16}
        >
          {timelineItem.timelineTitle}
        </text>
        <text
          className={classes.timelineSubtitle}
          x={80 + 45 * offset + overlapXAdjustment}
          y={initialTextY + 10 + overlapYAdjustment}
          fontSize={12}
        >
          {timelineItem.timelineSubtitle}
        </text>
      </g>
    </g>
  );
};

export default TimelineRange;
