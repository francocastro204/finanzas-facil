import { 
    ChartPieIcon, 
    PhotoIcon, 
    MicrophoneIcon, 
    ArrowPathIcon 
  } from '@heroicons/react/24/outline';
  
  const features = [
    {
      name: 'Regla 50/30/20',
      description: 'Organiza tus gastos siguiendo el método más efectivo para el ahorro y control financiero.',
      icon: ChartPieIcon,
    },
    {
      name: 'Registro por Foto',
      description: 'Captura tus recibos y facturas con solo una foto. Disponible en plan Premium.',
      icon: PhotoIcon,
    },
    {
      name: 'Control por Voz',
      description: 'Registra tus gastos mediante comandos de voz. Exclusivo del plan Plus.',
      icon: MicrophoneIcon,
    },
    {
      name: 'Sincronización Automática',
      description: 'Mantén tus datos actualizados en todos tus dispositivos en tiempo real.',
      icon: ArrowPathIcon,
    },
  ];
  
  export default function Features() {
    return (
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Todo lo que necesitas para tus finanzas
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Herramientas intuitivas para gestionar tu dinero de manera inteligente
            </p>
          </div>
  
          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }