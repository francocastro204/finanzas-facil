'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import { signIn } from 'next-auth/react';

const RegisterPage = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		// Aquí irá la lógica de registro
		setTimeout(() => {
			setIsLoading(false);
			router.push('/dashboard');
		}, 1000);
	};

	const handleGoogleRegister = async () => {
		setIsLoading(true);
		try {
			const result = await signIn('google', {
				callbackUrl: '/dashboard',
				redirect: false,
			});
			
			if (result?.error) {
				setError('Error al registrarse con Google');
			}
		} catch {
			setError('Error al registrarse con Google');
		} finally {
			setIsLoading(false);
		}
	};

	const handleAppleRegister = async () => {
		setIsLoading(true);
		try {
			const result = await signIn('apple', {
				callbackUrl: '/dashboard',
				redirect: false,
			});
			
			if (result?.error) {
				setError('Error al registrarse con Apple');
			}
		} catch {
			setError('Error al registrarse con Apple');
		} finally {
			setIsLoading(false);
		}
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
						<Link
							href="/auth/login"
							className="font-medium text-blue-600 hover:text-blue-500"
						>
							Inicia sesión aquí
						</Link>
					</p>
				</div>

				{error && (
					<div className="mb-4 text-center text-red-600">
						{error}
					</div>
				)}

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm space-y-4">
						<div>
							<label htmlFor="name" className="sr-only">
								Nombre completo
							</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Nombre completo"
							/>
						</div>
						<div>
							<label htmlFor="email" className="sr-only">
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
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Contraseña
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								required
								className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Contraseña"
							/>
						</div>
					</div>

					<div>
						<Button
							type="submit"
							variant="primary"
							fullWidth
							disabled={isLoading}
						>
							{isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
						</Button>
					</div>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-gray-50 text-gray-500">
									O regístrate con
								</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-3">
							<Button
								variant="outline"
								className="w-full"
								onClick={handleGoogleRegister}
								disabled={isLoading}
							>
								Registrarse con Google
							</Button>
							<Button
								variant="outline"
								className="w-full"
								onClick={handleAppleRegister}
								disabled={isLoading}
							>
								Registrarse con Apple
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;