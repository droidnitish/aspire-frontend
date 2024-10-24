// src/interface/User.ts
export interface UserRegistrationData {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email: string;
  password: string;
  addressLine1: string;
  area: string;
  city: string;
  postCode: string;
  website?: string;
  phoneNumber: string;
  userPermission: string[];
  jobTitle?: string;
  username?: string;
  gender?: string;
  companyEmail?: string;
  userRole?: string;
  addedBy?: string;
}
