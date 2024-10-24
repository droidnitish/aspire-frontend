export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const ENDPOINTS = {
  companyRegistration: `${API_BASE_URL}/companies/register/company`,
  agentRegistration: `${API_BASE_URL}/agents/register/agent`,
  userRegister: `${API_BASE_URL}/users/register/user`,
  userAgent: `${API_BASE_URL}/users/register/agent`, //registration for agent
  login: `${API_BASE_URL}/users/login`,
  logout: `${API_BASE_URL}/users/logout`,
  addProperty: `${API_BASE_URL}/property/add`,
  properties: `${API_BASE_URL}/property/properties`,
  users: `${API_BASE_URL}/users/users`, // User list endpoint
  agents: `${API_BASE_URL}/agents/agents`, // User list endpoint
};
