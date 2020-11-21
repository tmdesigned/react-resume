import React from "react";
import { useCardStyles } from "./CardStyles";

const CardMetaList = ({ items }) => {
  const classes = useCardStyles();

  if (!items || !Object.keys(items).length) {
    return null;
  }

  return (
    <div>
      {Object.keys(items).map((key) => (
        <span className={classes.metaItem} key={key}>
          {items[key]}
        </span>
      ))}
    </div>
  );
};

export default CardMetaList;
