import React from "react";

// @ts-ignore No TS definitions for fhirpath yet.
import fhirpath from "@commure/fhirpath";
import { FhirDataQuery } from "@commure/components-data";
import { patientView } from "@commure/components-core";

import { FhirDataQueryResponse } from "../../types";
import { errorToOperationOutcome } from "../../utils/helpers/errorConverter";

const { MedicationsUnconnected } = patientView.medications;
const { buildMedicationsQuery } = patientView.utils.queries;

interface Props {
  baseClass: string;
  patientId: string;
}

const Medications: React.FC<Props> = ({ patientId, ...props }): JSX.Element => {
  return (
    <FhirDataQuery queryString={buildMedicationsQuery(patientId)}>
      {({ data, error, loading }: FhirDataQueryResponse): JSX.Element => {
        if (error) {
          return (
            <MedicationsUnconnected
              isLoading={false}
              error={errorToOperationOutcome(error, "MedicationStatement")}
              {...props}
            />
          );
        }
        if (loading) {
          return <MedicationsUnconnected isLoading {...props} />;
        }
        const medicationStatements = fhirpath("entry.resource", data);
        return (
          <MedicationsUnconnected
            isLoading={false}
            data={{ medicationStatements }}
            {...props}
          />
        );
      }}
    </FhirDataQuery>
  );
};

export default Medications;
