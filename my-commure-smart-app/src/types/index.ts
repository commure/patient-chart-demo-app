import React from "react";
import { Bundle, Resource } from "@commure/fhir-types/r4/types";

export type HOFSmartApp = <P>(
  WrappedComponent: React.FC<P>
) => (props: P) => React.ReactElement;

export type DashboardContextType =
  | {
      selectMenuItem: (id: string) => void;
    }
  | undefined;

export type FhirDataQueryResponse = Readonly<{
  data?: Bundle | Resource;
  error?: Error;
  loading: boolean;
}>;
