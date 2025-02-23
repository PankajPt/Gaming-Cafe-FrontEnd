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
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={classNames(
              'relative rounded-3xl p-8 ring-1 ring-gray-300 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-900 hover:text-white',
              'bg-white text-black',
              flippedPlan === plan._id ? 'rotate-y-180' : ''
            )}
          >
            {!flippedPlan || flippedPlan !== plan._id ? (
              <>
                <h3 className="text-base font-semibold text-indigo-600">{plan.title}</h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-5xl font-semibold">₹{plan.price}</span>
                  <span className="text-base text-gray-500">/month</span>
                </p>
                <p className="mt-6 text-base">{plan.description}</p>
                <ul role="list" className="mt-8 space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setFlippedPlan(plan._id)}
                  className="mt-8 inline-block w-full rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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

export default Pricing 