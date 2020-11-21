import React, { useContext } from "react";
import Overview from "./Overview";
import ExperienceList from "./ExperienceList";
import EducationList from "./EducationList";
import CertificationList from "./CertificationList";
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
          <div data-testid="timeline-layout">timeline</div>
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
