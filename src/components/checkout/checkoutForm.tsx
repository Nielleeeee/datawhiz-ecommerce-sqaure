/* eslint-disable @next/next/no-img-element */

export default function CheckoutForm() {
  return (
    <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
          Secure Checkout
          <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
        </h1>

        <form action="" className="mt-10 flex flex-col space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-xs font-semibold text-gray-500"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john.capler@fang.com"
              className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="card-number"
              className="text-xs font-semibold text-gray-500"
            >
              Card number
            </label>
            <input
              type="text"
              id="card-number"
              name="card-number"
              placeholder="1234-5678-XXXX-XXXX"
              className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
            />
            <img
              src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
              alt=""
              className="absolute bottom-3 right-3 max-h-4"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500">
              Expiration date
            </p>
            <div className="mr-6 flex flex-wrap">
              <div className="my-1">
                <label htmlFor="month" className="sr-only">
                  Select expiration month
                </label>
                <select
                  name="month"
                  id="month"
                  className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Month</option>
                </select>
              </div>
              <div className="my-1 ml-3 mr-6">
                <label htmlFor="year" className="sr-only">
                  Select expiration year
                </label>
                <select
                  name="year"
                  id="year"
                  className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Year</option>
                </select>
              </div>
              <div className="relative my-1">
                <label htmlFor="security-code" className="sr-only">
                  Security code
                </label>
                <input
                  type="text"
                  id="security-code"
                  name="security-code"
                  placeholder="Security code"
                  className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="card-name" className="sr-only">
              Card name
            </label>
            <input
              type="text"
              id="card-name"
              name="card-name"
              placeholder="Name on the card"
              className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </form>

        <p className="mt-10 text-center text-sm font-semibold text-gray-500">
          By placing this order you agree to the{" "}
          <a
            href="#"
            className="whitespace-nowrap text-teal-400 underline hover:text-teal-600"
          >
            Terms and Conditions
          </a>
        </p>
        <button
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
