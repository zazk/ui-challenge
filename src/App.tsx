import React, { useState } from 'react';
import './App.css';
import OrganizationList from './components/OrganizationList';
import OrganizationItem from './components/OrganizationItem';
import OrganizationReport from './components/OrganizationReport';

export enum EView {
  IndexView,
  ReportView,
  OrganizationView,
}

export const App: React.FunctionComponent = () => {
  const [selectedOrg, setSelectedOrg] = useState(0);
  const [selectedReport, setSelectedReport] = useState(0);

  const currentView = (): EView => {
    if (!!selectedReport) {
      return EView.ReportView
    } else if (!!selectedOrg) {
      return EView.OrganizationView
    }

    return EView.IndexView
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
          case EView.ReportView:
            return renderReportView()
          case EView.OrganizationView:
            return renderOrganizationView()
          default:
            return <OrganizationList selectOrg={(id) => setSelectedOrg(id)} />
        }
      })()}
    </>
  );
}

export default App;
