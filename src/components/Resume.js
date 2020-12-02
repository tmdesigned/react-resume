import React, { useContext, useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { PersonContext, DisplayOptionsContext } from "../Contexts";
import Timeline from "./TimelineLayout/Timeline";
import Overview from "./StandardLayout/Overview";
import ExperienceList from "./StandardLayout/ExperienceList";
import EducationList from "./StandardLayout/EducationList";
import CertificationList from "./StandardLayout/CertificationList";
import DisplayOptions from "./DisplayOptions";
import WithTimelineProviders from "./TimelineLayout/WithTimelineProviders";
import api from "../util/api";

const Resume = () => {
  const displayOptions = useContext(DisplayOptionsContext);
  const [people, setPeople] = useState(null);
  const [person, setPerson] = useState(null);
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    api({
      method: "GET",
      path: "/people"
    })
      .then((res) => {
        setPeople(res.data);
      })
      .catch((r) => {
        setStatus(r.toString());
      });
  }, []);

  useEffect(() => {
    if (!people || people.length === 0) {
      return;
    }

    api({
      method: "GET",
      path: `/people/${people[0].id}`
    })
      .then((res) => {
        setPerson(res.data);
        setStatus("");
      })
      .catch((r) => {
        setStatus(r.toString());
      });
  }, [people]);

  if (status) {
    return status;
  }

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
