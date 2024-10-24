import { fetchUsers } from '../api/userlist';

export const getUserList = async (token: string | null, page = 1) => {
  try {
    const users = await fetchUsers(token, page);
    return users; // Further processing if needed
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred while fetching the user list');
    }
  }
};
