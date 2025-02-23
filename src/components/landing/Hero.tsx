import Button from '../shared/Button';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Simplifica tus Finanzas Personales
      </h1>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl">
        Toma el control de tu dinero con nuestra herramienta intuitiva de gestión financiera
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/auth/login">
          <Button variant="primary" size="lg">
            Iniciar Sesión
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button variant="secondary" size="lg">
            Crear Cuenta
          </Button>
        </Link>
      </div>
    </div>
  );
}