import { makeStyles } from "@material-ui/core/styles";

export const useCardStyles = makeStyles((theme) => {
  return {
    resumeSection: (props) => ({
      borderLeft: "10px solid #fff",
      borderLeftColor: theme.palette[props.styleType]
    }),
    card: {
      marginBottom: theme.spacing(3)
    },
    header: {
      textAlign: "center"
    },
    cardHeader: {
      display: "block"
    },
    subheader: {
      textAlign: "center",
      marginBottom: theme.spacing(2)
    },
    summary: {
      textAlign: "center",
      fontSize: "1.5em"
    },
    hideBorder: {
      boxShadow: "none"
    },
    metaItem: {
      marginRight: theme.spacing(2),
      "&:last-child": {
        marginRight: 0
      }
    }
  };
});
