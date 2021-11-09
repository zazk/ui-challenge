import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../assets/images/logo.svg';

interface IOrganizationListProps {
  selectOrg: (id: number) => void;
}

interface IOrganization {
  id: number;
  name: string;
  owner_email: string;
  owner_name: string;
  owner_picture: string;
}

export const OrganizationList: React.FunctionComponent<IOrganizationListProps> = (props) => {
  const [organizations, setOrganizations] = useState<IOrganization[]>([]);

  useEffect(() => {
    axios.get('https://my.api.mockaroo.com/organizations.json?key=2e435a20').then(({ data }) => setOrganizations(data))
  }, [])

  return (
    <main className="w-screen h-screen flex-center flex-col">
      <img src={logo} alt="logo" className="absolute left-16 top-8"/>

      <h1 className="text-4xl font-bold mb-4 text-purple-700">Organizations</h1>
      <p className="text-lg font-medium mb-10 text-purple-400">Pick the organization you want to access to</p>

      <section className="w-4/5 max-w-xl flex-center flex-col gap-5 mx-auto">
        {organizations.map(org => 
          <article
            key={org.id}
            onClick={() => props.selectOrg(org.id)}
            className="w-full relative bg-gray-300 text-white font-bold text-xl py-7 cursor-pointer border-2 border-gray-400"
          >
            <img className="w-10 h-10 absolute object-cover	block top-1/2 left-8 transform -translate-y-1/2 rounded-full" src={org.owner_picture} alt="" />
            <p className="text-center">{org.name}</p>
          </article>)
        }
      </section>
    </main>
  );
}

export default OrganizationList;
