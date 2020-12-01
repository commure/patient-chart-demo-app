import React from "react";

import { AppHeader } from "@commure/components-core";
import { CommureSmartApp } from "@commure/components-data";
import SMARTClient from "@commure/smart-core";
import { PatientList } from "./components/PatientList/PatientList";

import "./styles/all.scss";
import { smartConfig } from "./config";

const smartClient = new SMARTClient(smartConfig);

function App() {
  return (
    <CommureSmartApp client={smartClient}>
      <AppHeader appName="My First Commure App" fixedToTop />
      <div className="app-container">
        <PatientList />
      </div>
    </CommureSmartApp>
  );
}

export default App;
