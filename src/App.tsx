import React from "react";

import { CommureSmartApp } from "@commure/components-data";
import SMARTClient from "@commure/smart-core";
import Dashboard from "./components/Dashboard/Dashboard";

import "./styles/all.scss";
import { smartConfig } from "./config";
import { HOFSmartApp } from "./types";

const smartClient = new SMARTClient(smartConfig);

function App() {
  return <Dashboard />;
}

const asSMARTApp: HOFSmartApp = WrappedComponent => props => (
  <CommureSmartApp client={smartClient}>
    <WrappedComponent {...props} />
  </CommureSmartApp>
);

export default asSMARTApp(App);
