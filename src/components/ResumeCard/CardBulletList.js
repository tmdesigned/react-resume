import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Star as StarIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      listStyle: "disc outside none"
    }
  };
});

const CardBulletList = ({ bullets }) => {
  const classes = useStyles();

  if (!bullets || bullets.length === 0) {
    return null;
  }

  return (
    <List className={classes.root} dense>
      {bullets &&
        bullets.map((bullet, idx) => (
          <ListItem key={idx}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary={bullet} />
          </ListItem>
        ))}
    </List>
  );
};

export default CardBulletList;
