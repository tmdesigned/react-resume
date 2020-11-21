import React, { useState, useContext, useEffect } from "react";
import cx from "classnames";
import { Accordion, AccordionSummary } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import CardMetaList from "./CardMetaList";
import CardBulletList from "./CardBulletList";
import DateRange from "./DateRange";
import { useCardStyles } from "./CardStyles";
import { DisplayOptionsContext } from "../../Contexts";

const ResumeCard = ({ title, meta, from, to, bullets }) => {
  const displayOptions = useContext(DisplayOptionsContext);
  const [expanded, setExpanded] = useState(displayOptions.showDetails);
  const classes = useCardStyles();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpanded(displayOptions.showDetails);
  }, [displayOptions.showDetails]);

  return (
    <Accordion
      expanded={expanded}
      className={cx(classes.card, classes.hideBorder)}
    >
      <AccordionSummary expandIcon={<ExpandMore />} onClick={toggleExpand}>
        <div>
          <h3 className={classes.title}>{title}</h3>
          <DateRange from={from} to={to} />
          <CardMetaList items={meta} />
        </div>
      </AccordionSummary>
      <CardBulletList bullets={bullets} />
    </Accordion>
  );
};

export default ResumeCard;
