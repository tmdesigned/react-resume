import React, { useContext } from "react";
import Timeline from "./TimelineLayout/Timeline";
import Overview from "./StandardLayout/Overview";
import ExperienceList from "./StandardLayout/ExperienceList";
import EducationList from "./StandardLayout/EducationList";
import CertificationList from "./StandardLayout/CertificationList";
import DisplayOptions from "./DisplayOptions";
import { PersonContext } from "../Contexts";
import person from "../taylor.json";
import { Container } from "@material-ui/core";
import { DisplayOptionsContext } from "../Contexts";

const Resume = () => {
  const displayOptions = useContext(DisplayOptionsContext);
  return (
    <PersonContext.Provider value={person}>
      <Container>
        <DisplayOptions />
        {displayOptions.timeline ? (
          <div data-testid="timeline-layout">
            <Timeline />
          </div>
        ) : (
          <div data-testid="standard-layout">
            <Overview />
            <ExperienceList />
            <EducationList />
            <CertificationList />
          </div>
        )}
      </Container>
    </PersonContext.Provider>
  );
};

export default Resume;
