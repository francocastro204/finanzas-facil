export const API_URL = 'https://api.finanzasfacil.cl';

export const ENDPOINTS = {
	auth: {
		register: `${API_URL}/api/auth/register`,
		login: `${API_URL}/api/auth/login`,
	},
} as const;
