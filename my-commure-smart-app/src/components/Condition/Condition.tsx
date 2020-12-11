import React from "react";

// @ts-ignore No TS definitions for fhirpath yet.
import fhirpath from "@commure/fhirpath";
import { FhirDataQuery } from "@commure/components-data";
import ConditionUnconnected from "@commure/components-core/src/components/patientView/patientCondition/unconnected/PatientCondition";
import { buildConditionQuery } from "@commure/components-core/src/components/patientView/utils/queries";

import { FhirDataQueryResponse } from "../../types";
import { errorToOperationOutcome } from "../../utils/helpers/errorConverter";

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
            <ConditionUnconnected
              isLoading={false}
              error={errorToOperationOutcome(error, "Condition")}
              {...props}
            />
          );
        }
        if (loading) {
          return <ConditionUnconnected isLoading {...props} />;
        }
        const medicationStatements = fhirpath("entry.resource", data);
        return (
          <ConditionUnconnected
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