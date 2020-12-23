import React from "react";

// @ts-ignore No TS definitions for fhirpath yet.
import fhirpath from "@commure/fhirpath";
import { FhirDataQuery } from "@commure/components-data";
import { patientView } from "@commure/components-core";

import { FhirDataQueryResponse } from "../../types";
import { errorToOperationOutcome } from "../../utils/helpers/errorConverter";

const { PatientConditionUnconnected } = patientView.patientCondition;
const { buildConditionQuery } = patientView.utils.queries;

interface Props {
  baseClass: string;
  patientId: string;
}

const Condition: React.FC<Props> = ({ patientId, ...props }): JSX.Element => {
  return (
    <FhirDataQuery queryString={buildConditionQuery(patientId)}>
      {({ data, error, loading }: FhirDataQueryResponse): JSX.Element => {
        if (error) {
          return (
            <PatientConditionUnconnected
              isLoading={false}
              error={errorToOperationOutcome(error, "Condition")}
              {...props}
            />
          );
        }
        if (loading) {
          return <PatientConditionUnconnected isLoading {...props} />;
        }
        const medicationStatements = fhirpath("entry.resource", data);
        return (
          <PatientConditionUnconnected
            isLoading={false}
            data={{ medicationStatements }}
            {...props}
          />
        );
      }}
    </FhirDataQuery>
  );
};

export default Condition;
