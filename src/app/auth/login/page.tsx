'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import { signIn, useSession } from 'next-auth/react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';

const LoginPage = () => {
	const router = useRouter();
	const { status } = useSession();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	// Redirigir si ya está autenticado
	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/dashboard');
		}
	}, [status, router]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		const formData = new FormData(e.currentTarget);

		try {
			const result = await signIn('credentials', {
				email: formData.get('email') as string,
				password: formData.get('password') as string,
				redirect: false,
			});

			if (result?.error) {
				setError('Credenciales inválidas');
				return;
			}
			
			toast.success('¡Bienvenido de nuevo!');
			router.push('/dashboard');
		} catch {
			toast.error('Ocurrió un error al iniciar sesión');
			setError('Ocurrió un error al iniciar sesión');
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			await signIn('google', {
				callbackUrl: '/dashboard',
			});
			toast.success('¡Bienvenido de nuevo!');
		} catch (error) {
			toast.error('Error al iniciar sesión con Google');
			setError('Error al iniciar sesión con Google');
		}
	};

	const handleAppleLogin = async () => {
		setIsLoading(true);
		try {
			await signIn('apple', {
				callbackUrl: '/dashboard',
			});
		} catch {
			setError('Error al iniciar sesión con Apple');
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Inicia sesión en tu cuenta
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						¿No tienes una cuenta?{' '}
						<Link
							href="/auth/register"
							className="font-medium text-blue-600 hover:text-blue-500"
						>
							Regístrate aquí
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
								autoComplete="current-password"
								required
								className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Contraseña"
							/>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
							/>
							<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
								Recordarme
							</label>
						</div>

						<div className="text-sm">
							<Link
								href="/auth/forgot-password"
								className="font-medium text-blue-600 hover:text-blue-500"
							>
								¿Olvidaste tu contraseña?
							</Link>
						</div>
					</div>

					<div>
						<Button
							type="submit"
							variant="primary"
							fullWidth
							disabled={isLoading}
						>
							{isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
						</Button>
					</div>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-gray-50 text-gray-500">
									O continúa con
								</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-3">
							<Button
								variant="outline"
								className="w-full"
								onClick={handleGoogleLogin}
								disabled={isLoading}
							>
								<span className="flex items-center justify-center">
									<svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
										{/* Logo de Google SVG */}
										<path
											d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
											fill="#4285F4"
										/>
										<path
											d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
											fill="#34A853"
										/>
										<path
											d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
											fill="#FBBC05"
										/>
										<path
											d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
											fill="#EA4335"
										/>
									</svg>
									Continuar con Google
								</span>
							</Button>
							<Button
								variant="outline"
								className="w-full"
								onClick={handleAppleLogin}
								disabled={isLoading}
							>
								Continuar con Apple
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;