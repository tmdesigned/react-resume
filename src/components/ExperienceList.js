import React, { useContext } from "react";
import { PersonContext } from "../Contexts";
import ResumeCard from "./ResumeCard/ResumeCard";
import ResumeSection from "./ResumeSection";
import { filterByKeys } from "../util/helpers";

const ExperienceList = () => {
  const person = useContext(PersonContext);

  return (
    <ResumeSection title="Experience">
      {person.experience &&
        person.experience.map((item) => (
          <ResumeCard
            title={item.title}
            meta={filterByKeys(item, [
              "company",
              "department",
              "city",
              "state"
            ])}
            from={item.from}
            to={item.to}
            bullets={item.responsibilities}
            key={item.id}
          />
        ))}
    </ResumeSection>
  );
};

export default ExperienceList;
