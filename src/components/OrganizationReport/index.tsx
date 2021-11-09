import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AppLayout from '../AppLayout';
import timeAgo from '../../utils/time-ago';

import { ReactComponent as IconArrowRight } from '../../assets/images/icon-arrow-right.svg';
import { ReactComponent as IconArrowDown } from '../../assets/images/icon-arrow-down.svg';
import { ReactComponent as IconTime } from '../../assets/images/icon-time.svg';
import { ReactComponent as IconCalendar } from '../../assets/images/icon-calendar.svg';
import { ReactComponent as IconCheckmark } from '../../assets/images/icon-checkmark.svg';
import { ReactComponent as IconCancel } from '../../assets/images/icon-cancel.svg';


interface IOrganizationReportProps {
  selectOrg: (id: number) => void;
  selectRpt: (id: number) => void;
  currentOrg: Number;
  currentRpt: Number;
}

interface IEndpoint {
  url: string;
  duration: number;
  status: 'ERROR' | 'SUCCESS';
}

interface IReport {
  id: number;
  end_date: string;
  duration: number;
  job_name: string;
  branch: string;
  github_user: string;
  commit: string;
  environment_url: string;
  endpoints: IEndpoint[];
}

export const OrganizationReport: React.FunctionComponent<IOrganizationReportProps> = (props) => {
  const [report, setReport] = useState<IReport>({} as IReport);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    axios.get(`https://my.api.mockaroo.com/organizations/${props.currentOrg}/reports/${props.currentRpt}/details.json?key=2e435a20`).then(({ data }) => setReport(data))
  }, [props.currentOrg, props.currentRpt])

  const getFailed = () => {
    return report.endpoints.filter(e => e.status !== 'SUCCESS' && (!search || e.url.includes(search.toLocaleLowerCase())))
  }

  const getPassed = () => {
    return report.endpoints.filter(e => e.status === 'SUCCESS' && (!search || e.url.includes(search.toLocaleLowerCase())))
  }

  const renderEndpoint = (endpoint: IEndpoint) =>{
    return <article key={endpoint.url + endpoint.duration} className={`mt-4 bg-gray-50 font-medium flex border-l-4 py-4 px-4 ${endpoint.status === 'SUCCESS' ? 'border-green-600' : 'border-red-600'}`}>
      <p className="flex-1 text-gray-500">GET {endpoint.url}</p>
      <p className="text-gray-400">{timeAgo.format(Date.now() - endpoint.duration, 'mini')}</p>
    </article>
  }

  return (
    <AppLayout selectOrg={(id) => props.selectOrg(id)} selectRpt={() => props.selectRpt(0)} currentOrg={props.currentOrg}>
      <h1 className="text-blue-500 font-medium text-lg mb-8">
        Test Reports
        <IconArrowRight className="mx-3 w-3 inline-block h-3 text-gray-700 -top-px relative"/>
        <span className="text-gray-700">Execution &#35;{report.id}</span>
      </h1>

      <div className="bg-gray-100 text-gray-500 font-medium inline-block px-6 py-3 mb-4">
        <p>
          <IconTime className="w-4 mr-1 -top-px relative inline"/>
          Duration {!!report.duration && timeAgo.format(Date.now() - report.duration, 'mini')}
          <IconCalendar className="w-4 ml-4 mr-1 -top-px relative inline"/>
          Finished {!!report.end_date && timeAgo.format(new Date(report.end_date))}
        </p>
        <p className="text-blue-600">build-and-deploy (12332)</p>
        <p>{report.branch} {report.commit} {report.github_user}</p>
        <p>{report.environment_url}</p>
      </div>

      <div className="border-b-2 border-gray-200 mb-6 h-12 box-border">
        <p className="border-b-4 border-purple-500 h-12 text-purple-500 text-lg font-medium px-10 py-2 inline-block">Results</p>
      </div>

      <input
        onChange={($event) => setSearch($event.target.value)}
        className="border-2 border-gray-300 text-gray-400 rounded font-medium	w-full py-1 px-4 mb-3"
        placeholder="Filter by endpoint..."
        type="text"
      />
      
      {!!report.endpoints && <>
        <section>
          <p className="text-gray-500 text-2xl font-medium mb-4">
            <IconArrowDown className="w-4 mr-5 inline"/>
            <IconCancel className="w-6 mr-2 inline text-red-500 -top-px relative"/>
            Failed Test({getFailed().length}/{report.endpoints.length})
          </p>
          {getFailed().map(e => renderEndpoint(e))}
        </section>
        
        <section>
          <p className="text-gray-500 text-2xl font-medium mb-4 mt-5">
            <IconArrowDown className="w-4 mr-5 inline"/>
            <IconCheckmark className="w-6 mr-2 inline text-green-500 -top-px relative"/>
            Passed Test({getPassed().length}/{report.endpoints.length})
          </p>
          {getPassed().map(e => renderEndpoint(e))}
        </section>
      </>}
    </AppLayout>
  );
}

export default OrganizationReport;
