import React from "react";

// @ts-ignore No TS definitions for fhirpath yet.
import fhirpath from "@commure/fhirpath";
import { FhirDataQuery } from "@commure/components-data";
import { patientView } from "@commure/components-core";

import { FhirDataQueryResponse } from "../../types";
import { errorToOperationOutcome } from "../../utils/helpers/errorConverter";

const { VitalsUnconnected } = patientView.vitals;
const { buildVitalsQuery } = patientView.utils.queries;

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
