'use client';

import { useState } from 'react';
import Link from 'next/link';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { PasswordField } from '@/components/auth/PasswordField';
import Button from '@/components/shared/Button';

const RegisterPage = () => {
	const {
		isLoading,
		errors,
		generalError,
		isFormValid,
		setIsFormValid,
		handleSubmit,
	} = useRegisterForm();
	const [phone, setPhone] = useState('');

	const validateForm = (form: HTMLFormElement) => {
		const inputs = Array.from(form.querySelectorAll('input[required]')) as HTMLInputElement[];
		const isValid = inputs.every(input => input.value.trim() !== '') && phone.length >= 8;
		setIsFormValid(isValid);
	};

	const handlePhoneChange = (value: string) => {
		setPhone(value);
		const form = document.querySelector('form');
		if (form) validateForm(form);
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await handleSubmit(new FormData(e.currentTarget));
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Crea tu cuenta
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						¿Ya tienes una cuenta?{' '}
						<Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
							Inicia sesión aquí
						</Link>
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={onSubmit} onChange={(e) => validateForm(e.currentTarget)}>
					<div className="rounded-md shadow-sm space-y-4">
						<div>
							<label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
								Nombre
							</label>
							<input
								id="firstName"
								name="firstName"
								type="text"
								required
								className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Nombre"
							/>
							{errors.firstName && (
								<p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
							)}
						</div>

						<div>
							<label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
								Apellidos
							</label>
							<input
								id="lastName"
								name="lastName"
								type="text"
								required
								className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Apellidos"
							/>
							{errors.lastName && (
								<p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
							)}
						</div>

						<div>
							<label htmlFor="phone" className="block text-sm font-medium text-gray-700">
								Teléfono
							</label>
							<PhoneInput
								country={'cl'}
								value={phone}
								onChange={handlePhoneChange}
								inputProps={{
									name: 'phone',
									required: true,
								}}
								containerClass="!w-full"
								inputClass="!w-full !h-10 !py-2 !px-3 !text-base !border-gray-300 !rounded-md focus:!outline-none focus:!ring-blue-500 focus:!border-blue-500"
								buttonClass="!border-gray-300 !rounded-l-md hover:!bg-gray-50"
							/>
							{errors.phone && (
								<p className="mt-1 text-sm text-red-600">{errors.phone}</p>
							)}
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Correo electrónico
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Correo electrónico"
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">{errors.email}</p>
							)}
						</div>

						<PasswordField
							id="password"
							name="password"
							label="Contraseña"
							placeholder="Contraseña"
							error={errors.password}
							showStrengthIndicator
						/>

						<PasswordField
							id="confirmPassword"
							name="confirmPassword"
							label="Confirmar Contraseña"
							placeholder="Confirmar Contraseña"
							error={errors.confirmPassword}
						/>
					</div>

					{generalError && (
						<div className="rounded-md bg-red-50 p-4 text-center">
							<div className="flex justify-center">
								<div className="text-sm text-red-700">
									{generalError}
								</div>
							</div>
						</div>
					)}

					<Button
						type="submit"
						variant="primary"
						fullWidth
						disabled={isLoading || !isFormValid}
					>
						{isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;