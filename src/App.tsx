import React, { useState } from 'react';
import './App.css';
import OrganizationList from './components/OrganizationList';
import OrganizationItem from './components/OrganizationItem';
import OrganizationReport from './components/OrganizationReport';

export const App: React.FunctionComponent = () => {
  const [selectedOrg, setSelectedOrg] = useState(Number);
  const [selectedReport, setSelectedReport] = useState(Number);

  const currentView = () => {
    if (!!selectedReport) {
      return 'reportView'
    } else if (!!selectedOrg) {
      return 'organizationView'
    }

    return 'indexView'
  }

  const renderReportView = () => {
    return <OrganizationReport
      selectOrg={(id) => { setSelectedOrg(id); setSelectedReport(0) }}
      selectRpt={(id) => setSelectedReport(id)}
      currentOrg={selectedOrg}
      currentRpt={selectedReport}
    />
  }

  const renderOrganizationView = () => {
    return <OrganizationItem
      selectOrg={(id) => { setSelectedOrg(id); setSelectedReport(0) }}
      selectRpt={(id) => setSelectedReport(id)}
      currentOrg={selectedOrg}
    />
  }

  return (
    <>
      {(() => {
        switch (currentView()) {
          case 'reportView':
            return renderReportView()
          case 'organizationView':
            return renderOrganizationView()
          default:
            return <OrganizationList selectOrg={(id) => setSelectedOrg(id)} />
        }
      })()}
    </>
  );
}

export default App;
