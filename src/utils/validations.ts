import { z } from 'zod';

export const registerSchema = z.object({
	firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
	lastName: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres'),
	phone: z.string().min(8, 'El teléfono debe tener al menos 8 dígitos'),
	email: z.string().email('El correo electrónico no es válido'),
	password: z.string()
		.min(8, 'La contraseña debe tener al menos 8 caracteres')
		.max(25, 'La contraseña no debe exceder los 25 caracteres')
		.regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
		.regex(/[a-z]/, 'Debe contener al menos una minúscula')
		.regex(/[0-9]/, 'Debe contener al menos un número')
		.regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
	confirmPassword: z.string()
}); 