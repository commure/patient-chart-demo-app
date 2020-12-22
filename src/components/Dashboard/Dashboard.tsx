import React, { createContext, useState } from "react";

import { AppHeader } from "@commure/components-core";
import { LeftPanelLayout } from "@commure/components-foundation";
import { PatientList } from "../PatientList/PatientList";
import PanelBody from "../PanelBody/PanelBody";
import { DashboardContextType } from "../../types";

export const DashboardContext = createContext<DashboardContextType>(undefined);

const Dashboard: React.FC = (): React.ReactElement => {
  const [patientId, setPatientId] = useState<string | null>(null);

  const selectMenuItem = (id: string) => {
    setPatientId(id);
  };

  return (
    <>
      <AppHeader appName="Patient Chart" fixedToTop />
      <DashboardContext.Provider value={{ selectMenuItem }}>
        <LeftPanelLayout collapsible panelBody={<PanelBody />}>
          {/* Spacer */}
          <div style={{ height: 40 + 16 }}></div>

          <PatientList />
        </LeftPanelLayout>
      </DashboardContext.Provider>
    </>
  );
};

export default Dashboard;
