import React from "react";

// @ts-ignore No TS definitions for fhirpath yet.
import fhirpath from "@commure/fhirpath";
import { FhirDataQuery } from "@commure/components-data";
import MedicationsUnconnected from "@commure/components-core/src/components/patientView/medications/unconnected/Medications";
import { buildMedicationsQuery } from "@commure/components-core/src/components/patientView/utils/queries";

import { FhirDataQueryResponse } from "../../types";
import { errorToOperationOutcome } from "../../utils/helpers/errorConverter";

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
