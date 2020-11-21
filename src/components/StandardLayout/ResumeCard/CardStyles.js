import { makeStyles } from "@material-ui/core/styles";

export const useCardStyles = makeStyles((theme) => {
  return {
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
