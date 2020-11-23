import React from "react";

import { FhirClientProvider } from "@commure/components-data-internal";
// @ts-ignore No typings are provided for this library yet
import { ErrorBoundary } from "@commure/components-web-fhir";
import FhirRest from "@commure/fhir-rest";
import SMARTApp from "@commure/smart-new";
import SMARTClient from "@commure/smart-core";

import Dashboard from "./components/Dashboard/Dashboard";
import { smartConfig } from "./config";
import { HOFSmartApp } from "./types/index";

import "./styles/all.scss";

const smartClient = new SMARTClient(smartConfig);

function App() {
  const fhirRest = new FhirRest({
    baseUrl: smartClient.fhirBaseUrl,
    secureFetch: smartClient.fetch.bind(smartClient)
  });

  return (
    <ErrorBoundary
      description="An unexpected error occurred. Please reload."
      icon="error"
    >
      <FhirClientProvider config={{ fhirRest }}>
        <Dashboard />
      </FhirClientProvider>
    </ErrorBoundary>
  );
}

const asSMARTApp: HOFSmartApp = WrappedComponent => props => (
  <SMARTApp client={smartClient}>
    <WrappedComponent {...props} />
  </SMARTApp>
);

export default asSMARTApp(App);
