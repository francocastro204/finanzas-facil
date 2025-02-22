import { CheckIcon } from '@heroicons/react/24/outline';

const tiers = [
  {
    name: 'Gratis',
    price: '0',
    features: [
      'Registro manual de gastos',
      'Dashboard básico',
      'Categorización de gastos',
      'Regla 50/30/20',
    ],
    cta: 'Comenzar gratis',
    mostPopular: false,
  },
  {
    name: 'Premium',
    price: '4',
    features: [
      'Todo lo del plan Gratis',
      'Registro por foto',
      'Exportación de reportes',
      'Soporte prioritario',
    ],
    cta: 'Prueba 30 días gratis',
    mostPopular: true,
  },
  {
    name: 'Plus',
    price: '8',
    features: [
      'Todo lo del plan Premium',
      'Control por voz',
      'Análisis avanzado',
      'API access',
    ],
    cta: 'Prueba 15 días gratis',
    mostPopular: false,
  },
];

export default function Pricing() {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Planes que se adaptan a ti
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Comienza gratis y mejora según tus necesidades
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-lg shadow-lg overflow-hidden ${
                tier.mostPopular ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              <div className="px-6 py-8 bg-white">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {tier.name}
                </h3>
                <p className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold tracking-tight text-gray-900">
                    ${tier.price}
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">/mes</span>
                </p>
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-base text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full py-3 px-6 rounded-md text-white font-medium ${
                    tier.mostPopular
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-800 hover:bg-gray-900'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}