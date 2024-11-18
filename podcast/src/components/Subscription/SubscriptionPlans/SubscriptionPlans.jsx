import React, { useState } from "react";
import subscriptionData from "../../../utils/json/subscriptions.json";

const SubscriptionPlans = () => {
  const [planType, setPlanType] = useState("monthly");
  const plans = subscriptionData.subscriptions[planType];

  return (
    <div className=" text-white py-10">
      <div className="flex justify-center mb-8">
        <div className="flex font-semibold gap-3 ">
          <button
            className={`px-6 py-2  rounded-lg ${
              planType === "monthly"
                ? "bg-white text-black"
                : "bg-transparent   text-white"
            }`}
            onClick={() => setPlanType("monthly")}>
            Monthly
          </button>
          <button
            className={`px-6 py-2  rounded-lg ${
              planType === "yearly"
                ? "bg-white text-black"
                : "bg-transparent   text-white"
            }`}
            onClick={() => setPlanType("yearly")}>
            Yearly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
        {plans.map((plan, index) => (
          <div key={index}>
            <div
              className={`bg-gradient-to-br ${plan.gradient} rounded-lg p-6 shadow-lg border border-white max-h-52 min-h-52 hover:scale-105  `}>
              <h3 className="text-lg font-semibold mb-4">{plan.name}</h3>
              <ul className="text-xs space-y-2">
                {Object.entries(plan.features).map(
                  ([key, value], featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center whitespace-nowrap justify-between ">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/_/g, " ")
                        .charAt(0)
                        .toUpperCase() + key.slice(1)}
                      <span>
                        {value === true ? "✔" : value === false ? "✖" : value}
                      </span>
                    </li>
                  )
                )}
              </ul>
              <button className="mt-4 text-xs ">See more</button>
            </div>

            <div className="mt-8 text-lg rounded-lg py-1 border border-white text-center flex justify-center">
              <p>
                Price {plan.currency}
                {plan.price}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-xl rounded-lg py-2 border border-white text-center flex justify-center">
        <p>Subscribe</p>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
