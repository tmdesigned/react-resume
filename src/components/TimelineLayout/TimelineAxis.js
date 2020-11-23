import React, { useContext, useMemo, useState } from "react";
import { useTimelineStyles } from "./TimelineStyles";
import { DisplayOptionsContext, TimelineConfigContext } from "../../Contexts";

const TimelineAxis = () => {
  const displayOptions = useContext(DisplayOptionsContext);
  const timelineConfig = useContext(TimelineConfigContext);
  const classes = useTimelineStyles(displayOptions);
  const [timelineYears, setTimelineYears] = useState([]);

  useMemo(() => {
    const startYear = timelineConfig.start.getFullYear();
    const endYear = timelineConfig.end.getFullYear();
    let years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(new Date(`1/1/${i}`));
    }
    setTimelineYears(years);
  }, [timelineConfig.start, timelineConfig.end]);

  return (
    <g>
      <line
        className={classes.timeline}
        x1="0"
        y1={timelineConfig.topAndBottomOffset}
        x2="0"
        y2={timelineConfig.height - timelineConfig.topAndBottomOffset}
      />
      <g>
        <polygon
          className={classes.timelineCaps}
          points={`0,${timelineConfig.topAndBottomOffset - 10} -10,${
            timelineConfig.topAndBottomOffset + 10
          } 0,${timelineConfig.topAndBottomOffset + 30} 10,${
            timelineConfig.topAndBottomOffset + 10
          } 			`}
        />
      </g>
      <g>
        <rect
          className={classes.timelineCaps}
          x="-11"
          y={timelineConfig.height - timelineConfig.topAndBottomOffset}
          width="22"
          height="22"
        />
      </g>
      <g>
        {timelineYears.map((year) => (
          <text
            key={year.valueOf()}
            className={classes.timelineYear}
            x={-40}
            y={timelineConfig.dateToYOffset(year, year.getFullYear())}
            fontSize={18}
            textAnchor="end"
          >
            {year.getFullYear()}
          </text>
        ))}
      </g>
    </g>
  );
};

export default TimelineAxis;
