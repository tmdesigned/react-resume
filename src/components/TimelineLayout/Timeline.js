import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTimelineStyles } from "./TimelineStyles";
import { PersonContext, DisplayOptionsContext } from "../../Contexts";
import TimelineArray from "./TimelineArray";
import TimelineRange from "./TimelineRange";

const Timeline = () => {
  const DURATION_HEIGHT_FACTOR = 200000000; // ms to pixels
  const TOP_BOTTOM_OFFSET = 50;

  const displayOptions = useContext(DisplayOptionsContext);
  const person = useContext(PersonContext);
  const classes = useTimelineStyles(displayOptions);
  const [timelineHeight, setTimelineHeight] = useState(1000);
  const [timelineYears, setTimelineYears] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null);

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

  const buildYearDatesArrayInRange = (startDate, endDate) => {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    let years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(new Date(`1/1/${i}`));
    }
    return years;
  };

  useEffect(() => {
    setTimelineHeight(timelineItems.duration() / DURATION_HEIGHT_FACTOR);
    if (timelineItems.items.length) {
      setSelectedRange(timelineItems.items[0].key);
      setTimelineYears(
        buildYearDatesArrayInRange(
          timelineItems.earliestDate,
          timelineItems.latestDate
        )
      );
    }
  }, [timelineItems]);

  const dateToYOffset = (date) => {
    if (!timelineItems.items.length) {
      return 0;
    }
    const percentOfDuration =
      (timelineItems.latestDate - date) / timelineItems.duration();
    return (
      TOP_BOTTOM_OFFSET +
      percentOfDuration * (timelineHeight - 2 * TOP_BOTTOM_OFFSET)
    );
  };

  const selectRange = (key) => {
    setSelectedRange(key);
  };

  return (
    <div className={classes.svgContainer} style={{ height: timelineHeight }}>
      <svg
        className={classes.svg}
        viewBox={`-100 0 500 ${timelineHeight} `}
        preserveAspectRatio="xMidYMin meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <g>
            <line
              className={classes.timeline}
              x1="0"
              y1={TOP_BOTTOM_OFFSET}
              x2="0"
              y2={timelineHeight - TOP_BOTTOM_OFFSET}
            />
            <g>
              <polygon
                className={classes.timelineCaps}
                points={`0,${TOP_BOTTOM_OFFSET - 10} -10,${
                  TOP_BOTTOM_OFFSET + 10
                } 0,${TOP_BOTTOM_OFFSET + 30} 10,${TOP_BOTTOM_OFFSET + 10} 			`}
              />
            </g>
            <g>
              <rect
                className={classes.timelineCaps}
                x="-11"
                y={timelineHeight - TOP_BOTTOM_OFFSET}
                width="22"
                height="22"
              />
            </g>
          </g>
          <g>
            {timelineYears.map((year) => (
              <text
                key={year.valueOf()}
                className={classes.timelineYear}
                x={-40}
                y={dateToYOffset(year)}
                fontSize={18}
                textAnchor="end"
              >
                {year.getFullYear()}
              </text>
            ))}
          </g>
          <g>
            {timelineItems.items.map((timelineItem, idx) => (
              <TimelineRange
                timelineItem={timelineItem}
                idx={idx}
                dateToYOffset={dateToYOffset}
                selectRange={selectRange}
                selected={timelineItem.key === selectedRange}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Timeline;
