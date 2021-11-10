import React, { useState, useEffect  } from 'react';
import AppLayout from '../AppLayout';
import timeAgo from '../../utils/time-ago';
import { getOrganizationReports } from '../../services/api'

interface IOrganizationItemProps {
  currentOrg: number;
  selectRpt: (id: number) => void;
  selectOrg: (id: number) => void;
}

interface IReport {
  id: number;
  name: string;
  start_date: string;
  duration: number;
  failed_tests: number;
  succeed_tests: number;
}

export const OrganizationItem: React.FunctionComponent<IOrganizationItemProps> = (props) => {
  const [reports, setReports] = useState<IReport[]>([]);

  useEffect(() => {
    getOrganizationReports(props.currentOrg).then(({ data }) => setReports(data))
  }, [props.currentOrg])

  return (
    <AppLayout selectOrg={(id) => props.selectOrg(id)} selectRpt={() => {}} currentOrg={props.currentOrg}>
      <h1 className="text-blue-600 font-medium text-xl">Test Reports</h1>
      <section>
        {
          reports.map(rpt =>
            <article
              key={rpt.id}
              onClick={() => props.selectRpt(rpt.id)}
              className="py-2 pl-3 pr-16 mt-4 cursor-pointer bg-gray-100 flex items-center"
            >
              <p className="flex-1">
                <span className="font-semibold text-lg text-gray-500">Execution &#35;{rpt.id}</span>
                <span className="text-sm block text-gray-400">{timeAgo.format(new Date(rpt.start_date))} - {timeAgo.format(Date.now() - rpt.duration, 'mini')} long</span>
              </p>
              <p className="text-green-600 font-medium ml-3">{rpt.succeed_tests} passed</p>
              <p className="text-red-600 font-medium ml-12">{rpt.failed_tests} failed</p>
            </article>
          )
        }
      </section>
    </AppLayout>
  );
}

export default OrganizationItem;
