import React, { useContext } from "react";
import { Container } from "@material-ui/core";
import { PersonContext, DisplayOptionsContext } from "../Contexts";
import person from "../taylor.json";
import Timeline from "./TimelineLayout/Timeline";
import Overview from "./StandardLayout/Overview";
import ExperienceList from "./StandardLayout/ExperienceList";
import EducationList from "./StandardLayout/EducationList";
import CertificationList from "./StandardLayout/CertificationList";
import DisplayOptions from "./DisplayOptions";
import WithTimelineProviders from "./TimelineLayout/WithTimelineProviders";

const Resume = () => {
  const displayOptions = useContext(DisplayOptionsContext);
  return (
    <PersonContext.Provider value={person}>
      <Container>
        <DisplayOptions />
        {displayOptions.timeline ? (
          <div data-testid="timeline-layout">
            <WithTimelineProviders>
              <Timeline />
            </WithTimelineProviders>
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
