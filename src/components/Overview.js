import React, { useContext } from "react";
import { Card, CardContent } from "@material-ui/core";
import { PersonContext } from "../Contexts";
import { useCardStyles } from "./ResumeCard/CardStyles";

const Overview = () => {
  const person = useContext(PersonContext);
  const classes = useCardStyles();

  return (
    <Card>
      <CardContent>
        <h1 className={classes.header}>
          {person.firstName} {person.lastName}
        </h1>
        <div className={classes.subheader}>{person.email}</div>
        <div className={classes.summary}>{person.summary}</div>
      </CardContent>
    </Card>
  );
};

export default Overview;
