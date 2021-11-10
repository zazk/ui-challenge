import axios from 'axios'

export const getOrganizations = () => {
  return axios.get('https://my.api.mockaroo.com/organizations.json?key=2e435a20')
}

export const getOrganizationData = (id: number) => {
  return axios.get(`https://my.api.mockaroo.com/organizations/${id}.json?key=2e435a20`)
}

export const getOrganizationReports = (id: number) => {
  return axios.get(`https://my.api.mockaroo.com/organizations/${id}/reports.json?key=2e435a20`)
}

export const getReportData = (orgId:number, id: number) => {
  return axios.get(`https://my.api.mockaroo.com/organizations/${orgId}/reports/${id}/details.json?key=2e435a20`)
}

const api = {
  getOrganizations,
  getOrganizationData,
  getOrganizationReports,
  getReportData
}

export default api;
