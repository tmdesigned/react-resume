import React from "react";
import Overview from "./Overview";
import ExperienceList from "./ExperienceList";
import EducationList from "./EducationList";
import CertificationList from "./CertificationList";
import DisplayOptions from "./DisplayOptions";
import { PersonContext } from "../Contexts";
import person from "../taylor.json";
import { Container } from "@material-ui/core";

const Resume = () => {
  return (
    <PersonContext.Provider value={person}>
      <Container>
        <DisplayOptions />
        <Overview />
        <ExperienceList />
        <EducationList />
        <CertificationList />
      </Container>
    </PersonContext.Provider>
  );
};

export default Resume;
