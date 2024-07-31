import React from "react";

export default function SupportDetails() {
  return (
    <>
      <div className="relative mt-10 text-white">
        <h3 className="mb-5 text-lg font-bold">Support</h3>
        <p className="text-sm font-semibold">
          +01 653 235 211 <span className="font-light">(International)</span>
        </p>
        <p className="mt-1 text-sm font-semibold">
          support@nanohair.com <span className="font-light">(Email)</span>
        </p>
        <p className="mt-2 text-xs font-medium">
          Call us now for payment related issues
        </p>
      </div>

      <div className="relative mt-10 flex">
        <p className="flex flex-col">
          <span className="text-sm font-bold text-white">
            Money Back Guarantee
          </span>
          <span className="text-xs font-medium text-white">
            within 30 days of purchase
          </span>
        </p>
      </div>
    </>
  );
}
