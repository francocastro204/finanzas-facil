'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Button from '@/components/shared/Button';
import toast from 'react-hot-toast';

const DashboardPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/auth/login');
		}
	}, [status, router]);

	const handleSignOut = async () => {
		try {
			await signOut({ redirect: false });
			toast.success('Sesión cerrada exitosamente');
			router.push('/');
		} catch (error) {
			toast.error('Error al cerrar sesión');
		}
	};

	if (status === 'loading') {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-xl">Cargando...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold">
						Bienvenido, {session?.user?.name}
					</h1>
					<Button
						variant="outline"
						onClick={handleSignOut}
					>
						Cerrar sesión
					</Button>
				</div>
				<div className="bg-white rounded-lg shadow p-6">
					<p className="text-xl">
						Bienvenido al Dashboard de Finanzas Fácil
					</p>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage; 