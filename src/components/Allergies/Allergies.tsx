import React from "react";

// @ts-ignore No TS definitions for fhirpath yet.
import fhirpath from "@commure/fhirpath";
import { FhirDataQuery } from "@commure/components-data";
import { patientView } from "@commure/components-core";

import { FhirDataQueryResponse } from "../../types";
import { errorToOperationOutcome } from "../../utils/helpers/errorConverter";

const { AllergiesUnconnected } = patientView.allergies;
const { buildAllergiesQuery } = patientView.utils.queries;

interface Props {
  baseClass: string;
  patientId: string;
}

const Allergies: React.FC<Props> = ({ patientId, ...props }): JSX.Element => {
  return (
    <FhirDataQuery queryString={buildAllergiesQuery(patientId)}>
      {({ data, error, loading }: FhirDataQueryResponse): JSX.Element => {
        if (error) {
          return (
            <AllergiesUnconnected
              isLoading={false}
              error={errorToOperationOutcome(error, "MedicationStatement")}
              {...props}
            />
          );
        }
        if (loading) {
          return <AllergiesUnconnected isLoading {...props} />;
        }
        const medicationStatements = fhirpath("entry.resource", data);
        return (
          <AllergiesUnconnected
            isLoading={false}
            data={{ medicationStatements }}
            {...props}
          />
        );
      }}
    </FhirDataQuery>
  );
};

export default Allergies;
