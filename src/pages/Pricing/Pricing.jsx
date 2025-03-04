import { useState, useEffect, useRef } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { subscriptionPlans } from '../../services/subscription.service.js';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Pricing = () => {
  const [error, setError] = useState(null);
  const [plans, setPlans] = useState([]);
  const isPlansFetched = useRef(false);
  const [flippedPlan, setFlippedPlan] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await subscriptionPlans();
        if (!response.success) {
          setError({ type: 'error', message: response.message });
          return;
        }
        const order = ['monthly', 'quarterly', 'yearly'];
        const sortedPlans = response.data.sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title));
        setPlans(sortedPlans);
        sessionStorage.setItem('subPlans', JSON.stringify(sortedPlans));
      } catch (error) {
        setError({ type: 'error', message: error.message });
      }
    };

    const subPlansRaw = sessionStorage.getItem('subPlans');
    if (!subPlansRaw && !isPlansFetched.current) {
      fetchPlans().then(() => {
        isPlansFetched.current = true;
      });
    } else if (subPlansRaw) {
      try {
        setPlans(JSON.parse(subPlansRaw));
      } catch (error) {
        console.error("Error parsing subPlans from sessionStorage:", error);
        fetchPlans();
      }
    }
  }, []);

  return (
    <div className="relative isolate bg-gradient-to-b from-gray-900 to-black px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-green-400">Pricing</h2>
        <p className="mt-2 text-5xl font-bold tracking-tight text-white sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-center text-gray-300 sm:text-xl">
        Pick an affordable plan packed with the best features to engage your audience, build loyalty, and drive sales.
      </p>
      <div className="mx-auto mt-16 grid gap-6 sm:grid-cols-1 lg:max-w-5xl lg:grid-cols-3 lg:gap-8">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={classNames(
              'relative rounded-3xl p-8 ring-1 ring-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-xl',
              'hover:shadow-green-500/40 hover:ring-1 hover:ring-green-500 bg-gray-800 text-white',
              flippedPlan === plan._id ? 'rotate-y-180' : ''
            )}
          >
            {!flippedPlan || flippedPlan !== plan._id ? (
              <>
                <h3 className="text-lg font-semibold text-green-400">{plan.title}</h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-5xl font-bold">₹{plan.price}</span>
                  <span className="text-base text-gray-400">/month</span>
                </p>
                <p className="mt-6 text-base text-gray-300">{plan.description}</p>
                <ul role="list" className="mt-8 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3 text-gray-300">
                      <CheckIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setFlippedPlan(plan._id)}
                  className="mt-8 inline-block w-full rounded-lg bg-green-600 px-5 py-3 text-center text-lg font-semibold text-white shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Get started today
                </button>
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                <img src={plan.paymentQR.url} alt="QR Code" className="w-40 h-40" />
              </div>
            )}
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
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Pricing;