import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { authAPI } from '@/services/auth';
import toast from 'react-hot-toast';
import { registerSchema } from '@/utils/validations';

interface FormErrors {
	[key: string]: string;
}

export const useRegisterForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});
	const [generalError, setGeneralError] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);

	const handleSubmit = async (formData: FormData) => {
		setIsLoading(true);
		setErrors({});
		setGeneralError('');

		const data = {
			firstName: formData.get('firstName') as string,
			lastName: formData.get('lastName') as string,
			phone: formData.get('phone') as string,
			email: formData.get('email') as string,
			password: formData.get('password') as string,
			confirmPassword: formData.get('confirmPassword') as string,
		};

		try {
			await registerSchema.parseAsync(data);

			if (data.password !== data.confirmPassword) {
				setErrors({ confirmPassword: 'Las contraseñas no coinciden' });
				return;
			}

			const response = await authAPI.register({
				email: data.email,
				password: data.password,
				firstName: data.firstName,
				lastName: data.lastName,
				phone: data.phone,
			});

			if (response.user) {
				toast.success('¡Cuenta creada exitosamente!');
				router.push('/dashboard');
			}
		} catch (err: any) {
			if (err instanceof z.ZodError) {
				const newErrors: FormErrors = {};
				err.errors.forEach((error) => {
					if (error.path) {
						newErrors[error.path[0]] = error.message;
					}
				});
				setErrors(newErrors);
				return;
			}

			if (err instanceof Error) {
				if (err.message === 'El email ya está registrado') {
					setErrors({ email: 'Este correo ya está registrado' });
				} else if (err.message.includes('no está disponible')) {
					setGeneralError(err.message);
					toast.error(err.message);
				} else {
					setGeneralError('Error al crear la cuenta. Por favor, intenta nuevamente.');
					toast.error('Error al crear la cuenta');
				}
			}
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		errors,
		generalError,
		isFormValid,
		setIsFormValid,
		handleSubmit,
	};
}; 