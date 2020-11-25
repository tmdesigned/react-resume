import React, { useContext } from "react";
import ResumeCard from "./ResumeCard/ResumeCard";
import ResumeSection from "./ResumeSection";
import { PersonContext } from "../../Contexts";
import { filterByKeys } from "../../util/helpers";

const CertificationList = () => {
  const person = useContext(PersonContext);

  return (
    <ResumeSection title="Certifications" styleType="certification">
      {person.certifications &&
        person.certifications.map((item) => (
          <ResumeCard
            title={item.title}
            meta={filterByKeys(item, ["organization"])}
            from={item.earned}
            to={item.earned}
            bullets={item.competencies}
            key={item.id}
          />
        ))}
    </ResumeSection>
  );
};

export default CertificationList;
