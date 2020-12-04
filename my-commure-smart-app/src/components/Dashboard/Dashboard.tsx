import React from "react";

import { AppHeader } from "@commure/components-core";
import { LeftPanelLayout } from "@commure/components-foundation";
import { PatientList } from "../PatientList/PatientList";
import PanelBody from "../PanelBody/PanelBody";

const Dashboard: React.FC = (): React.ReactElement => {
  return (
    <>
      <AppHeader appName="My First Commure App" fixedToTop />
      <LeftPanelLayout collapsible panelBody={<PanelBody />}>
        {/* Spacer */}
        <div style={{ height: 40 + 16 }}></div>

        <PatientList />
      </LeftPanelLayout>
    </>
  );
};

export default Dashboard;