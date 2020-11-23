import React from "react";

import { AppHeader } from "@commure/components-core";
import { PatientList } from "../PatientList/PatientList";

const Dashboard: React.FC = (): React.ReactElement => {
  return (
    <>
      <AppHeader appName="My First Commure App" fixedToTop />
      <div className="app-container">
        <PatientList />
      </div>
    </>
  );
};

export default Dashboard;
