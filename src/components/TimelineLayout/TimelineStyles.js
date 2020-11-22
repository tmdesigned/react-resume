import { makeStyles } from "@material-ui/core/styles";

export const useTimelineStyles = makeStyles((theme) => {
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
    timeline: (props) => ({
      fill: "none",
      stroke: props.dark ? "#fff" : "#000",
      strokeWidth: 4,
      strokeMiterlimit: 10
    }),
    timelineCaps: (props) => ({
      fill: props.dark ? "#fff" : "#000"
    }),
    timelineRange: {
      "&:hover *": {
        opacity: "1"
      }
    },
    timelineItem: {
      fill: "none",
      strokeWidth: 30,
      strokeMiterlimit: 10
    },
    timelineTitle: {
      opacity: "0",
      transition: ".3s"
    },
    timelineSubtitle: (props) => ({
      fill: props.dark ? "#fff" : "#000",
      opacity: "0",
      transition: ".3s"
    })
  };
});
