

export default function SubscriptionCheckoutForm() {
  return (
    <form className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number*
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Gender*
          </span>
          <div className="space-y-2">
            {["Male", "Female", "Other"].map((gender) => (
              <label key={gender} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="gender"
                  value={gender.toLowerCase()}
                  className="form-radio text-blue-600"
                  required
                />
                <span className="ml-2">{gender}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date of Birth*
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <hr className="border-t border-gray-300" />

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Home Address</h2>
        <div>
          <label
            htmlFor="addressLine1"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address Line 1*
          </label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="addressLine2"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address Line 2
          </label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City*
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State*
            </label>
            <select
              id="state"
              name="state"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select state</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              {/* Add more states here */}
            </select>
          </div>
        </div>
        <div>
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Zip Code*
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
}
