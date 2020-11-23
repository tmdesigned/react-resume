import React, { useState, useContext, useEffect, useMemo } from "react";
import TimelineArray from "./TimelineArray";
import TimelineRange from "./TimelineRange";
import {
  PersonContext,
  TimelineConfigContext,
  DispatchTimelineConfigContext
} from "../../Contexts";

const TimelineItems = () => {
  const person = useContext(PersonContext);
  const timelineConfig = useContext(TimelineConfigContext);
  const dispatchTimelineConfigAction = useContext(
    DispatchTimelineConfigContext
  );
  const [selectedRange, setSelectedRange] = useState(null);
  const [infoBoxRefs, setInfoBoxRefs] = useState([]);

  const addInfoBoxRef = (ref) => {
    setInfoBoxRefs((prev) => [...prev, ref]);
  };

  const checkCollisions = () => {
    infoBoxRefs.forEach((boxRef) => {
      const bbox = boxRef.current.getBBox();
    });
  };

  useEffect(() => {
    checkCollisions();
  }, [infoBoxRefs]);

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
  }, [timelineItems]);

  const selectRange = (key) => {
    setSelectedRange(key);
  };

  return timelineItems.items.map((timelineItem, idx) => (
    <TimelineRange
      timelineItem={timelineItem}
      idx={idx}
      dateToYOffset={timelineConfig.dateToYOffset}
      selectRange={selectRange}
      selected={timelineItem.key === selectedRange}
      addInfoBoxRef={addInfoBoxRef}
    />
  ));
};

export default TimelineItems;
