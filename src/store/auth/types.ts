// src/store/auth/types.ts
export interface User {
  id: string; // Add your user ID type
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  username: string
  // Add any other properties that represent your user
}

export interface AuthState {
  token: string | null;
  user: User | null; // Add user property
}
