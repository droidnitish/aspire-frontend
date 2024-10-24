// src/data-access/services/companyService.ts
import { CompanyRegistrationData, registerCompany } from "../api/company-registration";

// Service function to handle the registration process
export const companyService = {
  register: async (data: CompanyRegistrationData) => {
    return await registerCompany(data);
  },
};
