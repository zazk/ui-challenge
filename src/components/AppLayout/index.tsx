import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.svg';
import { getOrganizationData } from '../../services/api'

import { ReactComponent as IconCaretRight } from '../../assets/images/icon-caret-right.svg';

interface IAppLayautProps {
  selectOrg: (id: number) => void;
  selectRpt: (id: number) => void;
  currentOrg: number;
}

interface IOrganization {
  id: number;
  name: string;
}

export const AppLayout: React.FunctionComponent<IAppLayautProps> = (props:React.PropsWithChildren<IAppLayautProps>) => {
  const [organization, setOrganization] = useState<IOrganization>({} as IOrganization);

  useEffect(() => {
    getOrganizationData(props.currentOrg).then(({ data }) => setOrganization(data))
  }, [props.currentOrg])

  return (
    <main className="w-screen h-screen flex">
      <nav className="py-8 w-64 h-full bg-gray-200 border-r-2 border-gray-500 text-center">
        <button onClick={() => props.selectOrg(0)}>
          <img src={logo} alt="logo" />
        </button>
        <h2 className="font-medium text-lg mt-2 mb-10">{organization.name}</h2>
        <ul>
          <button className="text-purple-800 font-medium text-lg" onClick={() => props.selectRpt(0)}>
            <IconCaretRight className="absolute text-gray-600 left-1 mt-px"/>
            Test Reports
          </button>
        </ul>
      </nav>
      <section className="px-8 py-4 flex-1 overflow-y-auto">
        {props.children}
      </section>
    </main>
  );
}

export default AppLayout;
