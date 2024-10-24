// src/data-access/services/agent-service.ts
import { registerAgent } from '../api/agent-registration';
import { UserRegistrationData } from '../../interfaces/user';

export const handleAgentRegistration = async (agentData: UserRegistrationData) => {
  try {
    const response = await registerAgent(agentData);
    console.log('Agent registered successfully:', response);
    return response;
  } catch (error: any) {
    console.error('Agent registration failed:', error);
    throw new Error(error.message || 'Failed to register agent');
  }
};
