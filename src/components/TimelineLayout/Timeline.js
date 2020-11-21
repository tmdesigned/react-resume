import React, { useContext, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { PersonContext } from "../../Contexts";

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
  const person = useContext(PersonContext);
  const classes = useStyles();

  const [timelineItems, setTimelineItems] = useState([]);

  useMemo(() => {
    let newTimelineItems = [];
    if (person.experience) {
      newTimelineItems = [
        ...newTimelineItems,
        ...person.experience.map((experience) => ({
          ...experience,
          timelineTitle: experience.title,
          timelineStart: experience.from,
          timelineEnd: experience.to
            ? experience.to
            : JSON.stringify(new Date())
        }))
      ];
    }
    if (person.education) {
      newTimelineItems = [
        ...newTimelineItems,
        ...person.education.map((education) => ({
          ...education,
          timelineTitle: `${education.degree} in ${education.department}`,
          timelineStart: education.earned,
          timelineEnd: education.earned
        }))
      ];
    }
    if (person.certifications) {
      newTimelineItems = [
        ...newTimelineItems,
        ...person.certifications.map((certification) => ({
          ...certification,
          timelineTitle: certification.title,
          timelineStart: certification.earned,
          timelineEnd: certification.earned
        }))
      ];
    }
    setTimelineItems(newTimelineItems);
  }, [person]);

  console.log(timelineItems);

  return (
    <div className={classes.svgContainer}>
      <svg
        className={classes.svg}
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <g>
            <line
              className={classes.timeline}
              x1="500"
              y1="54.7"
              x2="500"
              y2="941.7"
            />
            <g>
              <polygon points="500,29.5 485,65 500.5,56.6 515,65 			" />
            </g>
            <g>
              <rect x="489" y="929.9" width="22" height="22" />
            </g>
          </g>
          <g>
            {timelineItems.map((timelineItem, idx) => (
              <text x="0" y={(idx + 1) * 50}>
                {timelineItem.timelineTitle}
              </text>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Timeline;
