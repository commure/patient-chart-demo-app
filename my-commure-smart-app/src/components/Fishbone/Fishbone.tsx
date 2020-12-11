import React from "react";

// @ts-ignore No TS definitions for fhirpath yet.
import fhirpath from "@commure/fhirpath";
import { FhirDataQuery } from "@commure/components-data";
import FishboneUnconnected from "@commure/components-core/src/components/patientView/fishbone/unconnected/Fishbone";
import { buildFishboneQuery } from "@commure/components-core/src/components/patientView/utils/queries";
import { FISHBONE_LOINC_MAP } from "@commure/components-core/src/components/patientView/fishbone/constants";

import { FhirDataQueryResponse } from "../../types";
import { errorToOperationOutcome } from "../../utils/helpers/errorConverter";

interface Props {
  baseClass: string;
  patientId: string;
  fishboneType: keyof typeof FISHBONE_LOINC_MAP;
}

const Fishbone: React.FC<Props> = ({
  patientId,
  fishboneType,
  ...props
}): JSX.Element => {
  return (
    <FhirDataQuery queryString={buildFishboneQuery(patientId, fishboneType)}>
      {({ data, error, loading }: FhirDataQueryResponse): JSX.Element => {
        if (error) {
          return (
            <FishboneUnconnected
              isLoading={false}
              error={errorToOperationOutcome(error, "Observation")}
              fishboneType={fishboneType}
              {...props}
            />
          );
        }
        if (loading) {
          return (
            <FishboneUnconnected
              isLoading
              fishboneType={fishboneType}
              {...props}
            />
          );
        }
        const observations = fhirpath("entry.resource", data);
        return (
          <FishboneUnconnected
            isLoading={false}
            data={{ observations }}
            fishboneType={fishboneType}
            {...props}
          />
        );
      }}
    </FhirDataQuery>
  );
};

export default Fishbone;
