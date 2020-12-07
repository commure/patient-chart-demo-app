import React, { useContext, useState } from "react";
import { FhirDataQuery } from "@commure/components-data";
import { NonIdealState, Spinner } from "@commure/components-foundation";
import { Bundle, Patient } from "@commure/fhir-types/r4/types";
import { buildNameQuery } from "../../utils/helpers/queryBuilders";
import { DashboardContext } from "../Dashboard/Dashboard";
import PatientMenuItem from "../PatientMenuItem/PatientMenuItem";

export interface Props {
  searchPatientName: string;
}

const PatientListLoader: React.FC<Props> = ({ searchPatientName = "" }) => {
  const [patientIdSelected, setPatientIdSelected] = useState<string>("");
  const dashboardContext = useContext(DashboardContext);

  const selectPatient = (id: string) => {
    dashboardContext!.selectMenuItem(id);
    setPatientIdSelected(id);
  };

  return (
    <FhirDataQuery queryString={`Patient?${buildNameQuery(searchPatientName)}`}>
      {({ loading, error, data }) => {
        const patientData = data as Bundle;
        let patients: Patient[] | undefined;
        if (patientData && patientData.entry) {
          patients = patientData.entry.map(value => value.resource as Patient);
        }
        return (
          <>
            {patients && !!patients.length && (
              <ul className="cm-panel-menu">
                {patients.map(patient => (
                  <PatientMenuItem
                    key={patient.id}
                    patient={patient}
                    isSelected={patientIdSelected === patient.id}
                    onClick={_ => selectPatient(patient.id || "")}
                  />
                ))}
              </ul>
            )}
            {patients && !patients.length && (
              <NonIdealState
                icon="search"
                title="Patient not found."
                description={`
            We couldn't find a patient with that identifier.
            Make sure it's spelled correctly, or try using a different one.
        `}
              />
            )}
            {loading && <Spinner />}
            {error && (
              <p className="patient-fetch-error">
                An error has occurred fetching the patients
              </p>
            )}
          </>
        );
      }}
    </FhirDataQuery>
  );
};

export default PatientListLoader;