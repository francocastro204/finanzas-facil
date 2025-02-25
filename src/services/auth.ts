import { API_URL } from '@/config';

interface RegisterInput {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	password: string;
}

interface LoginInput {
	email: string;
	password: string;
}

interface ApiError {
	error: string;
	message?: string;
}

export const authAPI = {
	register: async (data: RegisterInput) => {
		try {
			const response = await fetch(`${API_URL}/api/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				// Si es un error conocido del backend
				if (result.error === 'El email ya está registrado') {
					throw new Error(result.error);
				}

				// Si es un error de conexión a la base de datos
				if (result.error?.includes("Can't reach database server")) {
					throw new Error('El servicio no está disponible en este momento. Por favor, intenta más tarde.');
				}

				// Para otros errores
				throw new Error(result.message || 'Error en el registro');
			}

			return result;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Error en el registro');
		}
	},

	login: async (data: LoginInput) => {
		try {
			const response = await fetch(`${API_URL}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (!response.ok) {
				// Si es un error de credenciales
				if (result.error === 'Credenciales inválidas') {
					throw new Error(result.error);
				}

				// Si es un error de conexión a la base de datos
				if (result.error?.includes("Can't reach database server")) {
					throw new Error('El servicio no está disponible en este momento. Por favor, intenta más tarde.');
				}

				throw new Error(result.message || 'Error en el inicio de sesión');
			}

			return result;
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
			throw new Error('Error en el inicio de sesión');
		}
	},
}; 