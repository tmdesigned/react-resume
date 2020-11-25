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
    timeline: (timelineOptions) => ({
      fill: "none",
      stroke: timelineOptions.dark ? "#fff" : "#000",
      strokeWidth: 4,
      strokeMiterlimit: 10
    }),
    timelineCaps: (timelineOptions) => ({
      fill: timelineOptions.dark ? "#fff" : "#000"
    }),
    timelineRange: {
      "&:hover *": {
        // opacity: "1"
      }
    },
    selectedRange: {
      "& *": {
        // opacity: "1 !important"
      }
    },
    timelineItem: (timelineOptions) => ({
      fill: "none",
      stroke: theme.palette[timelineOptions.type],
      strokeWidth: 30,
      strokeMiterlimit: 10
    }),
    connectingLine: (timelineOptions) => ({
      stroke: theme.palette[timelineOptions.type]
    }),
    timelineTitle: (timelineOptions) => ({
      opacity: "1",
      fill: theme.palette[timelineOptions.type],
      transition: ".3s"
    }),
    timelineSubtitle: (timelineOptions) => ({
      fill: timelineOptions.dark ? "#fff" : "#000",
      opacity: "1",
      transition: ".3s"
    }),
    timelineYear: (timelineOptions) => ({
      fill: timelineOptions.dark ? "#fff" : "#000"
    })
  };
});
