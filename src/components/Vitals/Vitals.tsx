import React from "react";

// @ts-ignore No TS definitions for fhirpath yet.
import fhirpath from "@commure/fhirpath";
import { FhirDataQuery } from "@commure/components-data";
import VitalsUnconnected from "@commure/components-core/src/components/patientView/vitals/unconnected/Vitals";
import { buildVitalsQuery } from "@commure/components-core/src/components/patientView/utils/queries";

import { FhirDataQueryResponse } from "../../types";
import { errorToOperationOutcome } from "../../utils/helpers/errorConverter";

interface Props {
  baseClass: string;
  patientId: string;
}

const Vitals: React.FC<Props> = ({ patientId, ...props }): JSX.Element => {
  return (
    <FhirDataQuery queryString={buildVitalsQuery(patientId)}>
      {({ data, error, loading }: FhirDataQueryResponse): JSX.Element => {
        if (error) {
          return (
            <VitalsUnconnected
              isLoading={false}
              error={errorToOperationOutcome(error, "Observation")}
              {...props}
            />
          );
        }
        if (loading) {
          return <VitalsUnconnected isLoading {...props} />;
        }
        const medicationStatements = fhirpath("entry.resource", data);
        return (
          <VitalsUnconnected
            isLoading={false}
            data={{ medicationStatements }}
            {...props}
          />
        );
      }}
    </FhirDataQuery>
  );
};

export default Vitals;
