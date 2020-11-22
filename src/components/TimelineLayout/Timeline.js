import React, { useContext, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { PersonContext } from "../../Contexts";
import TimelineArray from "./TimelineArray";

const useStyles = makeStyles((theme) => {
  return {
    svgContainer: {
      position: "relative",
      width: "100%",
      paddingTop: theme.spacing(3),
      minHeight: "400px"
    },
    svg: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%"
    },
    timeline: {
      fill: "none",
      stroke: "#000000",
      strokeWidth: 7,
      strokeMiterlimit: 10
    }
  };
});

const Timeline = () => {
  const DURATION_HEIGHT_FACTOR = 200000000; // ms to pixels
  const TOP_BOTTOM_OFFSET = 50;

  const person = useContext(PersonContext);
  const classes = useStyles();
  const [timelineHeight, setTimelineHeight] = useState(1000);

  const timelineItems = useMemo(() => {
    return new TimelineArray()
      .addStandardizedItems(
        person.experience,
        (item) => item.title,
        (item) => new Date(item.from),
        (item) => (item.to ? new Date(item.to) : new Date())
      )
      .addStandardizedItems(
        person.education,
        (item) => `${item.degree} in ${item.department}`,
        (item) => new Date(item.earned),
        (item) => new Date(item.earned)
      )
      .addStandardizedItems(
        person.certifications,
        (item) => item.title,
        (item) => new Date(item.earned),
        (item) => new Date(item.earned)
      );
  }, [person]);

  useEffect(() => {
    setTimelineHeight(timelineItems.duration() / DURATION_HEIGHT_FACTOR);
  }, [timelineItems]);

  const dateToYOffset = (date) => {
    // initial offset +
    // ( max date MS - this date MS
    //  / range ) * (height - 2x offset)
    const percentOfDuration =
      (timelineItems.latestDate - date) / timelineItems.duration();
    console.log("percent of duration", percentOfDuration);
    return (
      TOP_BOTTOM_OFFSET +
      percentOfDuration * (timelineHeight - 2 * TOP_BOTTOM_OFFSET)
    );
  };

  return (
    <div className={classes.svgContainer} style={{ height: timelineHeight }}>
      <svg
        className={classes.svg}
        viewBox={`0 0 1000 ${timelineHeight} `}
        preserveAspectRatio="xMidYMin meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <g>
            <line
              className={classes.timeline}
              x1="200"
              y1={TOP_BOTTOM_OFFSET}
              x2="200"
              y2={timelineHeight - TOP_BOTTOM_OFFSET}
            />
            <g>
              <polygon
                points={`200,${TOP_BOTTOM_OFFSET - 10} 185,${
                  TOP_BOTTOM_OFFSET + 15
                } 200.5,${TOP_BOTTOM_OFFSET + 30} 215,${
                  TOP_BOTTOM_OFFSET + 15
                } 			`}
              />
            </g>
            <g>
              <rect
                x="189"
                y={timelineHeight - TOP_BOTTOM_OFFSET}
                width="22"
                height="22"
              />
            </g>
          </g>
          <g>
            {timelineItems.items.map((timelineItem, idx) => {
              const y1 = dateToYOffset(timelineItem.timelineStart);
              const y2 = dateToYOffset(timelineItem.timelineEnd);
              const midY = (y1 + y2) / 2;
              return (
                <g key={timelineItem.key}>
                  <line
                    className={classes.timeline}
                    x1={260 + idx * 40}
                    y1={y1}
                    x2={260 + idx * 40}
                    y2={y2}
                  />
                  <line
                    className={classes.timeline}
                    x1={260 + idx * 40}
                    y1={midY}
                    x2={280 + idx * 40}
                    y2={midY}
                  />
                  <line
                    className={classes.timeline}
                    x1={240 + idx * 40}
                    y1={y1}
                    x2={260 + idx * 40}
                    y2={y1}
                  />
                  <line
                    className={classes.timeline}
                    x1={240 + idx * 40}
                    y1={y2}
                    x2={260 + idx * 40}
                    y2={y2}
                  />
                  <text x={290 + idx * 40} y={8 + midY} fontSize={30}>
                    {timelineItem.timelineTitle}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Timeline;
