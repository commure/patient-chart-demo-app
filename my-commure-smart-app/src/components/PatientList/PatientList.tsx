import React from "react";
import { FhirDataQuery } from "@commure/components-data";
import { Bundle, Patient } from "@commure/fhir-types/r4/types";
import { FhirDateTime, FhirHumanName } from "@commure/components-core";

export const PatientList: React.FC = () => (
  <ul className="patient-list">
    <FhirDataQuery queryString="Patient">
      {({ loading, error, data: dataUntyped }) => {
        const data = dataUntyped as Bundle | undefined;

        return (
          <>
            {loading && <p>Loading...</p>}
            {error && <p>An error occurred while fetching the patients</p>}
            {data?.entry?.map(({ resource }) => {
              const patient = resource as Patient;

              return (
                <li className="patient-list__item" key={patient.id}>
                  <FhirHumanName
                    className="patient-menu-item__name"
                    hidePrefixes
                    nameAssemblyOrder="G"
                    value={(patient.name || [])[0]}
                  />
                  <p className="patient-list__date">
                    DOB: <FhirDateTime value={patient.birthDate} inline />
                  </p>
                </li>
              );
            })}
          </>
        );
      }}
    </FhirDataQuery>
  </ul>
);
