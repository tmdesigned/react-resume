import React, { useContext } from "react";
import { PersonContext } from "../../Contexts";
import ResumeCard from "./ResumeCard/ResumeCard";
import ResumeSection from "./ResumeSection";
import { filterByKeys } from "../../util/helpers";

const EducationList = () => {
  const person = useContext(PersonContext);

  const bullets = (educationItem) => {
    const items = [];
    if (educationItem.degreeDescription && educationItem.department) {
      items.push(
        `Degree: ${educationItem.degreeDescription} in ${educationItem.department}`
      );
    } else if (educationItem.degreeDescription) {
      items.push(educationItem.degreeDescription);
    } else {
      items.push(educationItem.department);
    }
    if (educationItem.primaryArea) {
      items.push(`Primary focus: ${educationItem.primaryArea}`);
    }
    if (educationItem.secondaryArea) {
      items.push(`Secondary focus: ${educationItem.secondaryArea}`);
    }
    if (educationItem.distinction) {
      items.push(`Graduated ${educationItem.distinction}`);
    }
    return items;
  };

  return (
    <ResumeSection title="Education" styleType="education">
      {person.education &&
        person.education.map((item) => (
          <ResumeCard
            title={item.degreeDescription}
            meta={filterByKeys(item, [
              "degree",
              "institution",
              "city",
              "state"
            ])}
            from={item.earned}
            to={item.earned}
            bullets={bullets(item)}
            styleType="education"
            key={item.id}
          />
        ))}
    </ResumeSection>
  );
};

export default EducationList;
