import React, { useState, useEffect, useContext } from "react";
import { Accordion, AccordionSummary, Container } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { DisplayOptionsContext } from "../../Contexts";
import { useCardStyles } from "./ResumeCard/CardStyles";

const ResumeSection = ({ title, children }) => {
  const [expanded, setExpanded] = useState(true);
  const displayOptions = useContext(DisplayOptionsContext);
  const classes = useCardStyles();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpanded(displayOptions.showDetails);
  }, [displayOptions.showDetails]);

  return (
    <Accordion expanded={expanded} className="resume-section">
      <AccordionSummary expandIcon={<ExpandMore />} onClick={toggleExpand}>
        <h2 className={classes.header}>{title}</h2>
      </AccordionSummary>
      {children && <Container>{children}</Container>}
    </Accordion>
  );
};

export default ResumeSection;
