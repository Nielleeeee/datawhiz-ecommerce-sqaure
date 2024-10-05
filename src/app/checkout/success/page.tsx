import Link from "next/link";

export default function Success() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-100 to-teal-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-teal-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Success!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your action has been completed successfully.
        </p>

        <div className="mb-8 p-4 bg-teal-50 rounded-lg">
          <p className="text-teal-800 text-sm">
            We&apos;ve sent a confirmation email to your registered address.
            Please check your inbox for further details.
          </p>
        </div>

        <Link href="/" className="inline-block">
          <button className="bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 shadow-md">
            Return to Homepage
          </button>
        </Link>
      </div>

      <div className="mt-8 flex items-center space-x-2">
        <svg
          className="w-5 h-5 text-teal-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm text-teal-800">
          If you have any questions, please contact our support team.
        </p>
      </div>
    </main>
  );
}
