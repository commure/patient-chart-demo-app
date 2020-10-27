import { FhirDateTime, FhirHumanName } from "@commure/components-core";
import React, { MouseEventHandler } from "react";

import { Patient } from "@commure/fhir-types/r4/types";

export interface Props {
  isSelected?: boolean;
  patient: Patient;
  onClick: MouseEventHandler<HTMLLIElement>;
}

const PatientMenuItem: React.FC<Props> = ({ isSelected, patient, onClick }) => {
  let patientClassName = "patient-menu-item";
  if (isSelected) {
    patientClassName = `${patientClassName} patient-menu-item--selected`;
  }
  return (
    <li className={patientClassName} onClick={onClick}>
      {patient.name && !!patient.name.length ? (
        <FhirHumanName
          className="patient-menu-item__name"
          hidePrefixes
          nameAssemblyOrder="G"
          value={patient.name[0]}
        />
      ) : (
        "Unknown"
      )}

      <p className="patient-menu-item__dob">
        DOB: <FhirDateTime value={patient.birthDate} inline />
      </p>
    </li>
  );
};

export default PatientMenuItem;
