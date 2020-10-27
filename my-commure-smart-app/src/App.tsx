import { AppHeader } from "@commure/components-core";
import { CommureSmartApp } from "@commure/components-data";
import { FhirDataQuery } from "@commure/components-data";
import SMARTClient from "@commure/smart-core";
import { PatientCard } from "@commure/components-core";
import { Bundle, Patient } from "@commure/fhir-types/r4/types";
import React from "react";
import "./App.scss";
import { smartConfig } from "./config";

const smartClient = new SMARTClient(smartConfig);

function App() {
  return (
    <CommureSmartApp client={smartClient}>
      <AppHeader appName="My First Commure App" fixedToTop />
      <div className="hello-world-container">
        <FhirDataQuery queryString="Patient">
          {({ data, loading }) => {
            if (loading) {
              return "Loading...";
            }
            if (!data) {
              return "Error loading data!";
            }
            /* Rendering each of the patients below here */
            const patients: Patient[] = (data as Bundle).entry!.map(
              value => value.resource as Patient
            );
            return (
              <div>
                {patients.map((patient, index) => (
                  <PatientCard key={index} resource={patient} />
                ))}
              </div>
            );
          }}
        </FhirDataQuery>
      </div>
    </CommureSmartApp>
  );
}


export default App;
