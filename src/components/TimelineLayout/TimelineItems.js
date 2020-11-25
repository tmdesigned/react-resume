import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer
} from "react";
import TimelineArray from "./TimelineArray";
import TimelineRange from "./TimelineRange";
import { isOverlapping } from "../../util/helpers";
import {
  PersonContext,
  TimelineConfigContext,
  DispatchTimelineConfigContext
} from "../../Contexts";

const overlapAdjustmentReducer = (state, action) => {
  return {
    ...state,
    [action.key]: {
      x: action.x,
      y: action.y,
      iteration: action.iteration
    }
  };
};

const TimelineItems = () => {
  const person = useContext(PersonContext);
  const timelineConfig = useContext(TimelineConfigContext);
  const dispatchTimelineConfigAction = useContext(
    DispatchTimelineConfigContext
  );
  const [selectedRange, setSelectedRange] = useState(null);
  const [infoBoxRefs, setInfoBoxRefs] = useState([]);
  const [adjustingRef, setAdjustingRef] = useState(null);
  const [overlapAdjustments, dispatchOverlapAdjustment] = useReducer(
    overlapAdjustmentReducer,
    {}
  );

  const addInfoBoxRef = useCallback(
    (ref) => {
      setInfoBoxRefs((prev) => [...prev, ref]);
    },
    [setInfoBoxRefs]
  );

  const getParentKey = (ref) =>
    ref && ref.current ? ref.current.getAttribute("parentkey") : undefined;

  const findOverlappingKey = useCallback(
    (ref, otherRefs) => {
      const bBox = ref.current.getBBox();
      const overlapsWith = otherRefs.find(
        (otherRef) =>
          otherRef.current &&
          ref.current !== otherRef.current &&
          isOverlapping(
            bBox,
            otherRef.current.getBBox(),
            timelineConfig.overlapPadding
          )
      );
      return getParentKey(overlapsWith);
    },
    [timelineConfig.overlapPadding]
  );

  const adjustRefPosition = useCallback(
    (ref) => {
      const key = getParentKey(ref);
      const prevX = overlapAdjustments[key] ? overlapAdjustments[key].x : 0;
      const prevY = overlapAdjustments[key] ? overlapAdjustments[key].y : 0;
      const prevIteration = overlapAdjustments[key]
        ? overlapAdjustments[key].iteration
        : 0;

      dispatchOverlapAdjustment({
        key,
        x: prevX,
        y: prevY + 5,
        iteration: prevIteration + 1
      });
    },
    [overlapAdjustments]
  );

  useEffect(() => {
    if (adjustingRef) {
      const hasOverlap = findOverlappingKey(adjustingRef, infoBoxRefs);
      if (hasOverlap) {
        adjustRefPosition(adjustingRef);
      } else {
        setAdjustingRef(null);
      }
    } else {
      const refWithOverlap = infoBoxRefs.reverse().find((boxRef) => {
        if (!boxRef.current) {
          return false;
        }

        return findOverlappingKey(boxRef, infoBoxRefs);
      });
      if (refWithOverlap) {
        setAdjustingRef(refWithOverlap);
      }
    }
  }, [adjustingRef, adjustRefPosition, findOverlappingKey, infoBoxRefs]);

  const timelineItems = useMemo(() => {
    return new TimelineArray()
      .addStandardizedItems(person.experience, {
        title: (item) => item.title,
        subtitle: (item) => `${item.company}, ${item.city}, ${item.state}`,
        from: (item) => new Date(item.from),
        to: (item) => (item.to ? new Date(item.to) : new Date())
      })
      .addStandardizedItems(person.education, {
        title: (item) => `${item.degree} in ${item.department}`,
        subtitle: (item) => item.institution,
        from: (item) => new Date(item.started),
        to: (item) => new Date(item.earned)
      })
      .addStandardizedItems(person.certifications, {
        title: (item) => item.title,
        subtitle: (item) => item.organization,
        from: (item) => new Date(item.earned),
        to: (item) => new Date(item.earned)
      });
  }, [person]);

  useEffect(() => {
    const newHeight =
      timelineItems.duration() / timelineConfig.durationHeightFactor;
    dispatchTimelineConfigAction({
      type: "height",
      value: newHeight
    });

    if (timelineItems.items.length) {
      setSelectedRange(timelineItems.items[0].key);
      dispatchTimelineConfigAction({
        type: "start",
        value: timelineItems.earliestDate
      });
      dispatchTimelineConfigAction({
        type: "end",
        value: timelineItems.latestDate
      });
      dispatchTimelineConfigAction({
        type: "duration",
        value: timelineItems.duration()
      });
    }
  }, [
    dispatchTimelineConfigAction,
    timelineItems,
    timelineConfig.durationHeightFactor
  ]);

  const selectRange = (key) => {
    setSelectedRange(key);
  };

  return timelineItems.items.map((timelineItem, idx) => (
    <TimelineRange
      key={timelineItem.key}
      timelineItem={timelineItem}
      idx={idx}
      dateToYOffset={timelineConfig.dateToYOffset}
      selectRange={selectRange}
      selected={timelineItem.key === selectedRange}
      addInfoBoxRef={addInfoBoxRef}
      overlapAdjustment={overlapAdjustments[timelineItem.key]}
    />
  ));
};

export default TimelineItems;
