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
      y: action.y
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
  const [overlapAdjustments, dispatchOverlapAdjustment] = useReducer(
    overlapAdjustmentReducer,
    {}
  );

  const addInfoBoxRef = (ref) => {
    setInfoBoxRefs((prev) => [...prev, ref]);
  };

  const overlaps = (r1, r2) => {
    return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
    );
  };

  const getParentKey = (ref) =>
    ref && ref.current ? ref.current.getAttribute("parentkey") : undefined;

  const findOverlappingKey = useCallback((ref, otherRefs) => {
    const bBox = ref.current.getBBox();
    const overlapsWith = otherRefs.find(
      (otherRef) =>
        ref.current !== otherRef.current &&
        overlaps(bBox, otherRef.current.getBBox())
    );
    return getParentKey(overlapsWith);
  }, []);

  useEffect(() => {
    let newAdjustments = [];
    infoBoxRefs.forEach((boxRef) => {
      if (!boxRef.current) {
        return;
      }
      const key = getParentKey(boxRef);
      if (newAdjustments.indexOf(key) !== -1) {
        return; // skip for this iteration, known and addressed overlap
      }
      const overlapsWithKey = findOverlappingKey(boxRef, infoBoxRefs);
      const prevX = overlapAdjustments[key] ? overlapAdjustments[key].x : 0;
      const prevY = overlapAdjustments[key] ? overlapAdjustments[key].y : 0;
      if (overlapsWithKey) {
        dispatchOverlapAdjustment({
          key,
          x: prevX,
          y: prevY + 15
        });
        newAdjustments.push(key);
        newAdjustments.push(overlapsWithKey);
      }
    });
  }, [findOverlappingKey, overlapAdjustments, infoBoxRefs]);

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
