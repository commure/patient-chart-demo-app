import React from "react";
import { FhirDataQuery } from "@commure/components-data";
import { Bundle, Patient } from "@commure/fhir-types/r4/types";
// @ts-ignore TypeScript support for this library is in development
import { FhirHumanNameDisplay } from "@commure/components-web-fhir";
import { FhirDateTime } from "@commure/components-core";

export const PatientList: React.FC = () => (
  <ul className="patient-list">
    <FhirDataQuery queryString="Patient">
      {({ loading, error, data: dataUntyped }) => {
        const data = dataUntyped as Bundle | undefined;

        return (
          <>
            {loading && <p>Loading...</p>};
            {error && <p>An error has occurred fetching the patients</p>}
            {data?.entry?.map(({ resource }) => {
              const patient = resource as Patient;

              return (
                <li className="patient-list__item" key={patient.id}>
                  <FhirHumanNameDisplay
                    className="patient-list__name"
                    value={patient.name}
                    nameAssemblyOrder="G"
                    hidePrefixes
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
