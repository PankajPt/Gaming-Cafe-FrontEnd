import { CheckIcon } from '@heroicons/react/20/solid';

const tiers = [
  {
    name: 'Monthly',
    id: 'tier-hobby',
    href: '#',
    priceMonthly: '$29',
    description: "The perfect plan if you're just getting started with our product.",
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'],
  },
  {
    name: 'Quaterly',
    id: 'tier-pro',
    href: '#',
    priceMonthly: '$59',
    description: "A great plan for professionals who need more flexibility and features.",
    features: ['50 products', 'Up to 50,000 subscribers', 'Advanced analytics', 'Priority support'],
  },
  {
    name: 'Yearly',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '$99',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      'Dedicated support representative',
      'Marketing automations',
      'Custom integrations',
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing() {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-center text-gray-600 sm:text-xl">
        Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer
        loyalty, and driving sales.
      </p>
      <div className="mx-auto mt-16 grid gap-6 sm:grid-cols-1 lg:max-w-4xl lg:grid-cols-1 lg:gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              'rounded-3xl p-8 ring-1 ring-gray-300 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-900 hover:text-white', // Hover styles for all tiers
              'bg-white text-black' // Default background and text color for all tiers
            )}
          >
            <h3 id={tier.id} className="text-base font-semibold text-indigo-600">
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-5xl font-semibold">{tier.priceMonthly}</span>
              <span className="text-base text-gray-500">/month</span>
            </p>
            <p className="mt-6 text-base">{tier.description}</p>
            <ul role="list" className="mt-8 space-y-3 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                'mt-8 inline-block w-full rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              )}
            >
              Get started today
            </a>
          </div>
        ))}
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
